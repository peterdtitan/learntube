import prisma from './prismadb';

// Per learner and action: at most `max` requests in each `windowSeconds` window. Set well
// above what someone learning ever does; they're there to stop scripts and runaway clients.
export const LIMITS = {
  progress: { max: 300, windowSeconds: 600 }, // the player saves every 15s, and on pause
  note: { max: 300, windowSeconds: 600 }, // autosave while typing
  try: { max: 60, windowSeconds: 600 },
  upload: { max: 20, windowSeconds: 3600 },
  make: { max: 20, windowSeconds: 3600 },
  comment: { max: 40, windowSeconds: 600 },
  reaction: { max: 120, windowSeconds: 600 }, // kudos and cheers, on and off
  follow: { max: 60, windowSeconds: 600 },
  report: { max: 20, windowSeconds: 86400 },
  settings: { max: 30, windowSeconds: 600 },
  deleteAccount: { max: 5, windowSeconds: 3600 },
  videoCheck: { max: 120, windowSeconds: 600 },
  quizStart: { max: 30, windowSeconds: 600 },
  quizEvents: { max: 600, windowSeconds: 600 }, // sent as they happen during a checkpoint
  quizSubmit: { max: 60, windowSeconds: 600 },
  quizDraft: { max: 30, windowSeconds: 3600 }, // AI drafts cost money
};

// Windows line up with the clock, so every request in one window shares a row.
export function windowFor(now, windowSeconds) {
  const size = windowSeconds * 1000;
  const start = Math.floor(now.getTime() / size) * size;
  const retryAfter = Math.max(1, Math.ceil((start + size - now.getTime()) / 1000));
  return { start: new Date(start), retryAfter };
}

export function waitMessage(seconds) {
  if (seconds < 90) return 'You’re going a bit fast. Try again in a minute.';
  if (seconds < 5400) return `You’re going a bit fast. Try again in ${Math.ceil(seconds / 60)} minutes.`;
  return `You’ve hit today’s limit. Try again in ${Math.ceil(seconds / 3600)} hours.`;
}

async function count(key, windowStart) {
  const rows = await prisma.$queryRaw`
    INSERT INTO "RateLimit" ("key", "windowStart", "count") VALUES (${key}, ${windowStart}, 1)
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "RateLimit"."windowStart" = EXCLUDED."windowStart"
        THEN "RateLimit"."count" + 1 ELSE 1 END,
      "windowStart" = EXCLUDED."windowStart"
    RETURNING "count"`;
  return Number(rows[0].count);
}

// Returns a 429 response once the learner is over the limit, otherwise null:
//   const limited = await rateLimit('comment', userId);
//   if (limited) return limited;
export async function rateLimit(action, userId, now = new Date()) {
  const limit = LIMITS[action];
  if (!limit) throw new Error(`No rate limit named ${action}`);
  const { start, retryAfter } = windowFor(now, limit.windowSeconds);

  let used;
  try {
    used = await count(`${action}:${userId}`, start);
    // Expired rows are only reset when reused, so sweep old ones now and then.
    if (Math.random() < 0.01) {
      const old = new Date(now.getTime() - 2 * 86400000);
      await prisma.rateLimit.deleteMany({ where: { windowStart: { lt: old } } });
    }
  } catch (err) {
    // A broken counter shouldn't take the feature down with it.
    console.error('rate limit check failed', err); // eslint-disable-line no-console
    return null;
  }
  if (used <= limit.max) return null;

  return Response.json(
    { error: waitMessage(retryAfter), retryAfter },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } },
  );
}
