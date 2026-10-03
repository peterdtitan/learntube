import React from 'react';
import Link from 'next/link';
import {
  Award, Flame, Flag, Sparkles,
} from 'lucide-react';
import CheerButton from './CheerButton';
import { firstName } from '../../lib/people';

const ICONS = {
  XP: Sparkles, STREAK: Flame, FIRST_MAKE: Award, PATHWAY_DONE: Flag,
};

export default function MilestoneCard({ milestone }) {
  const Icon = ICONS[milestone.kind] || Sparkles;
  return (
    <article className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-surface p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-xp-soft text-xp">
          <Icon size={20} />
        </span>
        <p className="text-[15px]">
          {milestone.isMine ? <strong>You</strong> : (
            <Link href={`/learners/${milestone.author.id}`} className="font-bold hover:text-accent">
              {firstName(milestone.author.name)}
            </Link>
          )}
          {` ${milestone.isMine ? milestone.text.replace('their', 'your') : milestone.text}`}
        </p>
      </div>
      <CheerButton
        milestoneId={milestone.id}
        initialCount={milestone.cheerCount}
        initialCheered={milestone.cheered}
        isMine={milestone.isMine}
      />
    </article>
  );
}
