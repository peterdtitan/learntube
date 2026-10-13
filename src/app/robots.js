import { SITE_URL } from '../lib/seo';

// Signed-in and admin pages are useless to search engines; the API isn't a page at all.
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/auth/', '/dashboard', '/notifications', '/settings', '/welcome'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
