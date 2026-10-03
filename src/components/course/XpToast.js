'use client';

import React, { useEffect } from 'react';

export default function XpToast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [toast, onDone]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      {toast && (
        <p className="rounded-pill bg-ink px-5 py-2.5 text-[15px] font-bold text-canvas shadow-lg">
          {toast.message}
          {toast.xp > 0 && <span className="ml-2 text-xp-soft">{`+${toast.xp} XP`}</span>}
        </p>
      )}
    </div>
  );
}
