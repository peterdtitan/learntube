'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../../../lib/prismadb';
import { requireAdmin } from '../../../lib/admin';
import { QUESTION_TYPES, validateQuestionData } from '../../../lib/quizGrade';
import { draftQuestions } from '../../../lib/quizDraft';
import { rateLimit } from '../../../lib/rateLimit';
import { checkpointIndex } from '../../../lib/quizzes';

// Every action re-checks the admin role: server actions are public endpoints.

const KINDS = ['LESSON_CHECK', 'CHECKPOINT', 'MODULE_GAME'];

function refresh(quizId) {
  revalidatePath('/', 'layout');
  if (quizId) revalidatePath(`/admin/quizzes/${quizId}`);
}

function int(form, name, { min, max, fallback }) {
  const n = Number(form.get(name));
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

// Creates the lesson check, checkpoint or game, or opens the one that already exists.
export async function createQuiz(form) {
  await requireAdmin();
  const kind = String(form.get('kind'));
  if (!KINDS.includes(kind)) return;
  const videoId = kind === 'LESSON_CHECK' ? String(form.get('videoId')) : null;
  const unitId = kind === 'LESSON_CHECK' ? null : String(form.get('unitId'));
  const where = videoId ? { videoId, kind } : { unitId, kind };

  let quiz = await prisma.quiz.findFirst({ where });
  if (!quiz) {
    quiz = await prisma.quiz.create({
      data: {
        ...where,
        timeLimitSec: kind === 'CHECKPOINT' ? 600 : null,
      },
    });
  }
  redirect(`/admin/quizzes/${quiz.id}`);
}

export async function saveQuizSettings(prev, form) {
  await requireAdmin();
  const id = String(form.get('id'));
  const quiz = await prisma.quiz.findUnique({
    where: { id }, include: { _count: { select: { questions: true } } },
  });
  if (!quiz) return { error: 'Quiz not found.' };

  const title = String(form.get('title') ?? '').trim().slice(0, 120) || null;
  const published = form.get('published') === 'on';
  const data = {
    title,
    published,
    passPercent: int(form, 'passPercent', { min: 0, max: 100, fallback: quiz.passPercent }),
  };
  if (quiz.kind === 'CHECKPOINT') {
    Object.assign(data, {
      timeLimitSec: int(form, 'timeLimitMin', { min: 1, max: 180, fallback: 10 }) * 60,
      leavePenalty: int(form, 'leavePenalty', { min: 0, max: 50, fallback: quiz.leavePenalty }),
      awayPenalty: int(form, 'awayPenalty', { min: 0, max: 50, fallback: quiz.awayPenalty }),
      copyPenalty: int(form, 'copyPenalty', { min: 0, max: 50, fallback: quiz.copyPenalty }),
      maxPenalty: int(form, 'maxPenalty', { min: 0, max: 100, fallback: quiz.maxPenalty }),
      timePenalty: int(form, 'timePenalty', { min: 0, max: 10, fallback: quiz.timePenalty }),
      afterVideoId: String(form.get('afterVideoId') || '') || null,
    });
  }
  // A game can borrow the module's lesson-check questions, so it may have none of its own.
  if (published && quiz.kind !== 'MODULE_GAME' && !quiz._count.questions) {
    return { error: 'Add at least one question before publishing.' };
  }
  await prisma.quiz.update({ where: { id }, data });
  refresh(id);
  return { ok: published ? 'Saved. Learners can see it.' : 'Saved as a draft. Learners can’t see it yet.' };
}

export async function deleteQuiz(form) {
  await requireAdmin();
  const id = String(form.get('id'));
  const quiz = await prisma.quiz.findUnique({
    where: { id }, include: { unit: true, video: { select: { unit: true } } },
  });
  if (!quiz) return;
  await prisma.quiz.delete({ where: { id } });
  refresh();
  const pathwayId = quiz.unit?.pathwayId || quiz.video?.unit?.pathwayId;
  redirect(pathwayId ? `/admin/pathways/${pathwayId}` : '/admin');
}

// The question form sends the type-specific fields as JSON in `data`.
export async function saveQuestion(prev, form) {
  await requireAdmin();
  const quizId = String(form.get('quizId'));
  const id = form.get('id') ? String(form.get('id')) : null;
  const type = String(form.get('type'));
  if (!QUESTION_TYPES.includes(type)) return { error: 'Pick a question type.' };
  const prompt = String(form.get('prompt') ?? '').trim();
  if (!prompt) return { error: 'Write the question.' };
  if (prompt.length > 500) return { error: 'Keep the question under 500 characters.' };
  let raw;
  try {
    raw = JSON.parse(String(form.get('data') || '{}'));
  } catch {
    return { error: 'Something went wrong reading the answers. Try again.' };
  }
  const checked = validateQuestionData(type, raw);
  if (checked.error) return { error: checked.error };
  const explanation = String(form.get('explanation') ?? '').trim().slice(0, 500) || null;

  if (id) {
    await prisma.question.update({
      where: { id },
      data: {
        type, prompt, data: checked.data, explanation, aiDrafted: false,
      },
    });
  } else {
    const last = await prisma.question.findFirst({
      where: { quizId }, orderBy: { order: 'desc' }, select: { order: true },
    });
    await prisma.question.create({
      data: {
        quizId, type, prompt, data: checked.data, explanation, order: (last?.order ?? -1) + 1,
      },
    });
  }
  refresh(quizId);
  return { ok: id ? 'Question saved.' : 'Question added.', savedAt: Date.now() };
}

export async function deleteQuestion(form) {
  await requireAdmin();
  const question = await prisma.question.delete({ where: { id: String(form.get('id')) } });
  refresh(question.quizId);
}

export async function moveQuestion(form) {
  await requireAdmin();
  const q = await prisma.question.findUnique({ where: { id: String(form.get('id')) } });
  if (!q) return;
  const up = Number(form.get('direction')) < 0;
  const neighbour = await prisma.question.findFirst({
    where: { quizId: q.quizId, order: up ? { lt: q.order } : { gt: q.order } },
    orderBy: { order: up ? 'desc' : 'asc' },
  });
  if (!neighbour) return;
  await prisma.$transaction([
    prisma.question.update({ where: { id: q.id }, data: { order: neighbour.order } }),
    prisma.question.update({ where: { id: neighbour.id }, data: { order: q.order } }),
  ]);
  refresh(q.quizId);
}

// Asks Claude for draft questions from the lesson (or module) transcripts. They're added
// to the quiz marked "AI draft"; the quiz's published state is left alone.
export async function draftWithAi(prev, form) {
  const admin = await requireAdmin();
  const limited = await rateLimit('quizDraft', admin.id);
  if (limited) return { error: 'You’ve drafted a lot this hour. Try again later.' };

  const quiz = await prisma.quiz.findUnique({
    where: { id: String(form.get('quizId')) },
    include: {
      questions: { select: { prompt: true } },
      video: true,
      unit: { include: { videos: { orderBy: { order: 'asc' } } } },
    },
  });
  if (!quiz) return { error: 'Quiz not found.' };
  let lessons = quiz.video ? [quiz.video] : quiz.unit?.videos || [];
  if (quiz.kind === 'CHECKPOINT' && quiz.unit) {
    // Only the lessons before the checkpoint: it shouldn't test what's still to come.
    lessons = lessons.slice(0, checkpointIndex(lessons, quiz.afterVideoId) + 1);
  }
  const asked = Number(form.get('count'));
  const count = Number.isInteger(asked) && asked > 0 ? Math.min(15, asked) : undefined;

  const result = await draftQuestions({
    kind: quiz.kind,
    lessons,
    moduleTitle: quiz.unit?.title,
    existingPrompts: quiz.questions.map((q) => q.prompt),
    count,
  });
  if (result.error) return { error: result.error };

  const last = await prisma.question.findFirst({
    where: { quizId: quiz.id }, orderBy: { order: 'desc' }, select: { order: true },
  });
  const start = (last?.order ?? -1) + 1;
  await prisma.question.createMany({
    data: result.questions.map((q, i) => ({
      ...q, quizId: quiz.id, order: start + i, aiDrafted: true,
    })),
  });
  refresh(quiz.id);
  return { ok: `Added ${result.questions.length} draft questions. Check each one before publishing.` };
}
