'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prismadb';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const body = await req.json();
  const { videoId, stoppedAt, completed } = body;
  if (!videoId || typeof stoppedAt !== 'number') return new Response('Bad Request', { status: 400 });

  const upsert = await prisma.videoProgress.upsert({
    where: { userId_videoId: { userId: session.user.id, videoId } },
    update: {
      stoppedAt, watchedAt: new Date(), ...(completed ? { completed: true } : {}),
    },
    create: {
      userId: session.user.id, videoId, stoppedAt, completed: Boolean(completed),
    },
  });

  return new Response(JSON.stringify(upsert), { status: 200 });
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
