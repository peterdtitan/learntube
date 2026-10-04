import {
  error, json, readJson, requireUserId,
} from '../../../../../lib/api';
import { rateLimit } from '../../../../../lib/rateLimit';
import { recordEvents } from '../../../../../lib/quizzes';
import { secondsLeft } from '../../../../../lib/quizGrade';

// POST /api/attempts/:id/events { events }: the whole integrity log so far. Also sent with
// navigator.sendBeacon when the page closes, so it accepts a text body too.
export async function POST(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to take quizzes.');
  const limited = await rateLimit('quizEvents', userId);
  if (limited) return limited;

  const body = await readJson(req);
  const recorded = await recordEvents(params.attemptId, userId, body?.events);
  if (recorded.error) return error(recorded.status, recorded.error);
  const { attempt } = recorded;
  return json({
    awaySeconds: attempt.awaySeconds,
    leaveCount: attempt.leaveCount,
    secondsLeft: secondsLeft({
      deadlineAt: attempt.deadlineAt,
      awaySeconds: attempt.awaySeconds,
      timePenalty: attempt.quiz?.timePenalty ?? 0,
    }),
  });
}
