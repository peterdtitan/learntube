import prisma from './prismadb';

export function serializeMake(make, viewerId) {
  return {
    id: make.id,
    title: make.title,
    note: make.note,
    imageUrl: make.imageUrl,
    createdAt: make.createdAt.toISOString(),
    author: { id: make.user.id, name: make.user.name },
    lesson: make.video ? { id: make.video.id, title: make.video.title } : null,
    pathway: make.pathway ? { id: make.pathway.id, title: make.pathway.title } : null,
    skill: make.pathway?.skill || make.video?.unit?.pathway?.skill || null,
    kudosCount: make._count.kudos,
    gaveKudos: viewerId ? make.kudos.some((k) => k.userId === viewerId) : false,
    isMine: viewerId === make.user.id,
  };
}

const SKILL = { select: { id: true, name: true, color: true } };

export async function listMakes({ viewerId, scope = 'recent', limit = 20 }) {
  const makes = await prisma.make.findMany({
    where: scope === 'mine' ? { userId: viewerId } : {},
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: { select: { id: true, name: true } },
      video: {
        select: {
          id: true, title: true, unit: { select: { pathway: { select: { skill: SKILL } } } },
        },
      },
      pathway: { select: { id: true, title: true, skill: SKILL } },
      kudos: viewerId ? { where: { userId: viewerId }, select: { userId: true } } : false,
      _count: { select: { kudos: true } },
    },
  });
  return makes.map((m) => serializeMake({ ...m, kudos: m.kudos || [] }, viewerId));
}
