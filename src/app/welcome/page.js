import React from 'react';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { getInterestCategories } from '../../lib/skills';
import { PICKS_COOKIE, parsePicks, startingInterests } from '../../lib/picks';
import WelcomeSurvey from '../../components/welcome/WelcomeSurvey';
import { saveWelcome, skipWelcome } from './actions';
import { PRIVATE } from '../../lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Welcome · Skillreps', ...PRIVATE };

export default async function WelcomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/auth/signin?callbackUrl=/welcome');

  const [user, categories] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { interests: true, learningGoal: true, weeklyGoal: true },
    }),
    getInterestCategories(),
  ]);
  const picks = parsePicks(cookies().get(PICKS_COOKIE)?.value);
  const interests = startingInterests(user.interests, picks, categories.map((c) => c.id));
  // Interests already ticked on the home page: start at the next question. Back still works.
  const fromLanding = !user.interests.length && interests.length > 0;

  return (
    <div className="py-4 sm:py-8">
      <WelcomeSurvey
        categories={categories}
        initial={{
          interests,
          goal: user.learningGoal,
          weeklyGoal: user.weeklyGoal,
          step: fromLanding ? 1 : 0,
        }}
        saveAction={saveWelcome}
        skipAction={skipWelcome}
      />
    </div>
  );
}
