import prisma from './prismadb';
import { localDayKey, summarizePractice } from './practice';
import { XP } from './xpValues';

export { XP };

const PRACTICE_KINDS = ['TRY', 'LOG'];

// One award per sourceKey, so replaying a video or re-marking a step never pays twice.
// Returns the created event, or null if it was already awarded.
// context ({ pathwayId, skillId }) records where it was earned, for leaderboards;
// context.amount overrides the usual XP for the kind (quizzes vary by type).
export async function awardXp(userId, kind, sourceKey, context = {}) {
  try {
    return await prisma.xpEvent.create({
      data: {
        userId,
        kind,
        amount: context.amount ?? XP[kind],
        sourceKey,
        pathwayId: context.pathwayId || null,
        skillId: context.skillId || null,
      },
    });
  } catch (err) {
    if (err?.code === 'P2002') return null;
    throw err;
  }
}

export async function getLearnerSummary(userId, now = new Date()) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { weeklyGoal: true, timeZone: true, showOnLeaderboard: true },
  });
  if (!user) return null;

  // 16 weeks back covers any realistic streak check without scanning the whole ledger.
  const since = new Date(now.getTime() - 16 * 7 * 24 * 60 * 60 * 1000);
  const [total, recent] = await Promise.all([
    prisma.xpEvent.aggregate({ where: { userId }, _sum: { amount: true } }),
    prisma.xpEvent.findMany({
      where: { userId, createdAt: { gte: since } },
      select: { kind: true, amount: true, createdAt: true },
    }),
  ]);

  const practice = summarizePractice({
    practiceDates: recent.filter((e) => PRACTICE_KINDS.includes(e.kind)).map((e) => e.createdAt),
    goal: user.weeklyGoal,
    timeZone: user.timeZone,
    now,
  });

  const weekStart = practice.days[0].date;
  const xpThisWeek = recent
    .filter((e) => localDayKey(e.createdAt, user.timeZone) >= weekStart)
    .reduce((sum, e) => sum + e.amount, 0);

  return {
    xp: { total: total._sum.amount || 0, thisWeek: xpThisWeek },
    timeZone: user.timeZone,
    showOnLeaderboard: user.showOnLeaderboard,
    ...practice,
  };
}
