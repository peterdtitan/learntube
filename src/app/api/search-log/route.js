import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { readJson } from '../../../lib/api';
import { rateLimit } from '../../../lib/rateLimit';
import { cleanSearch, recordSearch } from '../../../lib/searchLog';

// The skills page reports a search once the learner stops typing, and again if they open a
// result. Admins' own searches aren't counted, so testing doesn't skew the numbers.
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });
  const limited = await rateLimit('search', session.user.id);
  if (limited) return limited;

  const search = cleanSearch(await readJson(req));
  if (!search) return new Response('Bad Request', { status: 400 });
  if (!session.user.isAdmin) await recordSearch(session.user.id, search);
  return new Response(null, { status: 204 });
}
