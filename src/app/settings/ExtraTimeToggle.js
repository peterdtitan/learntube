'use client';

import React, { useState } from 'react';

export default function ExtraTimeToggle({ initialOn }) {
  const [on, setOn] = useState(initialOn);
  const [saving, setSaving] = useState(false);

  const change = async (next) => {
    setOn(next);
    setSaving(true);
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extraQuizTime: next }),
    });
    setSaving(false);
    if (!res.ok) setOn(!next);
  };

  return (
    <div className="flex items-start gap-3 text-[15px]">
      <input
        id="extra-quiz-time"
        type="checkbox"
        checked={on}
        disabled={saving}
        onChange={(e) => change(e.target.checked)}
        className="mt-1 h-4 w-4 accent-[rgb(var(--lt-accent))]"
      />
      <div>
        <label htmlFor="extra-quiz-time" className="font-bold">Extra time on timed quizzes (1.5×)</label>
        <p className="text-sm text-muted">
          For anyone who needs longer: screen reader users, dyslexia, reading in a second language.
          Checkpoints give you half as long again. Nobody else can see this setting.
        </p>
      </div>
    </div>
  );
}
