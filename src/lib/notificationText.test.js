import { describe, expect, it } from 'vitest';
import { describeNotification, notificationKey, timeAgo } from './notificationText';

describe('notificationKey', () => {
  it('is the same for repeat kudos from one learner', () => {
    const refs = { actorId: 'a', makeId: 'm' };
    expect(notificationKey('KUDOS', refs)).toBe(notificationKey('KUDOS', refs));
  });

  it('keeps different comment phrases apart', () => {
    const a = notificationKey('COMMENT', { actorId: 'a', makeId: 'm', preset: 'nice-work' });
    const b = notificationKey('COMMENT', { actorId: 'a', makeId: 'm', preset: 'keep-going' });
    expect(a).not.toBe(b);
  });

  it('rejects unknown kinds', () => {
    expect(() => notificationKey('POKE', {})).toThrow();
  });
});

describe('describeNotification', () => {
  it('quotes the comment phrase and links to the make', () => {
    const n = {
      kind: 'COMMENT', makeId: 'm1', preset: 'nice-work', make: { title: 'Sourdough' },
    };
    expect(describeNotification(n, 'me')).toEqual({
      text: 'said “Nice work!” on “Sourdough”', href: '/makes/m1',
    });
  });

  it('sends follows to the follower and cheers to your own profile', () => {
    expect(describeNotification({ kind: 'FOLLOW', actorId: 'ada' }, 'me').href).toBe('/learners/ada');
    const cheer = describeNotification({ kind: 'CHEER', milestone: { kind: 'FIRST_MAKE' } }, 'me');
    expect(cheer).toEqual({ text: 'cheered you for: logged your first make', href: '/learners/me' });
  });
});

describe('timeAgo', () => {
  const now = new Date('2026-10-03T12:00:00Z');
  it('counts up through minutes, hours and days, then shows the date', () => {
    expect(timeAgo('2026-10-03T11:59:30Z', now)).toBe('just now');
    expect(timeAgo('2026-10-03T11:15:00Z', now)).toBe('45m ago');
    expect(timeAgo('2026-10-03T07:00:00Z', now)).toBe('5h ago');
    expect(timeAgo('2026-10-01T12:00:00Z', now)).toBe('2d ago');
    expect(timeAgo('2026-09-01T12:00:00Z', now)).toBe('1 Sept');
  });
});
