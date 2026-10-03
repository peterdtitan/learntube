'use client';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function DeleteAccount() {
  const [typed, setTyped] = useState('');
  const [state, setState] = useState({ status: 'idle' });

  const remove = async (e) => {
    e.preventDefault();
    setState({ status: 'deleting' });
    const res = await fetch('/api/me', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirm: typed }),
    });
    if (res.ok) {
      signOut({ callbackUrl: '/' });
      return;
    }
    const data = await res.json().catch(() => ({}));
    setState({ status: 'error', message: data.error || 'That didn’t work. Try again.' });
  };

  return (
    <form onSubmit={remove} className="grid gap-3">
      <p className="text-[15px]">
        This permanently deletes your account, progress, notes, makes and photos, comments, kudos,
        follows and XP. It can’t be undone.
      </p>
      <label htmlFor="confirm-delete" className="text-sm font-bold">Type DELETE to confirm</label>
      <div className="flex flex-wrap gap-2">
        <input
          id="confirm-delete"
          value={typed}
          autoComplete="off"
          onChange={(e) => setTyped(e.target.value)}
          className="h-11 w-40 rounded-md border border-line bg-surface px-3 text-[15px]"
        />
        <button
          type="submit"
          disabled={typed !== 'DELETE' || state.status === 'deleting'}
          className="inline-flex h-11 items-center rounded-pill bg-danger px-5 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
        >
          {state.status === 'deleting' ? 'Deleting…' : 'Delete my account'}
        </button>
      </div>
      {state.status === 'error' && <p role="alert" className="text-sm text-danger">{state.message}</p>}
    </form>
  );
}
