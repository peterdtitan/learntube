import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Users } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import { formatMinutes } from '../../lib/estimate';

// One short skill. The whole card links to the skill's overview; the colour bar is its category.
export default function SkillCard({ skill, signedIn }) {
  const {
    id, title, makeTitle, minutes, fun, lessonCount, doneCount, started, learners, track,
  } = skill;
  const category = skill.skill;
  const finished = lessonCount > 0 && doneCount === lessonCount;

  return (
    <article className="group relative grid min-w-0 content-start gap-3 overflow-hidden rounded-lg border border-line bg-surface p-5 pt-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: category?.color || '#9AA6B1' }} />
      {category && (
        <p className="text-xs font-bold uppercase tracking-widest text-muted">{category.name}</p>
      )}
      <h3 className="text-[19px] font-bold leading-snug">
        <Link href={`/pathways/${id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {title}
        </Link>
      </h3>
      {makeTitle && (
        <p className="text-[15px] text-muted">
          <span className="font-bold text-ink">You’ll make: </span>
          {makeTitle}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5 font-bold text-ink">
          <Clock size={14} aria-hidden="true" />
          {`≈ ${formatMinutes(minutes)}`}
        </span>
        <span>{`${lessonCount} lessons`}</span>
        {learners > 0 && (
          <span className="inline-flex items-center gap-1.5">
            <Users size={14} aria-hidden="true" />
            {`${learners} learning`}
          </span>
        )}
      </div>
      {fun && <p className="text-sm text-xp">{`About ${fun.label}`}</p>}
      {track && (
        <p className="relative z-10 text-sm">
          <span className="text-muted">Part of </span>
          <Link href={`/tracks/${track.slug}`} className="font-bold text-accent hover:underline">{track.title}</Link>
        </p>
      )}
      {signedIn && started ? (
        <div className="grid gap-1.5 text-sm text-muted">
          <ProgressBar value={doneCount / lessonCount} label={`${title} progress`} />
          {finished ? 'Every lesson done' : `${doneCount} of ${lessonCount} lessons done`}
        </div>
      ) : (
        <span className="inline-flex items-center gap-1 text-sm font-bold text-accent">
          Start learning
          <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </span>
      )}
    </article>
  );
}
