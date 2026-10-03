import { getAdmin } from '../../../../lib/admin';
import { rateLimit } from '../../../../lib/rateLimit';
import { error, json } from '../../../../lib/api';
import { parseYouTubeId } from '../../../../lib/youtube';

// GET /api/admin/youtube?url=...: title and channel for a lesson video, via YouTube oEmbed
// (no API key). oEmbed fails for private videos and ones whose owner disabled embedding,
// which would never play on LearnTube, so that's reported as an error.
export async function GET(req) {
  const admin = await getAdmin();
  if (!admin) return error(404, 'Not found.');
  const limited = await rateLimit('videoCheck', admin.id);
  if (limited) return limited;

  const id = parseYouTubeId(new URL(req.url).searchParams.get('url'));
  if (!id) return error(400, 'That isn’t a YouTube video link.');

  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`, {
    cache: 'no-store',
  });
  if (res.status === 401 || res.status === 403) {
    return error(422, 'This video can’t be embedded on other sites, so it won’t play on LearnTube.');
  }
  if (!res.ok) return error(404, 'YouTube couldn’t find that video. It may be private or deleted.');

  const data = await res.json();
  return json({
    id, url: watchUrl, title: data.title, channel: data.author_name, thumbnail: data.thumbnail_url,
  });
}
