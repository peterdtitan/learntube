import prisma from './prismadb';
import { awardXp, getLearnerSummary } from './xp';
import { getPathwayOverviews } from './course';
import { describeMilestone, reachedMilestones } from './milestoneRules';

// The pathway and skill a lesson belongs to, whether it sits in a unit or directly on a pathway.
export async function lessonContext(videoId) {
  const video = await prisma.video.findUnique({
    where: { id: videoId },
    select: {
      pathway: { select: { id: true, skillId: true } },
      unit: { select: { pathway: { select: { id: true, skillId: true } } } },
    },
  });
  const pathway = video?.unit?.pathway || video?.pathway;
  return pathway ? { pathwayId: pathway.id, skillId: pathway.skillId } : {};
}

export async function pathwayContext(pathwayId) {
  const pathway = await prisma.pathway.findUnique({
    where: { id: pathwayId },
    select: { skillId: true },
  });
  return pathway ? { pathwayId, skillId: pathway.skillId } : {};
}

// Records any milestones the learner has newly reached and returns them as sentences
// addressed to the learner, e.g. "You reached 250 XP".
export async function recordMilestones(userId) {
  const [summary, makeCount, pathways, existing] = await Promise.all([
    getLearnerSummary(userId),
    prisma.make.count({ where: { userId } }),
    getPathwayOverviews(userId),
    prisma.milestone.findMany({ where: { userId }, select: { key: true } }),
  ]);
  if (!summary) return [];

  const have = new Set(existing.map((m) => m.key));
  const finished = pathways.filter((p) => p.lessonCount > 0 && p.doneCount === p.lessonCount);
  const fresh = reachedMilestones({
    xpTotal: summary.xp.total,
    streakWeeks: summary.streakWeeks,
    makeCount,
    finishedPathwayIds: finished.map((p) => p.id),
  }).filter((m) => !have.has(m.key));
  if (!fresh.length) return [];

  await prisma.milestone.createMany({
    data: fresh.map((m) => ({ userId, ...m })),
    skipDuplicates: true,
  });
  const titles = Object.fromEntries(finished.map((p) => [p.id, p.title]));
  return fresh.map((m) => `You ${describeMilestone(m, titles[m.pathwayId], 'your')}`);
}

// Award XP, then check milestones. Returns { xpAwarded, milestones }.
export async function reward(userId, kind, sourceKey, context) {
  const event = await awardXp(userId, kind, sourceKey, context);
  const milestones = event ? await recordMilestones(userId) : [];
  return { xpAwarded: event?.amount || 0, milestones };
}
