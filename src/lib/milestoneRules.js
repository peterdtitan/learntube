// Pure rules for which milestones a learner has reached. Recording happens in milestones.js.

export const XP_THRESHOLDS = [100, 250, 500, 1000];
export const STREAK_THRESHOLDS = [2, 4, 8, 12, 26, 52];

// Every 1,000 XP after the listed thresholds.
export function xpMilestones(total) {
  const reached = XP_THRESHOLDS.filter((t) => total >= t);
  for (let t = 2000; t <= total; t += 1000) reached.push(t);
  return reached;
}

export function reachedMilestones({
  xpTotal, streakWeeks, makeCount, finishedPathwayIds,
}) {
  return [
    ...xpMilestones(xpTotal).map((value) => ({ kind: 'XP', key: `xp:${value}`, value })),
    ...STREAK_THRESHOLDS.filter((t) => streakWeeks >= t)
      .map((value) => ({ kind: 'STREAK', key: `streak:${value}`, value })),
    ...(makeCount > 0 ? [{ kind: 'FIRST_MAKE', key: 'first-make' }] : []),
    ...finishedPathwayIds.map((pathwayId) => ({ kind: 'PATHWAY_DONE', key: `pathway:${pathwayId}`, pathwayId })),
  ];
}

// possessive is 'their' when describing someone else and 'your' when talking to the learner.
export function describeMilestone(m, pathwayTitle, possessive = 'their') {
  switch (m.kind) {
    case 'XP': return `reached ${m.value.toLocaleString('en')} XP`;
    case 'STREAK': return `kept a ${m.value}-week practice streak`;
    case 'FIRST_MAKE': return `logged ${possessive} first make`;
    case 'PATHWAY_DONE': return `finished ${pathwayTitle || 'a pathway'}`;
    default: return 'reached a milestone';
  }
}
