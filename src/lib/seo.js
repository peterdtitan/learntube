import prisma from './prismadb';
import { coverImage } from './covers';
import { publicName } from './people';

// The public address, for absolute links in metadata, robots.txt and the sitemap. Vercel sets
// VERCEL_PROJECT_PRODUCTION_URL to the production domain, so previews point at production.
export function siteUrl(env = process.env) {
  const host = env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return (env.NEXT_PUBLIC_SITE_URL || env.NEXTAUTH_URL || host || 'http://localhost:3000').replace(/\/+$/, '');
}

export const SITE_URL = siteUrl();

// Search results show about 155 characters; cut at a word and add an ellipsis.
export function describe(text, max = 155) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 60 ? cut.lastIndexOf(' ') : cut.length).replace(/[\s,.;:]+$/, '')}…`;
}

// Private pages: reachable by link, never listed in search results.
export const PRIVATE = { robots: { index: false, follow: false } };

function pageMeta({
  title, description, path, image,
}) {
  return {
    title: `${title} · Skillreps`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

const lessonUrls = (p) => p.units.flatMap((u) => u.videos.map((v) => v.url));

const FIRST_LESSON = {
  units: {
    orderBy: { order: 'asc' },
    take: 1,
    select: { videos: { orderBy: { order: 'asc' }, take: 1, select: { url: true } } },
  },
};

export async function pathwayMetadata(id) {
  const p = await prisma.pathway.findUnique({
    where: { id },
    select: {
      title: true, description: true, makeTitle: true, imageUrl: true, ...FIRST_LESSON,
    },
  });
  if (!p) return { title: 'Skillreps' };
  const make = p.makeTitle ? ` You’ll make: ${p.makeTitle}.` : '';
  return pageMeta({
    title: p.title,
    description: describe(`${p.description || 'Free YouTube lessons, put in order.'}${make}`),
    path: `/pathways/${id}`,
    image: coverImage(p.imageUrl, lessonUrls(p)),
  });
}

export async function trackMetadata(slug) {
  const t = await prisma.track.findUnique({
    where: { slug },
    select: {
      title: true,
      description: true,
      imageUrl: true,
      pathways: { orderBy: { trackOrder: 'asc' }, take: 1, select: { imageUrl: true, ...FIRST_LESSON } },
    },
  });
  if (!t) return { title: 'Skillreps' };
  const first = t.pathways[0];
  return pageMeta({
    title: t.title,
    description: describe(t.description || `${t.title}: free courses, taken in order.`),
    path: `/tracks/${slug}`,
    image: t.imageUrl || (first && coverImage(first.imageUrl, lessonUrls(first))),
  });
}

export function staticMetadata(title, description, path) {
  return pageMeta({ title, description, path });
}

export async function lessonMetadata(pathwayId, videoId) {
  const v = await prisma.video.findUnique({
    where: { id: videoId },
    select: {
      title: true,
      description: true,
      pathway: { select: { id: true, title: true } },
      unit: { select: { pathway: { select: { id: true, title: true } } } },
    },
  });
  // Lessons belong to a pathway through their module, or directly if they aren't in one.
  const pathway = v?.unit?.pathway || v?.pathway;
  if (!pathway || pathway.id !== pathwayId) return { title: 'Skillreps' };
  return {
    title: `${v.title} · ${pathway.title} · Skillreps`,
    description: describe(v.description || `A short lesson from ${pathway.title}, free on Skillreps.`),
    alternates: { canonical: `/pathways/${pathwayId}/learn/${videoId}` },
  };
}

// People's pages work for anyone with the link but stay out of search results.
export async function learnerMetadata(userId) {
  const u = await prisma.user.findUnique({
    where: { id: userId }, select: { name: true, displayName: true },
  });
  return { title: u ? `${publicName(u)} · Skillreps` : 'Skillreps', ...PRIVATE };
}

export async function makeMetadata(makeId) {
  const m = await prisma.make.findUnique({
    where: { id: makeId },
    select: { title: true, user: { select: { name: true, displayName: true } } },
  });
  return { title: m ? `${m.title} by ${publicName(m.user)} · Skillreps` : 'Skillreps', ...PRIVATE };
}
