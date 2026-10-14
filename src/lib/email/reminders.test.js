import {
  beforeAll, describe, expect, it,
} from 'vitest';
import { buildMessage, chooseReminder } from './reminders';

beforeAll(() => { process.env.NEXTAUTH_SECRET = 'test-secret'; });

// Week of Monday 12 October 2026, in Lagos (UTC+1). 16:00 UTC is 17:00 there.
const at = (iso) => new Date(iso);
const THU = at('2026-10-15T16:00:00Z');
const SAT = at('2026-10-17T16:00:00Z');
const MON = at('2026-10-19T16:00:00Z');
const event = (kind, iso, amount = 25) => ({ kind, amount, createdAt: at(iso) });
const resume = { lessonTitle: 'Purl stitch', pathwayTitle: 'Knit a swatch', url: 'https://skillreps.app/pathways/p/learn/v' };

function facts(overrides = {}) {
  return {
    user: {
      id: 'u1', name: 'Ada Obi', timeZone: 'Africa/Lagos', weeklyGoal: 3, emailReminders: true, emailWeekly: true, ...overrides.user,
    },
    events: [event('TRY', '2026-10-12T10:00:00Z')],
    emails: [],
    tried: [],
    makes: [],
    kudos: [],
    resume,
    ...overrides,
    ...(overrides.user ? { user: { ...facts().user, ...overrides.user } } : {}),
  };
}

describe('chooseReminder', () => {
  it('stays quiet at night in the learner’s time zone, and after a month away', () => {
    expect(chooseReminder(facts(), at('2026-10-17T22:30:00Z'))).toBeNull(); // 23:30 in Lagos
    expect(chooseReminder(facts({ events: [event('TRY', '2026-09-01T10:00:00Z')] }), SAT)).toBeNull();
  });

  it('warns when the week’s goal needs every day that’s left', () => {
    expect(chooseReminder(facts(), SAT)).toMatchObject({
      kind: 'STREAK_AT_RISK',
      key: '2026-10-12',
      data: {
        done: 1, needed: 2, daysLeft: 2, resume,
      },
    });
    // On Thursday there's still slack, so no warning yet.
    expect(chooseReminder(facts(), THU)?.kind).not.toBe('STREAK_AT_RISK');
  });

  it('doesn’t warn after practice today, or twice in a week', () => {
    const today = facts({ events: [event('TRY', '2026-10-12T10:00:00Z'), event('TRY', '2026-10-17T09:00:00Z')] });
    expect(chooseReminder(today, SAT)?.kind).not.toBe('STREAK_AT_RISK');
    const warned = facts({ emails: [{ kind: 'STREAK_AT_RISK', key: '2026-10-12', createdAt: at('2026-10-16T16:00:00Z') }] });
    expect(chooseReminder(warned, SAT)?.kind).not.toBe('STREAK_AT_RISK');
  });

  it('asks to log a make a day after a Try step, once per lesson', () => {
    const tried = [{
      videoId: 'v1', triedAt: at('2026-10-14T12:00:00Z'), logged: false, ...resume,
    }];
    expect(chooseReminder(facts({ tried }), THU)).toMatchObject({ kind: 'LOG_MAKE', key: 'v1' });
    expect(chooseReminder(facts({ tried: [{ ...tried[0], logged: true }] }), THU)).toBeNull();
    expect(chooseReminder(facts({ tried: [{ ...tried[0], triedAt: at('2026-10-15T10:00:00Z') }] }), THU)).toBeNull();
    const asked = facts({ tried, emails: [{ kind: 'LOG_MAKE', key: 'v1', createdAt: at('2026-10-13T16:00:00Z') }] });
    expect(chooseReminder(asked, THU)).toBeNull();
  });

  it('nudges after four days away, at most every two weeks', () => {
    const away = facts({ events: [event('WATCH', '2026-10-10T10:00:00Z', 10)] });
    expect(chooseReminder(away, THU)).toMatchObject({ kind: 'COME_BACK', key: '2026-10-15', data: { daysAway: 5 } });
    const nudged = facts({ ...away, emails: [{ kind: 'COME_BACK', key: '2026-10-05', createdAt: at('2026-10-05T16:00:00Z') }] });
    expect(chooseReminder(nudged, THU)).toBeNull();
    expect(chooseReminder(facts({ ...away, user: { emailReminders: false } }), THU)).toBeNull();
  });

  it('sends the Monday recap of last week', () => {
    const week = facts({
      events: [
        event('TRY', '2026-10-13T10:00:00Z', 25), event('LOG', '2026-10-14T10:00:00Z', 40), event('WATCH', '2026-10-15T10:00:00Z', 10),
      ],
      makes: [{ createdAt: at('2026-10-14T10:00:00Z') }],
      kudos: [{ createdAt: at('2026-10-15T10:00:00Z') }, { createdAt: at('2026-10-19T08:00:00Z') }],
    });
    expect(chooseReminder(week, MON)).toMatchObject({
      kind: 'WEEKLY_RECAP',
      key: '2026-10-12',
      data: {
        xp: 75, days: 2, goal: 3, makes: 1, kudos: 1,
      },
    });
    // With the recap switched off, four days away earns a come-back nudge instead.
    expect(chooseReminder({ ...week, user: { ...week.user, emailWeekly: false } }, MON).kind).toBe('COME_BACK');
  });

  it('never sends two emails within 20 hours, or more than three a week', () => {
    const recent = facts({ emails: [{ kind: 'COME_BACK', key: 'x', createdAt: at('2026-10-17T01:00:00Z') }] });
    expect(chooseReminder(recent, SAT)).toBeNull();
    const many = facts({
      emails: ['11', '13', '15'].map((d) => ({ kind: 'LOG_MAKE', key: d, createdAt: at(`2026-10-${d}T10:00:00Z`) })),
    });
    expect(chooseReminder(many, SAT)).toBeNull();
  });
});

describe('buildMessage', () => {
  it('addresses the learner by display name and adds one-click unsubscribe headers', () => {
    const user = {
      id: 'u1', email: 'ada@example.com', name: 'Adaeze Obi', displayName: 'Ada O.',
    };
    const message = buildMessage(user, { kind: 'LOG_MAKE', data: { lessonTitle: 'Purl', pathwayTitle: 'Knit', url: 'https://x/y' } });
    expect(message).toMatchObject({ to: 'ada@example.com', kind: 'LOG_MAKE' });
    expect(message.text).toContain('Hey Ada,');
    expect(message.headers['List-Unsubscribe']).toMatch(/^<http.*\/api\/email\/unsubscribe\?t=.+>$/);
    expect(message.headers['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click');
    expect(message.html).toContain('/email/unsubscribe?t=');
  });
});
