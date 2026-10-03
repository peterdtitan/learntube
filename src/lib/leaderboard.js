import prisma from './prismadb';
import { followingIds } from './social';
import { publicName } from './people';

const DAY_MS = 24 * 60 * 60 * 1000;

// Leaderboard weeks run Monday 00:00 to Sunday 23:59 UTC, the same for everyone.
export function leaderboardWeekStart(now = new Date()) {
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const mondayOffset = (new Date(midnight).getUTCDay() + 6) % 7;
  return new Date(midnight - mondayOffset * DAY_MS);
}

// Standard competition ranking: equal XP shares a rank, the next rank skips.
export function rankTotals(totals) {
  const sorted = [...totals].sort((a, b) => b.xp - a.xp);
  return sorted.map((row) => ({ ...row, rank: 1 + sorted.filter((o) => o.xp > row.xp).length }));
}

// filter: { type: 'all' | 'pathway' | 'skill', id }
// period: 'week' | 'all'; audience: 'everyone' | 'following'
export async function getLeaderboard({
  viewerId,
  filter = { type: 'all' },
  period = 'week',
  audience = 'everyone',
  limit = 20,
  now = new Date(),
}) {
  const where = { user: { showOnLeaderboard: true } };
  if (filter.type === 'pathway') where.pathwayId = filter.id;
  if (filter.type === 'skill') where.skillId = filter.id;
  if (period === 'week') where.createdAt = { gte: leaderboardWeekStart(now) };
  if (audience === 'following' && viewerId) where.userId = { in: [viewerId, ...(await followingIds(viewerId))] };

  // All rows for this slice, so the viewer's rank is exact even outside the top N.
  const grouped = await prisma.xpEvent.groupBy({ by: ['userId'], where, _sum: { amount: true } });
  const ranked = rankTotals(grouped.map((g) => ({ userId: g.userId, xp: g._sum.amount || 0 })));
  const top = ranked.slice(0, limit);
  const viewerRow = ranked.find((r) => r.userId === viewerId) || null;

  const users = await prisma.user.findMany({
    where: { id: { in: [...top.map((r) => r.userId), ...(viewerRow ? [viewerRow.userId] : [])] } },
    select: { id: true, name: true, displayName: true },
  });
  const names = Object.fromEntries(users.map((u) => [u.id, publicName(u)]));
  const viewer = viewerId
    ? await prisma.user.findUnique({ where: { id: viewerId }, select: { showOnLeaderboard: true } })
    : null;

  return {
    entries: top.map((r) => ({ ...r, name: names[r.userId] || 'A learner', isViewer: r.userId === viewerId })),
    viewer: viewerRow ? { ...viewerRow, name: names[viewerRow.userId] } : null,
    viewerHidden: viewer ? !viewer.showOnLeaderboard : false,
    learnerCount: ranked.length,
  };
}
