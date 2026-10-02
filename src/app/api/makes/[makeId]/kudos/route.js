import prisma from '../../../../../lib/prismadb';
import { error, json, requireUserId } from '../../../../../lib/api';

async function countFor(makeId) {
  return prisma.kudos.count({ where: { makeId } });
}

export async function POST(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to give kudos.');

  const make = await prisma.make.findUnique({
    where: { id: params.makeId },
    select: { id: true, userId: true },
  });
  if (!make) return error(404, 'Make not found.');
  if (make.userId === userId) return error(400, "You can't give kudos to your own make.");

  await prisma.kudos.upsert({
    where: { userId_makeId: { userId, makeId: make.id } },
    update: {},
    create: { userId, makeId: make.id },
  });
  return json({ gaveKudos: true, kudosCount: await countFor(make.id) });
}

export async function DELETE(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to change kudos.');

  await prisma.kudos.deleteMany({ where: { userId, makeId: params.makeId } });
  return json({ gaveKudos: false, kudosCount: await countFor(params.makeId) });
}
