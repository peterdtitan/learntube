// Weekly practice streak. A practice day is any local calendar day with a Try or Log.
// Weeks start on Monday in the learner's time zone.

export const MIN_WEEKLY_GOAL = 2;
export const MAX_WEEKLY_GOAL = 5;

const DAY_MS = 24 * 60 * 60 * 1000;

export function localDayKey(date, timeZone = 'UTC') {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(date);
}

function keyToUtcMs(key) {
  const [y, m, d] = key.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function utcMsToKey(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

export function weekStartKey(dayKey) {
  const ms = keyToUtcMs(dayKey);
  const mondayOffset = (new Date(ms).getUTCDay() + 6) % 7;
  return utcMsToKey(ms - mondayOffset * DAY_MS);
}

export function isValidTimeZone(timeZone) {
  try {
    return Boolean(new Intl.DateTimeFormat('en-US', { timeZone }).resolvedOptions().timeZone);
  } catch {
    return false;
  }
}

export function clampGoal(goal) {
  return Math.min(MAX_WEEKLY_GOAL, Math.max(MIN_WEEKLY_GOAL, Math.round(goal)));
}

// practiceDates: Date[] of Try/Log events. Returns this week's day grid and the streak in weeks.
// The current week only adds to the streak once its goal is met,
// and never breaks it while it's in progress.
export function summarizePractice({
  practiceDates, goal, timeZone = 'UTC', now = new Date(),
}) {
  const weeklyGoal = clampGoal(goal);
  const dayKeys = new Set(practiceDates.map((d) => localDayKey(d, timeZone)));

  const daysPerWeek = new Map();
  dayKeys.forEach((key) => {
    const week = weekStartKey(key);
    daysPerWeek.set(week, (daysPerWeek.get(week) || 0) + 1);
  });

  const todayKey = localDayKey(now, timeZone);
  const thisWeek = weekStartKey(todayKey);
  const thisWeekMs = keyToUtcMs(thisWeek);

  const days = Array.from({ length: 7 }, (_, i) => {
    const key = utcMsToKey(thisWeekMs + i * DAY_MS);
    return { date: key, practiced: dayKeys.has(key), isToday: key === todayKey };
  });

  const doneThisWeek = daysPerWeek.get(thisWeek) || 0;
  const metThisWeek = doneThisWeek >= weeklyGoal;

  let streakWeeks = metThisWeek ? 1 : 0;
  let cursor = thisWeekMs - 7 * DAY_MS;
  while ((daysPerWeek.get(utcMsToKey(cursor)) || 0) >= weeklyGoal) {
    streakWeeks += 1;
    cursor -= 7 * DAY_MS;
  }

  return {
    weeklyGoal,
    doneThisWeek,
    metThisWeek,
    daysLeftThisWeek: 7 - days.findIndex((d) => d.isToday),
    streakWeeks,
    days,
  };
}
