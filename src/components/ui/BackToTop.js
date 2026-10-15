'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import cn from '../../lib/cn';

// A round button that appears once the page has scrolled a screen down, above the cookie
// notice if that's showing. Keyboard users land on `focusId` (e.g. the search box)
// afterwards, since the button hides itself.
export default function BackToTop({ focusId, after = 1 }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > window.innerHeight * after);
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [after]);

  const toTop = (event) => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
    // A click or tap has detail 1+; Enter or Space has 0. Only keyboard users need focus moved.
    if (event.detail === 0) document.getElementById(focusId)?.focus({ preventScroll: true });
    else event.currentTarget.blur();
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      className={cn(
        'fixed right-4 z-40 grid h-12 w-12 place-items-center rounded-pill bg-accent text-on-accent shadow-lg ring-1 ring-black/5 transition-[opacity,transform,visibility,bottom] duration-200 hover:bg-accent/90 motion-reduce:transition-none sm:right-6',
        shown ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0',
      )}
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px) + var(--cookie-notice, 0px))' }}
    >
      <ArrowUp size={22} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
