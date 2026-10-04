import { describe, expect, it } from 'vitest';
import {
  call, formData, makeCourse, makeUser, prisma, signIn,
} from './helpers.mjs';
import * as quizRoute from '../../src/app/api/quizzes/[quizId]/route.js';
import * as attempts from '../../src/app/api/quizzes/[quizId]/attempts/route.js';
import * as events from '../../src/app/api/attempts/[attemptId]/events/route.js';
import * as submit from '../../src/app/api/attempts/[attemptId]/submit/route.js';
import * as game from '../../src/app/api/modules/[unitId]/game/route.js';
import * as actions from '../../src/app/admin/quizzes/actions.js';
import { getPathwayOutline } from '../../src/lib/outline.js';

const TF = (answer, prompt = `Statement ${answer}`) => ({ type: 'TRUE_FALSE', prompt, data: { answer } });

async function makeQuiz(where, questions, extra = {}) {
  return prisma.quiz.create({
    data: {
      published: true,
      ...where,
      ...extra,
      questions: { create: questions.map((q, order) => ({ ...q, order })) },
    },
    include: { questions: { orderBy: { order: 'asc' } } },
  });
}

async function start(quizId) {
  return call(attempts.POST, { params: { quizId } });
}

describe('lesson quick checks', () => {
  it('hides answers, grades on the server and pays XP once', async () => {
    const { lessons } = await makeCourse();
    const quiz = await makeQuiz({ kind: 'LESSON_CHECK', videoId: lessons[0].id }, [
      TF(true), { type: 'SINGLE', prompt: 'Pick', data: { options: ['a', 'b'], answer: 1 } },
    ]);
    signIn(await makeUser());

    const started = await start(quiz.id);
    expect(started.status).toBe(201);
    expect(JSON.stringify(started.data.questions)).not.toMatch(/"answer"/);
    const attemptId = started.data.open.id;
    const [q1, q2] = quiz.questions;

    const first = await call(submit.POST, { params: { attemptId }, body: { answers: { [q1.id]: true, [q2.id]: 1 } } });
    expect(first.data.result).toMatchObject({ finalScore: 100, passed: true });
    expect(first.data.xpAwarded).toBe(15);

    // Submitting the same attempt again changes nothing.
    const again = await call(submit.POST, { params: { attemptId }, body: { answers: {} } });
    expect(again.data.result.finalScore).toBe(100);
    expect(again.data.xpAwarded).toBe(0);

    // A second pass doesn't pay again.
    const retry = await start(quiz.id);
    const second = await call(submit.POST, {
      params: { attemptId: retry.data.open.id },
      body: { answers: { [q1.id]: true, [q2.id]: 1 } },
    });
    expect(second.data.xpAwarded).toBe(0);
    expect(await prisma.xpEvent.count({ where: { kind: 'QUIZ' } })).toBe(1);
  });

  it('keeps unpublished quizzes from learners', async () => {
    const { lessons } = await makeCourse();
    const quiz = await makeQuiz({ kind: 'LESSON_CHECK', videoId: lessons[0].id }, [TF(true)], { published: false });
    signIn(await makeUser());
    expect((await call(quizRoute.GET, { params: { quizId: quiz.id } })).status).toBe(404);
    expect((await start(quiz.id)).status).toBe(404);
    signIn(await makeUser({ admin: true }));
    expect((await call(quizRoute.GET, { params: { quizId: quiz.id } })).status).toBe(200);
  });

  it('won’t let one learner submit another’s attempt', async () => {
    const { lessons } = await makeCourse();
    const quiz = await makeQuiz({ kind: 'LESSON_CHECK', videoId: lessons[0].id }, [TF(true)]);
    signIn(await makeUser());
    const attemptId = (await start(quiz.id)).data.open.id;
    signIn(await makeUser());
    expect((await call(submit.POST, { params: { attemptId }, body: { answers: {} } })).status).toBe(404);
    expect((await call(events.POST, { params: { attemptId }, body: { events: [] } })).status).toBe(404);
  });

  it('pays XP once even when the same attempt is submitted twice at once', async () => {
    const { lessons } = await makeCourse();
    const quiz = await makeQuiz({ kind: 'LESSON_CHECK', videoId: lessons[0].id }, [TF(true)]);
    signIn(await makeUser());
    const attemptId = (await start(quiz.id)).data.open.id;
    const body = { answers: { [quiz.questions[0].id]: true } };
    const results = await Promise.all(Array.from(
      { length: 6 },
      () => call(submit.POST, { params: { attemptId }, body }),
    ));
    expect(results.every((r) => r.status === 200)).toBe(true);
    expect(results.reduce((sum, r) => sum + r.data.xpAwarded, 0)).toBe(15);
  });
});

describe('timed checkpoints', () => {
  async function checkpoint(extra = {}) {
    const { bread } = await makeCourse();
    const unit = bread.units[0];
    const quiz = await makeQuiz({ kind: 'CHECKPOINT', unitId: unit.id }, [TF(true), TF(false), TF(true), TF(false)], {
      timeLimitSec: 600, ...extra,
    });
    return { quiz, unit };
  }

  it('gives the time limit, or 1.5× with extra time on', async () => {
    const { quiz } = await checkpoint();
    signIn(await makeUser());
    expect((await start(quiz.id)).data.open.secondsLeft).toBeGreaterThan(595);
    signIn(await makeUser({ extraQuizTime: true }));
    const extra = (await start(quiz.id)).data.open.secondsLeft;
    expect(extra).toBeGreaterThan(895);
    expect(extra).toBeLessThanOrEqual(900);
  });

  it('resumes the same attempt instead of restarting the clock', async () => {
    const { quiz } = await checkpoint();
    signIn(await makeUser());
    const a = (await start(quiz.id)).data.open.id;
    const b = (await start(quiz.id)).data.open.id;
    expect(a).toBe(b);
  });

  it('records leaving, copying and pasting, takes time off the clock and points off the score', async () => {
    const { quiz } = await checkpoint();
    signIn(await makeUser());
    const attemptId = (await start(quiz.id)).data.open.id;
    const log = [
      { type: 'leave', seconds: 25, at: 5000 },
      { type: 'copy', text: 'Statement true', at: 9000 },
    ];
    const live = await call(events.POST, { params: { attemptId }, body: { events: log } });
    expect(live.data.leaveCount).toBe(1);
    expect(live.data.secondsLeft).toBeLessThanOrEqual(575);

    // A shorter log can't erase what was recorded.
    await call(events.POST, { params: { attemptId }, body: { events: [] } });

    const answers = Object.fromEntries(quiz.questions.map((q) => [q.id, q.data.answer]));
    const done = await call(submit.POST, {
      params: { attemptId },
      body: { answers, events: [...log, { type: 'paste', text: 'answer', at: 12000 }] },
    });
    const { result } = done.data;
    // 3 (leave) + 2 (20 s away) + 2 (copy) + 2 (paste)
    expect(result).toMatchObject({
      score: 100, penalty: 9, finalScore: 91, passed: true,
    });
    expect(result.integrity).toMatchObject({
      leaveCount: 1, awaySeconds: 25, copyCount: 1, pasteCount: 1,
    });
    expect(result.integrity.events.find((e) => e.type === 'copy').text).toBe('Statement true');
    expect(result.results.penalties.map((p) => p.reason)).toEqual(['Leaving the quiz', 'Time away (per 10 seconds)', 'Copying', 'Pasting']);
  });

  it('deducts for submitting long after time ran out', async () => {
    const { quiz } = await checkpoint();
    signIn(await makeUser());
    const attemptId = (await start(quiz.id)).data.open.id;
    await prisma.quizAttempt.update({ where: { id: attemptId }, data: { deadlineAt: new Date(Date.now() - 120000) } });
    const done = await call(submit.POST, { params: { attemptId }, body: { answers: {} } });
    expect(done.data.result.results.late).toBe(true);
    expect(done.data.result.penalty).toBe(10);
  });

  it('asks for a short break between attempts, then allows a retake', async () => {
    const { quiz } = await checkpoint();
    signIn(await makeUser());
    const attemptId = (await start(quiz.id)).data.open.id;
    await call(submit.POST, { params: { attemptId }, body: { answers: {} } });
    const blocked = await start(quiz.id);
    expect(blocked.status).toBe(429);
    expect(blocked.data.error).toMatch(/retake this in 5 minutes/);

    await prisma.quizAttempt.update({
      where: { id: attemptId },
      data: { submittedAt: new Date(Date.now() - 6 * 60000) },
    });
    expect((await start(quiz.id)).status).toBe(201);
  });
});

describe('module games', () => {
  it('use the module’s quick-check questions plus their own, never the checkpoint’s', async () => {
    const { bread } = await makeCourse();
    const unit = bread.units[0];
    await makeQuiz({ kind: 'LESSON_CHECK', videoId: unit.videos[0].id }, [TF(true, 'From lesson one')]);
    await makeQuiz({ kind: 'CHECKPOINT', unitId: unit.id }, [TF(true, 'Checkpoint secret')], { timeLimitSec: 300 });
    const g = await makeQuiz({ kind: 'MODULE_GAME', unitId: unit.id }, [TF(false, 'Game own')]);

    const res = await call(game.GET, { params: { unitId: unit.id } });
    const prompts = res.data.questions.map((q) => q.prompt).sort();
    expect(prompts).toEqual(['From lesson one', 'Game own']);

    signIn(await makeUser());
    const attemptId = (await start(g.id)).data.open.id;
    const answers = Object.fromEntries(res.data.questions.map((q) => [q.id, q.data.answer]));
    const done = await call(submit.POST, { params: { attemptId }, body: { answers } });
    expect(done.data.result.finalScore).toBe(100);
    expect(done.data.xpAwarded).toBe(30);
  });
});

describe('pathway outline', () => {
  it('places the checkpoint halfway, adds the game and estimates time', async () => {
    const { bread } = await makeCourse();
    const unit = bread.units[0];
    await makeQuiz({ kind: 'CHECKPOINT', unitId: unit.id }, [TF(true)], { timeLimitSec: 600 });
    await makeQuiz({ kind: 'MODULE_GAME', unitId: unit.id }, [TF(true)]);
    const outline = await getPathwayOutline(bread.id, null);
    const week1 = outline.modules[0];
    expect(week1.checkpointAfter).toBe(0); // 2 lessons: after the first
    expect(week1.game).not.toBeNull();
    // 9 min video + 8 + 6 practice (1.5× each video, rounded) + 10 checkpoint + 5 game
    expect(week1.minutes).toBe(38);
    expect(outline.estimate.total).toBe(week1.minutes + outline.modules[1].minutes);
    expect(outline.estimate.fun.label).toMatch(/\d+ /);
  });
});

describe('admin quiz tools', () => {
  async function redirectOf(promise) {
    try {
      await promise;
    } catch (err) {
      if (err.redirectTo) return err.redirectTo;
      throw err;
    }
    return null;
  }

  it('create one quiz per lesson, validate questions, and refuse to publish an empty quiz', async () => {
    const { lessons } = await makeCourse();
    signIn(await makeUser({ admin: true }));
    const form = formData({ kind: 'LESSON_CHECK', videoId: lessons[0].id });
    const first = await redirectOf(actions.createQuiz(form));
    const second = await redirectOf(actions.createQuiz(formData({ kind: 'LESSON_CHECK', videoId: lessons[0].id })));
    expect(first).toBe(second);
    const quizId = first.split('/').pop();

    const empty = await actions.saveQuizSettings(null, formData({ id: quizId, published: 'on', passPercent: '70' }));
    expect(empty.error).toMatch(/at least one question/);

    const bad = await actions.saveQuestion(null, formData({
      quizId, type: 'SINGLE', prompt: 'Q', data: JSON.stringify({ options: ['a'], answer: 0 }),
    }));
    expect(bad.error).toMatch(/two options/);
    const ok = await actions.saveQuestion(null, formData({
      quizId, type: 'ORDER', prompt: 'Order these', data: JSON.stringify({ items: ['Mix', 'Knead', 'Bake'] }),
    }));
    expect(ok.ok).toBe('Question added.');
    expect((await actions.saveQuizSettings(null, formData({ id: quizId, published: 'on', passPercent: '80' }))).ok).toMatch(/Learners can see it/);
    expect(await prisma.quiz.findUnique({ where: { id: quizId } })).toMatchObject({ published: true, passPercent: 80 });
  });

  it('refuse learners', async () => {
    const { lessons } = await makeCourse();
    signIn(await makeUser());
    await expect(actions.createQuiz(formData({ kind: 'LESSON_CHECK', videoId: lessons[0].id }))).rejects.toThrow('Admins only.');
  });

  it('explain what AI drafts need instead of failing', async () => {
    const { lessons } = await makeCourse();
    signIn(await makeUser({ admin: true }));
    const quiz = await makeQuiz({ kind: 'LESSON_CHECK', videoId: lessons[0].id }, []);
    const before = process.env.ANTHROPIC_API_KEY;
    process.env.ANTHROPIC_API_KEY = 'test-key';
    const res = await actions.draftWithAi(null, formData({ quizId: quiz.id, count: '3' }));
    expect(res.error).toMatch(/transcript/);
    if (before === undefined) delete process.env.ANTHROPIC_API_KEY;
    else process.env.ANTHROPIC_API_KEY = before;
  });
});
