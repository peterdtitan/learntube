import { describe, expect, it } from 'vitest';
import {
  estimatePathway, formatMinutes, funEquivalent, practiceMinutesFor,
} from './estimate';

describe('practiceMinutesFor', () => {
  it('uses the admin’s figure, else 1.5x the video within 5-60 minutes', () => {
    expect(practiceMinutesFor({ duration: 600, practiceMinutes: 20 })).toBe(20);
    expect(practiceMinutesFor({ duration: 600, practiceMinutes: null })).toBe(15);
    expect(practiceMinutesFor({ duration: 60 })).toBe(5);
    expect(practiceMinutesFor({ duration: 7200 })).toBe(60);
  });
});

describe('estimatePathway', () => {
  it('adds watching, practice and published quizzes per module', () => {
    const est = estimatePathway([
      {
        quizzes: [{ kind: 'CHECKPOINT', published: true, timeLimitSec: 600 }, { kind: 'MODULE_GAME', published: false }],
        videos: [
          { duration: 600, practiceMinutes: 20, quizzes: [{ kind: 'LESSON_CHECK', published: true }] },
          { duration: 300 },
        ],
      },
      { videos: [{ duration: 1200, practiceMinutes: 0 }] },
    ]);
    expect(est.modules[0]).toEqual({
      video: 15, practice: 28, quizzes: 12, total: 55,
    });
    expect(est.total).toBe(75);
  });
});

describe('formatMinutes', () => {
  it('reads naturally', () => {
    expect(formatMinutes(45)).toBe('45 min');
    expect(formatMinutes(60)).toBe('1 h');
    expect(formatMinutes(380)).toBe('6 h 20 min');
  });
});

describe('funEquivalent', () => {
  it('prefers the skill’s own comparison', () => {
    expect(funEquivalent(90, 'cooking').label).toBe('10 soft-boiled eggs');
    expect(funEquivalent(60, 'guitar').label).toBe('17 songs strummed');
  });

  it('switches to bigger things for long pathways', () => {
    expect(funEquivalent(380, 'unknown').label).toBe('48 long showers');
    expect(funEquivalent(2400, 'unknown').label).toBe('23 football matches');
  });

  it('returns nothing for zero time', () => {
    expect(funEquivalent(0, 'cooking')).toBeNull();
  });
});
