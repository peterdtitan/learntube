'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const SEEN = 'learntube:cookie-notice';

// Skillreps only sets cookies the site needs (sign-in, and interests picked before it), so
// there's nothing to opt into. This says so once, and stays out of the way after that.
export default function CookieNotice() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    try {
      setOpen(!localStorage.getItem(SEEN));
    } catch {
      setOpen(false);
    }
  }, []);

  // While it shows, floating buttons (BackToTop) sit above it instead of underneath.
  useEffect(() => {
    const notice = ref.current;
    if (!open || !notice) return undefined;
    const root = document.documentElement;
    const update = () => root.style.setProperty('--cookie-notice', `${notice.offsetHeight + 12}px`);
    update();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(notice);
    return () => {
      observer?.disconnect();
      root.style.removeProperty('--cookie-notice');
    };
  }, [open]);

  if (!open) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(SEEN, '1');
    } catch {
      // Private mode: it shows again next visit, which is fine.
    }
    setOpen(false);
  };

  return (
    <section
      ref={ref}
      aria-label="Cookies"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-2xl flex-wrap items-center gap-x-4 gap-y-3 rounded-lg border border-line bg-surface p-4 shadow-xl sm:bottom-5 sm:flex-nowrap"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <Cookie size={22} className="hidden shrink-0 text-accent sm:block" aria-hidden="true" />
      <p className="min-w-0 flex-1 text-sm text-ink">
        {'We only use cookies that keep you signed in. No ads, no tracking. '}
        <Link href="/privacy#cookies" className="font-bold text-accent underline-offset-2 hover:underline">How we use them</Link>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="h-9 shrink-0 rounded-pill bg-accent px-4 text-sm font-bold text-on-accent hover:bg-accent/90"
      >
        Got it
      </button>
    </section>
  );
}
