import { describe, expect, it } from 'vitest';
import {
  formData, makeUser, prisma, signIn,
} from './helpers.mjs';
import def from '../../content/cybersecurity-expert';
import { planTrack } from '../../src/lib/content/plan.js';
import {
  DEMO_OWNER_EMAIL, importTrack, removeDemoContent, setPathwayQuizzesPublished, syncExams,
} from '../../src/lib/content/importPathway.js';
import { getTrackOverview } from '../../src/lib/tracks.js';
import * as contentActions from '../../src/app/admin/content/actions.js';

const plan = planTrack(def);

describe('importing Cybersecurity Expert', () => {
  it('creates the track and its three courses in order, with every lesson and question', async () => {
    const result = await importTrack(plan);
    expect(result.courses.map((c) => c.status)).toEqual(['created', 'created', 'created']);

    const track = await prisma.track.findUnique({
      where: { slug: 'cybersecurity-expert' },
      include: { pathways: { orderBy: { trackOrder: 'asc' } } },
    });
    expect(track.pathways.map((p) => [p.title, p.trackOrder])).toEqual([
      ['IT Foundations', 0], ['Networking', 1], ['Security Operations', 2],
    ]);

    const lessons = plan.courses.reduce((n, c) => n + c.modules.reduce((m, mod) => m + mod.lessons.length, 0), 0);
    expect(await prisma.video.count()).toBe(lessons);
    expect(await prisma.video.count({ where: { duration: { gt: 600 } } })).toBe(0);
    // A split video: same YouTube URL, consecutive parts, each starting before the last ended.
    const parts = await prisma.video.findMany({
      where: { url: { endsWith: 'jX1pobYmZdE' } }, // Network+ "Common Ports", 20 minutes
      orderBy: { startSec: 'asc' },
    });
    expect(parts.length).toBeGreaterThan(1);
    expect(new Set(parts.map((p) => p.url)).size).toBe(1);
    expect(parts[1].startSec).toBeLessThan(parts[0].endSec);

    // Quizzes import as drafts by default.
    expect(await prisma.quiz.count({ where: { published: true } })).toBe(0);
    expect(await prisma.quiz.count({ where: { kind: 'CHECKPOINT' } })).toBe(23);
  });

  it('can be run again without duplicating anything', async () => {
    await importTrack(plan);
    const videos = await prisma.video.count();
    const again = await importTrack(plan);
    expect(again.courses.map((c) => c.status)).toEqual(['exists', 'exists', 'exists']);
    expect(await prisma.video.count()).toBe(videos);
    expect(await prisma.track.count()).toBe(1);
  });

  it('publishes a course’s quizzes in one go and shows time to learn on the track', async () => {
    await importTrack(plan);
    const course = await prisma.pathway.findUnique({ where: { slug: 'cybersecurity-expert-networking' } });
    const count = await setPathwayQuizzesPublished(course.id, true);
    expect(count).toBeGreaterThan(80);

    const overview = await getTrackOverview('cybersecurity-expert', null);
    expect(overview.courses.map((c) => c.certification)).toEqual([
      'CompTIA A+ (220-1201 and 220-1202)', 'CompTIA Network+ (N10-009)', 'CompTIA Security+ (SY0-701)',
    ]);
    expect(overview.minutes).toBeGreaterThan(60 * 60);
    expect(overview.fun.label).toMatch(/\d+ /);
  });

  it('only admins can import from the content library', async () => {
    signIn(await makeUser());
    await expect(contentActions.importLibraryTrack(null, formData({ slug: 'cybersecurity-expert' })))
      .rejects.toThrow('Admins only.');
    expect(await prisma.track.count()).toBe(0);
  });
});

describe('removing the demo content', () => {
  it('deletes only the old sample pathways and their owner', async () => {
    const owner = await makeUser({ email: DEMO_OWNER_EMAIL });
    await prisma.pathway.create({
      data: {
        title: 'Frontend Fundamentals',
        ownerId: owner.id,
        units: {
          create: [{
            title: 'HTML',
            videos: { create: [{ title: 'HTML Basics', url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ', duration: 300 }] },
          }],
        },
      },
    });
    await importTrack(plan);
    const realVideos = await prisma.video.count() - 1;

    expect(await removeDemoContent()).toEqual({ removed: 1 });
    expect(await prisma.user.findUnique({ where: { email: DEMO_OWNER_EMAIL } })).toBeNull();
    expect(await prisma.video.count()).toBe(realVideos);
    expect(await prisma.pathway.count()).toBe(3);
  });
});

describe('updating module exams on courses already imported', () => {
  // What production holds today: 10-question exams, no draw, 15 minutes.
  const oldPlan = {
    ...plan,
    courses: plan.courses.map((c) => ({
      ...c,
      modules: c.modules.map((m) => ({
        ...m,
        checkpoint: m.checkpoint && {
          ...m.checkpoint, drawCount: null, timeLimitSec: 900, questions: m.checkpoint.questions.slice(0, 10),
        },
      })),
    })),
  };

  it('adds the new bank questions and settings, once, without touching what is there', async () => {
    await importTrack(oldPlan);
    const first = await prisma.question.findFirst({ where: { quiz: { kind: 'CHECKPOINT' } }, orderBy: { order: 'asc' } });
    await prisma.question.update({ where: { id: first.id }, data: { explanation: 'An admin’s edit' } });
    const unit = await prisma.unit.findFirst({ where: { title: 'Network security' } });
    await prisma.unit.update({ where: { id: unit.id }, data: { title: 'Renamed by an admin' } });

    const report = await syncExams(plan.courses);
    const banks = plan.courses.flatMap((c) => c.modules).filter((m) => m.checkpoint && m.title !== 'Network security');
    const bankSize = (m) => m.checkpoint.questions.length;
    const expected = banks.reduce((n, m) => n + bankSize(m) - Math.min(10, bankSize(m)), 0);
    expect(report).toMatchObject({
      exams: 22, created: 0, added: expected, skipped: ['Networking: Network security'],
    });

    const exam = await prisma.quiz.findFirst({
      where: { kind: 'CHECKPOINT', unit: { title: banks[0].title } },
      include: { questions: { orderBy: { order: 'asc' } } },
    });
    const { drawCount, timeLimitSec } = banks[0].checkpoint;
    expect(exam).toMatchObject({ drawCount, timeLimitSec });
    expect(exam.questions).toHaveLength(banks[0].checkpoint.questions.length);
    expect(exam.questions.map((q) => q.order)).toEqual(exam.questions.map((_, i) => i));
    expect((await prisma.question.findUnique({ where: { id: first.id } })).explanation).toBe('An admin’s edit');

    expect((await syncExams(plan.courses)).added).toBe(0);
  });
});
