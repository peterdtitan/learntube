'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifySummaryChanged } from '../useLearnerSummary';

const GOALS = [2, 3, 4, 5];

export default function GoalPicker({ goal }) {
  const router = useRouter();
  const [value, setValue] = useState(goal);
  const [saving, setSaving] = useState(false);

  async function change(next) {
    setValue(next);
    setSaving(true);
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weeklyGoal: next }),
    });
    setSaving(false);
    if (!res.ok) {
      setValue(goal);
      return;
    }
    notifySummaryChanged();
    router.refresh();
  }

  return (
    <label htmlFor="weekly-goal" className="flex flex-wrap items-center gap-2 text-sm text-muted">
      Goal
      <select
        id="weekly-goal"
        value={value}
        disabled={saving}
        onChange={(e) => change(Number(e.target.value))}
        className="rounded-sm border border-line bg-surface px-2 py-1 text-ink"
      >
        {GOALS.map((g) => <option key={g} value={g}>{`${g} days a week`}</option>)}
      </select>
    </label>
  );
}
