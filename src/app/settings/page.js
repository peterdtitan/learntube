import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';
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
import EmailToggles from './EmailToggles';
import { PRIVATE } from '../../lib/seo';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Settings · Skillreps', ...PRIVATE };

function Section({ title, id, children }) {
  return (
    <Card as="section" id={id} className="grid scroll-mt-24 gap-4">
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
      emailReminders: true,
      emailWeekly: true,
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

      <Section title="Emails" id="emails">
        <EmailToggles
          initial={{ emailReminders: user.emailReminders, emailWeekly: user.emailWeekly }}
        />
        <p className="text-sm text-muted">{`Sent to ${user.email}. Every email has a link to stop it.`}</p>
      </Section>

      <Section title="Quizzes">
        <ExtraTimeToggle initialOn={user.extraQuizTime} />
      </Section>

      <Section title="Your data">
        <p className="text-[15px] text-muted">
          A copy of everything Skillreps holds about you, as a file you can keep or take elsewhere:
          your account, lesson progress, notes, makes, XP and quiz results.
        </p>
        <a
          href="/api/me/export"
          download
          className="inline-flex h-11 w-fit items-center gap-2 rounded-pill border border-line px-5 text-[15px] font-bold hover:bg-sunken"
        >
          <Download size={17} aria-hidden="true" />
          Download my data
        </a>
        <p className="text-sm text-muted">
          {'How we use and keep it: '}
          <Link href="/privacy" className="font-bold text-accent hover:underline">privacy policy</Link>
          .
        </p>
      </Section>

      <Section title="Delete your account">
        <DeleteAccount />
      </Section>
    </div>
  );
}
