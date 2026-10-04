import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import prisma from '../../../../../lib/prismadb';
import { getQuizForLearner } from '../../../../../lib/quizzes';
import CheckpointRunner from '../../../../../components/quiz/CheckpointRunner';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Checkpoint · LearnTube' };

export default async function CheckpointPage({ params }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const quiz = await getQuizForLearner(params.quizId, userId, {
    isAdmin: Boolean(session?.user?.isAdmin),
  });
  if (!quiz || quiz.kind !== 'CHECKPOINT' || quiz.pathwayId !== params.pathwayId) notFound();

  const user = userId
    ? await prisma.user.findUnique({ where: { id: userId }, select: { extraQuizTime: true } })
    : null;

  return (
    <CheckpointRunner
      quiz={JSON.parse(JSON.stringify(quiz))}
      isSignedIn={Boolean(userId)}
      extraTime={Boolean(user?.extraQuizTime)}
      pathwayId={params.pathwayId}
    />
  );
}
