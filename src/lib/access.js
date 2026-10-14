// Pages a signed-out visitor can open. Everything else needs an account (see middleware.js).
const PUBLIC = [
  /^\/$/,
  /^\/start$/,
  /^\/(privacy|terms)$/,
  /^\/auth\//,
  /^\/email\//, // unsubscribe links work without signing in
  /^\/api\/auth\//,
  /^\/api\/cron\//, // Vercel Cron, checked against CRON_SECRET
  /^\/api\/email\//,
];

export const SESSION_COOKIES = ['__Secure-next-auth.session-token', 'next-auth.session-token'];

export function isPublicPath(pathname) {
  return PUBLIC.some((re) => re.test(pathname));
}

// Where a signed-out visitor goes instead: sign in, then straight back.
export function signInPath(pathname, search = '') {
  return `/auth/signin?callbackUrl=${encodeURIComponent(`${pathname}${search}`)}`;
}
