import React from 'react';
import cn from '../../lib/cn';

// value is a fraction from 0 to 1.
export default function ProgressBar({ value, label, className }) {
  const percent = Math.round(Math.min(1, Math.max(0, value || 0)) * 100);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn('h-1.5 w-full overflow-hidden rounded-pill bg-accent-soft', className)}
    >
      <div className="h-full rounded-pill bg-accent transition-[width]" style={{ width: `${percent}%` }} />
    </div>
  );
}
