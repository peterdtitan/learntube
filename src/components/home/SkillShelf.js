'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

import Button from '../ui/Button';
import { palette } from '../../design/tokens';
import cn from '../../lib/cn';
import SkillIcon from '../ui/SkillIcon';
import Cover from '../ui/Cover';

// three.js only loads on this page, after the rest of the page is interactive.
const ShelfScene = dynamic(() => import('./ShelfScene'), { ssr: false });

const TIERS = [
  { id: 'HAND', label: 'Made by hand' },
  { id: 'SCREEN', label: 'Made on a screen' },
];

// The 3D shelf has five places per row; skills with lessons go there first. The buttons
// below list every skill, so the shelf never limits what can be learned.
const SHELF_PLACES = 5;
const live = (s) => s.pathways.length > 0;
function shelfSkills(skills) {
  return TIERS.flatMap((tier) => skills
    .filter((s) => s.tier === tier.id)
    .sort((a, b) => Number(live(b)) - Number(live(a)))
    .slice(0, SHELF_PLACES));
}

function SkillPanel({ skill }) {
  const [pathway] = skill.pathways;
  const [track] = skill.tracks || [];
  if (track) {
    return (
      <div className="grid content-start gap-3 rounded-lg border border-line bg-surface p-5 shadow-sm" aria-live="polite">
        <Cover src={track.cover} skill={skill} sizes="300px" className="rounded-md" />
        <div className="flex items-center gap-2.5">
          <SkillIcon skill={skill} size="sm" />
          <h2 className="text-[22px] font-bold">{skill.name}</h2>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">Program</p>
          <p className="text-[17px] font-bold">{track.title}</p>
        </div>
        {track.makeTitle && <p className="text-[15px] text-muted">{track.makeTitle}</p>}
        <p className="text-sm text-muted">{`${track.courseCount} courses, taken in order`}</p>
        <Button href={`/tracks/${track.slug}`}>See the program</Button>
      </div>
    );
  }
  return (
    <div className="grid content-start gap-3 rounded-lg border border-line bg-surface p-5 shadow-sm" aria-live="polite">
      <Cover src={pathway?.cover} skill={skill} sizes="300px" className="rounded-md" />
      <div className="flex items-center gap-2.5">
        <SkillIcon skill={skill} size="sm" />
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
          <Button href={`/pathways/${pathway.id}`}>Start learning</Button>
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
  // Stable between renders: the scene rebuilds whenever this array changes, so a new
  // one on every hover would tear down and recreate the WebGL scene.
  const onShelf = useMemo(() => shelfSkills(skills), [skills]);

  const selected = skills.find((s) => s.id === selectedId) || firstLive;
  const hovered = skills.find((s) => s.id === hoveredId);
  if (!selected) return null;

  return (
    <section id="skills" aria-label="Choose a skill" className="scroll-mt-20">
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_300px]">
        <div className="relative h-[300px] sm:h-[360px] lg:h-[420px]">
          <ShelfScene
            skills={onShelf}
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
                <SkillIcon skill={skill} />
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
