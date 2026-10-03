import React from 'react';
import cn from '../../lib/cn';

const VARIANTS = {
  default: 'border border-line bg-surface text-ink',
  xp: 'bg-xp-soft text-xp',
  accent: 'bg-accent-soft text-accent',
};

export default function Pill({ variant = 'default', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-3 py-1 text-[13px] font-bold tabular-nums',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
