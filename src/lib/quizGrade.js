// Question formats, grading and integrity penalties. Pure functions; no database.
//
// Question.data by type, as the admin writes it:
//   SINGLE      { options: [str], answer: index }
//   MULTI       { options: [str], answers: [index] }
//   TRUE_FALSE  { answer: bool }
//   ORDER       { items: [str] }               items in the right order
//   MATCH       { pairs: [[left, right]] }
//   TEXT        { accepted: [str] }            any of these, ignoring case and spacing
//   NUMBER      { answer: num, tolerance: num }
// Learners' answers: index, [index], bool, [str] in order, [right] per left, str, num.

export const QUESTION_TYPES = ['SINGLE', 'MULTI', 'TRUE_FALSE', 'ORDER', 'MATCH', 'TEXT', 'NUMBER'];

const MAX_OPTIONS = 8;
const MAX_TEXT = 300;

const cleanList = (list) => (Array.isArray(list) ? list : [])
  .map((x) => String(x ?? '').trim().slice(0, MAX_TEXT))
  .filter(Boolean);

// Checks what the admin entered; returns { data } tidied, or { error }.
export function validateQuestionData(type, raw = {}) {
  switch (type) {
    case 'SINGLE': {
      const options = cleanList(raw.options).slice(0, MAX_OPTIONS);
      const answer = Number(raw.answer);
      if (options.length < 2) return { error: 'Add at least two options.' };
      if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) return { error: 'Mark the right option.' };
      return { data: { options, answer } };
    }
    case 'MULTI': {
      const options = cleanList(raw.options).slice(0, MAX_OPTIONS);
      const answers = [...new Set((raw.answers || []).map(Number))]
        .filter((i) => Number.isInteger(i) && i >= 0 && i < options.length).sort();
      if (options.length < 2) return { error: 'Add at least two options.' };
      if (!answers.length) return { error: 'Mark at least one right option.' };
      return { data: { options, answers } };
    }
    case 'TRUE_FALSE':
      if (typeof raw.answer !== 'boolean') return { error: 'Say whether it’s true or false.' };
      return { data: { answer: raw.answer } };
    case 'ORDER': {
      const items = cleanList(raw.items).slice(0, MAX_OPTIONS);
      if (items.length < 2) return { error: 'Add at least two steps.' };
      if (new Set(items).size !== items.length) return { error: 'Each step must be different.' };
      return { data: { items } };
    }
    case 'MATCH': {
      const pairs = (Array.isArray(raw.pairs) ? raw.pairs : [])
        .map((p) => cleanList(p))
        .filter((p) => p.length === 2)
        .slice(0, MAX_OPTIONS);
      if (pairs.length < 2) return { error: 'Add at least two pairs.' };
      if (new Set(pairs.map((p) => p[1])).size !== pairs.length) return { error: 'Each right-hand side must be different.' };
      return { data: { pairs } };
    }
    case 'TEXT': {
      const accepted = cleanList(raw.accepted).slice(0, 10);
      if (!accepted.length) return { error: 'Add at least one accepted answer.' };
      return { data: { accepted } };
    }
    case 'NUMBER': {
      const answer = Number(raw.answer);
      const tolerance = Math.abs(Number(raw.tolerance) || 0);
      if (!Number.isFinite(answer)) return { error: 'Enter the right number.' };
      return { data: { answer, tolerance } };
    }
    default:
      return { error: 'Unknown question type.' };
  }
}

// Deterministic shuffle so a learner sees the same order on reload of one attempt.
// FNV-1a hash of the seed, then xorshift-style steps; bitwise maths is the point here.
/* eslint-disable no-bitwise */
export function seededShuffle(list, seed) {
  let h = String(seed).split('').reduce((acc, ch) => Math.imul(acc ^ ch.charCodeAt(0), 16777619), 2166136261);
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  // A shuffle that leaves an ORDER question already solved gives the answer away.
  if (out.length > 1 && out.every((x, i) => x === list[i])) out.push(out.shift());
  return out;
}
/* eslint-enable no-bitwise */

// What the learner's browser gets: no answers.
export function publicQuestion(q, seed = q.id) {
  const base = {
    id: q.id, type: q.type, prompt: q.prompt,
  };
  const d = q.data || {};
  switch (q.type) {
    case 'SINGLE': return { ...base, options: d.options };
    case 'MULTI': return { ...base, options: d.options, pick: d.answers.length };
    case 'ORDER': return { ...base, items: seededShuffle(d.items, seed) };
    case 'MATCH': return { ...base, lefts: d.pairs.map((p) => p[0]), rights: seededShuffle(d.pairs.map((p) => p[1]), seed) };
    default: return base;
  }
}

const normalise = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').replace(/^[\s.,!?'"]+|[\s.,!?'"]+$/g, '');

// 0 to 1; partial credit for MULTI, ORDER and MATCH.
export function gradeQuestion(q, answer) {
  const d = q.data || {};
  switch (q.type) {
    case 'SINGLE': return Number(answer) === d.answer && answer !== null && answer !== '' ? 1 : 0;
    case 'MULTI': {
      if (!Array.isArray(answer)) return 0;
      const picked = new Set(answer.map(Number));
      const hits = d.answers.filter((i) => picked.has(i)).length;
      const wrong = [...picked].filter((i) => !d.answers.includes(i)).length;
      return Math.max(0, (hits - wrong) / d.answers.length);
    }
    case 'TRUE_FALSE': return answer === d.answer ? 1 : 0;
    case 'ORDER': {
      if (!Array.isArray(answer)) return 0;
      return d.items.filter((item, i) => answer[i] === item).length / d.items.length;
    }
    case 'MATCH': {
      if (!Array.isArray(answer)) return 0;
      return d.pairs.filter((p, i) => answer[i] === p[1]).length / d.pairs.length;
    }
    case 'TEXT': return d.accepted.some((a) => normalise(a) === normalise(answer)) && normalise(answer) ? 1 : 0;
    case 'NUMBER': {
      const n = Number(answer);
      if (answer === null || answer === '' || !Number.isFinite(n)) return 0;
      return Math.abs(n - d.answer) <= (d.tolerance || 0) + 1e-9 ? 1 : 0;
    }
    default: return 0;
  }
}

// The right answer, written out for the results screen.
export function correctAnswerText(q) {
  const d = q.data || {};
  switch (q.type) {
    case 'SINGLE': return d.options[d.answer];
    case 'MULTI': return d.answers.map((i) => d.options[i]).join(', ');
    case 'TRUE_FALSE': return d.answer ? 'True' : 'False';
    case 'ORDER': return d.items.join(' → ');
    case 'MATCH': return d.pairs.map((p) => `${p[0]} – ${p[1]}`).join('; ');
    case 'TEXT': return d.accepted[0];
    case 'NUMBER': return d.tolerance ? `${d.answer} (±${d.tolerance})` : String(d.answer);
    default: return '';
  }
}

// answers: { [questionId]: answer }. Returns score 0-100 and per-question results.
export function gradeQuiz(questions, answers = {}) {
  if (!questions.length) return { score: 0, results: [] };
  const results = questions.map((q) => {
    const credit = gradeQuestion(q, answers[q.id]);
    return {
      id: q.id,
      prompt: q.prompt,
      credit,
      correct: credit === 1,
      answer: correctAnswerText(q),
      explanation: q.explanation || null,
    };
  });
  const score = (results.reduce((sum, r) => sum + r.credit, 0) / questions.length) * 100;
  return { score: Math.round(score * 10) / 10, results };
}

// ---------- integrity ----------

const MAX_EVENTS = 200;
const MAX_EVENT_TEXT = 500;

// Tidies the browser's log: { type: 'leave', seconds } | { type: 'copy'|'paste', text } |
// { type: 'fullscreen-exit' }, each with `at` (ms since the attempt began).
export function cleanEvents(raw) {
  return (Array.isArray(raw) ? raw : []).slice(0, MAX_EVENTS).map((e) => {
    const type = ['leave', 'copy', 'paste', 'fullscreen-exit'].includes(e?.type) ? e.type : null;
    if (!type) return null;
    const event = { type, at: Math.max(0, Math.round(Number(e.at) || 0)) };
    if (type === 'leave') event.seconds = Math.min(3600, Math.max(0, Math.round(Number(e.seconds) || 0)));
    if (type === 'copy' || type === 'paste') event.text = String(e.text ?? '').slice(0, MAX_EVENT_TEXT);
    return event;
  }).filter(Boolean);
}

export function summarizeEvents(events) {
  return events.reduce((s, e) => ({
    leaveCount: s.leaveCount + (e.type === 'leave' ? 1 : 0),
    awaySeconds: s.awaySeconds + (e.type === 'leave' ? e.seconds : 0),
    copyCount: s.copyCount + (e.type === 'copy' ? 1 : 0),
    pasteCount: s.pasteCount + (e.type === 'paste' ? 1 : 0),
  }), {
    leaveCount: 0, awaySeconds: 0, copyCount: 0, pasteCount: 0,
  });
}

// Percentage points off the score, with a breakdown for the report.
export function integrityPenalty(quiz, summary) {
  const parts = [
    { reason: 'Leaving the quiz', count: summary.leaveCount, points: summary.leaveCount * quiz.leavePenalty },
    { reason: 'Time away (per 10 seconds)', count: Math.floor(summary.awaySeconds / 10), points: Math.floor(summary.awaySeconds / 10) * quiz.awayPenalty },
    { reason: 'Copying', count: summary.copyCount, points: summary.copyCount * quiz.copyPenalty },
    { reason: 'Pasting', count: summary.pasteCount, points: summary.pasteCount * quiz.copyPenalty },
  ].filter((p) => p.points > 0);
  const total = Math.min(quiz.maxPenalty, parts.reduce((sum, p) => sum + p.points, 0));
  return { total, parts };
}

// Seconds left on the clock: the deadline, less the time-away penalty.
export function secondsLeft({
  deadlineAt, awaySeconds = 0, timePenalty = 0, now = Date.now(),
}) {
  if (!deadlineAt) return null;
  const end = new Date(deadlineAt).getTime() - awaySeconds * timePenalty * 1000;
  return Math.max(0, Math.round((end - now) / 1000));
}
