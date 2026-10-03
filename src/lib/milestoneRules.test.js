import { describe, expect, it } from 'vitest';
import { describeMilestone, reachedMilestones, xpMilestones } from './milestoneRules';

describe('xpMilestones', () => {
  it('lists every threshold crossed, then each extra 1,000', () => {
    expect(xpMilestones(99)).toEqual([]);
    expect(xpMilestones(100)).toEqual([100]);
    expect(xpMilestones(600)).toEqual([100, 250, 500]);
    expect(xpMilestones(3500)).toEqual([100, 250, 500, 1000, 2000, 3000]);
  });
});

describe('reachedMilestones', () => {
  it('builds stable keys for each kind', () => {
    const keys = reachedMilestones({
      xpTotal: 260, streakWeeks: 4, makeCount: 1, finishedPathwayIds: ['p1'],
    }).map((m) => m.key);
    expect(keys).toEqual(['xp:100', 'xp:250', 'streak:2', 'streak:4', 'first-make', 'pathway:p1']);
  });

  it('is empty for a brand-new learner', () => {
    expect(reachedMilestones({
      xpTotal: 0, streakWeeks: 0, makeCount: 0, finishedPathwayIds: [],
    })).toEqual([]);
  });
});

describe('describeMilestone', () => {
  it('reads as a sentence after the learner’s name', () => {
    expect(describeMilestone({ kind: 'XP', value: 1000 })).toBe('reached 1,000 XP');
    expect(describeMilestone({ kind: 'STREAK', value: 4 })).toBe('kept a 4-week practice streak');
    expect(describeMilestone({ kind: 'PATHWAY_DONE' }, 'Data Basics')).toBe('finished Data Basics');
    expect(describeMilestone({ kind: 'FIRST_MAKE' })).toBe('logged their first make');
    expect(describeMilestone({ kind: 'FIRST_MAKE' }, null, 'your')).toBe('logged your first make');
  });
});
