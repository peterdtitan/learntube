'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import Button from '../ui/Button';
import { palette } from '../../design/tokens';
import cn from '../../lib/cn';

// three.js only loads on this page, after the rest of the page is interactive.
const ShelfScene = dynamic(() => import('./ShelfScene'), { ssr: false });

const TIERS = [
  { id: 'HAND', label: 'Made by hand' },
  { id: 'SCREEN', label: 'Made on a screen' },
];

function SkillPanel({ skill }) {
  const [pathway] = skill.pathways;
  return (
    <div className="grid content-start gap-3 rounded-lg border border-line bg-surface p-5 shadow-sm" aria-live="polite">
      <div className="flex items-center gap-2.5">
        <span className="h-3 w-3 shrink-0 rounded-[4px]" style={{ background: skill.color }} />
        <h2 className="text-[22px] font-bold">{skill.name}</h2>
      </div>
      {pathway ? (
        <>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted">You&apos;ll make</p>
            <p className="text-[15px]">{pathway.makeTitle || pathway.title}</p>
          </div>
          <p className="text-sm text-muted">
            {skill.pathways.length === 1 ? pathway.title : `${skill.pathways.length} pathways`}
          </p>
          <Button href={`/pathways/${pathway.id}`}>Start pathway</Button>
        </>
      ) : (
        <>
          <p className="text-[15px] text-muted">We&apos;re picking the best free lessons for this skill now.</p>
          <Button disabled>Coming soon</Button>
        </>
      )}
    </div>
  );
}

export default function SkillShelf({ skills }) {
  const firstLive = skills.find((s) => s.pathways.length) || skills[0];
  const [selectedId, setSelectedId] = useState(firstLive?.id);
  const [hoveredId, setHoveredId] = useState(null);
  const { resolvedTheme } = useTheme();
  const { accent } = palette[resolvedTheme === 'dark' ? 'dark' : 'light'];

  const selected = skills.find((s) => s.id === selectedId) || firstLive;
  const hovered = skills.find((s) => s.id === hoveredId);
  if (!selected) return null;

  return (
    <section id="skills" aria-label="Choose a skill" className="scroll-mt-20">
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative h-[300px] sm:h-[360px] lg:h-[420px]">
          <ShelfScene
            skills={skills}
            selectedId={selected.id}
            accent={accent}
            onSelect={setSelectedId}
            onHover={setHoveredId}
          />
          {hovered && (
            <span className="pointer-events-none absolute left-1/2 top-2 hidden -translate-x-1/2 whitespace-nowrap rounded-pill border border-line bg-surface px-3 py-1 text-[13px] sm:block">
              {hovered.name}
              {!hovered.pathways.length && ' · coming soon'}
            </span>
          )}
        </div>
        <SkillPanel skill={selected} />
      </div>

      <div className="mt-5 grid gap-3">
        {TIERS.map((tier) => (
          <div key={tier.id} className="flex flex-wrap items-center gap-2">
            <span className="w-full text-xs font-bold uppercase tracking-widest text-muted sm:w-40">{tier.label}</span>
            {skills.filter((s) => s.tier === tier.id).map((skill) => (
              <button
                key={skill.id}
                type="button"
                aria-pressed={skill.id === selected.id}
                onClick={() => setSelectedId(skill.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-2 text-sm',
                  skill.id === selected.id && 'border-accent ring-1 ring-inset ring-accent',
                )}
              >
                <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: skill.color }} />
                {skill.name}
                {!skill.pathways.length && <span className="text-xs text-muted">soon</span>}
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
