'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '../../../lib/admin';
import { planSkill, planTrack } from '../../../lib/content/plan';
import {
  importSkills, importTrack, removeDemoContent, setPathwayQuizzesPublished, syncExams,
} from '../../../lib/content/importPathway';
import cybersecurityExpert from '../../../../content/cybersecurity-expert';
import shortSkills from '../../../../content/skills';

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

export async function importLibrarySkills(prev, form) {
  await requireAdmin();
  const plans = shortSkills.map(planSkill);
  const problems = plans.flatMap((p) => p.problems);
  if (problems.length) return { error: `The content has problems: ${problems[0]}` };
  const results = await importSkills(plans, { publishQuizzes: form.get('publish') === 'on' });
  revalidatePath('/', 'layout');
  const created = results.filter((r) => r.status === 'created');
  if (!created.length) return { ok: 'Every skill was already imported. Nothing changed.' };
  const lessons = created.reduce((n, r) => n + r.lessons, 0);
  return { ok: `Imported ${created.length} skills with ${lessons} lessons.` };
}

// Adds new exam-bank questions from the library to courses that are already imported.
export async function updateLibraryExams() {
  await requireAdmin();
  const plans = [
    ...Object.values(LIBRARY).flatMap((def) => planTrack(def).courses),
    ...shortSkills.map(planSkill),
  ];
  const problems = plans.flatMap((p) => p.problems);
  if (problems.length) return { error: `The content has problems: ${problems[0]}` };
  const report = await syncExams(plans);
  revalidatePath('/', 'layout');
  if (!report.exams) return { ok: 'No imported courses have module exams yet. Import them first.' };
  const skipped = report.skipped.length
    ? ` Skipped ${report.skipped.length} renamed ${report.skipped.length === 1 ? 'module' : 'modules'}: ${report.skipped.join('; ')}.`
    : '';
  return {
    ok: `Updated ${report.exams} module exams: ${report.added} new questions${report.created ? `, ${report.created} new exams saved as drafts` : ''}.${skipped}`,
  };
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
