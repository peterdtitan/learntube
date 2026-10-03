import prisma from '../../../../../lib/prismadb';
import {
  error, json, readJson, requireUserId,
} from '../../../../../lib/api';
import { getMake } from '../../../../../lib/makes';
import { COMMENT_PRESETS, presetText } from '../../../../../lib/comments';
import { rateLimit } from '../../../../../lib/rateLimit';
import { notify } from '../../../../../lib/notifications';

// GET: the make's comments plus the phrases a learner can pick from.
export async function GET(req, { params }) {
  const viewerId = await requireUserId();
  const make = await getMake(params.makeId, viewerId);
  if (!make) return error(404, 'Make not found.');
  return json({ comments: make.comments, presets: COMMENT_PRESETS });
}

// POST { preset }: comments are limited to the preset phrases, once each per learner per make.
export async function POST(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to comment.');
  const limited = await rateLimit('comment', userId);
  if (limited) return limited;

  const body = await readJson(req);
  if (!body || !presetText(body.preset)) return error(400, 'Pick one of the suggested comments.');

  const make = await prisma.make.findUnique({
    where: { id: params.makeId },
    select: { id: true, userId: true, hiddenAt: true },
  });
  if (!make || make.hiddenAt) return error(404, 'Make not found.');

  try {
    await prisma.makeComment.create({ data: { makeId: make.id, userId, preset: body.preset } });
  } catch (err) {
    if (err?.code !== 'P2002') throw err; // Already said this one; treat as success.
  }
  await notify('COMMENT', {
    userId: make.userId, actorId: userId, makeId: make.id, preset: body.preset,
  });
  return json({ comments: (await getMake(make.id, userId)).comments }, 201);
}
