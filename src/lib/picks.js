// Interests a visitor ticks on the landing page ride through Google sign-in in a short-lived
// cookie, so the welcome survey can open with them already chosen.
export const PICKS_COOKIE = 'skillreps_picks';
export const PICKS_MAX_AGE = 60 * 60 * 24;
const MAX_PICKS = 20;
const ID = /^[a-z0-9-]{1,40}$/;

export function serializePicks(ids) {
  return encodeURIComponent(ids.join(','));
}

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

// Interests the learner already saved win; picks only fill an empty survey.
export function startingInterests(saved, picks, knownIds) {
  if (saved.length) return saved;
  const known = new Set(knownIds);
  return picks.filter((id) => known.has(id));
}
