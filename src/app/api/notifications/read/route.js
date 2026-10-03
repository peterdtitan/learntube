import { error, json, requireUserId } from '../../../../lib/api';
import { markAllRead } from '../../../../lib/notifications';

// POST /api/notifications/read: marks everything as seen.
export async function POST() {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to see notifications.');
  await markAllRead(userId);
  return json({ unread: 0 });
}
