import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../../lib/auth';
import prisma from '../../../../../../lib/prismadb';
import { getGameQuestions } from '../../../../../../lib/quizzes';
import ModuleGame from '../../../../../../components/quiz/ModuleGame';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Module games · LearnTube' };

export default async function GamePage({ params }) {
  const unit = await prisma.unit.findFirst({
    where: { id: params.unitId, pathwayId: params.pathwayId },
    include: {
      pathway: { select: { skill: { select: { color: true } } } },
      quizzes: { where: { kind: 'MODULE_GAME', published: true } },
    },
  });
  const game = unit?.quizzes[0];
  if (!game) notFound();
  const questions = await getGameQuestions(unit.id);
  if (!questions.length) notFound();
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto max-w-5xl">
      <ModuleGame
        quizId={game.id}
        questions={JSON.parse(JSON.stringify(questions))}
        color={unit.pathway.skill?.color || '#2F6F62'}
        isSignedIn={Boolean(session?.user?.id)}
        moduleTitle={unit.title}
        pathwayId={params.pathwayId}
        passPercent={game.passPercent}
      />
    </div>
  );
}
