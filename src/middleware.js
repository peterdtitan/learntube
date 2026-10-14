import { NextResponse } from 'next/server';
import { SESSION_COOKIES, isPublicPath, signInPath } from './lib/access';

// Skillreps needs an account. Signed-out visitors can open the landing page, the start
// questions, the legal pages and sign-in; everything else sends them to sign in and back.
//
// This only checks that a session cookie is there. Pages still look the session up in the
// database, so an expired or forged cookie gets the signed-out view, never someone's data.
export function middleware(req) {
  const { pathname, search } = req.nextUrl;
  if (isPublicPath(pathname)) return NextResponse.next();
  if (SESSION_COOKIES.some((name) => req.cookies.has(name))) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Sign in to use Skillreps.' }, { status: 401 });
  }
  return NextResponse.redirect(new URL(signInPath(pathname, search), req.url));
}

export const config = {
  // Skip Next's files, images, and the files that describe the site to browsers and crawlers.
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|icon\\.svg|apple-icon\\.png|opengraph-image|twitter-image|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico|woff2?)$).*)',
  ],
};
