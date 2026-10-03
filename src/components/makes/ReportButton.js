'use client';

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Flag } from 'lucide-react';
import Button from '../ui/Button';

export default function ReportButton({ makeId, reasons }) {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  if (state === 'done') {
    return <p role="status" className="text-sm text-muted">Thanks for letting us know. We’ll take a look.</p>;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => (status === 'authenticated' ? setOpen(true) : signIn())}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        <Flag size={14} />
        Report
      </button>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!reason) {
      setMessage('Pick a reason.');
      return;
    }
    setState('sending');
    const res = await fetch(`/api/makes/${makeId}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) setState('done');
    else {
      setState('idle');
      setMessage(data.error || 'That didn’t send. Try again.');
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-md border border-line bg-surface p-4">
      <fieldset className="grid gap-2">
        <legend className="mb-1 text-sm font-bold">What’s wrong with this make?</legend>
        {reasons.map((r) => (
          <label key={r.id} htmlFor={`reason-${r.id}`} className="flex items-center gap-2 text-[15px]">
            <input
              id={`reason-${r.id}`}
              type="radio"
              name="reason"
              value={r.id}
              checked={reason === r.id}
              onChange={() => setReason(r.id)}
            />
            {r.text}
          </label>
        ))}
      </fieldset>
      {message && <p role="alert" className="text-sm text-danger">{message}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={state === 'sending'}>Send report</Button>
        <Button variant="quiet" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
      </div>
    </form>
  );
}
