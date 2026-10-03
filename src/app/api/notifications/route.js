import { error, json, requireUserId } from '../../../lib/api';
import { listNotifications, unreadCount } from '../../../lib/notifications';

// GET /api/notifications: newest 50, each with the actor's public name, a sentence and a link.
export async function GET() {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to see notifications.');
  const [notifications, unread] = await Promise.all([
    listNotifications(userId),
    unreadCount(userId),
  ]);
  return json({ notifications, unread });
}
