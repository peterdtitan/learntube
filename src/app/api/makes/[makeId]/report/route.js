import prisma from '../../../../../lib/prismadb';
import {
  error, json, readJson, requireUserId,
} from '../../../../../lib/api';
import { AUTO_HIDE_REPORTS, reasonText } from '../../../../../lib/moderation';
import { rateLimit } from '../../../../../lib/rateLimit';

// POST { reason }: one report per learner per make. Enough open reports hide the make
// until an admin reviews it.
export async function POST(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to report a make.');
  const limited = await rateLimit('report', userId);
  if (limited) return limited;

  const body = await readJson(req);
  if (!body || !reasonText(body.reason)) return error(400, 'Pick a reason for the report.');

  const make = await prisma.make.findUnique({
    where: { id: params.makeId },
    select: { id: true, userId: true, hiddenAt: true },
  });
  if (!make) return error(404, 'Make not found.');
  if (make.userId === userId) return error(400, "You can't report your own make.");

  await prisma.report.upsert({
    where: { makeId_reporterId: { makeId: make.id, reporterId: userId } },
    update: { reason: body.reason, resolvedAt: null },
    create: { makeId: make.id, reporterId: userId, reason: body.reason },
  });

  const open = await prisma.report.count({ where: { makeId: make.id, resolvedAt: null } });
  if (open >= AUTO_HIDE_REPORTS && !make.hiddenAt) {
    await prisma.make.update({ where: { id: make.id }, data: { hiddenAt: new Date() } });
  }
  return json({ reported: true });
}
