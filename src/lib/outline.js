import prisma from './prismadb';
import { getProgressByVideoId, isLessonDone } from './course';
import { estimateModule, estimatePathway, funEquivalent } from './estimate';
import { checkpointIndex } from './quizzes';

const PUBLISHED = {
  where: { published: true },
  include: { _count: { select: { questions: true } } },
};

// Everything the pathway page and the lesson sidebar need: modules in order, each with
// its lessons, the checkpoint placed among them, the game at the end, time estimates,
// and (signed in) progress and best quiz scores.
export async function getPathwayOutline(pathwayId, userId) {
  const pathway = await prisma.pathway.findUnique({
    where: { id: pathwayId },
    include: {
      skill: true,
      track: {
        select: {
          slug: true,
          title: true,
          pathways: { orderBy: { trackOrder: 'asc' }, select: { id: true, title: true, certification: true } },
        },
      },
      units: {
        orderBy: { order: 'asc' },
        include: {
          quizzes: PUBLISHED,
          videos: { orderBy: { order: 'asc' }, include: { quizzes: PUBLISHED } },
        },
      },
    },
  });
  if (!pathway) return null;

  const lessons = pathway.units.flatMap((u) => u.videos);
  const quizIds = [
    ...pathway.units.flatMap((u) => u.quizzes.map((q) => q.id)),
    ...lessons.flatMap((v) => v.quizzes.map((q) => q.id)),
  ];
  const [progress, attempts] = await Promise.all([
    getProgressByVideoId(userId, lessons.map((v) => v.id)),
    userId && quizIds.length
      ? prisma.quizAttempt.groupBy({
        by: ['quizId'],
        where: { userId, quizId: { in: quizIds }, submittedAt: { not: null } },
        _max: { finalScore: true },
      })
      : [],
  ]);
  const bestScore = Object.fromEntries(attempts.map((a) => [a.quizId, a._max.finalScore]));
  const quizInfo = (q) => (q ? {
    id: q.id,
    kind: q.kind,
    title: q.title,
    questionCount: q._count.questions,
    timeLimitSec: q.timeLimitSec,
    passPercent: q.passPercent,
    best: bestScore[q.id] ?? null,
    passed: bestScore[q.id] != null && bestScore[q.id] >= q.passPercent,
  } : null);

  const estimate = estimatePathway(pathway.units);
  const skillId = pathway.skill?.id;

  const modules = pathway.units.map((unit, i) => {
    const checkpoint = unit.quizzes.find((q) => q.kind === 'CHECKPOINT' && q._count.questions);
    const game = unit.quizzes.find((q) => q.kind === 'MODULE_GAME');
    const hasGameQuestions = Boolean(game) && (game._count.questions > 0
      || unit.videos.some((v) => v.quizzes.some((q) => q.kind === 'LESSON_CHECK' && q._count.questions)));
    const minutes = estimateModule(unit).total;
    return {
      id: unit.id,
      number: i + 1,
      title: unit.title,
      description: unit.description,
      minutes,
      fun: funEquivalent(minutes, skillId),
      lessons: unit.videos.map((v) => ({
        id: v.id,
        title: v.title,
        duration: v.duration,
        done: isLessonDone(progress[v.id]),
        check: quizInfo(v.quizzes.find((q) => q.kind === 'LESSON_CHECK' && q._count.questions)),
      })),
      checkpoint: quizInfo(checkpoint),
      checkpointAfter: checkpoint ? checkpointIndex(unit.videos, checkpoint.afterVideoId) : -1,
      game: hasGameQuestions ? quizInfo(game) : null,
    };
  });

  return {
    pathway: {
      id: pathway.id,
      title: pathway.title,
      description: pathway.description,
      makeTitle: pathway.makeTitle,
      certification: pathway.certification,
      skill: pathway.skill
        ? { id: pathway.skill.id, name: pathway.skill.name, color: pathway.skill.color }
        : null,
    },
    track: pathway.track ? {
      slug: pathway.track.slug,
      title: pathway.track.title,
      courses: pathway.track.pathways,
      position: pathway.track.pathways.findIndex((p) => p.id === pathway.id),
    } : null,
    estimate: { ...estimate, fun: funEquivalent(estimate.total, skillId) },
    modules,
    lessonCount: lessons.length,
    doneCount: lessons.filter((v) => isLessonDone(progress[v.id])).length,
    nextLessonId: (lessons.find((v) => !isLessonDone(progress[v.id])) || lessons[0])?.id || null,
  };
}

export default getPathwayOutline;
