'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { ArrowRight } from 'lucide-react';
import { PICKS_COOKIE, PICKS_MAX_AGE, serializePicks } from '../../lib/picks';
import cn from '../../lib/cn';

// Straight to Google, no sign-in page in between. Home sends new learners on to the welcome
// survey, which opens with any interests picked on the landing page.
export default function StartButton({
  picks = [], light = false, className, children = 'Start learning free',
}) {
  const start = () => {
    if (picks.length) {
      document.cookie = `${PICKS_COOKIE}=${serializePicks(picks)}; path=/; max-age=${PICKS_MAX_AGE}; samesite=lax`;
    }
    signIn('google', { callbackUrl: '/' });
  };
  return (
    <button
      type="button"
      onClick={start}
      className={cn(
        'group inline-flex h-12 items-center justify-center gap-2 rounded-pill px-6 text-base font-bold transition-colors',
        light ? 'bg-white text-pine hover:bg-[#DCEBE7]' : 'bg-accent text-on-accent hover:bg-accent/90',
        className,
      )}
    >
      {children}
      <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </button>
  );
}
