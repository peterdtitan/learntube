import { error, json } from '../../../../lib/api';
import { runRetention } from '../../../../lib/retention';

export const dynamic = 'force-dynamic';

// GET /api/cron/retention, called daily by Vercel Cron with "Authorization: Bearer CRON_SECRET".
// Without CRON_SECRET set, nobody can run it.
export async function GET(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return error(401, 'Not allowed.');
  return json(await runRetention());
}
