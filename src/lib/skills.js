import prisma from './prismadb';
import { estimatePathway, funEquivalent } from './estimate';
import { getProgressByVideoId, isLessonDone } from './course';

// Published quizzes, with what estimatePathway needs to count their minutes.
export const PUBLISHED_QUIZ = {
  where: { published: true },
  select: { kind: true, published: true, timeLimitSec: true },
};
const QUIZ = PUBLISHED_QUIZ;

// Short skills (Pathway.kind SKILL) with time to learn, how many people are learning each,
// and the viewer's progress. One query for the content, one for learners, one for progress.
export async function getShortSkills(userId) {
  const rows = await prisma.pathway.findMany({
    where: { kind: 'SKILL' },
    orderBy: { title: 'asc' },
    include: {
      skill: {
        select: {
          id: true, name: true, color: true, tier: true,
        },
      },
      track: { select: { slug: true, title: true } },
      units: {
        orderBy: { order: 'asc' },
        select: {
          quizzes: QUIZ,
          videos: {
            orderBy: { order: 'asc' },
            select: {
              id: true, duration: true, practiceMinutes: true, quizzes: QUIZ,
            },
          },
        },
      },
    },
  });
  const ids = rows.map((p) => p.id);
  const lessons = rows.flatMap((p) => p.units.flatMap((u) => u.videos));
  const [learnerRows, progress] = await Promise.all([
    ids.length
      ? prisma.xpEvent.groupBy({ by: ['pathwayId', 'userId'], where: { pathwayId: { in: ids } } })
      : [],
    getProgressByVideoId(userId, lessons.map((v) => v.id)),
  ]);
  // One row per learner per pathway, so counting rows counts learners.
  const learners = learnerRows.reduce(
    (acc, r) => ({ ...acc, [r.pathwayId]: (acc[r.pathwayId] || 0) + 1 }),
    {},
  );

  return rows
    .map((p) => {
      const videos = p.units.flatMap((u) => u.videos);
      const { total } = estimatePathway(p.units);
      const doneCount = videos.filter((v) => isLessonDone(progress[v.id])).length;
      const next = videos.find((v) => !isLessonDone(progress[v.id]));
      return {
        id: p.id,
        slug: p.slug,
        title: p.title,
        description: p.description,
        makeTitle: p.makeTitle,
        skill: p.skill,
        track: p.track,
        minutes: total,
        fun: funEquivalent(total, p.skill?.id),
        lessonCount: videos.length,
        moduleCount: p.units.length,
        doneCount,
        started: videos.some((v) => progress[v.id]),
        nextLessonId: next?.id || videos[0]?.id || null,
        learners: learners[p.id] || 0,
      };
    })
    .filter((s) => s.lessonCount > 0);
}

// "Play your first four chords on guitar" -> "play your first four chords on guitar", for
// "Learn to …". Words that are always capitalised (Google, HTML) keep their capital.
export function learnToPhrase(title) {
  const [first, ...rest] = title.split(' ');
  const keep = /^[A-Z]{2,}/.test(first) || ['Google', 'BandLab'].includes(first);
  return [keep ? first : first.toLowerCase(), ...rest].join(' ').replace(/:.*$/, '');
}
