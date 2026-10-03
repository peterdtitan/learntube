import prisma from './prismadb';
import { presetText } from './comments';
import { publicName } from './people';
import { visibleMakesFor } from './moderation';

export function serializeMake(make, viewerId) {
  return {
    id: make.id,
    title: make.title,
    note: make.note,
    imageUrl: make.imageUrl,
    createdAt: make.createdAt.toISOString(),
    author: { id: make.user.id, name: publicName(make.user) },
    lesson: make.video ? { id: make.video.id, title: make.video.title } : null,
    pathway: make.pathway ? { id: make.pathway.id, title: make.pathway.title } : null,
    skill: make.pathway?.skill || make.video?.unit?.pathway?.skill || null,
    kudosCount: make._count.kudos,
    commentCount: make._count.comments,
    gaveKudos: viewerId ? make.kudos.some((k) => k.userId === viewerId) : false,
    isMine: viewerId === make.user.id,
    hidden: Boolean(make.hiddenAt),
  };
}

const SKILL = { select: { id: true, name: true, color: true } };

function makeInclude(viewerId) {
  return {
    user: { select: { id: true, name: true, displayName: true } },
    video: {
      select: {
        id: true, title: true, unit: { select: { pathway: { select: { skill: SKILL } } } },
      },
    },
    pathway: { select: { id: true, title: true, skill: SKILL } },
    kudos: viewerId ? { where: { userId: viewerId }, select: { userId: true } } : false,
    _count: { select: { kudos: true, comments: true } },
  };
}

// scope: 'recent' (everyone), 'mine', or pass userIds to list specific learners' makes.
export async function listMakes({
  viewerId, scope = 'recent', userIds, limit = 20,
}) {
  let where = visibleMakesFor(viewerId);
  if (userIds) where = { AND: [where, { userId: { in: userIds } }] };
  else if (scope === 'mine') where = { userId: viewerId };

  const makes = await prisma.make.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: makeInclude(viewerId),
  });
  return makes.map((m) => serializeMake({ ...m, kudos: m.kudos || [] }, viewerId));
}

export async function getMake(makeId, viewerId, { viewerIsAdmin = false } = {}) {
  const make = await prisma.make.findUnique({
    where: { id: makeId },
    include: {
      ...makeInclude(viewerId),
      comments: {
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { id: true, name: true, displayName: true } } },
      },
    },
  });
  // A hidden make is only visible to its author and to admins reviewing it.
  if (!make || (make.hiddenAt && make.userId !== viewerId && !viewerIsAdmin)) return null;
  return {
    ...serializeMake({ ...make, kudos: make.kudos || [] }, viewerId),
    pathwayId: make.pathway?.id || null,
    comments: make.comments
      .filter((c) => presetText(c.preset))
      .map((c) => ({
        id: c.id,
        preset: c.preset,
        text: presetText(c.preset),
        createdAt: c.createdAt.toISOString(),
        author: { id: c.user.id, name: publicName(c.user) },
        isMine: c.user.id === viewerId,
      })),
  };
}
