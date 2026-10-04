'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../../../lib/admin';
import { planTrack } from '../../../lib/content/plan';
import {
  importTrack, removeDemoContent, setPathwayQuizzesPublished,
} from '../../../lib/content/importPathway';
import cybersecurityExpert from '../../../../content/cybersecurity-expert';

// Content shipped with the app, ready to load into any database from /admin.
const LIBRARY = { 'cybersecurity-expert': cybersecurityExpert };

export async function importLibraryTrack(prev, form) {
  await requireAdmin();
  const def = LIBRARY[String(form.get('slug'))];
  if (!def) return { error: 'Unknown program.' };
  const plan = planTrack(def);
  if (plan.problems.length) return { error: `The content has problems: ${plan.problems[0]}` };
  const result = await importTrack(plan, { publishQuizzes: form.get('publish') === 'on' });
  revalidatePath('/', 'layout');
  const created = result.courses.filter((c) => c.status === 'created');
  if (!created.length) return { ok: 'Everything was already imported. Nothing changed.' };
  const lessons = created.reduce((n, c) => n + c.lessons, 0);
  const questions = created.reduce((n, c) => n + c.questions, 0);
  return { ok: `Imported ${created.length} courses: ${lessons} lessons and ${questions} questions.` };
}

export async function removeDemo() {
  await requireAdmin();
  await removeDemoContent();
  revalidatePath('/', 'layout');
}

export async function publishPathwayQuizzes(form) {
  await requireAdmin();
  await setPathwayQuizzesPublished(String(form.get('pathwayId')), form.get('published') === 'true');
  revalidatePath('/', 'layout');
}
