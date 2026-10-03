import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';
import { formatDuration } from '../../lib/youtube';
import { isLessonDone } from '../../lib/course';
import cn from '../../lib/cn';

function LessonRow({
  pathwayId, lesson, isActive, done,
}) {
  return (
    <Link
      href={`/pathways/${pathwayId}/learn/${lesson.id}`}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-[15px] transition-colors',
        isActive ? 'bg-accent-soft font-bold text-accent' : 'hover:bg-sunken',
      )}
    >
      <span
        className={cn(
          'grid h-5 w-5 shrink-0 place-items-center rounded-full border-[1.5px]',
          done && 'border-accent bg-accent text-on-accent',
          !done && isActive && 'border-accent',
          !done && !isActive && 'border-line',
        )}
      >
        {done && <Check size={12} strokeWidth={3} />}
        {done && <span className="sr-only">Done:</span>}
      </span>
      <span className="flex-1 truncate">{lesson.title}</span>
      <span className="shrink-0 text-xs tabular-nums text-muted">{formatDuration(lesson.duration)}</span>
    </Link>
  );
}

export default function CourseSidebar({
  pathway, units, unassignedVideos, activeVideoId, progressByVideoId,
}) {
  const lessons = [...units.flatMap((u) => u.videos), ...unassignedVideos];
  const doneCount = lessons.filter((v) => isLessonDone(progressByVideoId[v.id])).length;
  const rows = (videos) => videos.map((v) => (
    <LessonRow
      key={v.id}
      pathwayId={pathway.id}
      lesson={v}
      isActive={v.id === activeVideoId}
      done={isLessonDone(progressByVideoId[v.id])}
    />
  ));

  return (
    <nav aria-label="Lessons in this pathway" className="grid gap-5">
      <div className="grid gap-2">
        <Link href="/pathways" className="text-sm text-muted hover:text-ink">← All pathways</Link>
        <h2 className="text-lg font-bold leading-tight">{pathway.title}</h2>
        <ProgressBar value={lessons.length ? doneCount / lessons.length : 0} label="Pathway progress" />
        <p className="text-xs text-muted">{`${doneCount} of ${lessons.length} lessons done`}</p>
      </div>
      {units.map((unit) => (
        <div key={unit.id} className="grid gap-1">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-muted">{unit.title}</p>
          {rows(unit.videos)}
        </div>
      ))}
      {unassignedVideos.length > 0 && <div className="grid gap-1">{rows(unassignedVideos)}</div>}
    </nav>
  );
}
