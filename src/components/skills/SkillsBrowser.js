'use client';

import React, { useState } from 'react';
import SkillCard from './SkillCard';
import cn from '../../lib/cn';
import SkillIcon from '../ui/SkillIcon';

// Category chips over the grid of short skills. Filtering happens here, since every skill is
// already on the page.
export default function SkillsBrowser({ skills, signedIn }) {
  const [categoryId, setCategoryId] = useState(null);
  const categories = Object.values(skills.reduce((acc, s) => {
    if (s.skill) acc[s.skill.id] = s.skill;
    return acc;
  }, {}));
  const shown = categoryId ? skills.filter((s) => s.skill?.id === categoryId) : skills;

  const chip = (id, label, category) => (
    <button
      key={id || 'all'}
      type="button"
      aria-pressed={categoryId === id}
      onClick={() => setCategoryId(id)}
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-2 text-sm',
        categoryId === id && 'border-accent ring-1 ring-inset ring-accent',
      )}
    >
      {category && <SkillIcon skill={category} />}
      {label}
    </button>
  );

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {chip(null, 'All skills')}
        {categories.map((c) => chip(c.id, c.name, c))}
      </div>
      <p className="sr-only" aria-live="polite">{`${shown.length} skills shown`}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => <SkillCard key={s.id} skill={s} signedIn={signedIn} />)}
      </div>
    </div>
  );
}
