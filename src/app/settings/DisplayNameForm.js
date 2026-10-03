'use client';

import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { DISPLAY_NAME_MAX } from '../../lib/people';

export default function DisplayNameForm({ initial, fallback }) {
  const [value, setValue] = useState(initial || '');
  const [state, setState] = useState({ status: 'idle' });

  const save = async (e) => {
    e.preventDefault();
    setState({ status: 'saving' });
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName: value }),
    });
    const data = await res.json().catch(() => ({}));
    setState(res.ok ? { status: 'saved' } : { status: 'error', message: data.error || 'That didn’t save.' });
  };

  return (
    <form onSubmit={save} className="grid gap-2">
      <label htmlFor="display-name" className="text-sm font-bold">Display name</label>
      <div className="flex flex-wrap gap-2">
        <input
          id="display-name"
          value={value}
          maxLength={DISPLAY_NAME_MAX}
          onChange={(e) => { setValue(e.target.value); setState({ status: 'idle' }); }}
          placeholder={fallback}
          className="h-11 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-[15px] placeholder:text-muted"
        />
        <Button type="submit" disabled={state.status === 'saving'}>Save</Button>
      </div>
      <p className="text-sm text-muted">
        {`Shown on your makes, comments, profile and leaderboards. Leave it blank to show “${fallback}”.`}
      </p>
      {state.status === 'saved' && <p role="status" className="text-sm text-accent">Saved.</p>}
      {state.status === 'error' && <p role="alert" className="text-sm text-danger">{state.message}</p>}
    </form>
  );
}
