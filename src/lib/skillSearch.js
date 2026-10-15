import { NOT_YET, SEARCH_TERMS } from './searchTerms';

// Search for the skills page: short skills, programs and the courses in them. Forgives
// typos ("guiter"), finds words typed apart or together ("make up", "javascript"), and when
// we don't teach something ("java") says so and suggests the closest thing we do.

const STOP = new Set(`a about an and any are at be become beginner beginners basic basics better
best build by can class classes course courses do doing easy first for free from get guide home
how i improve in intro introduction into is learn learning lesson lessons like make making me my
new of on online or own play playing scratch skill skills some start starting step study teach
teaching the to tutorial tutorials up use using wanna want way what with your`.split(/\s+/));

// How much a word counts, by where it appears. Typos and half-typed words only count in the
// fields that say what the thing is, not in its description.
const WEIGHT = {
  title: 10, label: 10, terms: 9, category: 6, parent: 4, text: 2,
};
const LOOSE = 6;

export function normalise(text) {
  return String(text || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9+#.]+/g, ' ')
    .replace(/(^|\s)\.+|\.+(?=\s|$)/g, ' ')
    .trim();
}

const stem = (w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
const rawWords = (text) => normalise(text).split(' ')
  .filter((w) => w.length > 1 || /[+#]/.test(w))
  .map(stem);
const meaningful = (ws) => ws.filter((w) => !STOP.has(w));

// Optimal string alignment distance (a swap counts as one edit), giving up past `max`.
function distance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2 = null;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i += 1) {
    const row = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let d = Math.min(prev[j] + 1, row[j - 1] + 1, prev[j - 1] + cost);
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d = Math.min(d, prev2[j - 2] + 1);
      }
      row.push(d);
      rowMin = Math.min(rowMin, d);
    }
    if (rowMin > max) return max + 1;
    prev2 = prev;
    prev = row;
  }
  return prev[b.length];
}

const allowedTypos = (word) => {
  if (word.length >= 8) return 2;
  return word.length >= 5 ? 1 : 0;
};

// items: { key, kind: 'skill' | 'program' | 'course', slug, title, category?, parent?,
// description?, makeTitle? }. Returns entries for searchCatalog.
export function buildSearchIndex(items) {
  return items.map((item) => {
    const extra = SEARCH_TERMS[item.slug] || {};
    const tokens = new Map();
    const add = (word, weight) => tokens.set(word, Math.max(tokens.get(word) || 0, weight));
    [
      [WEIGHT.title, [item.title]],
      [WEIGHT.label, [extra.label]],
      [WEIGHT.terms, extra.terms || []],
      [WEIGHT.category, [item.category]],
      [WEIGHT.parent, [item.parent]],
      [WEIGHT.text, [item.description, item.makeTitle]],
    ].forEach(([weight, texts]) => texts.forEach((text) => {
      const ws = meaningful(rawWords(text));
      ws.forEach((w, i) => {
        add(w, weight);
        // "power bi" also matches "powerbi", and "makeup" matches "make up".
        if (i > 0) add(ws[i - 1] + w, weight);
      });
    }));
    return { item, label: extra.label || item.title, tokens: [...tokens] };
  });
}

// `covers` says the thing is really about that word: named in its title or terms, not just
// mentioned in its description ("French braid" doesn't mean we teach French).
function wordScore(query, token, weight, exactOnly) {
  if (query === token) return { score: weight, whole: true, covers: weight >= LOOSE };
  const none = { score: 0, whole: false, covers: false };
  if (exactOnly || weight < LOOSE - 2) return none;
  if (weight >= LOOSE && allowedTypos(query)
      && distance(query, token, allowedTypos(query)) <= allowedTypos(query)) {
    return { score: weight * 0.75, whole: true, covers: true };
  }
  // Still typing: "gui" finds guitar. Shows results, but doesn't count as having it.
  if (token.startsWith(query)) return { score: weight * 0.6, whole: false, covers: false };
  return none;
}

function scoreEntry(entry, words, exact) {
  let score = 0;
  const hits = new Set();
  const whole = new Set();
  const covered = new Set();
  words.forEach((q) => {
    let best = 0;
    entry.tokens.forEach(([token, weight]) => {
      const s = wordScore(q, token, weight, exact.has(q));
      best = Math.max(best, s.score);
      if (s.whole) whole.add(q);
      if (s.covers) covered.add(q);
    });
    if (best > 0) hits.add(q);
    score += best;
  });
  return {
    entry, score, matched: hits.size, hits, whole: whole.size === hits.size, covered,
  };
}

// The first not-yet topic named in the search, e.g. "react native" in "react native apps".
// Every word of the name counts, filler too: "machine learning" isn't "machine".
function findNotYet(words) {
  const phrase = ` ${words.join(' ')} `;
  let found = null;
  NOT_YET.forEach((topic) => topic.names.forEach((name) => {
    const nameWords = rawWords(name);
    if (!found && nameWords.length && phrase.includes(` ${nameWords.join(' ')} `)) {
      found = { topic, words: nameWords };
    }
  }));
  return found;
}

const closeness = (a, b) => 1 - distance(a, b, Math.max(a.length, b.length))
  / Math.max(a.length, b.length);

// Returns null for an empty search (show everything), or
// { results: [item], missing: null | { text, suggestions: [{ item, label }] } }.
export function searchCatalog(index, query) {
  const raw = rawWords(query);
  let words = meaningful(raw);
  const known = (w) => index.some((e) => e.tokens.some(([t]) => t === w));
  const together = [raw, words].map((ws) => (ws.length > 1 ? ws.join('') : ''))
    .find((w) => w && known(w));
  if (together) words = [together];
  if (!words.length) return null;

  const notYet = findNotYet(together ? words : raw);
  const exact = new Set(notYet ? notYet.words : []);
  const scored = index.map((e) => scoreEntry(e, words, exact)).filter((s) => s.score > 0);
  const most = Math.max(0, ...scored.map((s) => s.matched));
  let best = scored.filter((s) => s.matched === most).sort((a, b) => b.score - a.score);
  // Once something matches the whole word ("art"), drop half-word matches ("artificial").
  if (best.some((s) => s.whole)) best = best.filter((s) => s.whole);
  const top = best[0]?.score || 0;
  const results = best
    .filter((s) => s.score >= top * 0.35)
    // For "java", JavaScript isn't a match, it's a suggestion.
    .filter((s) => !notYet || [...s.hits].some((w) => !notYet.words.includes(w)))
    .map((s) => s.entry.item);

  const bySlug = (slug) => index.find((e) => e.item.slug === slug);
  const asSuggestion = (e) => ({ item: e.item, label: e.label });
  let missing = null;
  if (notYet && !scored.some((s) => notYet.words.every((w) => s.covered.has(w)))) {
    missing = { suggestions: notYet.topic.try.map(bySlug).filter(Boolean).map(asSuggestion) };
  } else if (!results.length) {
    // A misspelling too far gone for the typo rules: same first letter, mostly the same word.
    const typed = words.join('');
    const near = index
      .map((e) => ({
        e,
        near: Math.max(0, ...e.tokens
          .filter(([t, w]) => w >= LOOSE && t[0] === typed[0])
          .map(([t]) => closeness(typed, t))),
      }))
      .filter((n) => n.near >= 0.7)
      .sort((a, b) => b.near - a.near)
      .slice(0, 2);
    missing = { suggestions: near.map((n) => asSuggestion(n.e)) };
  }
  if (missing) {
    missing.text = query.trim();
    const suggested = new Set(missing.suggestions.map((s) => s.item.key));
    return {
      results: [
        ...missing.suggestions.map((s) => s.item),
        ...results.filter((r) => !suggested.has(r.key)),
      ],
      missing,
    };
  }
  return { results, missing: null };
}

// ["JavaScript", "Software Engineer"] -> "JavaScript or Software Engineer".
export function orList(names) {
  if (names.length < 2) return names.join('');
  return `${names.slice(0, -1).join(', ')} or ${names[names.length - 1]}`;
}
