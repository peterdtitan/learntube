#!/usr/bin/env node
// Load test: simulates N signed-in learners using LearnTube at once against a local
// production build, and reports latency and errors per endpoint.
//
//   node tests/load/run.mjs --users 100            build, seed, start 1 server, run
//   node tests/load/run.mjs --users 500 --instances 4   four servers, like serverless scale-out
//   node tests/load/run.mjs --users 100 --pool 3    smaller connection pool per server
//
// Options: --users N  --ramp S  --hold S  --instances K  --pool P  --skip-build  --label NAME
import { spawn, execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import pg from 'pg';
import seed from './seed.mjs';

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => {
  if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]);
  return acc;
}, []));
const USERS = Number(args.users || 100);
const RAMP = Number(args.ramp || 15) * 1000;
const HOLD = Number(args.hold || 45) * 1000;
const INSTANCES = Number(args.instances || 1);
const POOL = args.pool ? Number(args.pool) : null;
const LABEL = args.label || `${USERS}-users-${INSTANCES}x`;
const URL_DB = process.env.LOAD_DATABASE_URL || 'postgresql://learntube:learntube@localhost:5433/learntube_load';
const PORT0 = 3300;
const TIMEOUT = 15000;

// ---------- metrics ----------
const samples = new Map(); // label -> [{ ms, status, t }]
let measureFrom = Infinity;
function record(label, ms, status) {
  if (!samples.has(label)) samples.set(label, []);
  samples.get(label).push({ ms, status, t: Date.now() });
}
function pct(sorted, p) {
  if (!sorted.length) return 0;
  return sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
}

// ---------- http ----------
let rr = 0;
const base = () => { rr = (rr + 1) % INSTANCES; return `http://localhost:${PORT0 + rr}`; };

async function hit(label, path, { method = 'GET', token, body } = {}) {
  const headers = { Cookie: `next-auth.session-token=${token}` };
  if (body) headers['Content-Type'] = 'application/json';
  const started = performance.now();
  let status;
  try {
    const res = await fetch(base() + path, {
      method,
      headers,
      body: body && JSON.stringify(body),
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT),
    });
    await res.arrayBuffer();
    status = res.status;
  } catch (err) {
    status = err.name === 'TimeoutError' ? 'timeout' : 'network';
  }
  record(label, performance.now() - started, status);
  return status;
}

// What the browser does on every page: the HTML, then the session check, the navbar
// XP/streak summary and the notification count, all at once.
async function pageView(label, path, token) {
  await hit(`page ${label}`, path, { token });
  await Promise.all([
    hit('GET /api/auth/session', '/api/auth/session', { token }),
    hit('GET /api/me', '/api/me', { token }),
    hit('GET /api/notifications/unread', '/api/notifications/unread', { token }),
  ]);
}

const pick = (list) => list[Math.floor(Math.random() * list.length)];
const think = (min, max) => sleep(min + Math.random() * (max - min));
const PRESETS = ['nice-work', 'clean-finish', 'want-to-try', 'keep-going', 'how-long', 'love-colours'];

// ---------- personas ----------
async function watcher(vu, data, until) {
  let lesson = pick(data.lessons);
  let at = 0;
  await pageView('lesson', `/pathways/${lesson.pathwayId}/learn/${lesson.id}`, vu.token);
  while (Date.now() < until) {
    await sleep(15000); // the player saves every 15 seconds while playing
    at += 15;
    const done = at >= 60;
    await hit('POST /api/progress', '/api/progress', {
      method: 'POST', token: vu.token, body: { videoId: lesson.id, stoppedAt: at, completed: done },
    });
    if (done) {
      await hit('POST try', `/api/lessons/${lesson.id}/try`, { method: 'POST', token: vu.token });
      if (Math.random() < 0.3) {
        await hit('POST /api/makes', '/api/makes', {
          method: 'POST', token: vu.token, body: { title: 'Load test make', videoId: lesson.id },
        });
      }
      lesson = pick(data.lessons);
      at = 0;
      await pageView('lesson', `/pathways/${lesson.pathwayId}/learn/${lesson.id}`, vu.token);
    }
  }
}

async function browser(vu, data, until) {
  const pages = [
    ['home', '/'], ['pathways', '/pathways'], ['search', '/pathways?q=python'],
    ['makes', '/makes'], ['leaderboard', '/leaderboard'], ['dashboard', '/dashboard'],
  ];
  while (Date.now() < until) {
    const roll = Math.random();
    if (roll < 0.15) await pageView('profile', `/learners/${pick(data.users)}`, vu.token);
    else if (roll < 0.3) await pageView('make', `/makes/${pick(data.makes)}`, vu.token);
    else {
      const [label, path] = pick(pages);
      await pageView(label, path, vu.token);
    }
    await think(3000, 8000);
  }
}

async function social(vu, data, until) {
  while (Date.now() < until) {
    await pageView('makes', '/makes', vu.token);
    const makeId = pick(data.makes.filter((m) => m !== `load-make-${vu.index}`));
    await pageView('make', `/makes/${makeId}`, vu.token);
    await hit('POST kudos', `/api/makes/${makeId}/kudos`, { method: 'POST', token: vu.token });
    if (Math.random() < 0.5) {
      await hit('POST comment', `/api/makes/${makeId}/comments`, {
        method: 'POST', token: vu.token, body: { preset: pick(PRESETS) },
      });
    }
    if (Math.random() < 0.2) {
      const other = pick(data.users.filter((u) => u !== vu.userId));
      await hit('POST follow', `/api/learners/${other}/follow`, { method: 'POST', token: vu.token });
    }
    if (Math.random() < 0.3) await pageView('notifications', '/notifications', vu.token);
    await think(3000, 6000);
  }
}

// ---------- servers ----------
const servers = [];
function startServers() {
  for (let i = 0; i < INSTANCES; i += 1) {
    const env = {
      ...process.env,
      NODE_ENV: 'production',
      DATABASE_URL: URL_DB,
      NEXT_DIST_DIR: '.next-load',
      NEXTAUTH_URL: `http://localhost:${PORT0 + i}`,
      NEXTAUTH_SECRET: 'load-only-not-secret',
      GOOGLE_CLIENT_ID: 'load',
      GOOGLE_CLIENT_SECRET: 'load',
      PG_POOL_MAX: POOL ? String(POOL) : '',
      // e.g. SERVER_NODE_OPTIONS="--cpu-prof --cpu-prof-dir=/tmp/prof" to profile the servers.
      NODE_OPTIONS: process.env.SERVER_NODE_OPTIONS || '',
    };
    const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT0 + i)], {
      env, stdio: ['ignore', 'pipe', 'pipe'],
    });
    child.errors = [];
    child.stderr.on('data', (d) => child.errors.push(String(d)));
    child.stdout.on('data', (d) => { if (/error|⨯/i.test(String(d))) child.errors.push(String(d)); });
    servers.push(child);
  }
}
async function waitForServers() {
  for (let i = 0; i < INSTANCES; i += 1) {
    for (let tries = 0; tries < 60; tries += 1) {
      try {
        if ((await fetch(`http://localhost:${PORT0 + i}/icon.svg`)).ok) break;
      } catch { /* not up yet */ }
      await sleep(500);
    }
  }
}
// Resident memory of each server and any worker it started.
function serverMemoryMb() {
  return servers.map((s) => {
    try {
      const out = execSync(`ps -o rss= --pid ${s.pid} --ppid ${s.pid}`).toString();
      return out.trim().split(/\s+/).reduce((sum, kb) => sum + Number(kb || 0) / 1024, 0);
    } catch { return 0; }
  });
}

// ---------- run ----------
async function main() {
  if (!args['skip-build'] || !existsSync('.next-load')) {
    console.log('Building into .next-load …');
    execSync('npx next build', {
      env: { ...process.env, NEXT_DIST_DIR: '.next-load', DATABASE_URL: URL_DB }, stdio: 'pipe',
    });
  }
  console.log(`Seeding ${USERS} learners …`);
  const data = await seed({ url: URL_DB, users: USERS });

  startServers();
  await waitForServers();
  console.log(`${INSTANCES} server(s) up on :${PORT0}${INSTANCES > 1 ? `-${PORT0 + INSTANCES - 1}` : ''}${POOL ? `, pool ${POOL}` : ''}`);

  const db = new pg.Client({ connectionString: URL_DB });
  await db.connect();
  let peakConnections = 0;
  let peakMemory = 0;
  const sampler = setInterval(async () => {
    try {
      const { rows } = await db.query("SELECT count(*)::int AS n FROM pg_stat_activity WHERE datname = 'learntube_load'");
      peakConnections = Math.max(peakConnections, rows[0].n);
      peakMemory = Math.max(peakMemory, serverMemoryMb().reduce((a, b) => a + b, 0));
    } catch { /* sampling is best effort */ }
  }, 2000);

  const start = Date.now();
  measureFrom = start + RAMP;
  const until = start + RAMP + HOLD;
  console.log(`Ramping to ${USERS} learners over ${RAMP / 1000}s, then holding ${HOLD / 1000}s …`);
  const runs = data.users.map((userId, index) => (async () => {
    await sleep((index / USERS) * RAMP);
    const vu = { userId, index, token: `load-${index}` };
    const r = index % 10;
    if (r < 5) return watcher(vu, data, until);
    if (r < 8) return browser(vu, data, until);
    return social(vu, data, until);
  })());
  await Promise.all(runs);
  clearInterval(sampler);
  await db.end();

  // ---------- report ----------
  const rows = [];
  let total = 0;
  let failed = 0;
  let limited = 0;
  const holdSeconds = HOLD / 1000;
  const from = measureFrom;
  const measured = [...samples.entries()].sort()
    .map(([label, all]) => [label, all.filter((x) => x.t >= from)])
    .filter(([, s]) => s.length);
  for (const [label, s] of measured) {
    const ms = s.map((x) => x.ms).sort((a, b) => a - b);
    const errors = s.filter((x) => typeof x.status !== 'number' || x.status >= 500).length;
    const tooMany = s.filter((x) => x.status === 429).length;
    total += s.length;
    failed += errors;
    limited += tooMany;
    rows.push({
      endpoint: label,
      requests: s.length,
      'req/s': +(s.length / holdSeconds).toFixed(1),
      p50: Math.round(pct(ms, 50)),
      p95: Math.round(pct(ms, 95)),
      p99: Math.round(pct(ms, 99)),
      max: Math.round(ms[ms.length - 1]),
      errors,
      limited: tooMany,
    });
  }
  const statuses = {};
  measured.forEach(([, s]) => s.forEach((x) => { statuses[x.status] = (statuses[x.status] || 0) + 1; }));
  const serverErrors = servers.flatMap((s) => s.errors).join('').split('\n').filter((l) => /error|⨯|timeout/i.test(l));
  const summary = {
    label: LABEL,
    users: USERS,
    instances: INSTANCES,
    pool: POOL,
    holdSeconds,
    requests: total,
    rps: +(total / holdSeconds).toFixed(1),
    errorRate: total ? +((failed / total) * 100).toFixed(2) : 0,
    rateLimited: limited,
    statuses,
    peakDbConnections: peakConnections,
    peakServerMemoryMb: Math.round(peakMemory),
    serverErrorSample: [...new Set(serverErrors.map((l) => l.trim().slice(0, 200)))].slice(0, 8),
    endpoints: rows,
  };
  console.table(rows);
  console.log(JSON.stringify({ ...summary, endpoints: undefined }, null, 2));
  mkdirSync('tests/load/results', { recursive: true });
  writeFileSync(`tests/load/results/${LABEL}.json`, JSON.stringify(summary, null, 2));

  servers.forEach((s) => s.kill('SIGTERM'));
  await sleep(1000);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  servers.forEach((s) => s.kill('SIGTERM'));
  process.exit(1);
});
