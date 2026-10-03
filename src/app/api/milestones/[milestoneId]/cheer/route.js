import prisma from '../../../../../lib/prismadb';
import { error, json, requireUserId } from '../../../../../lib/api';
import { rateLimit } from '../../../../../lib/rateLimit';
import { notify, retract } from '../../../../../lib/notifications';

async function cheerCount(milestoneId) {
  return prisma.cheer.count({ where: { milestoneId } });
}

export async function POST(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to cheer.');
  const limited = await rateLimit('reaction', userId);
  if (limited) return limited;

  const milestone = await prisma.milestone.findUnique({
    where: { id: params.milestoneId },
    select: { id: true, userId: true },
  });
  if (!milestone) return error(404, 'Milestone not found.');
  if (milestone.userId === userId) return error(400, "You can't cheer your own milestone.");

  await prisma.cheer.upsert({
    where: { userId_milestoneId: { userId, milestoneId: milestone.id } },
    update: {},
    create: { userId, milestoneId: milestone.id },
  });
  await notify('CHEER', { userId: milestone.userId, actorId: userId, milestoneId: milestone.id });
  return json({ cheered: true, cheerCount: await cheerCount(milestone.id) });
}

export async function DELETE(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to change cheers.');
  const limited = await rateLimit('reaction', userId);
  if (limited) return limited;

  const { count } = await prisma.cheer.deleteMany({
    where: { userId, milestoneId: params.milestoneId },
  });
  if (count) {
    const milestone = await prisma.milestone.findUnique({
      where: { id: params.milestoneId }, select: { userId: true },
    });
    await retract('CHEER', { userId: milestone?.userId, actorId: userId, milestoneId: params.milestoneId });
  }
  return json({ cheered: false, cheerCount: await cheerCount(params.milestoneId) });
}
