'use client';

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import cn from '../../lib/cn';

export default function KudosButton({
  makeId, initialCount, initialGave, isMine,
}) {
  const { status } = useSession();
  const [count, setCount] = useState(initialCount);
  const [gave, setGave] = useState(initialGave);
  const [busy, setBusy] = useState(false);

  if (isMine) {
    return <span className="inline-flex items-center px-2 py-1 text-sm font-bold text-accent tabular-nums">{`${count} kudos`}</span>;
  }

  async function toggle() {
    if (status !== 'authenticated') {
      signIn();
      return;
    }
    const next = !gave;
    setBusy(true);
    setGave(next);
    setCount((c) => c + (next ? 1 : -1));
    const res = await fetch(`/api/makes/${makeId}/kudos`, { method: next ? 'POST' : 'DELETE' });
    setBusy(false);
    if (res.ok) {
      const data = await res.json();
      setGave(data.gaveKudos);
      setCount(data.kudosCount);
    } else {
      setGave(!next);
      setCount((c) => c + (next ? -1 : 1));
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={gave}
      aria-label={gave ? 'Remove kudos' : 'Give kudos'}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-2 py-1 text-sm font-bold tabular-nums transition-colors',
        gave ? 'text-accent' : 'text-muted hover:text-ink',
      )}
    >
      <Heart size={16} fill={gave ? 'currentColor' : 'none'} />
      {count}
    </button>
  );
}
