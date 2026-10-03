'use client';

import React from 'react';
import { Repeat, RotateCcw } from 'lucide-react';
import { formatDuration } from '../../lib/youtube';
import cn from '../../lib/cn';

const SPEEDS = [0.5, 0.75, 1, 1.25];

export default function PracticeControls({
  rate, onRate, loop, loopStart, onLoopClick, onBack,
}) {
  let loopLabel = 'Loop a section';
  if (loopStart !== null) loopLabel = `Set loop end (from ${formatDuration(loopStart)})`;
  if (loop) loopLabel = `Looping ${formatDuration(loop.start)}–${formatDuration(loop.end)} · Stop`;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-line bg-surface px-3 py-2">
      <div role="group" aria-label="Playback speed" className="flex items-center gap-1">
        <span className="mr-1 text-sm text-muted">Speed</span>
        {SPEEDS.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={rate === s}
            onClick={() => onRate(s)}
            className={cn(
              'h-8 min-w-[3rem] rounded-pill px-2 text-sm font-bold tabular-nums',
              rate === s ? 'bg-accent text-on-accent' : 'text-muted hover:bg-sunken hover:text-ink',
            )}
          >
            {`${s}×`}
          </button>
        ))}
      </div>
      <span className="hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
      <button type="button" onClick={onBack} className="inline-flex h-8 items-center gap-1.5 rounded-pill px-3 text-sm font-bold text-muted hover:bg-sunken hover:text-ink">
        <RotateCcw size={15} />
        Back 10s
      </button>
      <button
        type="button"
        onClick={onLoopClick}
        aria-pressed={Boolean(loop)}
        className={cn(
          'inline-flex h-8 items-center gap-1.5 rounded-pill px-3 text-sm font-bold',
          loop || loopStart !== null ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-sunken hover:text-ink',
        )}
      >
        <Repeat size={15} />
        {loopLabel}
      </button>
    </div>
  );
}
