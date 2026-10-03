'use client';

import React, { useState } from 'react';
import NotesPanel from './NotesPanel';
import cn from '../../lib/cn';

export default function LessonTabs({
  videoId, transcript, initialNote, isSignedIn, showSandbox,
}) {
  const tabs = ['Notes', 'Transcript', ...(showSandbox ? ['Code sandbox'] : [])];
  const [active, setActive] = useState('Notes');

  return (
    <section className="rounded-lg border border-line bg-surface">
      <div role="tablist" aria-label="Lesson tools" className="flex gap-1 border-b border-line px-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            type="button"
            id={`tab-${tab}`}
            aria-selected={active === tab}
            aria-controls={`panel-${tab}`}
            onClick={() => setActive(tab)}
            className={cn(
              '-mb-px border-b-2 px-3 py-3 text-sm font-bold transition-colors',
              active === tab ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="p-4">
        {active === 'Notes' && (
          <NotesPanel videoId={videoId} initialContent={initialNote} isSignedIn={isSignedIn} />
        )}
        {active === 'Transcript' && (
          <div className="max-h-80 overflow-y-auto text-[15px] leading-relaxed">
            {transcript
              ? <p className="max-w-[70ch] whitespace-pre-wrap">{transcript}</p>
              : <p className="text-muted">No transcript for this lesson yet.</p>}
          </div>
        )}
        {active === 'Code sandbox' && (
          <div className="grid justify-items-center gap-1 rounded-md border border-dashed border-line py-10 text-center text-[15px] text-muted">
            <p className="font-bold text-ink">Code sandbox, coming soon</p>
            <p className="max-w-sm">You&apos;ll be able to practise the code from this lesson right here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
