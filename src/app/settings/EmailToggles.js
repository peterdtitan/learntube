'use client';

import React, { useState } from 'react';

const OPTIONS = [
  {
    field: 'emailReminders',
    label: 'Practice reminders',
    hint: 'When your weekly streak needs a day, when you tried a step but haven’t logged what you made, and after a few days away. Never more than three a week.',
  },
  {
    field: 'emailWeekly',
    label: 'Monday recap',
    hint: 'Last week’s XP, practice days and kudos, and your next lesson. Only after a week you practised.',
  },
];

export default function EmailToggles({ initial }) {
  const [values, setValues] = useState(initial);
  const [saving, setSaving] = useState(null);

  const change = async (field, next) => {
    setValues((v) => ({ ...v, [field]: next }));
    setSaving(field);
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: next }),
    });
    setSaving(null);
    if (!res.ok) setValues((v) => ({ ...v, [field]: !next }));
  };

  return (
    <div className="grid gap-4">
      {OPTIONS.map((o) => (
        <div key={o.field} className="flex items-start gap-3 text-[15px]">
          <input
            id={`email-${o.field}`}
            type="checkbox"
            checked={values[o.field]}
            disabled={saving === o.field}
            onChange={(e) => change(o.field, e.target.checked)}
            className="mt-1 h-4 w-4 accent-[rgb(var(--lt-accent))]"
          />
          <div>
            <label htmlFor={`email-${o.field}`} className="font-bold">{o.label}</label>
            <p className="text-sm text-muted">{o.hint}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
