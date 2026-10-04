import { describe, expect, it } from 'vitest';
import def from '../../../content/cybersecurity-expert';
import { MAX_LESSON_SECONDS, planSummary, planTrack } from './plan';

// Checks the real Cybersecurity Expert content before it can be imported.
describe('Cybersecurity Expert content', () => {
  const plan = planTrack(def);

  it('has no problems: every video placed and authored, every question valid', () => {
    expect(plan.problems).toEqual([]);
  });

  it('is three courses in order: A+, Network+, Security+', () => {
    expect(plan.courses.map((c) => c.pathway.certification)).toEqual([
      'CompTIA A+ (220-1201 and 220-1202)', 'CompTIA Network+ (N10-009)', 'CompTIA Security+ (SY0-701)',
    ]);
  });

  it('keeps every lesson to 10 minutes or less', () => {
    plan.courses.forEach((c) => {
      expect(planSummary(c).longestLesson, c.pathway.title).toBeLessThanOrEqual(MAX_LESSON_SECONDS);
    });
  });

  it('gives every module lessons and a checkpoint, and every video a quick check', () => {
    plan.courses.flatMap((c) => c.modules).forEach((m) => {
      expect(m.lessons.length, m.title).toBeGreaterThan(0);
      expect(m.checkpoint?.questions.length, m.title).toBeGreaterThanOrEqual(8);
    });
    const lastParts = plan.courses.flatMap((c) => c.modules.flatMap((m) => m.lessons))
      .filter((l) => l.endSec === null || !/\(part \d+ of \d+\)$/.test(l.title) || /part (\d+) of \1\)$/.test(l.title));
    lastParts.forEach((l) => expect(l.check?.length, l.title).toBeGreaterThanOrEqual(3));
  });

  it('prints a summary', () => {
    // eslint-disable-next-line no-console
    console.log(plan.courses.map((c) => `${c.pathway.title}: ${JSON.stringify(planSummary(c))}`).join('\n'));
  });
});
