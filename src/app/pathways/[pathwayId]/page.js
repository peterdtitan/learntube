import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { getPathwayWithUnits, getProgressByVideoId, isLessonDone } from '../../../lib/course';

export const dynamic = 'force-dynamic';

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

  const nextVideo = orderedVideos.find((v) => !isLessonDone(progressByVideoId[v.id]))
    || orderedVideos[0];

  redirect(`/pathways/${pathwayId}/learn/${nextVideo.id}`);
}
