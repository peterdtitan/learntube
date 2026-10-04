import prisma from './prismadb';
import { coverImage } from './covers';

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
export function pathwaySearchWhere({ q, skillId, kind } = {}) {
  const terms = String(q || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_TERMS);
  const and = terms.map((term) => {
    // Prisma passes the text into LIKE as is, so % and _ would act as wildcards.
    const has = { contains: term.replace(/[\\%_]/g, '\\$&'), mode: 'insensitive' };
    return {
      OR: [
        { title: has },
        { description: has },
        { makeTitle: has },
        { skill: { name: has } },
        { units: { some: { title: has } } },
        { units: { some: { videos: { some: { title: has } } } } },
        { videos: { some: { title: has } } },
      ],
    };
  });
  if (skillId) and.push({ skillId });
  if (kind) and.push({ kind });
  return and.length ? { AND: and } : {};
}

// Every pathway with lesson counts and, for a signed-in learner, where they are in it.
// Started pathways come first. Pass { q, skillId } to search, { kind } for courses or skills.
export async function getPathwayOverviews(userId, search = {}) {
  const pathways = await prisma.pathway.findMany({
    where: pathwaySearchWhere(search),
    include: { skill: true, track: { select: { slug: true, title: true } }, ...LESSONS_INCLUDE },
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
      cover: coverImage(p.imageUrl, lessons.map((v) => v.url)),
      skill: p.skill ? { id: p.skill.id, name: p.skill.name, color: p.skill.color } : null,
      certification: p.certification,
      track: p.track ? { ...p.track, order: p.trackOrder } : null,
      lessonCount: lessons.length,
      seconds: lessons.reduce((sum, v) => sum + v.duration, 0),
      doneCount,
      started: lessons.some((v) => progress[v.id]),
      firstLesson: lessons[0] ? lessonSummary(lessons[0]) : null,
      nextLesson: next ? lessonSummary(next) : null,
    };
  });

  // Started pathways first; courses in a track stay in their order.
  return overviews
    .filter((o) => o.lessonCount > 0)
    .sort((a, b) => Number(b.started) - Number(a.started)
      || (a.track?.title || a.title).localeCompare(b.track?.title || b.title)
      || (a.track?.order ?? 0) - (b.track?.order ?? 0));
}

export async function getSkills() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: 'asc' },
    include: {
      pathways: {
        select: {
          id: true,
          title: true,
          makeTitle: true,
          imageUrl: true,
          units: {
            orderBy: { order: 'asc' },
            take: 1,
            select: { videos: { orderBy: { order: 'asc' }, take: 1, select: { url: true } } },
          },
        },
      },
      tracks: {
        select: {
          slug: true,
          title: true,
          makeTitle: true,
          imageUrl: true,
          _count: { select: { pathways: true } },
        },
      },
    },
  });
  return skills.map((s) => ({
    id: s.id,
    name: s.name,
    tier: s.tier,
    color: s.color,
    pathways: s.pathways.map((p) => ({
      id: p.id,
      title: p.title,
      makeTitle: p.makeTitle,
      cover: coverImage(p.imageUrl, p.units.flatMap((u) => u.videos.map((v) => v.url))),
    })),
    tracks: s.tracks.map((t) => ({
      slug: t.slug,
      title: t.title,
      makeTitle: t.makeTitle,
      cover: t.imageUrl,
      courseCount: t._count.pathways,
    })),
  }));
}
