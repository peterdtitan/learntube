import { json, requireUserId } from '../../../lib/api';
import { getLeaderboard } from '../../../lib/leaderboard';

// GET /api/leaderboard?scope=all|pathway|skill&id=...&period=week|all&audience=everyone|following
export async function GET(req) {
  const viewerId = await requireUserId();
  const q = new URL(req.url).searchParams;
  const scope = ['pathway', 'skill'].includes(q.get('scope')) && q.get('id') ? q.get('scope') : 'all';
  return json(await getLeaderboard({
    viewerId,
    filter: { type: scope, id: q.get('id') },
    period: q.get('period') === 'all' ? 'all' : 'week',
    audience: q.get('audience') === 'following' && viewerId ? 'following' : 'everyone',
  }));
}
