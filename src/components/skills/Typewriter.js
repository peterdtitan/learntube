'use client';

import React, { useEffect, useState } from 'react';

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1800;
const STILL_MS = 3200;

// Types each phrase, holds it, deletes it, moves on. With reduced motion it swaps whole
// phrases instead. Screen readers get the full list once, not every keystroke.
export default function Typewriter({ phrases }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setStill(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const phrase = phrases[index % phrases.length] || '';

  useEffect(() => {
    if (!phrases.length) return undefined;
    if (still) {
      const t = setTimeout(() => setIndex((i) => i + 1), STILL_MS);
      return () => clearTimeout(t);
    }
    let t;
    if (!deleting && length < phrase.length) t = setTimeout(() => setLength(length + 1), TYPE_MS);
    else if (!deleting) t = setTimeout(() => setDeleting(true), HOLD_MS);
    else if (length > 0) t = setTimeout(() => setLength(length - 1), DELETE_MS);
    else {
      setDeleting(false);
      setIndex((i) => i + 1);
    }
    return () => clearTimeout(t);
  }, [phrases.length, phrase, length, deleting, still]);

  return (
    <>
      <span aria-hidden="true" className="text-accent">
        {still ? phrase : phrase.slice(0, length)}
        <span className="ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] animate-caret bg-accent motion-reduce:hidden" />
      </span>
      <span className="sr-only">{`${phrases.join(', ')}, and more`}</span>
    </>
  );
}
