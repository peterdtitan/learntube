import { describe, expect, it } from 'vitest';
import {
  call, makeCourse, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as follow from '../../src/app/api/learners/[userId]/follow/route.js';
import * as kudos from '../../src/app/api/makes/[makeId]/kudos/route.js';
import * as comments from '../../src/app/api/makes/[makeId]/comments/route.js';
import * as progress from '../../src/app/api/progress/route.js';
import * as tryStep from '../../src/app/api/lessons/[videoId]/try/route.js';
import * as makes from '../../src/app/api/makes/route.js';
import { LIMITS } from '../../src/lib/rateLimit.js';

describe('rate limits', () => {
  it('turns away the request after the limit with Retry-After, per learner', async () => {
    const [ada, bola, target] = await Promise.all([makeUser(), makeUser(), makeUser()]);
    signIn(ada);
    for (let i = 0; i < LIMITS.make.max; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      expect((await call(makes.POST, { body: { title: `M${i}` } })).status).toBe(201);
    }
    const over = await call(makes.POST, { body: { title: 'one too many' } });
    expect(over.status).toBe(429);
    expect(Number(over.headers.get('Retry-After'))).toBeGreaterThan(0);
    expect(over.data.error).toMatch(/Try again/);

    // Someone else isn't affected, and neither is a different action.
    signIn(bola);
    expect((await call(makes.POST, { body: { title: 'mine' } })).status).toBe(201);
    signIn(ada);
    expect((await call(follow.POST, { params: { userId: target.id } })).status).toBe(200);
  });
});

// Double taps, flaky networks retrying and several tabs all send the same request at once.
describe('the same request many times at once', () => {
  const statuses = (results) => results.map((r) => r.status);

  it('kudos: no errors and one kudos', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const make = await prisma.make.create({ data: { userId: bola.id, title: 'x' } });
    signIn(ada);
    const results = await Promise.all(Array.from({ length: 15 }, () => call(kudos.POST, {
      params: { makeId: make.id },
    })));
    expect(statuses(results).every((s) => s === 200)).toBe(true);
    expect(await prisma.kudos.count()).toBe(1);
    expect(await prisma.notification.count()).toBe(1);
  });

  it('follow: no errors and one follow', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    signIn(ada);
    const results = await Promise.all(Array.from({ length: 15 }, () => call(follow.POST, {
      params: { userId: bola.id },
    })));
    expect(statuses(results).every((s) => s === 200)).toBe(true);
    expect(await prisma.follow.count()).toBe(1);
  });

  it('the same comment: no errors and one comment', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const make = await prisma.make.create({ data: { userId: bola.id, title: 'x' } });
    signIn(ada);
    const results = await Promise.all(Array.from({ length: 10 }, () => call(comments.POST, {
      params: { makeId: make.id }, body: { preset: 'nice-work' },
    })));
    expect(statuses(results).every((s) => s === 201)).toBe(true);
    expect(await prisma.makeComment.count()).toBe(1);
  });

  it('progress and try: no errors and XP paid once', async () => {
    const { lessons } = await makeCourse();
    const user = await makeUser();
    signIn(user);
    const videoId = lessons[0].id;
    const results = await Promise.all([
      ...Array.from({ length: 10 }, () => call(progress.POST, { body: { videoId, stoppedAt: 300, completed: true } })),
      ...Array.from({ length: 10 }, () => call(tryStep.POST, { params: { videoId } })),
    ]);
    expect(statuses(results).every((s) => s === 200)).toBe(true);
    const xp = await prisma.xpEvent.aggregate({ where: { userId: user.id }, _sum: { amount: true } });
    expect(xp._sum.amount).toBe(35);
    expect(await prisma.videoProgress.count()).toBe(1);
  });

  it('rate limit counter stays exact under a burst', async () => {
    const [ada, bola] = await Promise.all([makeUser(), makeUser()]);
    const make = await prisma.make.create({ data: { userId: bola.id, title: 'x' } });
    signIn(ada);
    const n = LIMITS.reaction.max + 10;
    const results = await Promise.all(Array.from({ length: n }, () => call(kudos.POST, {
      params: { makeId: make.id },
    })));
    const s = statuses(results);
    expect(s.filter((x) => x === 429)).toHaveLength(10);
    expect(s.filter((x) => x >= 500)).toHaveLength(0);
  });
});
