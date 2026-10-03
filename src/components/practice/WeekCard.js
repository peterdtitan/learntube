import React from 'react';
import Card from '../ui/Card';
import GoalPicker from './GoalPicker';
import cn from '../../lib/cn';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function headline(summary) {
  const left = summary.weeklyGoal - summary.doneThisWeek;
  if (left <= 0) return 'This week’s goal is done. Anything more is a bonus.';
  const days = left === 1 ? 'One more practice day' : `${left} more practice days`;
  return `${days} by Sunday keeps your streak.`;
}

export default function WeekCard({ summary }) {
  return (
    <Card as="aside" aria-label="This week" className="grid content-start gap-4">
      <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted">This week</h3>
      <p className="font-display text-3xl font-bold leading-none tabular-nums">
        {summary.streakWeeks === 1 ? '1 week' : `${summary.streakWeeks} weeks`}
        <span className="ml-2 font-sans text-[15px] font-normal text-muted">practice streak</span>
      </p>
      <ol className="grid grid-cols-7 gap-1.5 text-center text-xs text-muted">
        {summary.days.map((day, i) => (
          <li key={day.date} className="grid justify-items-center gap-1">
            <span
              className={cn(
                'h-7 w-7 rounded-full border-[1.5px] border-line bg-surface',
                day.practiced && 'border-accent bg-accent',
                day.isToday && !day.practiced && 'border-dashed border-accent',
              )}
            />
            <span aria-hidden="true">{DAY_LABELS[i]}</span>
            <span className="sr-only">{`${day.date}${day.practiced ? ', practised' : ''}`}</span>
          </li>
        ))}
      </ol>
      <p className="text-[15px]">
        <strong>{`${summary.doneThisWeek} of ${summary.weeklyGoal}`}</strong>
        {' practice days done. '}
        {headline(summary)}
      </p>
      <div className="grid gap-1">
        <GoalPicker goal={summary.weeklyGoal} />
        <p className="text-sm text-muted">A practice day is any day you try a step or log a make. Days off never reset your streak.</p>
      </div>
      <p className="flex justify-between gap-2 border-t border-line pt-3 text-sm tabular-nums">
        <span>
          {'Total '}
          <strong className="text-xp">{`${summary.xp.total} XP`}</strong>
        </span>
        <span>
          {'This week '}
          <strong className="text-xp">{`+${summary.xp.thisWeek}`}</strong>
        </span>
      </p>
    </Card>
  );
}
