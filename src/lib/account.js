import prisma from './prismadb';
import { publicName } from './people';
import { presetText } from './comments';
import { deletePhotos } from './blob';

const LESSON = { select: { title: true } };
const PERSON = { select: { name: true, displayName: true } };

// Everything Skillreps holds about one learner, readable as a file. Other people appear only
// by their public name, and only where they're part of the learner's own activity.
export async function exportUserData(userId, now = new Date()) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      accounts: { select: { provider: true } },
      videoProgress: { include: { video: LESSON }, orderBy: { watchedAt: 'asc' } },
      notes: { include: { video: LESSON } },
      makes: { include: { video: LESSON, pathway: LESSON }, orderBy: { createdAt: 'asc' } },
      kudos: { include: { make: LESSON }, orderBy: { createdAt: 'asc' } },
      comments: { include: { make: LESSON }, orderBy: { createdAt: 'asc' } },
      following: { include: { following: PERSON }, orderBy: { createdAt: 'asc' } },
      milestones: { include: { pathway: LESSON }, orderBy: { createdAt: 'asc' } },
      cheers: { include: { milestone: { include: { user: PERSON } } }, orderBy: { createdAt: 'asc' } },
      xpEvents: { include: { pathway: LESSON }, orderBy: { createdAt: 'asc' } },
      quizAttempts: { include: { quiz: { select: { kind: true, title: true } } }, orderBy: { startedAt: 'asc' } },
      reports: { include: { make: LESSON }, orderBy: { createdAt: 'asc' } },
      notifications: { include: { actor: PERSON }, orderBy: { createdAt: 'asc' } },
      emails: { orderBy: { createdAt: 'asc' } },
      _count: { select: { followers: true } },
    },
  });
  if (!user) return null;

  return {
    exportedAt: now.toISOString(),
    about: 'Everything Skillreps holds about you. Privacy policy: /privacy',
    account: {
      name: user.name,
      email: user.email,
      picture: user.image,
      displayName: user.displayName,
      signsInWith: user.accounts.map((a) => a.provider),
      weeklyGoal: user.weeklyGoal,
      timeZone: user.timeZone,
      showOnLeaderboard: user.showOnLeaderboard,
      extraQuizTime: user.extraQuizTime,
      interests: user.interests,
      learningGoal: user.learningGoal,
      onboardedAt: user.onboardedAt,
      emailReminders: user.emailReminders,
      emailWeekly: user.emailWeekly,
    },
    lessons: user.videoProgress.map((p) => ({
      lesson: p.video.title,
      lastWatched: p.watchedAt,
      stoppedAtSeconds: p.stoppedAt,
      watchedToTheEnd: p.completed,
      triedAt: p.triedAt,
    })),
    notes: user.notes.map((n) => ({
      lesson: n.video.title, note: n.content, updatedAt: n.updatedAt,
    })),
    makes: user.makes.map((m) => ({
      title: m.title,
      note: m.note,
      photo: m.imageUrl,
      lesson: m.video?.title || null,
      pathway: m.pathway?.title || null,
      createdAt: m.createdAt,
      hidden: Boolean(m.hiddenAt),
    })),
    kudosGiven: user.kudos.map((k) => ({ make: k.make.title, at: k.createdAt })),
    commentsGiven: user.comments.map((c) => ({
      make: c.make.title, said: presetText(c.preset) || c.preset, at: c.createdAt,
    })),
    following: user.following.map((f) => ({
      learner: publicName(f.following), since: f.createdAt,
    })),
    followerCount: user._count.followers,
    milestones: user.milestones.map((m) => ({
      kind: m.kind, value: m.value, pathway: m.pathway?.title || null, at: m.createdAt,
    })),
    cheersGiven: user.cheers.map((c) => ({
      learner: publicName(c.milestone.user), at: c.createdAt,
    })),
    xp: user.xpEvents.map((e) => ({
      kind: e.kind, amount: e.amount, pathway: e.pathway?.title || null, at: e.createdAt,
    })),
    quizAttempts: user.quizAttempts.map((a) => ({
      quiz: a.quiz.title || a.quiz.kind,
      kind: a.quiz.kind,
      startedAt: a.startedAt,
      submittedAt: a.submittedAt,
      score: a.score,
      penalty: a.penalty,
      finalScore: a.finalScore,
      passed: a.passed,
      answers: a.answers,
      integrityLog: a.events,
    })),
    reportsMade: user.reports.map((r) => ({
      make: r.make.title, reason: r.reason, at: r.createdAt, resolvedAt: r.resolvedAt,
    })),
    notifications: user.notifications.map((n) => ({
      kind: n.kind, from: publicName(n.actor), at: n.createdAt, readAt: n.readAt,
    })),
    emailsSent: user.emails.map((e) => ({ kind: e.kind, at: e.createdAt })),
  };
}

// Removes the account and everything the learner created (progress, notes, makes, comments,
// kudos, follows, quiz attempts), then their photos. Pathways they authored stay.
export async function deleteAccount(userId) {
  const photos = await prisma.make.findMany({
    where: { userId, imageUrl: { not: null } },
    select: { imageUrl: true },
  });
  await prisma.user.delete({ where: { id: userId } });
  await deletePhotos(photos.map((p) => p.imageUrl));
}
