import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import { error, json } from '../../../../../lib/api';
import { rateLimit } from '../../../../../lib/rateLimit';
import { getQuizForLearner, startAttempt } from '../../../../../lib/quizzes';

// POST /api/quizzes/:id/attempts: start (or resume) an attempt. Returns the quiz with
// its questions and, for checkpoints, the seconds left.
export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) return error(401, 'Sign in to take quizzes.');
  const limited = await rateLimit('quizStart', userId);
  if (limited) return limited;

  const started = await startAttempt(params.quizId, userId);
  if (started.error) return error(started.status, started.error);
  return json(await getQuizForLearner(params.quizId, userId), 201);
}
