import React from 'react';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '../lib/auth';
import { getPathwayOverviews, getSkills } from '../lib/course';
import { listMakes } from '../lib/makes';
import { getLearnerSummary } from '../lib/xp';
import SkillShelf from '../components/home/SkillShelf';
import PathwayCard from '../components/home/PathwayCard';
import WeekCard from '../components/practice/WeekCard';
import LessonSteps from '../components/practice/LessonSteps';
import MakeCard from '../components/makes/MakeCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export const dynamic = 'force-dynamic';

function Section({ title, sub, children }) {
  return (
    <section className="grid gap-5 border-t border-line pt-8">
      <div className="grid gap-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        {sub && <p className="text-muted">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

function SignInCard() {
  return (
    <Card as="aside" className="grid content-start gap-3">
      <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted">Track your practice</h3>
      <p className="text-[15px]">
        Sign in to save your place in every lesson, earn XP for practising,
        and keep a weekly streak.
      </p>
      <Button href="/auth/signin" size="sm" className="justify-self-start">Sign in with Google</Button>
    </Card>
  );
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  const [skills, pathways, makes, summary] = await Promise.all([
    getSkills(),
    getPathwayOverviews(userId),
    listMakes({ viewerId: userId, limit: 8 }),
    userId ? getLearnerSummary(userId) : null,
  ]);
  const anyStarted = pathways.some((p) => p.started);

  return (
    <div className="grid gap-12">
      <header className="grid max-w-[60ch] gap-3 pt-2">
        <h1 className="text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.02]">
          Learn a skill by making something.
        </h1>
        <p className="text-lg leading-relaxed text-muted">
          Free YouTube lessons, put in order. Watch a short step, try it with your own hands,
          and keep a record of what you made.
        </p>
      </header>

      <SkillShelf skills={skills} />

      <Section
        title={anyStarted ? 'Pick up where you left off' : 'Start a pathway'}
        sub="Every pathway ends with something you made."
      >
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid gap-4">
            {pathways.slice(0, 3).map((p) => (
              <PathwayCard key={p.id} pathway={p} signedIn={Boolean(userId)} />
            ))}
          </div>
          {summary ? <WeekCard summary={summary} /> : <SignInCard />}
        </div>
      </Section>

      <Section
        title="How a lesson works"
        sub="The same three steps whether you're learning to knit or to code. Most XP comes from doing, not watching."
      >
        <LessonSteps />
      </Section>

      <Section title="Recent makes" sub="What learners have finished lately.">
        {makes.length ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {makes.map((m) => <MakeCard key={m.id} make={m} />)}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-line px-5 py-8 text-center text-muted">
            No makes yet. Finish a lesson&apos;s Try step and log what you made to be the first.
          </p>
        )}
      </Section>
    </div>
  );
}
