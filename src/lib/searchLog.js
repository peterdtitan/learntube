import prisma from './prismadb';
import { normalise } from './skillSearch';

export const MAX_QUERY = 80;

const text = (value, max) => (
  typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null
);

// What the skills page sends, cleaned, or null if it isn't worth keeping.
export function cleanSearch(body) {
  if (!body || typeof body.query !== 'string' || typeof body.missing !== 'boolean') return null;
  if (!Number.isInteger(body.results) || body.results < 0) return null;
  const query = normalise(body.query).replace(/\s+/g, ' ').slice(0, MAX_QUERY).trim();
  if (query.length < 2) return null;
  return {
    query,
    results: Math.min(body.results, 1000),
    missing: body.missing,
    suggested: Array.isArray(body.suggested)
      ? body.suggested.map((s) => text(s, 120)).filter(Boolean).slice(0, 5)
      : [],
    clicked: text(body.clicked, 160),
  };
}

const utcDay = (now) => {
  const day = new Date(now);
  day.setUTCHours(0, 0, 0, 0);
  return day;
};

// One row per learner, search and day: searching again updates it, and opening a result
// marks what they picked.
export async function recordSearch(userId, search, now = new Date()) {
  const { clicked, ...outcome } = search;
  const day = utcDay(now);
  const where = { userId_query_day: { userId, query: search.query, day } };
  const update = { ...outcome, ...(clicked ? { clicked } : {}) };
  try {
    return await prisma.searchLog.upsert({
      where,
      update,
      create: {
        userId, day, ...outcome, clicked,
      },
    });
  } catch (err) {
    // The search and the click can arrive together; the second one just updates.
    if (err.code !== 'P2002') throw err;
    return prisma.searchLog.update({ where, data: update });
  }
}
