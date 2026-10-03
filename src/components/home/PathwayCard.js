import React from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { formatDuration } from '../../lib/youtube';

export default function PathwayCard({ pathway, signedIn }) {
  const {
    id, title, skill, makeTitle, lessonCount, seconds, doneCount, started, nextLesson, firstLesson,
  } = pathway;
  const finished = lessonCount > 0 && doneCount === lessonCount;
  const lesson = nextLesson || firstLesson;

  let progressLabel = `${lessonCount} lessons · ${Math.round(seconds / 60)} min`;
  if (signedIn && started) progressLabel = `${doneCount} of ${lessonCount} lessons done`;

  return (
    <Card as="article" className="grid min-w-0 gap-4">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-bold">{title}</h3>
        {skill && (
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-line px-2.5 py-0.5 text-xs text-muted">
            <span className="h-2 w-2 rounded-[2px]" style={{ background: skill.color }} />
            {skill.name}
          </span>
        )}
      </header>

      {makeTitle && (
        <p className="flex flex-wrap items-baseline gap-x-2 text-[15px]">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">You&apos;ll make</span>
          {makeTitle}
        </p>
      )}

      {lesson && !finished && (
        <div className="grid gap-1 rounded-md bg-canvas px-4 py-3">
          <p className="flex justify-between gap-3 text-[15px]">
            <span>
              {started ? 'Next: ' : 'Start: '}
              <strong>{lesson.title}</strong>
            </span>
            <span className="tabular-nums text-muted">{formatDuration(lesson.duration)}</span>
          </p>
          {lesson.tryTask && (
            <p className="text-sm text-muted">
              Then try:
              {' '}
              <span className="font-bold text-ink">{lesson.tryTask}</span>
            </p>
          )}
        </div>
      )}
      {finished && (
        <p className="rounded-md bg-accent-soft px-4 py-3 text-[15px] text-accent">
          Every lesson done. Log your finished make to wrap it up.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid min-w-[180px] flex-1 gap-1.5 text-sm text-muted">
          {signedIn && started && <ProgressBar value={doneCount / lessonCount} label={`${title} progress`} />}
          {progressLabel}
        </div>
        <Button
          href={lesson && !finished ? `/pathways/${id}/learn/${lesson.id}` : `/pathways/${id}`}
          variant={started ? 'primary' : 'ghost'}
          size="sm"
        >
          {started ? 'Continue' : 'Start'}
        </Button>
      </div>
    </Card>
  );
}
