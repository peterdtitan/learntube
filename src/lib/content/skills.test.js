import { describe, expect, it } from 'vitest';
import skills from '../../../content/skills';
import {
  MAX_LESSON_SECONDS, MAX_SKILL_HOURS, planSkill, planSummary,
} from './plan';

const plans = skills.map(planSkill);

describe('short skills content', () => {
  it('has no problems', () => {
    expect(plans.flatMap((p) => p.problems)).toEqual([]);
  });

  it('keeps every skill within the time cap and every lesson within 10 minutes', () => {
    plans.forEach((plan) => {
      const summary = planSummary(plan);
      expect(summary.hours, plan.pathway.title).toBeLessThanOrEqual(MAX_SKILL_HOURS);
      expect(summary.longestLesson, plan.pathway.title).toBeLessThanOrEqual(MAX_LESSON_SECONDS);
    });
  });

  it('uses unique slugs, all marked as skills', () => {
    const slugs = plans.map((p) => p.pathway.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(plans.every((p) => p.pathway.kind === 'SKILL')).toBe(true);
  });

  it('prints a summary', () => {
    const rows = plans.map((p) => ({ title: p.pathway.title, ...planSummary(p) }));
    // eslint-disable-next-line no-console
    console.table(rows);
    expect(rows.length).toBe(skills.length);
  });
});
