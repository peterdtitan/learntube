import prisma from './prismadb';
import { getPathwayOutline } from './outline';
import { estimatePathway, funEquivalent } from './estimate';
import { PUBLISHED_QUIZ as QUIZ } from './skills';

// A track (program) and its courses in order, with time to learn and progress for each.
export async function getTrackOverview(slug, userId) {
  const track = await prisma.track.findUnique({
    where: { slug },
    include: {
      skill: { select: { id: true, name: true, color: true } },
      pathways: { orderBy: { trackOrder: 'asc' }, select: { id: true } },
    },
  });
  if (!track) return null;
  const outlines = (await Promise.all(track.pathways.map((p) => getPathwayOutline(p.id, userId))))
    .filter((o) => o && o.lessonCount);
  const courses = outlines.map((o) => ({
    ...o.pathway,
    minutes: o.estimate.total,
    moduleCount: o.modules.length,
    lessonCount: o.lessonCount,
    doneCount: o.doneCount,
    nextLessonId: o.nextLessonId,
  }));
  const minutes = courses.reduce((sum, c) => sum + c.minutes, 0);
  // The course to carry on with: the first one that isn't finished.
  const current = courses.find((c) => c.doneCount < c.lessonCount) || courses[0];
  return {
    track: {
      slug: track.slug,
      title: track.title,
      description: track.description,
      makeTitle: track.makeTitle,
      skill: track.skill,
    },
    courses,
    minutes,
    fun: funEquivalent(minutes, track.skill?.id),
    lessonCount: courses.reduce((n, c) => n + c.lessonCount, 0),
    doneCount: courses.reduce((n, c) => n + c.doneCount, 0),
    currentCourseId: current?.id || null,
  };
}

// Every program as a card: time to learn, course count, and whether the viewer has started.
// Lighter than getTrackOverview: one query for content, one for the viewer's progress.
export async function getProgramCards(userId) {
  const tracks = await prisma.track.findMany({
    where: { pathways: { some: {} } },
    include: {
      skill: {
        select: {
          id: true, name: true, color: true, tier: true,
        },
      },
      pathways: {
        orderBy: { trackOrder: 'asc' },
        select: {
          id: true,
          title: true,
          certification: true,
          units: {
            select: {
              quizzes: QUIZ,
              videos: {
                select: {
                  id: true, duration: true, practiceMinutes: true, quizzes: QUIZ,
                },
              },
            },
          },
        },
      },
    },
  });
  const lessonsOf = (p) => p.units.flatMap((u) => u.videos);
  const videoIds = tracks.flatMap((t) => t.pathways.flatMap((p) => lessonsOf(p).map((v) => v.id)));
  const startedIds = userId && videoIds.length
    ? new Set((await prisma.videoProgress.findMany({
      where: { userId, videoId: { in: videoIds } }, select: { videoId: true },
    })).map((r) => r.videoId))
    : new Set();
  return tracks.map((t) => {
    const minutes = t.pathways.reduce((n, p) => n + estimatePathway(p.units).total, 0);
    return {
      kind: 'program',
      id: t.id,
      slug: t.slug,
      title: t.title,
      description: t.description,
      skill: t.skill,
      minutes,
      fun: funEquivalent(minutes, t.skill?.id),
      courses: t.pathways.map((p) => ({
        id: p.id, title: p.title, certification: p.certification,
      })),
      started: t.pathways.some((p) => lessonsOf(p).some((v) => startedIds.has(v.id))),
      learners: 0,
    };
  });
}

export default getTrackOverview;
