import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { getPathwayOverviews } from '../../lib/course';
import { listMakes } from '../../lib/makes';
import { getLearnerSummary } from '../../lib/xp';
import PathwayCard from '../../components/home/PathwayCard';
import WeekCard from '../../components/practice/WeekCard';
import MakeCard from '../../components/makes/MakeCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LeaderboardToggle from '../../components/community/LeaderboardToggle';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard · LearnTube' };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) redirect('/auth/signin?callbackUrl=/dashboard');

  const [summary, pathways, makes] = await Promise.all([
    getLearnerSummary(userId),
    getPathwayOverviews(userId),
    listMakes({ viewerId: userId, scope: 'mine', limit: 8 }),
  ]);
  const started = pathways.filter((p) => p.started);
  const firstName = (session.user.name || '').split(' ')[0];

  return (
    <div className="grid gap-10">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">
        {firstName ? `${firstName}’s workbench` : 'Your workbench'}
      </h1>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="grid gap-4" aria-label="Your pathways">
          {started.length ? (
            started.map((p) => <PathwayCard key={p.id} pathway={p} signedIn />)
          ) : (
            <div className="grid justify-items-start gap-3 rounded-lg border border-dashed border-line p-6">
              <p className="text-lg font-bold">You haven’t started a pathway yet.</p>
              <Button href="/pathways" size="sm">Browse pathways</Button>
            </div>
          )}
        </section>
        <div className="grid gap-4">
          {summary && <WeekCard summary={summary} />}
          <Card className="grid gap-3">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted">Community</h3>
            <LeaderboardToggle initialShown={summary?.showOnLeaderboard ?? true} />
            <Button href={`/learners/${userId}`} variant="ghost" size="sm" className="justify-self-start">
              View your profile
            </Button>
          </Card>
        </div>
      </div>

      <section className="grid gap-4 border-t border-line pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">Your makes</h2>
          {makes.length > 0 && <Button href="/makes?view=mine" variant="quiet" size="sm">See all</Button>}
        </div>
        {makes.length ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {makes.map((m) => <MakeCard key={m.id} make={m} />)}
          </div>
        ) : (
          <p className="text-muted">Finish a lesson&apos;s Log step and your makes collect here.</p>
        )}
      </section>
    </div>
  );
}
