import { describe, expect, it } from 'vitest';
import {
  clampGoal, localDayKey, summarizePractice, weekStartKey,
} from './practice';

const at = (iso) => new Date(iso);

describe('weekStartKey', () => {
  it('returns the Monday of the week', () => {
    expect(weekStartKey('2026-10-01')).toBe('2026-09-28'); // Thursday
    expect(weekStartKey('2026-09-28')).toBe('2026-09-28'); // Monday
    expect(weekStartKey('2026-10-04')).toBe('2026-09-28'); // Sunday
  });
});

describe('localDayKey', () => {
  it('uses the learner time zone, not UTC', () => {
    const lateEvening = at('2026-10-01T23:30:00Z');
    expect(localDayKey(lateEvening, 'UTC')).toBe('2026-10-01');
    expect(localDayKey(lateEvening, 'Africa/Lagos')).toBe('2026-10-02');
    expect(localDayKey(lateEvening, 'America/New_York')).toBe('2026-10-01');
  });
});

describe('clampGoal', () => {
  it('keeps the goal between 2 and 5 days', () => {
    expect(clampGoal(1)).toBe(2);
    expect(clampGoal(3)).toBe(3);
    expect(clampGoal(9)).toBe(5);
  });
});

describe('summarizePractice', () => {
  const now = at('2026-10-01T12:00:00Z'); // Thursday

  it('counts distinct days, not events', () => {
    const s = summarizePractice({
      practiceDates: [at('2026-09-28T09:00:00Z'), at('2026-09-28T18:00:00Z'), at('2026-09-30T10:00:00Z')],
      goal: 3,
      now,
    });
    expect(s.doneThisWeek).toBe(2);
    expect(s.metThisWeek).toBe(false);
    expect(s.days.filter((d) => d.practiced).map((d) => d.date)).toEqual(['2026-09-28', '2026-09-30']);
    expect(s.days.find((d) => d.isToday).date).toBe('2026-10-01');
    expect(s.daysLeftThisWeek).toBe(4);
  });

  it('does not break the streak while the current week is still in progress', () => {
    const s = summarizePractice({
      practiceDates: [
        // two previous weeks, goal met
        at('2026-09-14T10:00:00Z'), at('2026-09-16T10:00:00Z'),
        at('2026-09-22T10:00:00Z'), at('2026-09-25T10:00:00Z'),
      ],
      goal: 2,
      now,
    });
    expect(s.doneThisWeek).toBe(0);
    expect(s.streakWeeks).toBe(2);
  });

  it('adds the current week once its goal is met', () => {
    const s = summarizePractice({
      practiceDates: [
        at('2026-09-22T10:00:00Z'), at('2026-09-25T10:00:00Z'),
        at('2026-09-28T10:00:00Z'), at('2026-09-29T10:00:00Z'),
      ],
      goal: 2,
      now,
    });
    expect(s.metThisWeek).toBe(true);
    expect(s.streakWeeks).toBe(2);
  });

  it('stops at the first past week that missed the goal', () => {
    const s = summarizePractice({
      practiceDates: [
        at('2026-09-08T10:00:00Z'), at('2026-09-09T10:00:00Z'), // met
        at('2026-09-15T10:00:00Z'), // missed (1 of 2)
        at('2026-09-22T10:00:00Z'), at('2026-09-23T10:00:00Z'), // met
      ],
      goal: 2,
      now,
    });
    expect(s.streakWeeks).toBe(1);
  });

  it('places days in the learner time zone when deciding the week', () => {
    // Sunday 23:30 UTC is already Monday in Lagos, so it belongs to this week there.
    const sundayNight = at('2026-09-27T23:30:00Z');
    const utc = summarizePractice({ practiceDates: [sundayNight], goal: 2, now });
    const lagos = summarizePractice({
      practiceDates: [sundayNight], goal: 2, timeZone: 'Africa/Lagos', now,
    });
    expect(utc.doneThisWeek).toBe(0);
    expect(lagos.doneThisWeek).toBe(1);
  });
});
