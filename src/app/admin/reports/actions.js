'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../../../lib/prismadb';
import { requireAdmin } from '../../../lib/admin';
import { deletePhotos } from '../../../lib/blob';

async function resolveReports(makeId) {
  await prisma.report.updateMany({
    where: { makeId, resolvedAt: null },
    data: { resolvedAt: new Date() },
  });
}

function refresh() {
  revalidatePath('/admin/reports');
  revalidatePath('/', 'layout');
}

export async function keepVisible(form) {
  await requireAdmin();
  const makeId = String(form.get('makeId'));
  await prisma.make.update({ where: { id: makeId }, data: { hiddenAt: null } });
  await resolveReports(makeId);
  refresh();
}

export async function hideMake(form) {
  await requireAdmin();
  const makeId = String(form.get('makeId'));
  await prisma.make.update({ where: { id: makeId }, data: { hiddenAt: new Date() } });
  await resolveReports(makeId);
  refresh();
}

export async function deleteMake(form) {
  await requireAdmin();
  const makeId = String(form.get('makeId'));
  const make = await prisma.make.findUnique({ where: { id: makeId }, select: { imageUrl: true } });
  if (!make) return;
  await prisma.make.delete({ where: { id: makeId } });
  await deletePhotos([make.imageUrl]);
  refresh();
}
