import prisma from '../../../lib/prismadb';
import {
  error, json, readJson, requireUserId,
} from '../../../lib/api';
import { awardXp } from '../../../lib/xp';

const MAX_TITLE = 120;
const MAX_NOTE = 2000;

function cleanText(value, max) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function cleanImageUrl(value) {
  if (typeof value !== 'string' || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function serialize(make, viewerId) {
  return {
    id: make.id,
    title: make.title,
    note: make.note,
    imageUrl: make.imageUrl,
    createdAt: make.createdAt,
    author: { id: make.user.id, name: make.user.name, image: make.user.image },
    lesson: make.video ? { id: make.video.id, title: make.video.title } : null,
    pathway: make.pathway ? { id: make.pathway.id, title: make.pathway.title } : null,
    kudosCount: make._count.kudos,
    gaveKudos: viewerId ? make.kudos.some((k) => k.userId === viewerId) : false,
  };
}

// GET /api/makes?scope=recent|mine&limit=20
export async function GET(req) {
  const viewerId = await requireUserId();
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get('scope') === 'mine' ? 'mine' : 'recent';
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20));
  if (scope === 'mine' && !viewerId) return error(401, 'Sign in to see your makes.');

  const makes = await prisma.make.findMany({
    where: scope === 'mine' ? { userId: viewerId } : {},
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      user: { select: { id: true, name: true, image: true } },
      video: { select: { id: true, title: true } },
      pathway: { select: { id: true, title: true } },
      kudos: viewerId ? { where: { userId: viewerId }, select: { userId: true } } : false,
      _count: { select: { kudos: true } },
    },
  });

  return json({ makes: makes.map((m) => serialize({ ...m, kudos: m.kudos || [] }, viewerId)) });
}

// POST /api/makes { title, note?, imageUrl?, videoId?, pathwayId? }
export async function POST(req) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to log what you made.');

  const body = await readJson(req);
  if (!body) return error(400, 'Send the make as JSON.');

  const title = cleanText(body.title, MAX_TITLE);
  if (!title) return error(400, 'Give your make a title.');
  const note = cleanText(body.note, MAX_NOTE);
  const imageUrl = cleanImageUrl(body.imageUrl);
  if (imageUrl === undefined) return error(400, 'Photo links must start with https://.');

  const videoId = typeof body.videoId === 'string' ? body.videoId : null;
  const pathwayId = typeof body.pathwayId === 'string' ? body.pathwayId : null;
  const [video, pathway] = await Promise.all([
    videoId ? prisma.video.findUnique({ where: { id: videoId }, select: { id: true } }) : null,
    pathwayId
      ? prisma.pathway.findUnique({ where: { id: pathwayId }, select: { id: true } })
      : null,
  ]);
  if (videoId && !video) return error(404, 'Lesson not found.');
  if (pathwayId && !pathway) return error(404, 'Pathway not found.');

  const make = await prisma.make.create({
    data: {
      userId, title, note, imageUrl, videoId, pathwayId,
    },
  });

  // XP once per lesson or pathway; makes not tied to either earn none.
  let sourceKey = null;
  if (videoId) sourceKey = `log:video:${videoId}`;
  else if (pathwayId) sourceKey = `log:pathway:${pathwayId}`;
  const award = sourceKey ? await awardXp(userId, 'LOG', sourceKey) : null;

  return json({ make, xpAwarded: award?.amount || 0 }, 201);
}
