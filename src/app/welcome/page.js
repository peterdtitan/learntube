import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import WelcomeSurvey from '../../components/welcome/WelcomeSurvey';
import { saveWelcome, skipWelcome } from './actions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Welcome · LearnTube' };

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/auth/signin?callbackUrl=/welcome');

  const [user, skills] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { interests: true, learningGoal: true, weeklyGoal: true },
    }),
    prisma.skill.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true, name: true, color: true, _count: { select: { pathways: true } },
      },
    }),
  ]);
  // Categories with something to learn come first, so the survey opens on real choices.
  const categories = skills
    .map((s) => ({
      id: s.id, name: s.name, color: s.color, available: s._count.pathways,
    }))
    .sort((a, b) => Number(b.available > 0) - Number(a.available > 0));

  return (
    <div className="py-4 sm:py-8">
      <WelcomeSurvey
        categories={categories}
        initial={{
          interests: user.interests, goal: user.learningGoal, weeklyGoal: user.weeklyGoal,
        }}
        saveAction={saveWelcome}
        skipAction={skipWelcome}
      />
    </div>
  );
}
