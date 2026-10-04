import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { publicName } from '../../lib/people';
import Card from '../../components/ui/Card';
import GoalPicker from '../../components/practice/GoalPicker';
import LeaderboardToggle from '../../components/community/LeaderboardToggle';
import DisplayNameForm from './DisplayNameForm';
import DeleteAccount from './DeleteAccount';
import ExtraTimeToggle from './ExtraTimeToggle';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Settings · LearnTube' };

function Section({ title, children }) {
  return (
    <Card as="section" className="grid gap-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </Card>
  );
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) redirect('/auth/signin?callbackUrl=/settings');

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      displayName: true,
      weeklyGoal: true,
      showOnLeaderboard: true,
      extraQuizTime: true,
    },
  });

  return (
    <div className="mx-auto grid max-w-2xl gap-5">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Settings</h1>

      <Section title="How others see you">
        <DisplayNameForm initial={user.displayName} fallback={publicName({ name: user.name })} />
        <p className="text-sm text-muted">
          {`Signed in as ${user.email}. Your full Google name (${user.name || 'not set'}) is never shown to other learners.`}
        </p>
      </Section>

      <Section title="Practice">
        <GoalPicker goal={user.weeklyGoal} />
        <LeaderboardToggle initialShown={user.showOnLeaderboard} />
      </Section>

      <Section title="Quizzes">
        <ExtraTimeToggle initialOn={user.extraQuizTime} />
      </Section>

      <Section title="Delete your account">
        <DeleteAccount />
      </Section>
    </div>
  );
}
