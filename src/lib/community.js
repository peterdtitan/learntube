import prisma from './prismadb';
import { listMakes } from './makes';
import { listPublicMilestones } from './social';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// What the community has been up to: this week's numbers and a short feed of makes and
// milestones, newest first.
export async function getCommunityPulse(viewerId, { limit = 6 } = {}) {
  const since = new Date(Date.now() - WEEK_MS);
  const [active, makeCount, tried, makes, milestones] = await Promise.all([
    prisma.xpEvent.groupBy({ by: ['userId'], where: { createdAt: { gte: since } } }),
    prisma.make.count({ where: { createdAt: { gte: since }, hiddenAt: null } }),
    prisma.videoProgress.count({ where: { triedAt: { gte: since } } }),
    listMakes({ viewerId, limit }),
    listPublicMilestones(viewerId, limit),
  ]);
  const feed = [
    ...makes.filter((m) => !m.hidden).map((m) => ({ type: 'make', ...m })),
    ...milestones,
  ]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
  return {
    stats: { learners: active.length, makes: makeCount, tried },
    feed,
  };
}

export default getCommunityPulse;
