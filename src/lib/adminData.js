import prisma from './prismadb';
import { emailConfig } from './email/send';

// The queries behind the admin pages.

const DAY = 24 * 60 * 60 * 1000;

export const QUIZ_KINDS = {
  CHECKPOINT: 'Module exam',
  MODULE_GAME: 'Games',
  LESSON_CHECK: 'Quick check',
};

// Numbers for the overview, and the things worth fixing, each with a link to fix it.
export async function getOverview(now = new Date()) {
  const week = new Date(now - 7 * DAY);
  const [
    learners, active, makes, openReports, draftExams, thinExams,
    modules, modulesWithExam, noTry, longLessons, emailsSent, notTaught,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.xpEvent.groupBy({ by: ['userId'], where: { createdAt: { gte: week } } }).then((r) => r.length),
    prisma.make.count({ where: { createdAt: { gte: week } } }),
    prisma.report.count({ where: { resolvedAt: null } }),
    prisma.quiz.count({ where: { kind: 'CHECKPOINT', published: false, questions: { some: {} } } }),
    prisma.quiz.findMany({
      where: { kind: 'CHECKPOINT', drawCount: { not: null } },
      select: { drawCount: true, _count: { select: { questions: true } } },
    }).then((rows) => rows.filter((q) => q._count.questions < q.drawCount).length),
    prisma.unit.count({ where: { videos: { some: {} } } }),
    prisma.unit.count({ where: { videos: { some: {} }, quizzes: { some: { kind: 'CHECKPOINT' } } } }),
    prisma.video.count({ where: { unitId: { not: null }, tryTask: null } }),
    prisma.video.count({ where: { unitId: { not: null }, duration: { gt: 600 } } }),
    prisma.emailLog.count({ where: { createdAt: { gte: week }, kind: { not: 'TEST' } } }),
    prisma.searchLog.count({ where: { day: { gte: week }, missing: true } }),
  ]);

  const attention = [
    openReports && { text: `${openReports} open ${openReports === 1 ? 'report' : 'reports'} to review`, href: '/admin/reports', urgent: true },
    draftExams && { text: `${draftExams} module ${draftExams === 1 ? 'exam is' : 'exams are'} ready but still drafts`, href: '/admin/quizzes?kind=CHECKPOINT&status=draft' },
    thinExams && { text: `${thinExams} ${thinExams === 1 ? 'exam asks' : 'exams ask'} for more questions per attempt than its bank has`, href: '/admin/quizzes?kind=CHECKPOINT' },
    modules - modulesWithExam > 0 && { text: `${modules - modulesWithExam} modules have no exam`, href: '/admin/pathways' },
    noTry && { text: `${noTry} lessons have no Try step`, href: '/admin/pathways' },
    longLessons && { text: `${longLessons} lessons are over 10 minutes`, href: '/admin/pathways' },
    !emailConfig().configured && { text: 'Reminder emails are off: RESEND_API_KEY isn’t set', href: '/admin/emails' },
    notTaught && { text: `${notTaught} ${notTaught === 1 ? 'search' : 'searches'} this week for things we don’t teach yet`, href: '/admin/searches?days=7' },
  ].filter(Boolean);

  return {
    stats: [
      { label: 'Learners', value: learners, sub: 'with an account' },
      { label: 'Active this week', value: active, sub: 'earned XP' },
      { label: 'Makes this week', value: makes },
      { label: 'Emails this week', value: emailsSent },
    ],
    attention,
  };
}

function quizWhere({ kind, status, pathwayId }) {
  const where = {};
  if (QUIZ_KINDS[kind]) where.kind = kind;
  if (status === 'draft') where.published = false;
  if (status === 'live') where.published = true;
  if (pathwayId) {
    where.OR = [{ unit: { pathwayId } }, { video: { unit: { pathwayId } } }];
  }
  return where;
}

const passRate = (a) => (a?.total ? Math.round((a.passed / a.total) * 100) : null);

// Quizzes for the exams list, with where each sits and how learners are doing on it.
export async function listQuizzes(filters = {}) {
  const rows = await prisma.quiz.findMany({
    where: quizWhere(filters),
    select: {
      id: true,
      kind: true,
      title: true,
      published: true,
      timeLimitSec: true,
      drawCount: true,
      _count: { select: { questions: true } },
      unit: {
        select: {
          title: true, order: true, pathway: { select: { id: true, title: true } },
        },
      },
      video: {
        select: {
          title: true,
          order: true,
          unit: { select: { order: true, pathway: { select: { id: true, title: true } } } },
        },
      },
    },
    take: 1000,
  });
  const ids = rows.map((r) => r.id);
  const results = ids.length
    ? await prisma.quizAttempt.groupBy({
      by: ['quizId', 'passed'],
      where: { quizId: { in: ids }, submittedAt: { not: null } },
      _count: { quizId: true },
    })
    : [];
  const attempts = {};
  results.forEach((r) => {
    const a = attempts[r.quizId] || { total: 0, passed: 0 };
    a.total += r._count.quizId;
    if (r.passed) a.passed += r._count.quizId;
    attempts[r.quizId] = a;
  });

  return rows
    .map((q) => {
      const pathway = q.unit?.pathway || q.video?.unit?.pathway || null;
      const bank = q._count.questions;
      return {
        id: q.id,
        kind: q.kind,
        title: q.title,
        published: q.published,
        pathway,
        place: q.unit ? q.unit.title : q.video?.title,
        sort: [pathway?.title || '', q.unit?.order ?? q.video?.unit?.order ?? 0, q.video?.order ?? 999],
        bank,
        perAttempt: q.drawCount ? Math.min(q.drawCount, bank) : bank,
        short: Boolean(q.drawCount && bank < q.drawCount),
        minutes: q.timeLimitSec ? Math.round(q.timeLimitSec / 60) : null,
        ready: q.kind === 'MODULE_GAME' || bank > 0,
        attempts: attempts[q.id]?.total || 0,
        passRate: passRate(attempts[q.id]),
      };
    })
    .sort((a, b) => a.sort[0].localeCompare(b.sort[0])
      || a.sort[1] - b.sort[1]
      || a.sort[2] - b.sort[2]);
}

// Courses and skills, with module, lesson and exam counts.
export async function listPathways({ q = '', kind = '' } = {}) {
  const rows = await prisma.pathway.findMany({
    where: {
      ...(q ? { title: { contains: q, mode: 'insensitive' } } : {}),
      ...(['COURSE', 'SKILL'].includes(kind) ? { kind } : {}),
    },
    orderBy: { title: 'asc' },
    select: {
      id: true,
      title: true,
      kind: true,
      skill: { select: { id: true, name: true, color: true } },
      track: { select: { title: true } },
      units: {
        select: {
          quizzes: { where: { kind: 'CHECKPOINT' }, select: { published: true } },
          videos: { select: { duration: true, tryTask: true } },
        },
      },
    },
  });
  return rows.map((p) => {
    const lessons = p.units.flatMap((u) => u.videos);
    const exams = p.units.flatMap((u) => u.quizzes);
    return {
      id: p.id,
      title: p.title,
      kind: p.kind,
      skill: p.skill,
      program: p.track?.title || null,
      modules: p.units.length,
      lessons: lessons.length,
      seconds: lessons.reduce((n, v) => n + v.duration, 0),
      noTry: lessons.filter((v) => !v.tryTask).length,
      exams: exams.length,
      examsLive: exams.filter((e) => e.published).length,
    };
  });
}

export const LEARNERS_PER_PAGE = 50;

// Learners, newest first (ids are time-ordered cuids), with their XP and when they last
// earned any.
export async function listLearners({ q = '', page = 1 } = {}) {
  const where = q
    ? {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { displayName: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ],
    }
    : {};
  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: (Math.max(1, page) - 1) * LEARNERS_PER_PAGE,
      take: LEARNERS_PER_PAGE,
      select: {
        id: true,
        name: true,
        displayName: true,
        email: true,
        role: true,
        onboardedAt: true,
        emailReminders: true,
        emailWeekly: true,
        _count: { select: { makes: true } },
      },
    }),
  ]);
  const ids = users.map((u) => u.id);
  const xp = ids.length
    ? await prisma.xpEvent.groupBy({
      by: ['userId'],
      where: { userId: { in: ids } },
      _sum: { amount: true },
      _max: { createdAt: true },
    })
    : [];
  const byUser = Object.fromEntries(xp.map((r) => [r.userId, r]));
  return {
    total,
    pages: Math.max(1, Math.ceil(total / LEARNERS_PER_PAGE)),
    learners: users.map((u) => ({
      ...u,
      xp: byUser[u.id]?._sum.amount || 0,
      lastActive: byUser[u.id]?._max.createdAt || null,
    })),
  };
}

// Emails sent in the last week by kind, and the latest few.
export async function emailActivity(now = new Date()) {
  const week = new Date(now - 7 * DAY);
  const [byKind, recent, optedOut, total] = await Promise.all([
    prisma.emailLog.groupBy({
      by: ['kind'], where: { createdAt: { gte: week } }, _count: { kind: true },
    }),
    prisma.emailLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true, kind: true, createdAt: true, user: { select: { name: true, displayName: true } },
      },
    }),
    prisma.user.count({ where: { emailReminders: false } }),
    prisma.user.count(),
  ]);
  return {
    byKind: Object.fromEntries(byKind.map((r) => [r.kind, r._count.kind])),
    recent,
    optedOut,
    total,
  };
}

// What learners searched for on the skills page over the last `days` days, today included.
// A learner counts once per search per day.
export async function searchInsights(days = 30, now = new Date()) {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const where = { day: { gte: new Date(today - (days - 1) * DAY) } };
  const top = (extra) => prisma.searchLog.groupBy({
    by: ['query'],
    where: { ...where, ...extra },
    _count: { query: true },
    orderBy: [{ _count: { query: 'desc' } }, { query: 'asc' }],
    take: 25,
  });
  const [total, found, wanted, popular] = await Promise.all([
    prisma.searchLog.count({ where }),
    prisma.searchLog.count({ where: { ...where, missing: false } }),
    top({ missing: true }),
    top({}),
  ]);

  const queries = [...new Set([...wanted, ...popular].map((r) => r.query))];
  const [latest, clicks] = queries.length ? await Promise.all([
    prisma.searchLog.findMany({
      where: { ...where, query: { in: queries } },
      distinct: ['query'],
      orderBy: { updatedAt: 'desc' },
      select: { query: true, results: true, suggested: true },
    }),
    prisma.searchLog.groupBy({
      by: ['query', 'clicked'],
      where: { ...where, query: { in: queries }, clicked: { not: null } },
      _count: { clicked: true },
    }),
  ]) : [[], []];
  const row = (r) => {
    const last = latest.find((l) => l.query === r.query);
    const opened = clicks.filter((c) => c.query === r.query)
      .sort((a, b) => b._count.clicked - a._count.clicked);
    return {
      query: r.query,
      searches: r._count.query,
      results: last?.results ?? 0,
      suggested: last?.suggested ?? [],
      opened: opened.reduce((n, c) => n + c._count.clicked, 0),
      topOpened: opened[0]?.clicked ?? null,
    };
  };
  return {
    days, total, found, wanted: wanted.map(row), popular: popular.map(row),
  };
}
