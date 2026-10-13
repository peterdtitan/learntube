import {
  afterEach, describe, expect, it,
} from 'vitest';
import {
  call, makeCourse, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as exportRoute from '../../src/app/api/me/export/route.js';
import * as cron from '../../src/app/api/cron/retention/route.js';
import { runRetention } from '../../src/lib/retention.js';
import { authOptions } from '../../src/lib/auth.js';

const DAY = 86400000;

describe('downloading your data', () => {
  it('needs a signed-in learner', async () => {
    signIn(null);
    expect((await call(exportRoute.GET)).status).toBe(401);
  });

  it('is a file with the learner’s own data, and other people only by public name', async () => {
    const { bread } = await makeCourse();
    const lesson = bread.units[0].videos[0];
    const ada = await makeUser({ name: 'Ada Lovelace', displayName: 'Ada' });
    const bola = await makeUser({ name: 'Bola Ade Secret' });
    await prisma.note.create({ data: { userId: ada.id, videoId: lesson.id, content: 'Feed twice a day' } });
    await prisma.note.create({ data: { userId: bola.id, videoId: lesson.id, content: 'Bola’s private note' } });
    const make = await prisma.make.create({ data: { userId: bola.id, title: 'Plaited loaf' } });
    await prisma.kudos.create({ data: { userId: ada.id, makeId: make.id } });
    await prisma.follow.create({ data: { followerId: ada.id, followingId: bola.id } });

    signIn(ada);
    const res = await call(exportRoute.GET);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-disposition')).toMatch(/^attachment; filename="skillreps-data-\d{4}-\d{2}-\d{2}\.json"$/);
    expect(res.headers.get('cache-control')).toBe('no-store');
    expect(res.data.account).toMatchObject({ email: ada.email, displayName: 'Ada' });
    expect(res.data.notes).toEqual([expect.objectContaining({ lesson: 'Feeding a starter', note: 'Feed twice a day' })]);
    expect(res.data.kudosGiven).toEqual([expect.objectContaining({ make: 'Plaited loaf' })]);
    expect(res.data.following).toEqual([expect.objectContaining({ learner: 'Bola S.' })]);
    const text = JSON.stringify(res.data);
    expect(text).not.toContain('Bola’s private note');
    expect(text).not.toContain(bola.email);
    expect(text).not.toContain('Bola Ade Secret');
  });
});

describe('the daily retention job', () => {
  afterEach(() => { delete process.env.CRON_SECRET; });

  it('only runs with the cron secret, and never when none is set', async () => {
    const run = (auth) => cron.GET(new Request('http://test.local/api/cron/retention', { headers: auth ? { authorization: auth } : {} }));
    expect((await run('Bearer anything')).status).toBe(401);
    process.env.CRON_SECRET = 's3cret';
    expect((await run()).status).toBe(401);
    expect((await run('Bearer wrong')).status).toBe(401);
    expect((await run('Bearer s3cret')).status).toBe(200);
  });

  it('clears old copied text, expired sessions, Google tokens and old housekeeping rows', async () => {
    const now = new Date();
    const { bread } = await makeCourse();
    const user = await makeUser();
    const quiz = await prisma.quiz.create({ data: { kind: 'CHECKPOINT', unitId: bread.units[0].id } });
    const events = [{ type: 'copy', at: 3, text: 'the answer' }, { type: 'leave', at: 9, seconds: 4 }];
    const old = await prisma.quizAttempt.create({
      data: {
        quizId: quiz.id, userId: user.id, startedAt: new Date(now - 91 * DAY), events, copyCount: 1,
      },
    });
    const recent = await prisma.quizAttempt.create({
      data: {
        quizId: quiz.id, userId: user.id, startedAt: new Date(now - 10 * DAY), events,
      },
    });
    await prisma.session.create({ data: { sessionToken: 'gone', userId: user.id, expires: new Date(now - DAY) } });
    await prisma.session.create({ data: { sessionToken: 'live', userId: user.id, expires: new Date(now.getTime() + DAY) } });
    await prisma.account.create({
      data: {
        userId: user.id, type: 'oauth', provider: 'google', providerAccountId: '1', access_token: 'a', id_token: 'i',
      },
    });
    await prisma.rateLimit.create({ data: { key: 'old', windowStart: new Date(now - 3 * DAY), count: 1 } });
    await prisma.rateLimit.create({ data: { key: 'new', windowStart: now, count: 1 } });

    const result = await runRetention(now);
    expect(result).toMatchObject({
      checkpointCopyTextCleared: 1, expiredSessions: 1, googleTokensCleared: 1, oldRateLimits: 1,
    });
    const trimmed = await prisma.quizAttempt.findUnique({ where: { id: old.id } });
    expect(trimmed.events).toEqual([{ type: 'copy', at: 3 }, { type: 'leave', at: 9, seconds: 4 }]);
    expect(trimmed.copyCount).toBe(1);
    expect((await prisma.quizAttempt.findUnique({ where: { id: recent.id } })).events).toEqual(events);
    expect((await prisma.session.findMany()).map((s) => s.sessionToken)).toEqual(['live']);
    expect(await prisma.account.findFirst()).toMatchObject({ access_token: null, id_token: null });
    expect((await prisma.rateLimit.findMany()).map((r) => r.key)).toEqual(['new']);

    // Running it again changes nothing.
    expect(await runRetention(now)).toMatchObject({ checkpointCopyTextCleared: 0, expiredSessions: 0 });
  });
});

describe('signing in with Google', () => {
  it('keeps the link to the Google account but not Google’s tokens', async () => {
    const user = await makeUser();
    await authOptions.adapter.linkAccount({
      userId: user.id,
      type: 'oauth',
      provider: 'google',
      providerAccountId: '42',
      access_token: 'access',
      refresh_token: 'refresh',
      id_token: 'id',
      expires_at: 1,
      token_type: 'bearer',
      scope: 'openid email profile',
    });
    expect(await prisma.account.findFirst({ where: { userId: user.id } })).toMatchObject({
      provider: 'google', providerAccountId: '42', access_token: null, refresh_token: null, id_token: null,
    });
  });
});
