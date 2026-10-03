import prisma from './prismadb';
import { publicName } from './people';
import { describeNotification, notificationKey } from './notificationText';

// Tell userId that actorId did something. Never notifies people about themselves, and a
// failure here never fails the kudos, comment or follow that caused it.
export async function notify(kind, {
  userId, actorId, makeId = null, milestoneId = null, preset = null,
}) {
  if (!userId || userId === actorId) return;
  const key = notificationKey(kind, {
    actorId, makeId, milestoneId, preset,
  });
  try {
    await prisma.notification.upsert({
      where: { userId_key: { userId, key } },
      update: {},
      create: {
        userId, actorId, kind, key, makeId, milestoneId, preset,
      },
    });
  } catch (err) {
    console.error('notify failed', err); // eslint-disable-line no-console
  }
}

// Undo a notification the recipient hasn't seen yet, e.g. when kudos is taken back.
// Seen ones stay, so toggling can't notify someone twice.
export async function retract(kind, { userId, ...refs }) {
  if (!userId) return;
  const key = notificationKey(kind, refs);
  try {
    await prisma.notification.deleteMany({ where: { userId, key, readAt: null } });
  } catch (err) {
    console.error('retract failed', err); // eslint-disable-line no-console
  }
}

export async function unreadCount(userId) {
  return prisma.notification.count({ where: { userId, readAt: null } });
}

export async function listNotifications(userId, { limit = 50 } = {}) {
  const rows = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      actor: { select: { id: true, name: true, displayName: true } },
      make: { select: { title: true } },
      milestone: { select: { kind: true, value: true, pathway: { select: { title: true } } } },
    },
  });
  return rows.map((n) => ({
    id: n.id,
    kind: n.kind,
    createdAt: n.createdAt,
    unread: !n.readAt,
    actor: { id: n.actor.id, name: publicName(n.actor) },
    ...describeNotification(n, userId),
  }));
}

export async function markAllRead(userId) {
  await prisma.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() },
  });
}
