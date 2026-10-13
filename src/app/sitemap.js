import prisma from '../lib/prismadb';
import { SITE_URL } from '../lib/seo';

// Built on request: test builds run before their database exists.
export const dynamic = 'force-dynamic';

// Public pages only. Learner profiles and makes stay out: they're people, not content.
export default async function sitemap() {
  const [pathways, tracks] = await Promise.all([
    prisma.pathway.findMany({ select: { id: true } }),
    prisma.track.findMany({ where: { pathways: { some: {} } }, select: { slug: true } }),
  ]);
  const page = (path, priority) => ({ url: `${SITE_URL}${path}`, priority });
  return [
    page('/', 1),
    page('/skills', 0.9),
    page('/pathways', 0.8),
    ...tracks.map((t) => page(`/tracks/${t.slug}`, 0.8)),
    ...pathways.map((p) => page(`/pathways/${p.id}`, 0.7)),
    page('/makes', 0.5),
    page('/leaderboard', 0.3),
    page('/privacy', 0.2),
    page('/terms', 0.2),
  ];
}
