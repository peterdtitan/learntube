import prisma from '../../../../../lib/prismadb';
import { error, json, requireUserId } from '../../../../../lib/api';
import { rateLimit } from '../../../../../lib/rateLimit';
import { notify, retract } from '../../../../../lib/notifications';

async function followerCount(userId) {
  return prisma.follow.count({ where: { followingId: userId } });
}

export async function POST(req, { params }) {
  const viewerId = await requireUserId();
  if (!viewerId) return error(401, 'Sign in to follow learners.');
  const limited = await rateLimit('follow', viewerId);
  if (limited) return limited;
  if (viewerId === params.userId) return error(400, "You can't follow yourself.");

  const target = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { id: true },
  });
  if (!target) return error(404, 'Learner not found.');

  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId: viewerId, followingId: target.id } },
    update: {},
    create: { followerId: viewerId, followingId: target.id },
  });
  await notify('FOLLOW', { userId: target.id, actorId: viewerId });
  return json({ following: true, followers: await followerCount(target.id) });
}

export async function DELETE(req, { params }) {
  const viewerId = await requireUserId();
  if (!viewerId) return error(401, 'Sign in to change who you follow.');
  const limited = await rateLimit('follow', viewerId);
  if (limited) return limited;

  const { count } = await prisma.follow.deleteMany({
    where: { followerId: viewerId, followingId: params.userId },
  });
  if (count) await retract('FOLLOW', { userId: params.userId, actorId: viewerId });
  return json({ following: false, followers: await followerCount(params.userId) });
}
