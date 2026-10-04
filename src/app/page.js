import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Sparkles } from 'lucide-react';

import { authOptions } from '../lib/auth';
import prisma from '../lib/prismadb';
import { getPathwayOverviews, getSkills } from '../lib/course';
import { listMakes } from '../lib/makes';
import { getLearnerSummary } from '../lib/xp';
import { getShortSkills } from '../lib/skills';
import { getProgramCards } from '../lib/tracks';
import { getCommunityPulse } from '../lib/community';
import { comingSoon, recommend } from '../lib/recommend';
import { firstName, publicName } from '../lib/people';
import SkillShelf from '../components/home/SkillShelf';
import HeroStage from '../components/home/HeroStage';
import SkillCarousel from '../components/home/SkillCarousel';
import PathwayCard from '../components/home/PathwayCard';
import CommunityPulse from '../components/home/CommunityPulse';
import SkillCard from '../components/skills/SkillCard';
import ProgramCard from '../components/skills/ProgramCard';
import WeekCard from '../components/practice/WeekCard';
import LessonSteps from '../components/practice/LessonSteps';
import MakeCard from '../components/makes/MakeCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export const dynamic = 'force-dynamic';

function Section({
  title, sub, action, children,
}) {
  return (
    <section className="grid gap-5 border-t border-line pt-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="grid gap-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          {sub && <p className="text-muted">{sub}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function SignInBanner() {
  return (
    <Card as="aside" className="flex flex-wrap items-center justify-between gap-4 border-accent bg-accent-soft">
      <p className="max-w-[60ch] text-[17px]">
        <strong>Join the community.</strong>
        {' Sign in to get skills picked for you, save your place in every lesson, earn XP for practising, and share what you make.'}
      </p>
      <Button href="/auth/signin">Sign in with Google</Button>
    </Card>
  );
}

function Item({ item, signedIn }) {
  return item.kind === 'program'
    ? <ProgramCard program={item} />
    : <SkillCard skill={item} signedIn={signedIn} />;
}

function listNames(names) {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export default async function HomePage({ searchParams = {} }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const me = userId
    ? await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true, displayName: true, interests: true, learningGoal: true, onboardedAt: true,
      },
    })
    : null;
  // First sign-in: ask what they're into before showing anything else.
  if (me && !me.onboardedAt) redirect('/welcome');

  const [skills, shortSkills, programs, pathways, makes, summary, pulse] = await Promise.all([
    getSkills(),
    getShortSkills(userId),
    getProgramCards(userId),
    userId ? getPathwayOverviews(userId) : [],
    listMakes({ viewerId: userId, limit: 8 }),
    userId ? getLearnerSummary(userId) : null,
    getCommunityPulse(userId),
  ]);
  const items = [...shortSkills.map((s) => ({ ...s, kind: 'skill' })), ...programs];
  const { picked, more } = recommend(items, { interests: me?.interests, goal: me?.learningGoal });
  const soon = me ? comingSoon(me.interests, items, skills) : [];
  const interestNames = skills.filter((s) => me?.interests.includes(s.id)).map((s) => s.name);
  const started = pathways.filter((p) => p.started).slice(0, 3);
  const justJoined = searchParams.welcome === '1';
  const carousel = items.map((i) => ({
    key: `${i.kind}-${i.id}`,
    href: i.kind === 'program' ? `/tracks/${i.slug}` : `/pathways/${i.id}`,
    title: i.title,
    cover: i.cover,
    skill: i.skill,
    minutes: i.minutes,
    kind: i.kind,
  }));
  const explore = carousel.length > 2 && (
    <Section
      title="Spin through every skill"
      sub="Each short skill takes under 15 hours. Programs go all the way to a certification."
      action={<Link href="/skills" className="text-sm font-bold text-accent hover:underline">See them all</Link>}
    >
      <SkillCarousel items={carousel} />
    </Section>
  );

  let greeting = 'Learn a skill by making something.';
  if (me) greeting = justJoined ? 'You’re all set, star.' : `Welcome back, ${firstName(publicName(me))}.`;

  return (
    <div className="grid gap-12">
      <HeroStage>
        <header className="grid max-w-[56ch] gap-4">
          <h1 className="text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.02]">{greeting}</h1>
          <p className="text-lg leading-relaxed text-muted">
            {me
              ? 'Pick up a short skill, keep your streak going, and see what everyone else is making.'
              : 'Free YouTube lessons, put in order. Watch a short step, try it with your own hands, and share what you made with people learning alongside you.'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/skills">Browse skills</Button>
            {!me && <Button href="/auth/signin" variant="ghost">Sign in with Google</Button>}
          </div>
        </header>
        <SkillShelf skills={skills} />
      </HeroStage>

      {me && (
        <Section
          title={justJoined ? 'Here’s where to start' : 'Picked for you'}
          sub={interestNames.length ? `Because you’re into ${listNames(interestNames)}.` : null}
          action={<Link href="/welcome" className="text-sm font-bold text-accent hover:underline">Edit interests</Link>}
        >
          {picked.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {picked.map((item) => <Item key={item.id} item={item} signedIn />)}
            </div>
          ) : (
            <Card className="flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-3 text-[15px]">
                <Sparkles size={20} className="shrink-0 text-xp" aria-hidden="true" />
                {me.interests.length
                  ? 'Nothing to learn in your interests yet. Here are some popular skills while we add more.'
                  : 'Tell us what you’re into and we’ll pick skills for you.'}
              </p>
              {!me.interests.length && <Button href="/welcome" size="sm">Choose interests</Button>}
            </Card>
          )}
          {soon.length > 0 && (
            <p className="text-sm text-muted">
              {`Coming soon in ${listNames(soon.map((s) => s.name))}. We’re picking the best free lessons now.`}
            </p>
          )}
        </Section>
      )}

      {me ? (
        <Section
          title={started.length ? 'Pick up where you left off' : 'Your practice week'}
          sub={started.length ? null : 'Start any skill and your week fills up here.'}
        >
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="grid gap-4">
              {started.map((p) => <PathwayCard key={p.id} pathway={p} signedIn />)}
              {!started.length && more.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {more.slice(0, 2).map((item) => <Item key={item.id} item={item} signedIn />)}
                </div>
              )}
            </div>
            {summary && <WeekCard summary={summary} />}
          </div>
        </Section>
      ) : explore}

      {me && explore}

      {!me && (
        <Section
          title="How a lesson works"
          sub="The same three steps whether you're learning to knit or to code. Most XP comes from doing, not watching."
        >
          <LessonSteps />
        </Section>
      )}

      <Section title="Happening now" sub="Learners practising, making and hitting milestones this week.">
        <CommunityPulse stats={pulse.stats} feed={pulse.feed} />
      </Section>

      {me && (
        <Section
          title="How a lesson works"
          sub="The same three steps whether you're learning to knit or to code. Most XP comes from doing, not watching."
        >
          <LessonSteps />
        </Section>
      )}

      {!me && <SignInBanner />}

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
