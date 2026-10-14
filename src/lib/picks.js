// Interests ticked on the landing page arrive at /start as ?picks=a,b. The answers from /start
// then ride through Google sign-in in a short-lived cookie, so a new account starts with them.
export const START_COOKIE = 'skillreps_start';
export const START_MAX_AGE = 60 * 60 * 24;
const MAX_PICKS = 20;
const ID = /^[a-z0-9-]{1,40}$/;
const ITEM_ID = /^[A-Za-z0-9_-]{1,60}$/;
const GOALS = ['HOBBY', 'GIFTS', 'CAREER', 'CURIOUS'];

export function parsePicks(value) {
  if (typeof value !== 'string' || !value) return [];
  let text;
  try {
    text = decodeURIComponent(value);
  } catch {
    return [];
  }
  return [...new Set(text.split(',').filter((id) => ID.test(id)))].slice(0, MAX_PICKS);
}

export function serializeStart({
  interests, goal, weeklyGoal, pick,
}) {
  return encodeURIComponent(JSON.stringify({
    i: interests, g: goal, d: weeklyGoal, p: pick ? { k: pick.kind, id: pick.id } : null,
  }));
}

// Anything malformed comes back as null; unknown values inside are dropped, not trusted.
export function parseStart(value) {
  if (typeof value !== 'string' || !value) return null;
  let raw;
  try {
    raw = JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
  if (!raw || typeof raw !== 'object') return null;
  const interests = Array.isArray(raw.i)
    ? [...new Set(raw.i.filter((id) => typeof id === 'string' && ID.test(id)))].slice(0, MAX_PICKS)
    : [];
  const goal = GOALS.includes(raw.g) ? raw.g : null;
  const weeklyGoal = Number.isInteger(raw.d) && raw.d >= 2 && raw.d <= 5 ? raw.d : null;
  const pick = raw.p && ['skill', 'program'].includes(raw.p.k) && typeof raw.p.id === 'string' && ITEM_ID.test(raw.p.id)
    ? { kind: raw.p.k, id: raw.p.id }
    : null;
  return {
    interests, goal, weeklyGoal, pick,
  };
}
