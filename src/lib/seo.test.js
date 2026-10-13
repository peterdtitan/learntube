import { describe as group, expect, it } from 'vitest';
import { describe, siteUrl } from './seo';

group('site address', () => {
  it('prefers an explicit address, then NextAuth’s, then Vercel’s production domain', () => {
    expect(siteUrl({ NEXT_PUBLIC_SITE_URL: 'https://skillreps.com/' })).toBe('https://skillreps.com');
    expect(siteUrl({ NEXTAUTH_URL: 'https://a.example', VERCEL_PROJECT_PRODUCTION_URL: 'b.example' })).toBe('https://a.example');
    expect(siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'b.example' })).toBe('https://b.example');
    expect(siteUrl({})).toBe('http://localhost:3000');
  });
});

group('search descriptions', () => {
  it('keeps short text and cuts long text at a word', () => {
    expect(describe('  Knit   a scarf. ')).toBe('Knit a scarf.');
    const long = describe('word '.repeat(60));
    expect(long.length).toBeLessThanOrEqual(155);
    expect(long.endsWith('word…')).toBe(true);
  });
});
