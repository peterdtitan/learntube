import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>{children}</div>;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}
