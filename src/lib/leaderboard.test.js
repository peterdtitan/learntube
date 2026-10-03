import { describe, expect, it } from 'vitest';
import { leaderboardWeekStart, rankTotals } from './leaderboard';

describe('leaderboardWeekStart', () => {
  it('returns Monday 00:00 UTC of the current week', () => {
    expect(leaderboardWeekStart(new Date('2026-10-03T15:00:00Z')).toISOString()).toBe('2026-09-28T00:00:00.000Z');
    expect(leaderboardWeekStart(new Date('2026-09-28T00:00:00Z')).toISOString()).toBe('2026-09-28T00:00:00.000Z');
    expect(leaderboardWeekStart(new Date('2026-10-04T23:59:59Z')).toISOString()).toBe('2026-09-28T00:00:00.000Z');
  });
});

describe('rankTotals', () => {
  it('sorts by XP and shares ranks on ties', () => {
    const ranked = rankTotals([
      { userId: 'a', xp: 50 }, { userId: 'b', xp: 120 }, { userId: 'c', xp: 50 }, { userId: 'd', xp: 10 },
    ]);
    expect(ranked.map((r) => [r.userId, r.rank])).toEqual([['b', 1], ['a', 2], ['c', 2], ['d', 4]]);
  });
});
