import prisma from './prismadb';

export async function getPathwayWithUnits(pathwayId) {
  const pathway = await prisma.pathway.findUnique({
    where: { id: pathwayId },
    include: {
      units: {
        orderBy: { order: 'asc' },
        include: { videos: { orderBy: { order: 'asc' } } },
      },
      videos: {
        where: { unitId: null },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!pathway) return null;

  const orderedVideos = [
    ...pathway.units.flatMap((unit) => unit.videos),
    ...pathway.videos,
  ];

  return {
    pathway, units: pathway.units, unassignedVideos: pathway.videos, orderedVideos,
  };
}

export async function getProgressByVideoId(userId, videoIds) {
  if (!userId || videoIds.length === 0) return {};

  const progress = await prisma.videoProgress.findMany({
    where: {
      userId, videoId: { in: videoIds },
    },
  });

  return Object.fromEntries(progress.map((p) => [p.videoId, p]));
}
