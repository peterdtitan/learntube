// What to suggest to a learner from their welcome survey. Pure, so it's easy to test.

export const GOALS = [
  { id: 'HOBBY', label: 'Something fun for me', hint: 'A hobby to unwind with' },
  { id: 'GIFTS', label: 'Make things for people I love', hint: 'Gifts, repairs, meals' },
  { id: 'CAREER', label: 'Skills for work or a new career', hint: 'Toward a job or certification' },
  { id: 'CURIOUS', label: 'Just curious', hint: 'Show me what’s here' },
];
export const GOAL_IDS = GOALS.map((g) => g.id);

// items: [{ kind: 'skill' | 'program', skill: { id, tier }, minutes, learners, started }]
// Returns { picked, more }: picked matches the learner's interests, more is popular elsewhere.
export function recommend(items, { interests = [], goal = null } = {}, limits = {}) {
  const { picked: pickedMax = 6, more: moreMax = 3 } = limits;
  const wanted = new Set(interests);
  const score = (item) => {
    let s = 0;
    if (item.started) s += 100; // carry on before starting something new
    if (goal === 'CAREER' && item.kind === 'program') s += 40;
    if (goal === 'CAREER' && item.skill?.tier === 'SCREEN') s += 10;
    if (goal === 'GIFTS' && item.skill?.tier === 'HAND') s += 20;
    if (goal !== 'CAREER' && item.kind === 'skill') s += 15;
    if (goal === 'CURIOUS' || goal === 'HOBBY') s += Math.max(0, 10 - item.minutes / 60); // shorter first
    return s + Math.min(item.learners || 0, 50) / 10;
  };
  const byScore = (a, b) => score(b) - score(a);
  const byPopularity = (a, b) => (b.learners || 0) - (a.learners || 0) || a.minutes - b.minutes;

  const picked = items.filter((i) => wanted.has(i.skill?.id)).sort(byScore).slice(0, pickedMax);
  const more = items
    .filter((i) => !wanted.has(i.skill?.id) && i.kind === 'skill')
    .sort(byPopularity)
    .slice(0, moreMax);
  return { picked, more };
}

// Interests with nothing to learn yet, so we can say they're coming rather than ignore them.
export function comingSoon(interests, items, categories) {
  const available = new Set(items.map((i) => i.skill?.id));
  return categories.filter((c) => interests.includes(c.id) && !available.has(c.id));
}
