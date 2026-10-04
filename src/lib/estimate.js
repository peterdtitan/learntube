// How long a pathway takes: watching, doing the Try steps, and the quizzes.
// Safe to import from client components.

const QUIZ_MINUTES = { LESSON_CHECK: 2, MODULE_GAME: 5 };
const DEFAULT_CHECKPOINT_MINUTES = 10;

// Practising usually takes longer than watching; without a figure from the admin,
// assume one and a half times the video, between 5 minutes and an hour.
export function practiceMinutesFor(video) {
  const set = video.practiceMinutes;
  if (Number.isInteger(set) && set >= 0) return set;
  return Math.min(60, Math.max(5, Math.round((video.duration / 60) * 1.5)));
}

function quizMinutes(quiz) {
  if (!quiz.published) return 0;
  if (quiz.kind === 'CHECKPOINT') return quiz.timeLimitSec ? Math.ceil(quiz.timeLimitSec / 60) : DEFAULT_CHECKPOINT_MINUTES;
  return QUIZ_MINUTES[quiz.kind] || 0;
}

// units: [{ videos: [{ duration, practiceMinutes, quizzes? }], quizzes? }]
export function estimateModule(unit) {
  const videos = unit.videos || [];
  const video = videos.reduce((sum, v) => sum + v.duration / 60, 0);
  const practice = videos.reduce((sum, v) => sum + practiceMinutesFor(v), 0);
  const quizzes = [...(unit.quizzes || []), ...videos.flatMap((v) => v.quizzes || [])]
    .reduce((sum, q) => sum + quizMinutes(q), 0);
  return {
    video: Math.round(video), practice, quizzes, total: Math.round(video + practice + quizzes),
  };
}

export function estimatePathway(units) {
  const modules = units.map(estimateModule);
  const sum = (key) => modules.reduce((total, m) => total + m[key], 0);
  return {
    modules,
    video: sum('video'),
    practice: sum('practice'),
    quizzes: sum('quizzes'),
    total: sum('total'),
  };
}

export function formatMinutes(minutes) {
  const m = Math.max(0, Math.round(minutes));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h} h ${rest} min` : `${h} h`;
}

// Everyday things that take a known time, in minutes. Skill ones are tried first.
const GENERAL = [
  { minutes: 3.5, one: 'song', many: 'songs' },
  { minutes: 8, one: 'long shower', many: 'long showers' },
  { minutes: 22, one: 'sitcom episode', many: 'sitcom episodes' },
  { minutes: 105, one: 'football match', many: 'football matches' },
  { minutes: 390, one: 'flight from Lagos to London', many: 'flights from Lagos to London' },
];

const BY_SKILL = {
  cooking: [{ minutes: 9, one: 'soft-boiled egg', many: 'soft-boiled eggs' }, { minutes: 45, one: 'pot of jollof', many: 'pots of jollof' }],
  knitting: [{ minutes: 6, one: 'row of a scarf', many: 'rows of a scarf' }],
  sewing: [{ minutes: 12, one: 'hemmed trouser leg', many: 'hemmed trouser legs' }],
  drawing: [{ minutes: 5, one: 'quick sketch', many: 'quick sketches' }],
  guitar: [{ minutes: 3.5, one: 'song strummed', many: 'songs strummed' }],
  photography: [{ minutes: 60, one: 'golden hour', many: 'golden hours' }],
  'software-engineering': [{ minutes: 15, one: 'coffee break', many: 'coffee breaks' }],
  data: [{ minutes: 15, one: 'coffee break', many: 'coffee breaks' }],
  'digital-marketing': [{ minutes: 0.75, one: 'short video', many: 'short videos' }],
  'music-production': [{ minutes: 3, one: 'beat', many: 'beats' }],
};

// "About 108 songs": picks the comparison whose count reads best (ideally 5 to 60).
export function funEquivalent(minutes, skillId) {
  if (!minutes || minutes <= 0) return null;
  const candidates = [...(BY_SKILL[skillId] || []), ...GENERAL];
  const scored = candidates.map((c) => {
    const count = Math.round(minutes / c.minutes);
    let penalty = 0;
    if (count < 2) penalty = 1000;
    else if (count < 5) penalty = 5 - count;
    else if (count > 60) penalty = (count - 60) / 10;
    return { ...c, count, penalty };
  }).filter((c) => c.penalty < 1000);
  if (!scored.length) return null;
  // Stable sort keeps skill-specific comparisons ahead on a tie.
  const best = [...scored].sort((a, b) => a.penalty - b.penalty)[0];
  return { count: best.count, label: `${best.count} ${best.count === 1 ? best.one : best.many}` };
}
