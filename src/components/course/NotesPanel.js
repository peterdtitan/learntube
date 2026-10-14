'use client';

import React, { useEffect, useRef, useState } from 'react';

const SAVE_DEBOUNCE_MS = 800;

export default function NotesPanel({ videoId, initialContent, isSignedIn }) {
  const [content, setContent] = useState(initialContent || '');
  const [status, setStatus] = useState('idle');
  const timeoutRef = useRef(null);

  useEffect(() => {
    setContent(initialContent || '');
    setStatus('idle');
  }, [videoId, initialContent]);

  const save = (value) => {
    clearTimeout(timeoutRef.current);
    setStatus('saving');
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId, content: value }),
        });
        setStatus(res.ok ? 'saved' : 'error');
      } catch {
        setStatus('error');
      }
    }, SAVE_DEBOUNCE_MS);
  };

  if (!isSignedIn) {
    return <p className="text-[15px] text-muted">Sign in to write notes that stay with this lesson.</p>;
  }

  // Fills the tools column on wide screens; a fixed height everywhere else.
  return (
    <div className="flex h-full flex-col gap-1">
      <label htmlFor="lesson-notes" className="sr-only">Notes for this lesson</label>
      <textarea
        id="lesson-notes"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          save(e.target.value);
        }}
        placeholder="Measurements, tips, what to watch for next time…"
        rows={7}
        className="min-h-[11rem] w-full flex-1 resize-y rounded-md border border-line bg-surface p-3 text-[15px] leading-relaxed placeholder:text-muted lg:resize-none"
      />
      <p className="h-4 text-xs text-muted" aria-live="polite">
        {status === 'saving' && 'Saving…'}
        {status === 'saved' && 'Saved'}
        {status === 'error' && 'Couldn’t save. Check your connection; your text is still here.'}
      </p>
    </div>
  );
}
