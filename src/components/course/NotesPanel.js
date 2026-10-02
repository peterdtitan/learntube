'use client';

import React, { useEffect, useRef, useState } from 'react';

const SAVE_DEBOUNCE_MS = 800;

export default function NotesPanel({ videoId, initialContent, isSignedIn }) {
  const [content, setContent] = useState(initialContent || '');
  const [status, setStatus] = useState('idle'); // idle | saving | saved
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
        await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId, content: value }),
        });
        setStatus('saved');
      } catch {
        setStatus('idle');
      }
    }, SAVE_DEBOUNCE_MS);
  };

  if (!isSignedIn) {
    return (
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Sign in to write and save personal notes for this lesson.
      </p>
    );
  }

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          save(e.target.value);
        }}
        placeholder="Jot down notes for this lesson…"
        rows={8}
        className="w-full resize-y rounded-md border border-gray-300 bg-white/80 p-3 text-sm outline-none focus:border-red-400 dark:border-gray-600 dark:bg-gray-800/80"
      />
      <p className="mt-1 h-4 text-xs text-gray-500 dark:text-gray-400">
        {status === 'saving' && 'Saving…'}
        {status === 'saved' && 'Saved'}
      </p>
    </div>
  );
}
