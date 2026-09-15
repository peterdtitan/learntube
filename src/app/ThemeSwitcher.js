'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const current = resolvedTheme || theme;

  return (
    <button
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="flex items-center justify-center rounded-full p-1 h-8 w-8 lg:h-10 lg:w-10 transition-colors bg-white/80 dark:bg-gray-800/80 shadow-sm"
      type="button"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
    >
      {current === 'dark' ? (
        <BsSunFill className="text-yellow-400" />
      ) : (
        <BsFillMoonFill className="text-slate-700" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
