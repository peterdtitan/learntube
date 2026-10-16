import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import prisma from '../../../../../lib/prismadb';
import { getQuizForLearner } from '../../../../../lib/quizzes';
import CheckpointRunner from '../../../../../components/quiz/CheckpointRunner';
import { PRIVATE } from '../../../../../lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Module exam · Skillreps', ...PRIVATE };

export default async function CheckpointPage(props) {
  const params = await props.params;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const quiz = await getQuizForLearner(params.quizId, userId, {
    isAdmin: Boolean(session?.user?.isAdmin),
  });
  if (!quiz || quiz.kind !== 'CHECKPOINT' || quiz.pathwayId !== params.pathwayId) notFound();

  const [user, game] = await Promise.all([
    userId
      ? prisma.user.findUnique({ where: { id: userId }, select: { extraQuizTime: true } })
      : null,
    quiz.unitId
      ? prisma.quiz.findFirst({
        where: { unitId: quiz.unitId, kind: 'MODULE_GAME', published: true }, select: { id: true },
      })
      : null,
  ]);

  return (
    <CheckpointRunner
      quiz={JSON.parse(JSON.stringify(quiz))}
      isSignedIn={Boolean(userId)}
      extraTime={Boolean(user?.extraQuizTime)}
      pathwayId={params.pathwayId}
      gameHref={game ? `/pathways/${params.pathwayId}/modules/${quiz.unitId}/game` : null}
    />
  );
}
