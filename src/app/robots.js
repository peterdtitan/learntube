import { SITE_URL } from '../lib/seo';

// Everything past the landing page needs an account, so crawlers would only find sign-in.
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/skills', '/pathways', '/tracks', '/makes', '/learners', '/leaderboard', '/dashboard',
        '/notifications', '/settings', '/welcome', '/admin', '/api/', '/auth/', '/email/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
