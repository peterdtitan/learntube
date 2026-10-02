import prisma from '../../../../../lib/prismadb';
import { error, json, requireUserId } from '../../../../../lib/api';
import { awardXp } from '../../../../../lib/xp';

export async function POST(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to save practice.');

  const { videoId } = params;
  const video = await prisma.video.findUnique({ where: { id: videoId }, select: { id: true } });
  if (!video) return error(404, 'Lesson not found.');

  const now = new Date();
  await prisma.videoProgress.upsert({
    where: { userId_videoId: { userId, videoId } },
    update: { triedAt: now },
    create: {
      userId, videoId, stoppedAt: 0, triedAt: now,
    },
  });
  const award = await awardXp(userId, 'TRY', `try:${videoId}`);

  return json({ triedAt: now, xpAwarded: award?.amount || 0 });
}
