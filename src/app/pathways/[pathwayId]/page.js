'use server';

import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { getPathwayWithUnits, getProgressByVideoId } from '../../../lib/course';

export default async function PathwayRedirectPage({ params }) {
  const { pathwayId } = params;
  const data = await getPathwayWithUnits(pathwayId);
  if (!data) notFound();

  const { orderedVideos } = data;
  if (orderedVideos.length === 0) notFound();

  const session = await getServerSession(authOptions);
  const progressByVideoId = await getProgressByVideoId(
    session?.user?.id,
    orderedVideos.map((v) => v.id),
  );

  const nextVideo = orderedVideos.find((v) => !progressByVideoId[v.id]?.completed)
    || orderedVideos[0];

  redirect(`/pathways/${pathwayId}/learn/${nextVideo.id}`);
}
