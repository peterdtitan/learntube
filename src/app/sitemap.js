import { SITE_URL } from '../lib/seo';

// Only the pages a visitor can open without an account (see lib/access.js).
export default function sitemap() {
  const page = (path, priority) => ({ url: `${SITE_URL}${path}`, priority });
  return [
    page('/', 1),
    page('/start', 0.8),
    page('/privacy', 0.2),
    page('/terms', 0.2),
  ];
}
