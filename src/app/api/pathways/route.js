import { json, requireUserId } from '../../../lib/api';
import { getPathwayOverviews } from '../../../lib/course';

// GET /api/pathways?q=bread&skill=cooking: pathways with lesson counts, and the
// learner's progress when signed in. Both filters are optional.
export async function GET(req) {
  const userId = await requireUserId();
  const params = new URL(req.url).searchParams;
  const q = String(params.get('q') || '').trim().slice(0, 80);
  const skillId = params.get('skill') || undefined;
  return json({ pathways: await getPathwayOverviews(userId, { q, skillId }) });
}
