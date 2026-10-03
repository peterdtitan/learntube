import prisma from './prismadb';

const LESSONS_INCLUDE = {
  units: {
    orderBy: { order: 'asc' },
    include: { videos: { orderBy: { order: 'asc' } } },
  },
  videos: {
    where: { unitId: null },
    orderBy: { order: 'asc' },
  },
};

export function orderLessons(pathway) {
  return [...pathway.units.flatMap((unit) => unit.videos), ...pathway.videos];
}

// A lesson counts as done once it's been tried, or watched to the end.
export function isLessonDone(progress) {
  return Boolean(progress?.triedAt || progress?.completed);
}

export async function getPathwayWithUnits(pathwayId) {
  const pathway = await prisma.pathway.findUnique({
    where: { id: pathwayId },
    include: { skill: true, ...LESSONS_INCLUDE },
  });

  if (!pathway) return null;

  return {
    pathway,
    units: pathway.units,
    unassignedVideos: pathway.videos,
    orderedVideos: orderLessons(pathway),
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

function lessonSummary(video) {
  return {
    id: video.id, title: video.title, duration: video.duration, tryTask: video.tryTask,
  };
}

const MAX_TERMS = 6;

// Every word has to appear somewhere: title, description, what you make, skill or a lesson title.
export function pathwaySearchWhere({ q, skillId } = {}) {
  const terms = String(q || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_TERMS);
  const and = terms.map((term) => {
    const has = { contains: term, mode: 'insensitive' };
    return {
      OR: [
        { title: has },
        { description: has },
        { makeTitle: has },
        { skill: { name: has } },
        { units: { some: { videos: { some: { title: has } } } } },
        { videos: { some: { title: has } } },
      ],
    };
  });
  if (skillId) and.push({ skillId });
  return and.length ? { AND: and } : {};
}

// Every pathway with lesson counts and, for a signed-in learner, where they are in it.
// Started pathways come first. Pass { q, skillId } to search.
export async function getPathwayOverviews(userId, search = {}) {
  const pathways = await prisma.pathway.findMany({
    where: pathwaySearchWhere(search),
    include: { skill: true, ...LESSONS_INCLUDE },
    orderBy: { title: 'asc' },
  });
  const lessonIds = pathways.flatMap((p) => orderLessons(p).map((v) => v.id));
  const progress = await getProgressByVideoId(userId, lessonIds);

  const overviews = pathways.map((p) => {
    const lessons = orderLessons(p);
    const doneCount = lessons.filter((v) => isLessonDone(progress[v.id])).length;
    const next = lessons.find((v) => !isLessonDone(progress[v.id]));
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      makeTitle: p.makeTitle,
      skill: p.skill ? { id: p.skill.id, name: p.skill.name, color: p.skill.color } : null,
      lessonCount: lessons.length,
      seconds: lessons.reduce((sum, v) => sum + v.duration, 0),
      doneCount,
      started: lessons.some((v) => progress[v.id]),
      firstLesson: lessons[0] ? lessonSummary(lessons[0]) : null,
      nextLesson: next ? lessonSummary(next) : null,
    };
  });

  return overviews
    .filter((o) => o.lessonCount > 0)
    .sort((a, b) => Number(b.started) - Number(a.started));
}

export async function getSkills() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: 'asc' },
    include: { pathways: { select: { id: true, title: true, makeTitle: true } } },
  });
  return skills.map((s) => ({
    id: s.id,
    name: s.name,
    tier: s.tier,
    color: s.color,
    pathways: s.pathways,
  }));
}
