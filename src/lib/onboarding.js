import prisma from './prismadb';
import { GOAL_IDS, itemHref } from './recommend';

const MAX_INTERESTS = 20;

// Only paths on this site, and only the pages a recommendation can lead to.
export function safeNextPath(value) {
  return typeof value === 'string' && /^\/(pathways|tracks)\/[A-Za-z0-9_-]{1,80}$/.test(value) ? value : null;
}

// Saves the start questions' answers and marks the learner as onboarded. Unknown interests
// and out-of-range values are dropped rather than trusted.
export async function saveStartAnswers(userId, { interests = [], goal, weeklyGoal }) {
  const known = new Set((await prisma.skill.findMany({ select: { id: true } })).map((s) => s.id));
  const days = Number(weeklyGoal);
  await prisma.user.update({
    where: { id: userId },
    data: {
      interests: [...new Set(interests)].filter((id) => known.has(id)).slice(0, MAX_INTERESTS),
      learningGoal: GOAL_IDS.includes(goal) ? goal : null,
      onboardedAt: new Date(),
      ...(Number.isInteger(days) && days >= 2 && days <= 5 ? { weeklyGoal: days } : {}),
    },
  });
}

// After signing up from /start: keep the answers (new accounts only; a returning learner's
// own answers win) and open the skill they chose. Returns where to go next.
export async function finishStart(userId, answers) {
  if (!answers) return '/';
  const user = await prisma.user.findUnique({
    where: { id: userId }, select: { onboardedAt: true },
  });
  if (!user) return '/';
  if (!user.onboardedAt) await saveStartAnswers(userId, answers);
  const { pick } = answers;
  if (!pick) return '/';
  const found = pick.kind === 'program'
    ? await prisma.track.findUnique({ where: { id: pick.id }, select: { id: true, slug: true } })
    : await prisma.pathway.findUnique({ where: { id: pick.id }, select: { id: true } });
  return found ? itemHref({ kind: pick.kind, ...found }) : '/';
}
