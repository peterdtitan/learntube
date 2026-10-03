import prisma from './prismadb';
import { getLearnerSummary } from './xp';
import { listMakes } from './makes';
import { describeMilestone } from './milestoneRules';
import { publicName } from './people';

export async function followingIds(viewerId) {
  if (!viewerId) return [];
  const rows = await prisma.follow.findMany({
    where: { followerId: viewerId },
    select: { followingId: true },
  });
  return rows.map((r) => r.followingId);
}

function serializeMilestone(m, viewerId) {
  return {
    type: 'milestone',
    id: m.id,
    createdAt: m.createdAt.toISOString(),
    author: { id: m.user.id, name: publicName(m.user) },
    text: describeMilestone(m, m.pathway?.title),
    kind: m.kind,
    cheerCount: m._count.cheers,
    cheered: viewerId ? m.cheers.some((c) => c.userId === viewerId) : false,
    isMine: m.user.id === viewerId,
  };
}

const MILESTONE_INCLUDE = (viewerId) => ({
  user: { select: { id: true, name: true, displayName: true } },
  pathway: { select: { title: true } },
  cheers: viewerId ? { where: { userId: viewerId }, select: { userId: true } } : false,
  _count: { select: { cheers: true } },
});

async function listMilestones(userIds, viewerId, limit) {
  const rows = await prisma.milestone.findMany({
    where: { userId: { in: userIds } },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: MILESTONE_INCLUDE(viewerId),
  });
  return rows.map((m) => serializeMilestone({ ...m, cheers: m.cheers || [] }, viewerId));
}

// Makes and milestones from people the viewer follows, newest first.
export async function getFollowingFeed(viewerId, limit = 30) {
  const ids = await followingIds(viewerId);
  if (!ids.length) return { following: 0, items: [] };
  const [makes, milestones] = await Promise.all([
    listMakes({ viewerId, userIds: ids, limit }),
    listMilestones(ids, viewerId, limit),
  ]);
  const items = [...makes.map((m) => ({ type: 'make', ...m })), ...milestones]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
  return { following: ids.length, items };
}

export async function getProfile(userId, viewerId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      displayName: true,
      _count: {
        select: { followers: true, following: true, makes: { where: { hiddenAt: null } } },
      },
    },
  });
  if (!user) return null;

  const [summary, makes, milestones, follow] = await Promise.all([
    getLearnerSummary(userId),
    listMakes({ viewerId, userIds: [userId], limit: 12 }),
    listMilestones([userId], viewerId, 8),
    viewerId && viewerId !== userId
      ? prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: viewerId, followingId: userId } },
      })
      : null,
  ]);

  return {
    id: user.id,
    name: publicName(user),
    followers: user._count.followers,
    following: user._count.following,
    makeCount: user._count.makes,
    xp: summary?.xp.total || 0,
    streakWeeks: summary?.streakWeeks || 0,
    isMe: viewerId === userId,
    isFollowing: Boolean(follow),
    makes,
    milestones,
  };
}
