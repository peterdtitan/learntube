import { createHmac, timingSafeEqual } from 'node:crypto';

// Unsubscribe links carry a signed token, so they work without signing in and can't be
// forged to switch off someone else's emails.
export const SCOPES = {
  reminders: { field: 'emailReminders', label: 'practice reminders' },
  weekly: { field: 'emailWeekly', label: 'the Monday recap' },
  all: { field: null, label: 'all emails' },
};

function secret() {
  const value = process.env.EMAIL_TOKEN_SECRET || process.env.NEXTAUTH_SECRET;
  if (!value) throw new Error('Set NEXTAUTH_SECRET to sign unsubscribe links.');
  return value;
}

const sign = (payload) => createHmac('sha256', secret()).update(`unsubscribe:${payload}`).digest('base64url');

export function unsubscribeToken(userId, scope) {
  const payload = `${userId}.${scope}`;
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`;
}

// Returns { userId, scope } for a genuine token, otherwise null.
export function readUnsubscribeToken(token) {
  if (typeof token !== 'string' || token.length > 300) return null;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;
  const payload = Buffer.from(encoded, 'base64url').toString();
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  const [userId, scope] = payload.split('.');
  return userId && SCOPES[scope] ? { userId, scope } : null;
}

// The preference changes an unsubscribe makes.
export function unsubscribeData(scope) {
  return scope === 'all'
    ? { emailReminders: false, emailWeekly: false }
    : { [SCOPES[scope].field]: false };
}
