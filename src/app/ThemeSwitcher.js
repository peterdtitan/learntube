'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    setTheme(systemTheme);
  }, [setTheme, systemTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-[#0D091A]/90 flex items-center justify-center dark:bg-gray-800 rounded-full p-1 h-10 w-10">
      <button type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? (
          <BsSunFill className="text-yellow-400 bg-inherit" />
        ) : (
          <BsFillMoonFill className="text-yellow-400" />
        )}
      </button>
    </div>
  );
}

export default ThemeSwitcher;
