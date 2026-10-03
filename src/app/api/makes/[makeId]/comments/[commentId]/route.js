import prisma from '../../../../../../lib/prismadb';
import { error, json, requireUserId } from '../../../../../../lib/api';
import { rateLimit } from '../../../../../../lib/rateLimit';
import { retract } from '../../../../../../lib/notifications';

// Learners can delete their own comments.
export async function DELETE(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to change comments.');
  const limited = await rateLimit('comment', userId);
  if (limited) return limited;

  const comment = await prisma.makeComment.findFirst({
    where: { id: params.commentId, makeId: params.makeId, userId },
    select: { id: true, preset: true, make: { select: { userId: true } } },
  });
  if (!comment) return error(404, 'Comment not found.');
  await prisma.makeComment.delete({ where: { id: comment.id } });
  await retract('COMMENT', {
    userId: comment.make.userId, actorId: userId, makeId: params.makeId, preset: comment.preset,
  });
  return json({ deleted: true });
}
