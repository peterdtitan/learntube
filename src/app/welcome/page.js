import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { getInterestCategories } from '../../lib/skills';
import getStartItems from '../../lib/startItems';
import WelcomeSurvey from '../../components/welcome/WelcomeSurvey';
import { saveWelcome, skipWelcome } from './actions';
import { PRIVATE } from '../../lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Welcome · Skillreps', ...PRIVATE };

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/auth/signin?callbackUrl=/welcome');

  const [user, categories, items] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { interests: true, learningGoal: true, weeklyGoal: true },
    }),
    getInterestCategories(),
    getStartItems(session.user.id),
  ]);

  return (
    <div className="py-4 sm:py-8">
      <WelcomeSurvey
        categories={categories}
        items={items}
        initial={{
          interests: user.interests, goal: user.learningGoal, weeklyGoal: user.weeklyGoal,
        }}
        saveAction={saveWelcome}
        skipAction={skipWelcome}
      />
    </div>
  );
}
