import prisma from './prismadb';

// How long data that isn't the learner's own work is kept. The privacy policy quotes these.
export const RETENTION_DAYS = {
  checkpointCopyText: 90, // the copied or pasted text; counts and times stay with the attempt
  notifications: 365,
  emailLog: 180, // long enough for the weekly and fortnightly limits, with room to spare
  rateLimits: 2, // the longest limit window is a day
  searchLog: 365, // a year of searches shows what people want, season to season
};

const daysBefore = (now, days) => new Date(now.getTime() - days * 86400000);

// Run daily by Vercel Cron (see vercel.json). Safe to run any number of times.
export async function runRetention(now = new Date()) {
  const [
    copyText, sessions, tokens, verificationTokens, rateLimits, notifications, emailLog,
    searchLog,
  ] = await prisma.$transaction([
    prisma.$executeRaw`
      UPDATE "QuizAttempt"
      SET "events" = (SELECT jsonb_agg(e - 'text') FROM jsonb_array_elements("events") AS e)
      WHERE "startedAt" < ${daysBefore(now, RETENTION_DAYS.checkpointCopyText)}
        AND jsonb_typeof("events") = 'array'
        AND jsonb_path_exists("events", '$[*].text')`,
    prisma.session.deleteMany({ where: { expires: { lt: now } } }),
    // Google's tokens are only used while signing in; older accounts may still hold them.
    prisma.account.updateMany({
      where: {
        OR: [
          { access_token: { not: null } },
          { refresh_token: { not: null } },
          { id_token: { not: null } },
        ],
      },
      data: { access_token: null, refresh_token: null, id_token: null },
    }),
    prisma.verificationToken.deleteMany({ where: { expires: { lt: now } } }),
    prisma.rateLimit.deleteMany({
      where: { windowStart: { lt: daysBefore(now, RETENTION_DAYS.rateLimits) } },
    }),
    prisma.notification.deleteMany({
      where: { createdAt: { lt: daysBefore(now, RETENTION_DAYS.notifications) } },
    }),
    prisma.emailLog.deleteMany({
      where: { createdAt: { lt: daysBefore(now, RETENTION_DAYS.emailLog) } },
    }),
    prisma.searchLog.deleteMany({
      where: { day: { lt: daysBefore(now, RETENTION_DAYS.searchLog) } },
    }),
  ]);
  return {
    checkpointCopyTextCleared: copyText,
    expiredSessions: sessions.count,
    googleTokensCleared: tokens.count,
    expiredVerificationTokens: verificationTokens.count,
    oldRateLimits: rateLimits.count,
    oldNotifications: notifications.count,
    oldEmailLogs: emailLog.count,
    oldSearchLogs: searchLog.count,
  };
}
