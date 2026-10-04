import { parseYouTubeId } from './youtube';

// Cover images for skills, courses and programs. A cover is either a YouTube thumbnail or an
// admin upload in Vercel Blob; both hosts are allowed for next/image in next.config.js, which
// fetches them on the server so a learner's browser never contacts YouTube for a cover.

export function thumbnailUrl(videoIdOrUrl) {
  const id = parseYouTubeId(videoIdOrUrl);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

// The stored cover, or the first lesson's thumbnail.
export function coverImage(imageUrl, lessonUrls = []) {
  if (imageUrl) return imageUrl;
  return lessonUrls.map(thumbnailUrl).find(Boolean) || null;
}

// Only hosts next/image may load; anything else would break the page.
export function isAllowedCover(url) {
  try {
    const { protocol, hostname, pathname } = new URL(url);
    if (protocol !== 'https:') return false;
    return (hostname === 'i.ytimg.com' && pathname.startsWith('/vi/'))
      || hostname.endsWith('.public.blob.vercel-storage.com');
  } catch {
    return false;
  }
}
