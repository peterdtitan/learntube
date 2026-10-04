import {
  error, json, readJson, requireUserId,
} from '../../../../../lib/api';
import { rateLimit } from '../../../../../lib/rateLimit';
import prisma from '../../../../../lib/prismadb';
import { resultView, submitAttempt } from '../../../../../lib/quizzes';

// POST /api/attempts/:id/submit { answers: { [questionId]: answer }, events? }
// Graded on the server. Returns the score, penalties with reasons, and XP earned.
export async function POST(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to take quizzes.');
  const limited = await rateLimit('quizSubmit', userId);
  if (limited) return limited;

  const body = await readJson(req);
  if (!body) return error(400, 'Send your answers as JSON.');
  const done = await submitAttempt(params.attemptId, userId, {
    answers: body.answers, events: body.events,
  });
  if (done.error) return error(done.status, done.error);

  const quiz = await prisma.quiz.findUnique({ where: { id: done.attempt.quizId } });
  return json({
    result: resultView(done.attempt, quiz),
    passPercent: quiz.passPercent,
    xpAwarded: done.xpAwarded,
    milestones: done.milestones,
  });
}
