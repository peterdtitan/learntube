import { describe, expect, it } from 'vitest';
import {
  call, makeCourse, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as progress from '../../src/app/api/progress/route.js';
import * as notes from '../../src/app/api/notes/route.js';
import * as tryStep from '../../src/app/api/lessons/[videoId]/try/route.js';
import * as makes from '../../src/app/api/makes/route.js';
import * as me from '../../src/app/api/me/route.js';

async function setup() {
  const course = await makeCourse();
  const user = await makeUser();
  signIn(user);
  return { ...course, user };
}

describe('watch, try, log', () => {
  it('pays 10 + 25 + 40 XP once per lesson, however often it is repeated', async () => {
    const { lessons, user } = await setup();
    const lesson = lessons[0];

    const half = await call(progress.POST, { body: { videoId: lesson.id, stoppedAt: 120 } });
    expect(half.status).toBe(200);
    expect(half.data.xpAwarded).toBe(0);

    const done = await call(progress.POST, { body: { videoId: lesson.id, stoppedAt: 300, completed: true } });
    expect(done.data.xpAwarded).toBe(10);
    const again = await call(progress.POST, { body: { videoId: lesson.id, stoppedAt: 300, completed: true } });
    expect(again.data.xpAwarded).toBe(0);

    const tried = await call(tryStep.POST, { params: { videoId: lesson.id } });
    expect(tried.status).toBe(200);
    expect(tried.data.xpAwarded).toBe(25);
    expect((await call(tryStep.POST, { params: { videoId: lesson.id } })).data.xpAwarded).toBe(0);

    const made = await call(makes.POST, { body: { title: 'Bubbly starter', videoId: lesson.id } });
    expect(made.status).toBe(201);
    expect(made.data.xpAwarded).toBe(40);
    const second = await call(makes.POST, { body: { title: 'Another', videoId: lesson.id } });
    expect(second.data.xpAwarded).toBe(0);

    const summary = await call(me.GET);
    expect(summary.data.xp.total).toBe(75);
    expect(summary.data.doneThisWeek).toBe(1);

    const events = await prisma.xpEvent.findMany({ where: { userId: user.id } });
    expect(events.every((e) => e.skillId === 'cooking')).toBe(true);
  });

  it('remembers where the learner stopped', async () => {
    const { lessons } = await setup();
    await call(progress.POST, { body: { videoId: lessons[1].id, stoppedAt: 95 } });
    const list = await call(progress.GET);
    expect(list.data[0]).toMatchObject({ videoId: lessons[1].id, stoppedAt: 95, completed: false });
  });

  it('records milestones: first make, then 100 XP, then the finished pathway', async () => {
    const { lessons } = await setup();
    const first = await call(makes.POST, { body: { title: 'Loaf', videoId: lessons[0].id } });
    expect(first.data.milestones).toContain('You logged your first make');

    const said = [];
    for (const lesson of lessons) {
      // eslint-disable-next-line no-await-in-loop
      const res = await call(tryStep.POST, { params: { videoId: lesson.id } });
      said.push(...res.data.milestones);
    }
    expect(said).toContain('You reached 100 XP');
    expect(said).toContain('You finished Bake Your First Loaf');
  });

  it('rejects bad input', async () => {
    await setup();
    expect((await call(progress.POST, { body: 'not json' })).status).toBe(400);
    expect((await call(progress.POST, { body: { videoId: 'x' } })).status).toBe(400);
    expect((await call(tryStep.POST, { params: { videoId: 'missing' } })).status).toBe(404);
    expect((await call(makes.POST, { body: { title: '   ' } })).status).toBe(400);
    expect((await call(makes.POST, { body: { title: 'x', videoId: 'missing' } })).status).toBe(404);
  });

  it('progress for a lesson that does not exist is a 4xx, not a crash', async () => {
    await setup();
    const res = await call(progress.POST, { body: { videoId: 'missing', stoppedAt: 3 } });
    expect(res.status).toBeLessThan(500);
  });
});

describe('notes', () => {
  it('saves, updates and caps length', async () => {
    const { lessons } = await setup();
    const videoId = lessons[0].id;
    expect((await call(notes.POST, { body: { videoId, content: 'first' } })).status).toBe(200);
    await call(notes.POST, { body: { videoId, content: 'second' } });
    const read = await call(notes.GET, { query: `?videoId=${videoId}` });
    expect(read.data.content).toBe('second');
    const huge = await call(notes.POST, { body: { videoId, content: 'x'.repeat(20001) } });
    expect(huge.status).toBe(400);
  });
});
