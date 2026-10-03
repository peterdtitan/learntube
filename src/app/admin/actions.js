'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../../lib/prismadb';
import { requireAdmin } from '../../lib/admin';
import { parseYouTubeId } from '../../lib/youtube';

// Every action re-checks the admin role: server actions are public endpoints,
// so hiding the buttons is not enough.

function text(form, name, { required = false, max = 200 } = {}) {
  const value = String(form.get(name) ?? '').trim();
  if (required && !value) return { error: `${name} is required.` };
  if (value.length > max) return { error: `${name} must be ${max} characters or fewer.` };
  return { value: value || null };
}

// Accepts "6:05", "1:02:05" or plain seconds.
function seconds(input) {
  const raw = String(input ?? '').trim();
  if (!raw) return null;
  const parts = raw.split(':').map(Number);
  if (parts.some((n) => !Number.isFinite(n) || n < 0)) return null;
  return parts.reduce((total, n) => total * 60 + n, 0);
}

function refreshContent(pathwayId) {
  revalidatePath('/', 'layout');
  if (pathwayId) revalidatePath(`/admin/pathways/${pathwayId}`);
}

async function pathwayOfUnit(unitId) {
  const unit = await prisma.unit.findUnique({ where: { id: unitId }, select: { pathwayId: true } });
  return unit?.pathwayId || null;
}

// ---------- pathways ----------

function pathwayFields(form) {
  const title = text(form, 'title', { required: true, max: 120 });
  const description = text(form, 'description', { max: 600 });
  const makeTitle = text(form, 'makeTitle', { max: 160 });
  const skillId = text(form, 'skillId', { max: 60 });
  const problem = [title, description, makeTitle, skillId].find((f) => f.error);
  if (problem) return { error: problem.error };
  return {
    data: {
      title: title.value,
      description: description.value,
      makeTitle: makeTitle.value,
      skillId: skillId.value,
    },
  };
}

export async function createPathway(prev, form) {
  const admin = await requireAdmin();
  const { data, error } = pathwayFields(form);
  if (error) return { error };
  const pathway = await prisma.pathway.create({ data: { ...data, ownerId: admin.id } });
  refreshContent();
  return redirect(`/admin/pathways/${pathway.id}`);
}

export async function updatePathway(prev, form) {
  await requireAdmin();
  const id = String(form.get('id'));
  const { data, error } = pathwayFields(form);
  if (error) return { error };
  await prisma.pathway.update({ where: { id }, data });
  refreshContent(id);
  return { ok: 'Saved.' };
}

export async function deletePathway(form) {
  await requireAdmin();
  const id = String(form.get('id'));
  // Deleting a unit only nulls Video.unitId, so remove the lessons explicitly first.
  await prisma.$transaction([
    prisma.video.deleteMany({ where: { OR: [{ unit: { pathwayId: id } }, { pathwayId: id }] } }),
    prisma.pathway.delete({ where: { id } }),
  ]);
  refreshContent();
  redirect('/admin');
}

// ---------- units ----------

export async function createUnit(prev, form) {
  await requireAdmin();
  const pathwayId = String(form.get('pathwayId'));
  const title = text(form, 'title', { required: true, max: 120 });
  if (title.error) return { error: title.error };
  const last = await prisma.unit.findFirst({
    where: { pathwayId }, orderBy: { order: 'desc' }, select: { order: true },
  });
  await prisma.unit.create({
    data: { pathwayId, title: title.value, order: (last?.order ?? -1) + 1 },
  });
  refreshContent(pathwayId);
  return { ok: 'Unit added.' };
}

export async function renameUnit(form) {
  await requireAdmin();
  const id = String(form.get('id'));
  const title = text(form, 'title', { required: true, max: 120 });
  if (title.error) return;
  const unit = await prisma.unit.update({ where: { id }, data: { title: title.value } });
  refreshContent(unit.pathwayId);
}

export async function deleteUnit(form) {
  await requireAdmin();
  const id = String(form.get('id'));
  const unit = await prisma.unit.findUnique({
    where: { id }, include: { _count: { select: { videos: true } } },
  });
  // Only empty units can go, so lessons are never deleted as a side effect.
  if (!unit || unit._count.videos > 0) return;
  await prisma.unit.delete({ where: { id } });
  refreshContent(unit.pathwayId);
}

// Swap order with the neighbour above (-1) or below (+1).
async function move(model, where, item, direction) {
  const neighbour = await prisma[model].findFirst({
    where: { ...where, order: direction < 0 ? { lt: item.order } : { gt: item.order } },
    orderBy: { order: direction < 0 ? 'desc' : 'asc' },
  });
  if (!neighbour) return;
  await prisma.$transaction([
    prisma[model].update({ where: { id: item.id }, data: { order: neighbour.order } }),
    prisma[model].update({ where: { id: neighbour.id }, data: { order: item.order } }),
  ]);
}

export async function moveUnit(form) {
  await requireAdmin();
  const unit = await prisma.unit.findUnique({ where: { id: String(form.get('id')) } });
  if (!unit) return;
  await move('unit', { pathwayId: unit.pathwayId }, unit, Number(form.get('direction')));
  refreshContent(unit.pathwayId);
}

// ---------- lessons ----------

export async function saveLesson(prev, form) {
  await requireAdmin();
  const id = form.get('id') ? String(form.get('id')) : null;
  const unitId = String(form.get('unitId'));
  const videoId = parseYouTubeId(String(form.get('url') ?? ''));
  if (!videoId) return { error: 'Paste a YouTube video link.' };
  const duration = seconds(form.get('duration'));
  if (!duration) return { error: 'Add the video length, e.g. 6:05.' };

  const fields = {
    title: text(form, 'title', { required: true, max: 160 }),
    description: text(form, 'description', { max: 600 }),
    tryTask: text(form, 'tryTask', { required: true, max: 300 }),
    transcript: text(form, 'transcript', { max: 50000 }),
    captionsLang: text(form, 'captionsLang', { max: 10 }),
    starterCode: text(form, 'starterCode', { max: 20000 }),
  };
  const problem = Object.values(fields).find((f) => f.error);
  if (problem) return { error: problem.error };

  const pathwayId = await pathwayOfUnit(unitId);
  if (!pathwayId) return { error: 'Pick a unit.' };

  const data = {
    unitId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    duration,
    title: fields.title.value,
    description: fields.description.value,
    tryTask: fields.tryTask.value,
    transcript: fields.transcript.value,
    captionsLang: fields.captionsLang.value || 'en',
    starterCode: fields.starterCode.value,
  };

  if (id) {
    await prisma.video.update({ where: { id }, data });
  } else {
    const last = await prisma.video.findFirst({
      where: { unitId }, orderBy: { order: 'desc' }, select: { order: true },
    });
    await prisma.video.create({ data: { ...data, order: (last?.order ?? -1) + 1 } });
  }
  refreshContent(pathwayId);
  return redirect(`/admin/pathways/${pathwayId}`);
}

export async function moveLesson(form) {
  await requireAdmin();
  const lesson = await prisma.video.findUnique({ where: { id: String(form.get('id')) } });
  if (!lesson?.unitId) return;
  await move('video', { unitId: lesson.unitId }, lesson, Number(form.get('direction')));
  refreshContent(await pathwayOfUnit(lesson.unitId));
}

export async function deleteLesson(form) {
  await requireAdmin();
  const id = String(form.get('id'));
  const lesson = await prisma.video.findUnique({ where: { id }, select: { unitId: true } });
  if (!lesson) return;
  // Progress and notes cascade; makes from this lesson stay, unlinked from it.
  await prisma.video.delete({ where: { id } });
  const pathwayId = lesson.unitId ? await pathwayOfUnit(lesson.unitId) : null;
  refreshContent(pathwayId);
  redirect(pathwayId ? `/admin/pathways/${pathwayId}` : '/admin');
}
