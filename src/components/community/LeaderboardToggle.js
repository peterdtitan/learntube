'use client';

import React, { useState } from 'react';

export default function LeaderboardToggle({ initialShown }) {
  const [shown, setShown] = useState(initialShown);
  const [saving, setSaving] = useState(false);

  const change = async (next) => {
    setShown(next);
    setSaving(true);
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ showOnLeaderboard: next }),
    });
    setSaving(false);
    if (!res.ok) setShown(!next);
  };

  return (
    <div className="flex items-start gap-3 text-[15px]">
      <input
        id="show-on-leaderboard"
        type="checkbox"
        checked={shown}
        disabled={saving}
        onChange={(e) => change(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[rgb(var(--lt-accent))]"
      />
      <div>
        <label htmlFor="show-on-leaderboard" className="font-bold">Show me on leaderboards</label>
        <p className="text-sm text-muted">
          Turn this off and you can still see leaderboards, but your name won’t appear on them.
        </p>
      </div>
    </div>
  );
}
