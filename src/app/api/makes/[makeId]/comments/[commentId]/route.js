import prisma from '../../../../../../lib/prismadb';
import { error, json, requireUserId } from '../../../../../../lib/api';

// Learners can delete their own comments.
export async function DELETE(req, { params }) {
  const userId = await requireUserId();
  if (!userId) return error(401, 'Sign in to change comments.');

  const { count } = await prisma.makeComment.deleteMany({
    where: { id: params.commentId, makeId: params.makeId, userId },
  });
  if (!count) return error(404, 'Comment not found.');
  return json({ deleted: true });
}
