import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../lib/auth';
import { error, json } from '../../../../lib/api';
import { getQuizForLearner } from '../../../../lib/quizzes';

// GET /api/quizzes/:id: the quiz, the learner's open attempt (with questions, no answers)
// and their best and latest results.
export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  const quiz = await getQuizForLearner(params.quizId, session?.user?.id || null, {
    isAdmin: Boolean(session?.user?.isAdmin),
  });
  if (!quiz) return error(404, 'Quiz not found.');
  return json(quiz);
}
