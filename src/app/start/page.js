import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { getInterestCategories } from '../../lib/skills';
import getStartItems from '../../lib/startItems';
import { parsePicks } from '../../lib/picks';
import { describe } from '../../lib/seo';
import WelcomeSurvey from '../../components/welcome/WelcomeSurvey';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Find your first skill · Skillreps',
  description: describe('Three quick questions, then the skill to start with. Free, with lessons from the best teachers on YouTube.'),
  alternates: { canonical: '/start' },
};

// Three questions and a recommendation, before any account. Signing up comes last.
export default async function StartPage(props) {
  const searchParams = await props.searchParams;
  const session = await getServerSession(authOptions);
  if (session?.user?.id) redirect('/welcome');

  const [categories, items] = await Promise.all([getInterestCategories(), getStartItems(null)]);
  const known = new Set(categories.map((c) => c.id));
  // Interests ticked on the landing page: start at the next question. Back still works.
  const interests = parsePicks(searchParams.picks).filter((id) => known.has(id));

  return (
    <div className="py-4 sm:py-8">
      <WelcomeSurvey
        mode="visitor"
        categories={categories}
        items={items}
        initial={{
          interests, goal: null, weeklyGoal: 3, step: interests.length ? 1 : 0,
        }}
      />
    </div>
  );
}
