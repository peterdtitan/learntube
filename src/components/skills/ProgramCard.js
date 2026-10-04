import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, Clock } from 'lucide-react';
import { formatMinutes } from '../../lib/estimate';

// A program (track of courses) shown alongside short skills, e.g. in "Picked for you".
export default function ProgramCard({ program }) {
  const {
    slug, title, skill, minutes, fun, courses, started,
  } = program;
  return (
    <article className="group relative grid min-w-0 content-start gap-3 overflow-hidden rounded-lg border border-line bg-surface p-5 pt-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: skill?.color || '#9AA6B1' }} />
      <p className="text-xs font-bold uppercase tracking-widest text-xp">{`Program · ${courses.length} courses`}</p>
      <h3 className="text-[19px] font-bold leading-snug">
        <Link href={`/tracks/${slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
          {title}
        </Link>
      </h3>
      <ul className="grid gap-1 text-sm">
        {courses.map((c) => (
          <li key={c.id} className="flex items-start gap-1.5">
            <Award size={14} className="mt-0.5 shrink-0 text-xp" aria-hidden="true" />
            <span>
              <span className="font-bold">{c.title}</span>
              {c.certification && <span className="text-muted">{` · ${c.certification}`}</span>}
            </span>
          </li>
        ))}
      </ul>
      <div className="grid gap-0.5 text-sm">
        <p className="inline-flex items-center gap-1.5 font-bold">
          <Clock size={14} aria-hidden="true" />
          {`≈ ${formatMinutes(minutes)}`}
        </p>
        {fun && <p className="text-xp">{`About ${fun.label}`}</p>}
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-bold text-accent">
        {started ? 'Carry on' : 'See the program'}
        <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
      </span>
    </article>
  );
}
