import {
  afterEach, beforeEach, describe, expect, it,
} from 'vitest';
import {
  call, makeCourse, makeUser, prisma, signIn,
} from './helpers.mjs';
import { planReminders, sendReminders } from '../../src/lib/email/reminders.js';
import { unsubscribeToken } from '../../src/lib/email/unsubscribe.js';
import { runRetention } from '../../src/lib/retention.js';
import { exportUserData } from '../../src/lib/account.js';
import { POST as oneClick } from '../../src/app/api/email/unsubscribe/route.js';
import unsubscribe from '../../src/app/email/unsubscribe/actions.js';
import { PATCH as patchMe } from '../../src/app/api/me/route.js';
import { GET as cron } from '../../src/app/api/cron/reminders/route.js';

// Thursday 15 October 2026, 17:00 in Lagos.
const NOW = new Date('2026-10-15T16:00:00Z');
const DAY = 86400000;

// A learner who did a Try step yesterday and hasn't logged what they made.
async function triedYesterday(overrides = {}) {
  const { lessons } = await makeCourse();
  const user = await makeUser({ timeZone: 'Africa/Lagos', ...overrides });
  const triedAt = new Date(NOW - DAY);
  await prisma.videoProgress.create({
    data: {
      userId: user.id, videoId: lessons[0].id, stoppedAt: 0, triedAt, watchedAt: triedAt,
    },
  });
  await prisma.xpEvent.create({
    data: {
      userId: user.id, kind: 'TRY', amount: 25, sourceKey: `try:${lessons[0].id}`, createdAt: triedAt,
    },
  });
  return { user, lesson: lessons[0] };
}

function resend({ fail = false } = {}) {
  const sent = [];
  const fetchImpl = async (url, init) => {
    const body = JSON.parse(init.body);
    sent.push(...body);
    if (fail) return { ok: false, status: 500, json: async () => ({ message: 'Resend is down' }) };
    return { ok: true, json: async () => ({ data: body.map((_, i) => ({ id: `re_${sent.length}_${i}` })) }) };
  };
  return { sent, fetchImpl };
}

describe('reminder emails', () => {
  beforeEach(() => { process.env.RESEND_API_KEY = 're_test'; });
  afterEach(() => { delete process.env.RESEND_API_KEY; });

  it('asks a learner to log what they made, once', async () => {
    const { user, lesson } = await triedYesterday();
    const { sent, fetchImpl } = resend();
    const report = await sendReminders(NOW, { fetchImpl });
    expect(report).toMatchObject({
      considered: 1, due: 1, sent: 1, failed: 0, dryRun: false, byKind: { LOG_MAKE: 1 },
    });
    expect(sent[0].to).toEqual([user.email]);
    expect(sent[0].subject).toBe(`You tried “${lesson.title}”. Log what you made for +40 XP`);
    expect(sent[0].headers['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click');
    const [log] = await prisma.emailLog.findMany({ where: { userId: user.id } });
    expect(log).toMatchObject({ kind: 'LOG_MAKE', key: lesson.id, providerId: 're_1_0' });

    // Running again, even hours later, sends nothing more.
    expect(await sendReminders(new Date(NOW.getTime() + 3 * 3600000), { fetchImpl })).toMatchObject({ due: 0, sent: 0 });
    expect(sent).toHaveLength(1);
  });

  it('tries again tomorrow when sending fails', async () => {
    const { user } = await triedYesterday();
    const report = await sendReminders(NOW, resend({ fail: true }));
    expect(report).toMatchObject({ sent: 0, failed: 1, error: 'Resend is down' });
    expect(await prisma.emailLog.count({ where: { userId: user.id } })).toBe(0);
  });

  it('skips learners who switched reminders off, logged their make, or have no email', async () => {
    await triedYesterday({ emailReminders: false });
    await triedYesterday({ email: null });
    const { user, lesson } = await triedYesterday();
    await prisma.make.create({ data: { userId: user.id, videoId: lesson.id, title: 'My swatch' } });
    expect((await planReminders(NOW)).plan).toEqual([]);
  });

  it('stops at the daily limit', async () => {
    process.env.EMAIL_DAILY_LIMIT = '1';
    try {
      await triedYesterday();
      await triedYesterday();
      expect(await sendReminders(NOW, resend())).toMatchObject({ due: 2, sent: 1, skippedOverLimit: 1 });
    } finally {
      delete process.env.EMAIL_DAILY_LIMIT;
    }
  });

  it('only reports what it would send without an API key', async () => {
    delete process.env.RESEND_API_KEY;
    await triedYesterday();
    const { sent, fetchImpl } = resend();
    expect(await sendReminders(NOW, { fetchImpl })).toMatchObject({ dryRun: true, due: 1, sent: 0 });
    expect(sent).toEqual([]);
    expect(await prisma.emailLog.count()).toBe(0);
  });

  it('runs from Vercel Cron only with the secret', async () => {
    process.env.CRON_SECRET = 'cron-test';
    try {
      expect((await cron(new Request('http://test.local/api/cron/reminders'))).status).toBe(401);
      const ok = await cron(new Request('http://test.local/api/cron/reminders', { headers: { authorization: 'Bearer cron-test' } }));
      expect(ok.status).toBe(200);
    } finally {
      delete process.env.CRON_SECRET;
    }
  });
});

describe('choosing emails', () => {
  it('can be changed in settings', async () => {
    const user = await makeUser();
    signIn(user);
    expect((await call(patchMe, { body: { emailReminders: false } })).status).toBe(200);
    expect((await call(patchMe, { body: { emailWeekly: 'no' } })).status).toBe(400);
    expect(await prisma.user.findUnique({ where: { id: user.id } }))
      .toMatchObject({ emailReminders: false, emailWeekly: true });
  });

  it('can be stopped from a mail app’s one-click button, without signing in', async () => {
    const user = await makeUser();
    const res = await call(oneClick, { query: `/email/unsubscribe?t=${encodeURIComponent(unsubscribeToken(user.id, 'weekly'))}` });
    expect(res).toMatchObject({ status: 200, data: { unsubscribed: 'weekly' } });
    expect(await prisma.user.findUnique({ where: { id: user.id } }))
      .toMatchObject({ emailReminders: true, emailWeekly: false });
    expect((await call(oneClick, { query: '/email/unsubscribe?t=forged.token' })).status).toBe(400);
  });

  it('can be stopped from the link in an email, after confirming', async () => {
    const user = await makeUser();
    const token = unsubscribeToken(user.id, 'all');
    const form = new FormData();
    form.set('t', token);
    await expect(unsubscribe(form)).rejects.toMatchObject({ redirectTo: `/email/unsubscribe?t=${encodeURIComponent(token)}&done=1` });
    expect(await prisma.user.findUnique({ where: { id: user.id } }))
      .toMatchObject({ emailReminders: false, emailWeekly: false });
  });

  it('are in the data export, and their log is cleared after 180 days', async () => {
    const user = await makeUser();
    await prisma.emailLog.createMany({
      data: [
        {
          userId: user.id, kind: 'COME_BACK', key: 'old', createdAt: new Date(NOW - 200 * DAY),
        },
        {
          userId: user.id, kind: 'LOG_MAKE', key: 'new', createdAt: new Date(NOW - DAY),
        },
      ],
    });
    const data = await exportUserData(user.id, NOW);
    expect(data.account).toMatchObject({ emailReminders: true, emailWeekly: true });
    expect(data.emailsSent.map((e) => e.kind)).toEqual(['COME_BACK', 'LOG_MAKE']);
    expect(await runRetention(NOW)).toMatchObject({ oldEmailLogs: 1 });
    expect(await prisma.emailLog.count()).toBe(1);
  });
});
