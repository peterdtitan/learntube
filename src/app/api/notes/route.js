'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prismadb';

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');
  if (!videoId) return new Response('Bad Request', { status: 400 });

  const note = await prisma.note.findUnique({
    where: { userId_videoId: { userId: session.user.id, videoId } },
  });

  return new Response(JSON.stringify(note), { status: 200 });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const body = await req.json();
  const { videoId, content } = body;
  if (!videoId || typeof content !== 'string') return new Response('Bad Request', { status: 400 });

  const note = await prisma.note.upsert({
    where: { userId_videoId: { userId: session.user.id, videoId } },
    update: { content },
    create: { userId: session.user.id, videoId, content },
  });

  return new Response(JSON.stringify(note), { status: 200 });
}
