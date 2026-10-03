'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Changing the select navigates straight away; the form still works without JavaScript.
export default function ScopePicker({
  value, groups, period, audience,
}) {
  const router = useRouter();
  const go = (scopeValue) => {
    const params = new URLSearchParams({ period, audience });
    if (scopeValue !== 'all') params.set('scope', scopeValue);
    router.push(`/leaderboard?${params}`);
  };

  return (
    <form action="/leaderboard" className="flex flex-wrap items-center gap-2" onSubmit={(e) => { e.preventDefault(); go(e.currentTarget.scope.value); }}>
      <label htmlFor="leaderboard-scope" className="text-sm font-bold">Ranking for</label>
      <select
        id="leaderboard-scope"
        name="scope"
        value={value}
        onChange={(e) => go(e.target.value)}
        className="h-10 rounded-md border border-line bg-surface px-3 text-[15px]"
      >
        <option value="all">All skills</option>
        {groups.map((g) => (
          <optgroup key={g.skill.id} label={g.skill.name}>
            <option value={`skill:${g.skill.id}`}>{`All of ${g.skill.name}`}</option>
            {g.pathways.map((p) => <option key={p.id} value={`pathway:${p.id}`}>{p.title}</option>)}
          </optgroup>
        ))}
      </select>
      <input type="hidden" name="period" value={period} />
      <input type="hidden" name="audience" value={audience} />
      <noscript><button type="submit" className="h-10 rounded-pill border border-line px-4 text-sm font-bold">Show</button></noscript>
    </form>
  );
}
