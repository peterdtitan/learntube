import { describe, expect, it } from 'vitest';
import {
  TEMPLATES, escapeHtml, logMake, streakAtRisk, weeklyRecap,
} from './templates';

const links = {
  home: 'https://skillreps.app', settings: 'https://skillreps.app/settings#emails', unsubscribe: 'https://skillreps.app/email/unsubscribe?t=abc', scopeLabel: 'practice reminders',
};
const resume = { lessonTitle: 'Purl stitch', pathwayTitle: 'Knit a swatch', url: 'https://skillreps.app/pathways/p/learn/v' };

describe('email templates', () => {
  it('escape anything that came from a learner or a lesson title', () => {
    expect(escapeHtml('<b>"Tom & Jerry\'s"</b>')).toBe('&lt;b&gt;&quot;Tom &amp; Jerry&#39;s&quot;&lt;/b&gt;');
    const email = logMake({
      name: '<script>', lessonTitle: '<img src=x>', pathwayTitle: 'Knit', url: 'https://x',
    }, links);
    expect(email.html).not.toContain('<script>');
    expect(email.html).not.toContain('<img src=x>');
  });

  it('say how many days the streak needs', () => {
    const email = streakAtRisk({
      name: 'Ada Obi', streakWeeks: 4, done: 1, goal: 3, needed: 2, daysLeft: 2, resume,
    }, links);
    expect(email.subject).toBe('Your 4-week streak needs 2 more days this week');
    expect(email.text).toContain('Hey Ada, you’ve practised 1 of 3 days this week, with 2 days left, today included.');
    expect(email.text).toContain(`Do today’s rep: ${resume.url}`);
  });

  it('recap the week with the numbers, and cheer a met goal', () => {
    const met = weeklyRecap({
      name: 'Ada', xp: 120, days: 3, goal: 3, streakWeeks: 2, makes: 1, kudos: 4, resume,
    }, links);
    expect(met.subject).toBe('Goal met: 120 XP and 3 practice days last week');
    expect(met.text).toContain('XP: 120 · Practice days: 3/3 · Week streak: 2 · Makes: 1');
    const missed = weeklyRecap({
      name: 'Ada', xp: 10, days: 1, goal: 3, streakWeeks: 0, makes: 0, kudos: 0, resume: null,
    }, links);
    expect(missed.subject).toBe('Your week: 10 XP and 1 of 3 practice days');
  });

  it('all end with a way to stop them', () => {
    Object.entries(TEMPLATES).forEach(([kind, render]) => {
      const email = render({
        name: 'Ada', ...resume, resume, xp: 1, days: 1, goal: 3, streakWeeks: 0, makes: 0, kudos: 0, needed: 1, done: 2, daysLeft: 1, daysAway: 5, from: 'a', replyTo: 'b',
      }, links);
      expect(email.html, kind).toContain(links.unsubscribe);
      expect(email.text, kind).toContain(links.unsubscribe);
      expect(email.subject.length, kind).toBeLessThan(80);
    });
  });
});
