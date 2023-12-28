'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return { children };
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}
