'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Keep the space reserved before mount so the navbar doesn't shift.
  if (!mounted) return <span className="h-9 w-9" aria-hidden="true" />;

  const dark = resolvedTheme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid h-9 w-9 place-items-center rounded-pill border border-line bg-surface text-muted transition-colors hover:text-ink"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
