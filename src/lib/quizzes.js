import prisma from './prismadb';
import {
  cleanEvents, gradeQuiz, integrityPenalty, publicQuestion, secondsLeft, summarizeEvents,
} from './quizGrade';
import { lessonContext, pathwayContext, reward } from './rewards';
import { QUIZ_XP } from './xpValues';

export const DEFAULT_CHECKPOINT_SECONDS = 600;
export const EXTRA_TIME = 1.5;
export const RETAKE_COOLDOWN_MS = 5 * 60 * 1000;
// Network delay and the final auto-submit can land a little after zero.
const LATE_GRACE_MS = 20 * 1000;
const LATE_PENALTY = 10;

const QUESTION_ORDER = { orderBy: { order: 'asc' } };

// For games: the module's lesson-check questions plus the game's own, with answers
// (games give instant feedback). Checkpoint questions are never included.
export async function getGameQuestions(unitId) {
  const quizzes = await prisma.quiz.findMany({
    where: {
      published: true,
      OR: [{ unitId, kind: 'MODULE_GAME' }, { kind: 'LESSON_CHECK', video: { unitId } }],
    },
    include: { questions: QUESTION_ORDER },
  });
  return quizzes.flatMap((quiz) => quiz.questions.map((q) => ({
    id: q.id, type: q.type, prompt: q.prompt, data: q.data, explanation: q.explanation,
  })));
}

// The pathway a quiz belongs to, via its lesson or its module.
async function quizPathwayId(quiz) {
  if (quiz.unitId) {
    const unit = await prisma.unit.findUnique({
      where: { id: quiz.unitId }, select: { pathwayId: true },
    });
    return unit?.pathwayId || null;
  }
  if (quiz.videoId) return (await lessonContext(quiz.videoId)).pathwayId || null;
  return null;
}

function attemptView(attempt, quiz) {
  if (!attempt) return null;
  return {
    id: attempt.id,
    startedAt: attempt.startedAt,
    submittedAt: attempt.submittedAt,
    secondsLeft: attempt.submittedAt ? null : secondsLeft({
      deadlineAt: attempt.deadlineAt,
      awaySeconds: attempt.awaySeconds,
      timePenalty: quiz.timePenalty,
    }),
    score: attempt.score,
    penalty: attempt.penalty,
    finalScore: attempt.finalScore,
    passed: attempt.passed,
    results: attempt.results,
    integrity: attempt.submittedAt ? {
      leaveCount: attempt.leaveCount,
      awaySeconds: attempt.awaySeconds,
      copyCount: attempt.copyCount,
      pasteCount: attempt.pasteCount,
      events: attempt.events || [],
    } : null,
  };
}

// The quiz as a learner sees it: questions without answers, their open attempt if any,
// and their best finished one. Unpublished quizzes are for admins only.
export async function getQuizForLearner(quizId, userId, { isAdmin = false } = {}) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: QUESTION_ORDER,
      unit: { select: { title: true, pathwayId: true } },
      video: { select: { title: true } },
    },
  });
  if (!quiz || (!quiz.published && !isAdmin)) return null;

  const attempts = userId
    ? await prisma.quizAttempt.findMany({ where: { quizId, userId }, orderBy: { startedAt: 'desc' } })
    : [];
  const open = attempts.find((a) => !a.submittedAt) || null;
  const finished = attempts.filter((a) => a.submittedAt);
  const best = finished.reduce((b, a) => (!b || a.finalScore > b.finalScore ? a : b), null);
  const last = finished[0] || null;

  return {
    id: quiz.id,
    kind: quiz.kind,
    title: quiz.title,
    published: quiz.published,
    passPercent: quiz.passPercent,
    timeLimitSec: quiz.timeLimitSec,
    penalties: {
      leave: quiz.leavePenalty,
      away: quiz.awayPenalty,
      copy: quiz.copyPenalty,
      max: quiz.maxPenalty,
      time: quiz.timePenalty,
    },
    pathwayId: await quizPathwayId(quiz),
    moduleTitle: quiz.unit?.title || null,
    lessonTitle: quiz.video?.title || null,
    questionCount: quiz.questions.length,
    // Seeded by the attempt so a reload shows the same order.
    questions: open ? quiz.questions.map((q) => publicQuestion(q, `${open.id}:${q.id}`)) : [],
    open: attemptView(open, quiz),
    best: attemptView(best, quiz),
    last: attemptView(last, quiz),
    attemptCount: finished.length,
    retakeAt: quiz.kind === 'CHECKPOINT' && last
      ? new Date(new Date(last.submittedAt).getTime() + RETAKE_COOLDOWN_MS)
      : null,
  };
}

// Starts an attempt, or returns the open one: refreshing never resets the clock.
export async function startAttempt(quizId, userId, now = new Date()) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { _count: { select: { questions: true } } },
  });
  if (!quiz || !quiz.published) return { error: 'Quiz not found.', status: 404 };
  const questionCount = quiz.kind === 'MODULE_GAME'
    ? (await getGameQuestions(quiz.unitId)).length
    : quiz._count.questions;
  if (!questionCount) return { error: 'This quiz has no questions yet.', status: 409 };

  const open = await prisma.quizAttempt.findFirst({ where: { quizId, userId, submittedAt: null } });
  if (open) return { attempt: open };

  if (quiz.kind === 'CHECKPOINT') {
    const last = await prisma.quizAttempt.findFirst({
      where: { quizId, userId, submittedAt: { not: null } },
      orderBy: { submittedAt: 'desc' },
    });
    const retakeAt = last ? last.submittedAt.getTime() + RETAKE_COOLDOWN_MS : 0;
    if (retakeAt > now.getTime()) {
      const minutes = Math.ceil((retakeAt - now.getTime()) / 60000);
      return { error: `Take a short break first. You can retake this in ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}.`, status: 429 };
    }
  }

  let deadlineAt = null;
  if (quiz.kind === 'CHECKPOINT') {
    const user = await prisma.user.findUnique({
      where: { id: userId }, select: { extraQuizTime: true },
    });
    const limit = quiz.timeLimitSec || DEFAULT_CHECKPOINT_SECONDS;
    const seconds = limit * (user?.extraQuizTime ? EXTRA_TIME : 1);
    deadlineAt = new Date(now.getTime() + seconds * 1000);
  }
  try {
    return { attempt: await prisma.quizAttempt.create({ data: { quizId, userId, deadlineAt } }) };
  } catch (err) {
    // Two tabs starting at once: use whichever got there first.
    const again = await prisma.quizAttempt.findFirst({
      where: { quizId, userId, submittedAt: null },
    });
    if (again) return { attempt: again };
    throw err;
  }
}

async function ownOpenAttempt(attemptId, userId) {
  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: { quiz: true },
  });
  if (!attempt || attempt.userId !== userId) return { error: 'Attempt not found.', status: 404 };
  return { attempt };
}

// Integrity events as they happen, so closing the tab doesn't lose them. The log only
// ever grows: a shorter list than the one stored is ignored.
export async function recordEvents(attemptId, userId, rawEvents) {
  const { attempt, error, status } = await ownOpenAttempt(attemptId, userId);
  if (error) return { error, status };
  if (attempt.submittedAt) return { attempt };
  const events = cleanEvents(rawEvents);
  const stored = Array.isArray(attempt.events) ? attempt.events : [];
  if (events.length <= stored.length) return { attempt };
  const merged = [...stored, ...events.slice(stored.length)];
  const summary = summarizeEvents(merged);
  const updated = await prisma.quizAttempt.update({
    where: { id: attempt.id },
    data: { events: merged, ...summary },
    include: { quiz: true },
  });
  return { attempt: updated };
}

// Grades on the server, applies integrity penalties to checkpoints, pays XP on the first
// pass. Submitting twice returns the first result.
export async function submitAttempt(attemptId, userId, { answers, events } = {}, now = new Date()) {
  const own = await ownOpenAttempt(attemptId, userId);
  if (own.error) return own;
  if (own.attempt.submittedAt) return { attempt: own.attempt, xpAwarded: 0, milestones: [] };

  if (events) await recordEvents(attemptId, userId, events);
  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId }, include: { quiz: true },
  });
  const { quiz } = attempt;
  const questions = quiz.kind === 'MODULE_GAME'
    ? await getGameQuestions(quiz.unitId)
    : await prisma.question.findMany({ where: { quizId: quiz.id }, ...QUESTION_ORDER });
  const graded = gradeQuiz(questions, answers && typeof answers === 'object' ? answers : {});

  const summary = {
    leaveCount: attempt.leaveCount,
    awaySeconds: attempt.awaySeconds,
    copyCount: attempt.copyCount,
    pasteCount: attempt.pasteCount,
  };
  let penalty = { total: 0, parts: [] };
  let late = false;
  if (quiz.kind === 'CHECKPOINT') {
    penalty = integrityPenalty(quiz, summary);
    const end = attempt.deadlineAt
      ? attempt.deadlineAt.getTime() - attempt.awaySeconds * quiz.timePenalty * 1000
      : Infinity;
    late = now.getTime() > end + LATE_GRACE_MS;
    if (late) {
      penalty = {
        total: Math.min(100, penalty.total + LATE_PENALTY),
        parts: [...penalty.parts, { reason: 'Submitted after time ran out', count: 1, points: LATE_PENALTY }],
      };
    }
  }
  const finalScore = Math.max(0, Math.round((graded.score - penalty.total) * 10) / 10);
  const passed = finalScore >= quiz.passPercent;

  // Only the first submit wins if two arrive together.
  const { count } = await prisma.quizAttempt.updateMany({
    where: { id: attempt.id, submittedAt: null },
    data: {
      submittedAt: now,
      answers: answers || {},
      score: graded.score,
      penalty: penalty.total,
      finalScore,
      passed,
      results: { questions: graded.results, penalties: penalty.parts, late },
    },
  });
  const saved = await prisma.quizAttempt.findUnique({ where: { id: attempt.id } });
  if (!count) return { attempt: saved, xpAwarded: 0, milestones: [] };

  let rewarded = { xpAwarded: 0, milestones: [] };
  if (passed) {
    const pathwayId = await quizPathwayId(quiz);
    const context = quiz.videoId
      ? await lessonContext(quiz.videoId)
      : await pathwayContext(pathwayId);
    rewarded = await reward(userId, 'QUIZ', `quiz:${quiz.id}`, { ...context, amount: QUIZ_XP[quiz.kind] });
  }
  return { attempt: saved, ...rewarded };
}

export function resultView(attempt, quiz) {
  return attemptView(attempt, quiz);
}

// Where the checkpoint sits in a module: after the chosen lesson, or the middle one.
export function checkpointIndex(videos, afterVideoId) {
  if (!videos.length) return -1;
  const chosen = afterVideoId ? videos.findIndex((v) => v.id === afterVideoId) : -1;
  return chosen >= 0 ? chosen : Math.ceil(videos.length / 2) - 1;
}
