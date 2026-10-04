import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, Clock } from 'lucide-react';
import Cover from '../ui/Cover';
import Tilt from '../ui/Tilt';
import { formatMinutes } from '../../lib/estimate';

// A program (track of courses) shown alongside short skills, e.g. in "Picked for you".
export default function ProgramCard({ program }) {
  const {
    slug, title, skill, minutes, fun, courses, started, cover,
  } = program;
  return (
    <Tilt className="h-full rounded-lg">
      <article className="group relative grid h-full min-w-0 content-start overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-lg">
        <div className="relative">
          <Cover src={cover} skill={skill} className="transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
          <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-pill bg-xp px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            <Award size={13} aria-hidden="true" />
            {`Program · ${courses.length} courses`}
          </span>
        </div>
        <div className="grid content-start gap-3 p-5">
          <h3 className="text-[19px] font-bold leading-snug">
            <Link href={`/tracks/${slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {title}
            </Link>
          </h3>
          <ul className="grid gap-1 text-sm">
            {courses.map((c) => (
              <li key={c.id}>
                <span className="font-bold">{c.title}</span>
                {c.certification && <span className="text-muted">{` · ${c.certification}`}</span>}
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
        </div>
      </article>
    </Tilt>
  );
}
