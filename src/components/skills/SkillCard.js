import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Users } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import Cover from '../ui/Cover';
import SkillIcon from '../ui/SkillIcon';
import Tilt from '../ui/Tilt';
import { formatMinutes } from '../../lib/estimate';

// One short skill. The whole card links to the skill's overview.
export default function SkillCard({ skill, signedIn }) {
  const {
    id, title, makeTitle, minutes, fun, lessonCount, doneCount, started, learners, track, cover,
  } = skill;
  const category = skill.skill;
  const finished = lessonCount > 0 && doneCount === lessonCount;

  return (
    <Tilt className="h-full rounded-lg">
      <article className="group relative grid h-full min-w-0 content-start overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-lg">
        <div className="relative">
          <Cover src={cover} skill={category} className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
          {category && (
            <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-pill bg-surface/90 px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur">
              <SkillIcon skill={category} />
              {category.name}
            </span>
          )}
          <span className="absolute right-3 top-2.5 inline-flex items-center gap-1 rounded-pill bg-black/60 px-2 py-0.5 text-xs font-bold text-white backdrop-blur">
            <Clock size={12} aria-hidden="true" />
            {`≈ ${formatMinutes(minutes)}`}
          </span>
        </div>
        <div className="grid content-start gap-3 p-5">
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
            <span>{`${lessonCount} lessons`}</span>
            {fun && <span className="text-xp">{`About ${fun.label}`}</span>}
            {learners > 0 && (
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} aria-hidden="true" />
                {`${learners} learning`}
              </span>
            )}
          </div>
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
        </div>
      </article>
    </Tilt>
  );
}
