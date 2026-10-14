import prisma from '../prismadb';
import { SITE_URL } from '../seo';
import { localDayKey, summarizePractice, weekStartKey } from '../practice';
import { SCOPES, unsubscribeToken } from './unsubscribe';
import { SCOPE_OF, TEMPLATES } from './templates';
import { emailConfig, sendEmails } from './send';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const PRACTICE_KINDS = ['TRY', 'LOG'];

// The rules, in one place (the privacy policy and the admin Emails page describe them):
export const RULES = {
  firstHour: 8, // only between 8:00 and 21:59 in the learner's time zone
  lastHour: 21,
  minGapHours: 20, // never two emails within 20 hours
  maxPerWeek: 3,
  inactiveAfterDays: 30, // no emails at all after a month without practice
  comeBackAfterDays: 4,
  comeBackEveryDays: 14,
  logMakeWithinDays: 4, // Try steps from the last 4 days, but not the last 12 hours
  logMakeAfterHours: 12,
};

function localHour(now, timeZone) {
  return Number(new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', hourCycle: 'h23' }).format(now));
}

// Picks at most one email for one learner right now, or null. Pure: `facts` is everything
// the rules need (see gatherFacts), so the rules are easy to test.
export function chooseReminder(facts, now = new Date()) {
  const {
    user, events, emails, tried, resume,
  } = facts;
  const tz = user.timeZone || 'UTC';
  const hour = localHour(now, tz);
  if (hour < RULES.firstHour || hour > RULES.lastHour) return null;
  if (emails.some((e) => now - e.createdAt < RULES.minGapHours * HOUR)) return null;
  if (emails.filter((e) => now - e.createdAt < 7 * DAY).length >= RULES.maxPerWeek) return null;
  const lastActive = events.reduce(
    (latest, e) => (e.createdAt > latest ? e.createdAt : latest),
    new Date(0),
  );
  if (now - lastActive > RULES.inactiveAfterDays * DAY) return null;

  const sent = (kind, key) => emails.some((e) => e.kind === kind && e.key === key);
  const sentWithin = (kind, days) => emails.some(
    (e) => e.kind === kind && now - e.createdAt < days * DAY,
  );
  const practice = summarizePractice({
    practiceDates: events.filter((e) => PRACTICE_KINDS.includes(e.kind)).map((e) => e.createdAt),
    goal: user.weeklyGoal,
    timeZone: tz,
    now,
  });
  const today = localDayKey(now, tz);
  const thisWeek = weekStartKey(today);

  if (user.emailWeekly && today === thisWeek) {
    const lastWeek = weekStartKey(localDayKey(new Date(now - 7 * DAY), tz));
    const inLastWeek = (d) => {
      const key = localDayKey(d, tz);
      return key >= lastWeek && key < thisWeek;
    };
    const lastWeekEvents = events.filter((e) => inLastWeek(e.createdAt));
    const xp = lastWeekEvents.reduce((n, e) => n + e.amount, 0);
    if (xp > 0 && !sent('WEEKLY_RECAP', lastWeek)) {
      const days = new Set(lastWeekEvents
        .filter((e) => PRACTICE_KINDS.includes(e.kind))
        .map((e) => localDayKey(e.createdAt, tz))).size;
      return {
        kind: 'WEEKLY_RECAP',
        key: lastWeek,
        data: {
          name: user.name,
          xp,
          days,
          goal: practice.weeklyGoal,
          streakWeeks: practice.streakWeeks,
          makes: (facts.makes || []).filter((m) => inLastWeek(m.createdAt)).length,
          kudos: (facts.kudos || []).filter((k) => inLastWeek(k.createdAt)).length,
          resume,
        },
      };
    }
  }

  if (!user.emailReminders) return null;

  const practicedToday = practice.days.some((d) => d.isToday && d.practiced);
  const needed = practice.weeklyGoal - practice.doneThisWeek;
  const left = practice.daysLeftThisWeek;
  if (!practice.metThisWeek && !practicedToday && needed > 0 && needed <= left && needed >= left - 1
    && (practice.streakWeeks > 0 || practice.doneThisWeek > 0) && !sent('STREAK_AT_RISK', thisWeek)) {
    return {
      kind: 'STREAK_AT_RISK',
      key: thisWeek,
      data: {
        name: user.name,
        streakWeeks: practice.streakWeeks,
        done: practice.doneThisWeek,
        goal: practice.weeklyGoal,
        needed,
        daysLeft: left,
        resume,
      },
    };
  }

  const toLog = tried.find((t) => !t.logged
    && now - t.triedAt >= RULES.logMakeAfterHours * HOUR
    && now - t.triedAt <= RULES.logMakeWithinDays * DAY
    && !sent('LOG_MAKE', t.videoId));
  if (toLog && !sentWithin('LOG_MAKE', 7)) {
    return {
      kind: 'LOG_MAKE',
      key: toLog.videoId,
      data: {
        name: user.name,
        lessonTitle: toLog.lessonTitle,
        pathwayTitle: toLog.pathwayTitle,
        url: toLog.url,
      },
    };
  }

  const daysAway = Math.floor((now - lastActive) / DAY);
  if (resume && daysAway >= RULES.comeBackAfterDays && !sentWithin('COME_BACK', RULES.comeBackEveryDays)) {
    return {
      kind: 'COME_BACK',
      key: today,
      data: { name: user.name, daysAway, ...resume },
    };
  }
  return null;
}

const LESSON_SELECT = {
  title: true,
  pathwayId: true,
  pathway: { select: { title: true } },
  unit: { select: { pathwayId: true, pathway: { select: { title: true } } } },
};

function lessonLink(videoId, video) {
  const pathwayId = video.unit?.pathwayId || video.pathwayId;
  if (!pathwayId) return null;
  return {
    lessonTitle: video.title,
    pathwayTitle: video.unit?.pathway.title || video.pathway?.title || 'your course',
    url: `${SITE_URL}/pathways/${pathwayId}/learn/${videoId}`,
  };
}

// Everything chooseReminder needs about one learner.
export async function gatherFacts(user, now = new Date()) {
  const userId = user.id;
  const twoWeeksAgo = new Date(now - 14 * DAY);
  const [events, emails, tried, latest, makes, kudos] = await Promise.all([
    prisma.xpEvent.findMany({
      where: { userId, createdAt: { gte: new Date(now - 16 * 7 * DAY) } },
      select: { kind: true, amount: true, createdAt: true },
    }),
    prisma.emailLog.findMany({
      // Test emails from the admin page don't count against anyone's reminders.
      where: { userId, kind: { not: 'TEST' }, createdAt: { gte: new Date(now - RULES.comeBackEveryDays * DAY) } },
      select: { kind: true, key: true, createdAt: true },
    }),
    prisma.videoProgress.findMany({
      where: { userId, triedAt: { gte: new Date(now - RULES.logMakeWithinDays * DAY) } },
      orderBy: { triedAt: 'desc' },
      take: 10,
      select: { videoId: true, triedAt: true, video: { select: LESSON_SELECT } },
    }),
    prisma.videoProgress.findFirst({
      where: { userId },
      orderBy: { watchedAt: 'desc' },
      select: { videoId: true, video: { select: LESSON_SELECT } },
    }),
    prisma.make.findMany({
      where: { userId, createdAt: { gte: twoWeeksAgo } }, select: { createdAt: true },
    }),
    prisma.kudos.findMany({
      where: { make: { userId }, createdAt: { gte: twoWeeksAgo } }, select: { createdAt: true },
    }),
  ]);
  const logged = tried.length
    ? new Set((await prisma.make.findMany({
      where: { userId, videoId: { in: tried.map((t) => t.videoId) } },
      select: { videoId: true },
    })).map((m) => m.videoId))
    : new Set();
  return {
    user,
    events,
    emails,
    makes,
    kudos,
    tried: tried
      .map((t) => ({
        videoId: t.videoId,
        triedAt: t.triedAt,
        logged: logged.has(t.videoId),
        ...lessonLink(t.videoId, t.video),
      }))
      .filter((t) => t.url),
    resume: latest ? lessonLink(latest.videoId, latest.video) : null,
  };
}

// Learners who could get an email: opted in to something, with an address, and active in
// the last month.
function candidates(now) {
  return prisma.user.findMany({
    where: {
      email: { not: null },
      OR: [{ emailReminders: true }, { emailWeekly: true }],
      xpEvents: { some: { createdAt: { gte: new Date(now - RULES.inactiveAfterDays * DAY) } } },
    },
    select: {
      id: true,
      email: true,
      name: true,
      displayName: true,
      timeZone: true,
      weeklyGoal: true,
      emailReminders: true,
      emailWeekly: true,
    },
    orderBy: { id: 'asc' },
  });
}

export function emailLinks(userId, kind) {
  const scope = SCOPE_OF[kind];
  const token = unsubscribeToken(userId, scope);
  return {
    home: SITE_URL,
    admin: `${SITE_URL}/admin/emails`,
    settings: `${SITE_URL}/settings#emails`,
    scopeLabel: SCOPES[scope].label,
    unsubscribe: `${SITE_URL}/email/unsubscribe?t=${encodeURIComponent(token)}`,
    oneClick: `${SITE_URL}/api/email/unsubscribe?t=${encodeURIComponent(token)}`,
  };
}

// One ready-to-send message. List-Unsubscribe lets mail apps show their own unsubscribe
// button, which Gmail and Yahoo expect from anyone sending reminders.
export function buildMessage(user, { kind, data }) {
  const links = emailLinks(user.id, kind);
  const name = user.displayName || user.name || data.name;
  const content = TEMPLATES[kind]({ ...data, name }, links);
  return {
    to: user.email,
    kind,
    subject: content.subject,
    html: content.html,
    text: content.text,
    headers: {
      'List-Unsubscribe': `<${links.oneClick}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  };
}

// Who would get what right now. Used by the daily run and by the admin page's preview.
export async function planReminders(now = new Date()) {
  const users = await candidates(now);
  // One learner at a time keeps the database connection count low.
  const choices = await users.reduce(async (done, user) => {
    const list = await done;
    const choice = chooseReminder(await gatherFacts(user, now), now);
    return choice ? [...list, { user, ...choice }] : list;
  }, Promise.resolve([]));
  return { considered: users.length, plan: choices };
}

// The daily run (see /api/cron/reminders). Each email is logged before it's sent, so two runs
// at once can't both send it; a failed send removes its log row so the next run tries again.
export async function sendReminders(now = new Date(), { fetchImpl } = {}) {
  const config = emailConfig();
  const { considered, plan } = await planReminders(now);
  const sentToday = await prisma.emailLog.count({
    where: { createdAt: { gte: new Date(now - DAY) } },
  });
  const room = Math.max(0, config.dailyLimit - sentToday);
  const report = {
    considered,
    due: plan.length,
    sent: 0,
    failed: 0,
    skippedOverLimit: Math.max(0, plan.length - room),
    dryRun: !config.configured,
    byKind: {},
  };
  if (!config.configured) {
    plan.forEach((p) => { report.byKind[p.kind] = (report.byKind[p.kind] || 0) + 1; });
    return report;
  }

  const claimed = await plan.slice(0, room).reduce(async (done, item) => {
    const list = await done;
    try {
      const log = await prisma.emailLog.create({
        data: { userId: item.user.id, kind: item.kind, key: item.key },
      });
      return [...list, { item, log }];
    } catch (err) {
      if (err?.code !== 'P2002') throw err;
      return list; // already sent by another run
    }
  }, Promise.resolve([]));
  const messages = claimed.map(({ item }) => buildMessage(item.user, item));
  const results = await sendEmails(messages, { fetchImpl });
  await Promise.all(claimed.map(({ item, log }, i) => {
    const result = results[i];
    if (result.error) {
      report.failed += 1;
      return prisma.emailLog.delete({ where: { id: log.id } });
    }
    report.sent += 1;
    report.byKind[item.kind] = (report.byKind[item.kind] || 0) + 1;
    if (!result.id) return null;
    return prisma.emailLog.update({ where: { id: log.id }, data: { providerId: result.id } });
  }));
  const firstError = results.find((r) => r.error);
  if (firstError) report.error = firstError.error;
  return report;
}

// A test email to an admin, from the admin Emails page. It doesn't hold back their reminders.
export async function sendTestEmail(user, { fetchImpl } = {}) {
  const config = emailConfig();
  const message = buildMessage(user, {
    kind: 'TEST', data: { from: config.from, replyTo: config.replyTo },
  });
  const [result] = await sendEmails([message], { fetchImpl });
  if (result.id) {
    await prisma.emailLog.create({
      data: {
        userId: user.id, kind: 'TEST', key: `test-${Date.now()}`, providerId: result.id,
      },
    });
  }
  return result;
}
