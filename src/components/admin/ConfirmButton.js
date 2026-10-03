'use client';

import React, { useEffect, useState } from 'react';
import cn from '../../lib/cn';

// A destructive submit button that needs two clicks; the first shows what will happen.
export default function ConfirmButton({ label, confirmLabel, className }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return undefined;
    const t = setTimeout(() => setArmed(false), 5000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type={armed ? 'submit' : 'button'}
      onClick={armed ? undefined : (e) => { e.preventDefault(); setArmed(true); }}
      className={cn(
        'inline-flex h-9 items-center rounded-pill px-4 text-sm font-bold',
        armed ? 'bg-danger text-white' : 'border border-line text-danger hover:bg-sunken',
        className,
      )}
    >
      {armed ? confirmLabel : label}
    </button>
  );
}
