import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { START_COOKIE, parseStart } from '../../../lib/picks';
import { finishStart } from '../../../lib/onboarding';

export const dynamic = 'force-dynamic';

// Google sends new sign-ups from /start here. Saves their answers, then opens their skill.
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.redirect(new URL('/auth/signin?callbackUrl=/welcome/done', req.url));
  const jar = await cookies();
  const path = await finishStart(session.user.id, parseStart(jar.get(START_COOKIE)?.value));
  const res = NextResponse.redirect(new URL(path, req.url));
  res.cookies.delete(START_COOKIE);
  return res;
}
