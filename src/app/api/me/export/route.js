import { error, requireUserId } from '../../../../lib/api';
import { rateLimit } from '../../../../lib/rateLimit';
import { exportUserData } from '../../../../lib/account';

// GET /api/me/export: a JSON file of everything Skillreps holds about the learner.
export async function GET() {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to download your data.');
  const limited = await rateLimit('export', userId);
  if (limited) return limited;

  const data = await exportUserData(userId);
  if (!data) return error(404, 'No account found.');
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="skillreps-data-${data.exportedAt.slice(0, 10)}.json"`,
      'Cache-Control': 'no-store',
    },
  });
}
