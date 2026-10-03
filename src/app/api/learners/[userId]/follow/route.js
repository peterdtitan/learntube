import prisma from '../../../../../lib/prismadb';
import { error, json, requireUserId } from '../../../../../lib/api';

async function followerCount(userId) {
  return prisma.follow.count({ where: { followingId: userId } });
}

export async function POST(req, { params }) {
  const viewerId = await requireUserId();
  if (!viewerId) return error(401, 'Sign in to follow learners.');
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
  return json({ following: true, followers: await followerCount(target.id) });
}

export async function DELETE(req, { params }) {
  const viewerId = await requireUserId();
  if (!viewerId) return error(401, 'Sign in to change who you follow.');

  await prisma.follow.deleteMany({ where: { followerId: viewerId, followingId: params.userId } });
  return json({ following: false, followers: await followerCount(params.userId) });
}
