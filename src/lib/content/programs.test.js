import { describe, expect, it } from 'vitest';
import { LIBRARY } from './library';
import { MAX_LESSON_SECONDS, planTrack } from './plan';

// Checks every program in the library before it can be imported. Cybersecurity Expert has
// more checks of its own in cybersecurity.test.js.
const plans = Object.values(LIBRARY).map(planTrack);
const AUTHORED = plans.filter((p) => p.track.slug !== 'cybersecurity-expert');

describe.each(plans.map((p) => [p.track.title, p]))('%s', (title, plan) => {
  it('has no problems: every video placed and written, every question valid', () => {
    expect(plan.problems).toEqual([]);
  });

  it('keeps every lesson to 10 minutes or less', () => {
    plan.courses.flatMap((c) => c.modules.flatMap((m) => m.lessons)).forEach((l) => {
      expect(l.duration, l.title).toBeLessThanOrEqual(MAX_LESSON_SECONDS);
    });
  });

  it('ends every module with an exam that draws from a bigger bank', () => {
    plan.courses.flatMap((c) => c.modules).forEach((m) => {
      expect(m.checkpoint, m.title).toBeTruthy();
      expect(m.checkpoint.drawCount, m.title).toBeLessThan(m.checkpoint.questions.length);
    });
  });
});

describe.each(AUTHORED.map((p) => [p.track.title, p]))('%s', (title, plan) => {
  it('banks at least 20 questions for every module exam', () => {
    plan.courses.flatMap((c) => c.modules).forEach((m) => {
      expect(m.checkpoint.questions.length, m.title).toBeGreaterThanOrEqual(20);
    });
  });

  it('says what to make in every course and asks for it in a Try task', () => {
    plan.courses.forEach((c) => {
      expect(c.pathway.makeTitle, c.pathway.title).toBeTruthy();
      const tries = c.modules.flatMap((m) => m.lessons.map((l) => l.tryTask || ''));
      expect(tries.some((t) => /as your make/i.test(t)), c.pathway.title).toBe(true);
    });
  });
});

it('gives every course its own slug, starting with its program’s', () => {
  const slugs = plans.flatMap((p) => p.courses.map((c) => c.pathway.slug));
  expect(new Set(slugs).size).toBe(slugs.length);
  plans.forEach((p) => p.courses.forEach((c) => {
    expect(c.pathway.slug.startsWith(p.track.slug), c.pathway.slug).toBe(true);
  }));
});
