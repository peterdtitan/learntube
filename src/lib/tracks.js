import prisma from './prismadb';
import { getPathwayOutline } from './outline';
import { funEquivalent } from './estimate';

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

export default getTrackOverview;
