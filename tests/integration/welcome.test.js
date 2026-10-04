import { describe, expect, it } from 'vitest';
import {
  formData, makeUser, prisma, signIn,
} from './helpers.mjs';
import { saveWelcome, skipWelcome } from '../../src/app/welcome/actions.js';
import skillDefs from '../../content/skills';
import { planSkill } from '../../src/lib/content/plan.js';
import { importSkills } from '../../src/lib/content/importPathway.js';
import { getShortSkills } from '../../src/lib/skills.js';
import { getCommunityPulse } from '../../src/lib/community.js';

function surveyForm({ interests = [], goal, weeklyGoal } = {}) {
  const form = formData({ goal: goal || '', weeklyGoal: String(weeklyGoal || '') });
  interests.forEach((id) => form.append('interest', id));
  return form;
}

describe('the welcome survey', () => {
  it('saves interests, goal and practice days, then sends the learner home', async () => {
    const user = await makeUser();
    signIn(user);
    await expect(saveWelcome(surveyForm({ interests: ['guitar', 'cooking'], goal: 'HOBBY', weeklyGoal: 4 })))
      .rejects.toMatchObject({ redirectTo: '/?welcome=1' });
    const saved = await prisma.user.findUnique({ where: { id: user.id } });
    expect(saved.interests.sort()).toEqual(['cooking', 'guitar']);
    expect(saved.learningGoal).toBe('HOBBY');
    expect(saved.weeklyGoal).toBe(4);
    expect(saved.onboardedAt).toBeInstanceOf(Date);
  });

  it('drops unknown interests and goals, and ignores an out-of-range goal', async () => {
    const user = await makeUser();
    signIn(user);
    await expect(saveWelcome(surveyForm({ interests: ['guitar', 'not-a-skill', 'guitar'], goal: 'FAME', weeklyGoal: 9 })))
      .rejects.toMatchObject({ redirectTo: '/?welcome=1' });
    const saved = await prisma.user.findUnique({ where: { id: user.id } });
    expect(saved.interests).toEqual(['guitar']);
    expect(saved.learningGoal).toBeNull();
    expect(saved.weeklyGoal).toBe(3);
  });

  it('can be skipped, and needs a signed-in learner', async () => {
    const user = await makeUser();
    signIn(user);
    await expect(skipWelcome()).rejects.toMatchObject({ redirectTo: '/' });
    expect((await prisma.user.findUnique({ where: { id: user.id } })).onboardedAt).toBeInstanceOf(Date);

    signIn(null);
    await expect(saveWelcome(surveyForm({ interests: ['guitar'] })))
      .rejects.toMatchObject({ redirectTo: '/auth/signin?callbackUrl=/welcome' });
  });
});

describe('short skills', () => {
  const plans = skillDefs.map(planSkill);

  it('import once, as skills, with time to learn under 20 hours each', async () => {
    const first = await importSkills(plans, { publishQuizzes: true });
    expect(first.every((r) => r.status === 'created')).toBe(true);
    const again = await importSkills(plans);
    expect(again.every((r) => r.status === 'exists')).toBe(true);

    const skills = await getShortSkills(null);
    expect(skills.length).toBe(plans.length);
    skills.forEach((s) => {
      expect(s.minutes, s.title).toBeLessThanOrEqual(20 * 60);
      expect(s.lessonCount, s.title).toBeGreaterThan(0);
    });
    expect(await prisma.pathway.count({ where: { kind: 'SKILL' } })).toBe(plans.length);
  });

  it('count each learner once and show the viewer’s progress', async () => {
    await importSkills(plans);
    const guitar = await prisma.pathway.findUnique({
      where: { slug: 'skill-guitar-four-chords' },
      include: { units: { orderBy: { order: 'asc' }, include: { videos: { orderBy: { order: 'asc' } } } } },
    });
    const [lesson] = guitar.units[0].videos;
    const [ada, bola] = [await makeUser(), await makeUser()];
    await prisma.xpEvent.createMany({
      data: [
        {
          userId: ada.id, kind: 'WATCH', amount: 5, sourceKey: 'a1', pathwayId: guitar.id,
        },
        {
          userId: ada.id, kind: 'TRY', amount: 25, sourceKey: 'a2', pathwayId: guitar.id,
        },
        {
          userId: bola.id, kind: 'WATCH', amount: 5, sourceKey: 'b1', pathwayId: guitar.id,
        },
      ],
    });
    await prisma.videoProgress.create({
      data: {
        userId: ada.id, videoId: lesson.id, stoppedAt: 0, triedAt: new Date(),
      },
    });

    const forAda = (await getShortSkills(ada.id)).find((s) => s.id === guitar.id);
    expect(forAda.learners).toBe(2);
    expect(forAda.started).toBe(true);
    expect(forAda.doneCount).toBe(1);

    const pulse = await getCommunityPulse(null);
    expect(pulse.stats).toMatchObject({ learners: 2, tried: 1 });
  });
});
