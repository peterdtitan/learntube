import prisma from '../../../lib/prismadb';
import {
  error, json, readJson, requireUserId,
} from '../../../lib/api';
import { getLearnerSummary } from '../../../lib/xp';
import { validateDisplayName } from '../../../lib/people';
import { deletePhotos } from '../../../lib/blob';
import {
  isValidTimeZone, MAX_WEEKLY_GOAL, MIN_WEEKLY_GOAL,
} from '../../../lib/practice';

// GET /api/me: XP totals, this week's practice days and the weekly streak.
export async function GET() {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to see your progress.');
  return json(await getLearnerSummary(userId));
}

// PATCH /api/me { weeklyGoal?, timeZone?, showOnLeaderboard?, displayName? }
export async function PATCH(req) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to change your goal.');

  const body = await readJson(req);
  if (!body) return error(400, 'Send settings as JSON.');

  const data = {};
  if (body.weeklyGoal !== undefined) {
    const goal = Number(body.weeklyGoal);
    if (!Number.isInteger(goal) || goal < MIN_WEEKLY_GOAL || goal > MAX_WEEKLY_GOAL) {
      return error(400, `Weekly goal must be a whole number from ${MIN_WEEKLY_GOAL} to ${MAX_WEEKLY_GOAL}.`);
    }
    data.weeklyGoal = goal;
  }
  if (body.timeZone !== undefined) {
    if (typeof body.timeZone !== 'string' || !isValidTimeZone(body.timeZone)) {
      return error(400, 'Time zone must be an IANA name, like Africa/Lagos.');
    }
    data.timeZone = body.timeZone;
  }
  if (body.displayName !== undefined) {
    // An empty value clears it, falling back to first name and last initial.
    if (body.displayName === null || String(body.displayName).trim() === '') {
      data.displayName = null;
    } else {
      const checked = validateDisplayName(body.displayName);
      if (checked.error) return error(400, checked.error);
      data.displayName = checked.name;
    }
  }
  if (body.showOnLeaderboard !== undefined) {
    if (typeof body.showOnLeaderboard !== 'boolean') return error(400, 'showOnLeaderboard must be true or false.');
    data.showOnLeaderboard = body.showOnLeaderboard;
  }
  if (!Object.keys(data).length) return error(400, 'Nothing to update.');

  await prisma.user.update({ where: { id: userId }, data });
  return json(await getLearnerSummary(userId));
}

// DELETE /api/me { confirm: "DELETE" }: removes the account and everything the learner
// created (progress, notes, makes, comments, kudos, follows). Pathways they authored stay.
export async function DELETE(req) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to delete your account.');

  const body = await readJson(req);
  if (body?.confirm !== 'DELETE') return error(400, 'Type DELETE to confirm.');

  const photos = await prisma.make.findMany({
    where: { userId, imageUrl: { not: null } },
    select: { imageUrl: true },
  });
  await prisma.user.delete({ where: { id: userId } });
  await deletePhotos(photos.map((p) => p.imageUrl));
  return json({ deleted: true });
}
