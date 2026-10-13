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
import { getInterestCategories, getShortSkills } from '../lib/skills';
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
import Landing from '../components/landing/Landing';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export const dynamic = 'force-dynamic';
export const metadata = { alternates: { canonical: '/' } };

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

function Item({ item }) {
  return item.kind === 'program'
    ? <ProgramCard program={item} />
    : <SkillCard skill={item} signedIn />;
}

function listNames(names) {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

async function VisitorHome() {
  const [categories, skills, programs, makes] = await Promise.all([
    getInterestCategories(),
    getShortSkills(null),
    getProgramCards(null),
    listMakes({ viewerId: null, limit: 4 }),
  ]);
  // The landing's program section is written for the cybersecurity program.
  const cyber = programs.find((p) => p.skill?.id === 'cybersecurity');
  return (
    <Landing
      categories={categories.filter((c) => c.available > 0)}
      skills={skills}
      program={cyber && { ...cyber, lessons: cyber.courses.reduce((n, c) => n + c.lessons, 0) }}
      makes={makes}
    />
  );
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
  if (!me) return <VisitorHome />;
  // First sign-in: ask what they're into before showing anything else.
  if (!me.onboardedAt) redirect('/welcome');

  const [skills, shortSkills, programs, pathways, makes, summary, pulse] = await Promise.all([
    getSkills(),
    getShortSkills(userId),
    getProgramCards(userId),
    getPathwayOverviews(userId),
    listMakes({ viewerId: userId, limit: 8 }),
    getLearnerSummary(userId),
    getCommunityPulse(userId),
  ]);
  const items = [...shortSkills.map((s) => ({ ...s, kind: 'skill' })), ...programs];
  const { picked, more } = recommend(items, { interests: me.interests, goal: me.learningGoal });
  const soon = comingSoon(me.interests, items, skills);
  const interestNames = skills.filter((s) => me.interests.includes(s.id)).map((s) => s.name);
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

  const greeting = justJoined ? 'You’re all set, star.' : `Welcome back, ${firstName(publicName(me))}.`;

  return (
    <div className="grid gap-12">
      <HeroStage>
        <header className="grid max-w-[56ch] gap-4">
          <h1 className="text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.02]">{greeting}</h1>
          <p className="text-lg leading-relaxed text-muted">
            Pick up a short skill, keep your streak going, and see what everyone else is making.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/skills">Browse skills</Button>
          </div>
        </header>
        <SkillShelf skills={skills} />
      </HeroStage>

      <Section
        title={justJoined ? 'Here’s where to start' : 'Picked for you'}
        sub={interestNames.length ? `Because you’re into ${listNames(interestNames)}.` : null}
        action={<Link href="/welcome" className="text-sm font-bold text-accent hover:underline">Edit interests</Link>}
      >
        {picked.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {picked.map((item) => <Item key={item.id} item={item} />)}
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

      <Section
        title={started.length ? 'Pick up where you left off' : 'Your practice week'}
        sub={started.length ? null : 'Start any skill and your week fills up here.'}
      >
        <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid gap-4">
            {started.map((p) => <PathwayCard key={p.id} pathway={p} signedIn />)}
            {!started.length && more.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {more.slice(0, 2).map((item) => <Item key={item.id} item={item} />)}
              </div>
            )}
          </div>
          <WeekCard summary={summary} />
        </div>
      </Section>

      {explore}

      <Section title="Happening now" sub="Learners practising, making and hitting milestones this week.">
        <CommunityPulse stats={pulse.stats} feed={pulse.feed} />
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
