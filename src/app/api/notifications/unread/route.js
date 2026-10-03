import { error, json, requireUserId } from '../../../../lib/api';
import { unreadCount } from '../../../../lib/notifications';

// GET /api/notifications/unread: just the badge number.
export async function GET() {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to see notifications.');
  return json({ unread: await unreadCount(userId) });
}
