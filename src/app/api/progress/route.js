'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prismadb';
import { lessonContext, reward } from '../../../lib/rewards';
import { readJson } from '../../../lib/api';
import { rateLimit } from '../../../lib/rateLimit';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });
  const limited = await rateLimit('progress', session.user.id);
  if (limited) return limited;

  const body = await readJson(req);
  if (!body) return new Response('Bad Request', { status: 400 });
  const { videoId, stoppedAt, completed } = body;
  if (!videoId || typeof stoppedAt !== 'number') return new Response('Bad Request', { status: 400 });
  // The lesson may have been deleted while someone still had it open.
  const video = await prisma.video.findUnique({
    where: { id: String(videoId) }, select: { id: true },
  });
  if (!video) return Response.json({ error: 'Lesson not found.' }, { status: 404 });

  const upsert = await prisma.videoProgress.upsert({
    where: { userId_videoId: { userId: session.user.id, videoId } },
    update: {
      stoppedAt, watchedAt: new Date(), ...(completed ? { completed: true } : {}),
    },
    create: {
      userId: session.user.id, videoId, stoppedAt, completed: Boolean(completed),
    },
  });

  const result = completed
    ? await reward(session.user.id, 'WATCH', `watch:${videoId}`, await lessonContext(videoId))
    : { xpAwarded: 0, milestones: [] };

  return Response.json({ ...upsert, ...result });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const list = await prisma.videoProgress.findMany({
    where: { userId: session.user.id },
    include: { video: true },
    orderBy: { watchedAt: 'desc' },
  });

  return new Response(JSON.stringify(list), { status: 200 });
}
