import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Award, Clock } from 'lucide-react';
import { authOptions } from '../../../lib/auth';
import { getTrackOverview } from '../../../lib/tracks';
import { formatMinutes } from '../../../lib/estimate';
import Button from '../../../components/ui/Button';
import ProgressBar from '../../../components/ui/ProgressBar';
import cn from '../../../lib/cn';
import SkillIcon from '../../../components/ui/SkillIcon';
import Cover from '../../../components/ui/Cover';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const overview = await getTrackOverview(params.slug, null);
  return { title: overview ? `${overview.track.title} · LearnTube` : 'LearnTube' };
}

export default async function TrackPage({ params }) {
  const session = await getServerSession(authOptions);
  const overview = await getTrackOverview(params.slug, session?.user?.id || null);
  if (!overview || !overview.courses.length) notFound();
  const {
    track, courses, minutes, fun, lessonCount, doneCount, currentCourseId,
  } = overview;
  const started = doneCount > 0;
  const current = courses.find((c) => c.id === currentCourseId);

  return (
    <div className="mx-auto grid max-w-4xl gap-8">
      <Link href="/pathways" className="text-sm text-muted hover:text-ink">← All pathways</Link>

      <header className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
        <div className="grid gap-4">
          {track.skill && (
          <span className="inline-flex items-center gap-2 justify-self-start rounded-pill border border-line px-3 py-1 text-sm text-muted">
            <SkillIcon skill={track.skill} />
            {`${track.skill.name} · ${courses.length} courses`}
          </span>
          )}
          <h1 className="text-[clamp(2.2rem,5.5vw,3.4rem)] font-bold leading-[1.05]">{track.title}</h1>
          {track.description && <p className="max-w-[62ch] text-lg text-muted">{track.description}</p>}
          {track.makeTitle && (
          <p className="text-[17px]">
            <span className="text-muted">By the end you’ll be able to: </span>
            <strong>{track.makeTitle}</strong>
          </p>
          )}
        </div>
        <Cover src={track.cover} skill={track.skill} priority sizes="(min-width: 768px) 340px, 100vw" className="rounded-lg border border-line shadow-md" />
      </header>

      <section aria-labelledby="time-heading" className="grid gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="grid gap-1">
          <h2 id="time-heading" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
            <Clock size={15} aria-hidden="true" />
            Time to learn, all three courses
          </h2>
          <p className="font-display text-4xl font-bold">{`≈ ${formatMinutes(minutes)}`}</p>
          {fun && <p className="text-lg text-xp">{`That’s about ${fun.label}.`}</p>}
          <p className="text-sm text-muted">{`${lessonCount} lessons, none longer than 10 minutes. Take the courses in order, or start where your experience fits.`}</p>
        </div>
        {current && (
          <div className="grid gap-2 sm:min-w-[220px]">
            {started && <ProgressBar value={doneCount / lessonCount} label="Track progress" />}
            <p className="text-sm text-muted">{started ? `${doneCount} of ${lessonCount} lessons done` : `Start with ${current.title}`}</p>
            <Button href={`/pathways/${current.id}`}>{started ? `Continue ${current.title}` : 'Start course one'}</Button>
          </div>
        )}
      </section>

      <section aria-labelledby="courses-heading" className="grid gap-4">
        <h2 id="courses-heading" className="text-2xl font-bold">The courses</h2>
        <ol className="grid gap-4">
          {courses.map((c, i) => {
            const done = c.lessonCount > 0 && c.doneCount === c.lessonCount;
            return (
              <li key={c.id}>
                <article className={cn('grid gap-4 rounded-lg border bg-surface p-4 sm:grid-cols-[180px_minmax(0,1fr)_auto] sm:items-center', c.id === currentCourseId && started ? 'border-accent' : 'border-line')}>
                  <div className="relative">
                    <Cover src={c.cover} skill={c.skill} sizes="180px" className="rounded-md" />
                    <span className="absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-surface font-display font-bold text-accent shadow" aria-hidden="true">{i + 1}</span>
                  </div>
                  <div className="grid min-w-0 gap-1">
                    <h3 className="text-xl font-bold">
                      <Link href={`/pathways/${c.id}`} className="hover:text-accent">{c.title}</Link>
                    </h3>
                    {c.certification && (
                      <p className="flex items-center gap-1.5 text-sm font-bold text-xp">
                        <Award size={15} aria-hidden="true" />
                        {`Prepares you for ${c.certification}`}
                      </p>
                    )}
                    {c.description && <p className="text-[15px] text-muted">{c.description}</p>}
                    <p className="text-sm text-muted">
                      {`${c.moduleCount} modules · ${c.lessonCount} lessons · ≈ ${formatMinutes(c.minutes)}`}
                      {c.doneCount > 0 && ` · ${done ? 'finished' : `${c.doneCount} done`}`}
                    </p>
                  </div>
                  <Button href={`/pathways/${c.id}`} variant={c.id === currentCourseId ? 'primary' : 'ghost'} size="sm" className="justify-self-start">
                    {c.doneCount > 0 && !done ? 'Continue' : 'View course'}
                  </Button>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <p className="text-sm text-muted">
        Lessons are free videos by Professor Messer on YouTube, put in order with hands-on tasks and
        practice questions. LearnTube isn’t affiliated with CompTIA; exams are booked and paid for
        through CompTIA.
      </p>
    </div>
  );
}
