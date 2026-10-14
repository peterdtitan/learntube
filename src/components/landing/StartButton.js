import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import cn from '../../lib/cn';

// Into the start questions, with any interests ticked on the landing page already chosen.
// Signing up comes at the end of them, once there's a skill to start with.
export default function StartButton({
  picks = [], light = false, className, children = 'Start learning free',
}) {
  const href = picks.length ? `/start?picks=${encodeURIComponent(picks.join(','))}` : '/start';
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex h-12 items-center justify-center gap-2 rounded-pill px-6 text-base font-bold transition-colors',
        light ? 'bg-white text-pine hover:bg-[#DCEBE7]' : 'bg-accent text-on-accent hover:bg-accent/90',
        className,
      )}
    >
      {children}
      <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </Link>
  );
}
