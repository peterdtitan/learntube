import { describe, expect, it } from 'vitest';
import { isPublicPath, signInPath } from './access';

describe('isPublicPath', () => {
  it('lets visitors open the landing page, the start questions, legal pages and sign-in', () => {
    ['/', '/start', '/privacy', '/terms', '/auth/signin', '/api/auth/callback/google', '/api/cron/reminders', '/email/unsubscribe', '/api/email/unsubscribe']
      .forEach((p) => expect(isPublicPath(p), p).toBe(true));
  });

  it('keeps everything else behind an account', () => {
    ['/skills', '/pathways', '/pathways/abc', '/makes', '/leaderboard', '/learners/u1', '/dashboard', '/welcome', '/welcome/done', '/admin', '/api/pathways', '/api/me/export', '/startx', '/privacy/old']
      .forEach((p) => expect(isPublicPath(p), p).toBe(false));
  });
});

describe('signInPath', () => {
  it('comes back to the page that was asked for, query included', () => {
    expect(signInPath('/pathways/abc', '?tab=notes')).toBe('/auth/signin?callbackUrl=%2Fpathways%2Fabc%3Ftab%3Dnotes');
  });
});
