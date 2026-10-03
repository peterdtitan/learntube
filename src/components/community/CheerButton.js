'use client';

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { PartyPopper } from 'lucide-react';
import cn from '../../lib/cn';

export default function CheerButton({
  milestoneId, initialCount, initialCheered, isMine,
}) {
  const { status } = useSession();
  const [count, setCount] = useState(initialCount);
  const [cheered, setCheered] = useState(initialCheered);
  const [busy, setBusy] = useState(false);

  if (isMine) {
    return <span className="text-sm font-bold text-accent tabular-nums">{`${count} ${count === 1 ? 'cheer' : 'cheers'}`}</span>;
  }

  const toggle = async () => {
    if (status !== 'authenticated') {
      signIn();
      return;
    }
    const next = !cheered;
    setBusy(true);
    setCheered(next);
    setCount((c) => c + (next ? 1 : -1));
    const res = await fetch(`/api/milestones/${milestoneId}/cheer`, { method: next ? 'POST' : 'DELETE' });
    setBusy(false);
    if (res.ok) {
      const data = await res.json();
      setCheered(data.cheered);
      setCount(data.cheerCount);
    } else {
      setCheered(!next);
      setCount((c) => c + (next ? -1 : 1));
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={cheered}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-pill border px-4 text-sm font-bold tabular-nums transition-colors',
        cheered ? 'border-accent bg-accent-soft text-accent' : 'border-line text-ink hover:bg-sunken',
      )}
    >
      <PartyPopper size={16} />
      {cheered ? 'Cheered' : 'Cheer'}
      <span className="text-muted">{count}</span>
    </button>
  );
}
