import React from 'react';
import cn from '../../lib/cn';

// The Skillreps mark: a tally of reps on the accent square. The square keeps the brand green
// in both themes (as on the landing site); the wordmark's "reps" follows the theme's accent.
export function Mark({ size = 30, className }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className={cn('shrink-0', className)}>
      <rect width="32" height="32" rx="8" fill="#2F6F62" />
      <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
        <path d="M10 9v14M14 9v14M18 9v14M22 9v14" />
        <path d="M7.5 20.5 24.5 11.5" />
      </g>
    </svg>
  );
}

export default function Wordmark({ size = 30, className }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-display font-extrabold tracking-[-0.04em]', className)}>
      <Mark size={size} />
      <span>
        Skill
        <span className="text-accent">reps</span>
      </span>
    </span>
  );
}
