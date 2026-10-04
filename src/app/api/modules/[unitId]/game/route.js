import { error, json } from '../../../../../lib/api';
import prisma from '../../../../../lib/prismadb';
import { getGameQuestions } from '../../../../../lib/quizzes';

// GET /api/modules/:id/game: questions for the end-of-module games, with answers so the
// games can react instantly. Never includes checkpoint questions.
export async function GET(req, { params }) {
  const quiz = await prisma.quiz.findFirst({
    where: { unitId: params.unitId, kind: 'MODULE_GAME', published: true },
    select: { id: true, title: true, passPercent: true },
  });
  if (!quiz) return error(404, 'No game for this module yet.');
  return json({ quiz, questions: await getGameQuestions(params.unitId) });
}
