import { error, json, requireUserId } from '../../../lib/api';
import { getFollowingFeed } from '../../../lib/social';

// GET /api/feed: makes and milestones from people you follow.
export async function GET() {
  const viewerId = await requireUserId();
  if (!viewerId) return error(401, 'Sign in to see people you follow.');
  return json(await getFollowingFeed(viewerId));
}
