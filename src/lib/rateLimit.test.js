import { describe, expect, it } from 'vitest';
import { LIMITS, waitMessage, windowFor } from './rateLimit';

describe('windowFor', () => {
  it('aligns windows to the clock', () => {
    const { start, retryAfter } = windowFor(new Date('2026-10-03T10:07:30Z'), 600);
    expect(start.toISOString()).toBe('2026-10-03T10:00:00.000Z');
    expect(retryAfter).toBe(150);
  });

  it('puts two requests in the same window together', () => {
    const a = windowFor(new Date('2026-10-03T10:00:01Z'), 3600).start;
    const b = windowFor(new Date('2026-10-03T10:59:59Z'), 3600).start;
    expect(a.getTime()).toBe(b.getTime());
  });

  it('never asks to wait less than a second', () => {
    expect(windowFor(new Date('2026-10-03T10:09:59.999Z'), 600).retryAfter).toBe(1);
  });
});

describe('waitMessage', () => {
  it('speaks in minutes, then hours', () => {
    expect(waitMessage(30)).toMatch(/a minute/);
    expect(waitMessage(600)).toMatch(/10 minutes/);
    expect(waitMessage(20000)).toMatch(/6 hours/);
  });
});

describe('LIMITS', () => {
  it('leaves room for the player saving progress through a long lesson', () => {
    // Even the old 5-second save interval (120 in 10 minutes) fits.
    expect(LIMITS.progress.max / LIMITS.progress.windowSeconds).toBeGreaterThan(1 / 5);
  });
});
