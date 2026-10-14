'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Check } from 'lucide-react';
import SkillIcon from '../ui/SkillIcon';
import StartButton from './StartButton';
import cn from '../../lib/cn';

// The hero's call to action. Ticking interests here saves answering them again at /start.
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
          {picks.length ? `Continue with ${picks.length} picked` : 'Start learning free'}
        </StartButton>
        <span className="text-[15px] text-muted">
          {'Have an account? '}
          <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })} className="font-bold text-accent hover:underline">
            Sign in
          </button>
        </span>
      </div>
      <p className="max-w-[34rem] text-sm text-muted">
        Free, forever. Three quick questions, then the skill to start with.
      </p>
    </div>
  );
}
