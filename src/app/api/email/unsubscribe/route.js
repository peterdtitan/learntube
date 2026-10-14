import prisma from '../../../../lib/prismadb';
import { error, json } from '../../../../lib/api';
import { readUnsubscribeToken, unsubscribeData } from '../../../../lib/email/unsubscribe';

export const dynamic = 'force-dynamic';

// POST /api/email/unsubscribe?t=…: the one-click unsubscribe mail apps send (RFC 8058),
// from the List-Unsubscribe header. People clicking the link in an email get /email/unsubscribe.
export async function POST(req) {
  const token = readUnsubscribeToken(new URL(req.url).searchParams.get('t'));
  if (!token) return error(400, 'This unsubscribe link isn’t valid.');
  await prisma.user.updateMany({ where: { id: token.userId }, data: unsubscribeData(token.scope) });
  return json({ unsubscribed: token.scope });
}
