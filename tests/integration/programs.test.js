import { describe, expect, it } from 'vitest';
import {
  formData, makeUser, prisma, signIn,
} from './helpers.mjs';
import { LIBRARY, shortSkills } from '../../src/lib/content/library.js';
import { planSkill, planTrack } from '../../src/lib/content/plan.js';
import { importSkills, importTrack, syncExams } from '../../src/lib/content/importPathway.js';
import { getTrackOverview } from '../../src/lib/tracks.js';
import * as contentActions from '../../src/app/admin/content/actions.js';

// Cybersecurity Expert has its own, longer checks in content.test.js.
const programs = Object.values(LIBRARY)
  .filter((def) => def.slug !== 'cybersecurity-expert')
  .map(planTrack);

describe.each(programs.map((p) => [p.track.title, p]))('importing %s', (title, plan) => {
  it('creates the program and its courses in order, with every lesson and module exam', async () => {
    const result = await importTrack(plan);
    expect(result.courses.map((c) => c.status)).toEqual(plan.courses.map(() => 'created'));

    const track = await prisma.track.findUnique({
      where: { slug: plan.track.slug },
      include: { pathways: { orderBy: { trackOrder: 'asc' } } },
    });
    expect(track.pathways.map((p) => p.slug)).toEqual(plan.courses.map((c) => c.pathway.slug));

    const modules = plan.courses.flatMap((c) => c.modules);
    expect(await prisma.video.count()).toBe(modules.reduce((n, m) => n + m.lessons.length, 0));
    expect(await prisma.video.count({ where: { duration: { gt: 600 } } })).toBe(0);
    expect(await prisma.quiz.count({ where: { kind: 'CHECKPOINT' } })).toBe(modules.length);
    expect(await prisma.quiz.count({ where: { published: true } })).toBe(0);

    const overview = await getTrackOverview(plan.track.slug, null);
    expect(overview.courses).toHaveLength(plan.courses.length);
    expect(overview.minutes).toBeGreaterThan(10 * 60);
    expect(overview.fun.label).toMatch(/\d+ /);
  });
});

describe('the content library', () => {
  it('lets an admin import any program by its slug, once', async () => {
    signIn(await makeUser({ admin: true }));
    const first = await contentActions.importLibraryTrack(null, formData({ slug: 'data-analyst' }));
    expect(first.ok).toMatch(/^Imported 3 courses: \d+ lessons and \d+ questions\.$/);
    const again = await contentActions.importLibraryTrack(null, formData({ slug: 'data-analyst' }));
    expect(again.ok).toBe('Everything was already imported. Nothing changed.');
    expect(await contentActions.importLibraryTrack(null, formData({ slug: 'nope' })))
      .toEqual({ error: 'Unknown program.' });
    expect(await prisma.track.count()).toBe(1);
  });

  it('adds module exams, as drafts, to short skills imported before they had any', async () => {
    const plans = shortSkills.map(planSkill);
    // What production holds: the skills, imported before their module exams were written.
    const before = plans.map((p) => ({
      ...p, modules: p.modules.map((m) => ({ ...m, checkpoint: null })),
    }));
    await importSkills(before);
    expect(await prisma.quiz.count({ where: { kind: 'CHECKPOINT' } })).toBe(0);

    const modules = plans.flatMap((p) => p.modules);
    const report = await syncExams(plans);
    expect(report).toMatchObject({ exams: modules.length, created: modules.length, skipped: [] });
    expect(report.added).toBe(modules.reduce((n, m) => n + m.checkpoint.questions.length, 0));
    expect(await prisma.quiz.count({ where: { kind: 'CHECKPOINT', published: true } })).toBe(0);
    expect((await syncExams(plans)).added).toBe(0);
  });
});
