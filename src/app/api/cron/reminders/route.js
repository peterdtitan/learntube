import { error, json } from '../../../../lib/api';
import { sendReminders } from '../../../../lib/email/reminders';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// GET /api/cron/reminders, called daily by Vercel Cron with "Authorization: Bearer CRON_SECRET".
// Without RESEND_API_KEY it only reports what it would send.
export async function GET(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return error(401, 'Not allowed.');
  return json(await sendReminders());
}
