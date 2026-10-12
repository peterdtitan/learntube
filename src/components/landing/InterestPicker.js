'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import SkillIcon from '../ui/SkillIcon';
import StartButton from './StartButton';
import { LEGAL } from '../../lib/legal';
import cn from '../../lib/cn';

// The hero's call to action. Ticking interests here saves answering them again after sign-in.
export default function InterestPicker({ categories }) {
  const [picks, setPicks] = useState([]);
  const toggle = (id) => setPicks((list) => (list.includes(id)
    ? list.filter((x) => x !== id)
    : [...list, id]));

  return (
    <div className="grid gap-5">
      <fieldset className="grid gap-3">
        <legend className="mb-3 font-display text-lg font-bold">What would you like to learn?</legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = picks.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(c.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-2 text-sm font-bold transition-[border-color,box-shadow] duration-150 hover:border-accent',
                  on && 'border-accent bg-accent-soft ring-1 ring-inset ring-accent',
                )}
              >
                {on ? (
                  <span className="grid h-[18px] w-[18px] place-items-center rounded-[5px] bg-accent text-on-accent">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                ) : <SkillIcon skill={c} />}
                {c.name}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <StartButton picks={picks}>
          {picks.length ? `Start with ${picks.length} picked` : 'Start learning free'}
        </StartButton>
        <Link href="/skills" className="text-[15px] font-bold text-accent hover:underline">
          Or look around first
        </Link>
      </div>
      <p className="max-w-[34rem] text-sm text-muted">
        {`Free, with a Google account. By continuing you confirm you’re ${LEGAL.minimumAge} or older and agree to the `}
        <Link href="/terms" className="font-bold text-accent hover:underline">Terms</Link>
        {' and '}
        <Link href="/privacy" className="font-bold text-accent hover:underline">Privacy policy</Link>
        .
      </p>
    </div>
  );
}
