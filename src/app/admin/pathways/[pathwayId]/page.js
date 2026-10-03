import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown, ArrowUp } from 'lucide-react';
import prisma from '../../../../lib/prismadb';
import PathwayForm from '../../../../components/admin/PathwayForm';
import ConfirmButton from '../../../../components/admin/ConfirmButton';
import UnitAdder from '../../../../components/admin/UnitAdder';
import { formatDuration } from '../../../../lib/youtube';
import {
  deletePathway, deleteUnit, moveLesson, moveUnit, renameUnit, updatePathway,
} from '../../actions';

function MoveButtons({ action, id, label }) {
  return (
    <span className="flex">
      {[[-1, ArrowUp, 'up'], [1, ArrowDown, 'down']].map(([direction, Icon, word]) => (
        <form key={word} action={action}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="direction" value={direction} />
          <button type="submit" aria-label={`Move ${label} ${word}`} className="grid h-8 w-8 place-items-center rounded-pill text-muted hover:bg-sunken hover:text-ink">
            <Icon size={15} />
          </button>
        </form>
      ))}
    </span>
  );
}

export default async function EditPathway({ params }) {
  const [pathway, skills] = await Promise.all([
    prisma.pathway.findUnique({
      where: { id: params.pathwayId },
      include: { units: { orderBy: { order: 'asc' }, include: { videos: { orderBy: { order: 'asc' } } } } },
    }),
    prisma.skill.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true } }),
  ]);
  if (!pathway) notFound();

  const lessonIds = pathway.units.flatMap((u) => u.videos.map((v) => v.id));
  const learners = lessonIds.length
    ? (await prisma.videoProgress.findMany({ where: { videoId: { in: lessonIds } }, distinct: ['userId'], select: { userId: true } })).length
    : 0;

  return (
    <div className="grid gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin" className="text-sm text-muted hover:text-ink">← All pathways</Link>
        <Link href={`/pathways/${pathway.id}`} className="text-sm font-bold text-accent">View as a learner</Link>
      </div>

      <section className="grid max-w-2xl gap-4">
        <h1 className="text-3xl font-bold">{pathway.title}</h1>
        <PathwayForm action={updatePathway} pathway={pathway} skills={skills} submitLabel="Save details" />
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl font-bold">Units and lessons</h2>
        {pathway.units.map((unit) => (
          <div key={unit.id} className="grid gap-3 rounded-lg border border-line bg-surface p-4">
            <div className="flex flex-wrap items-center gap-2">
              <form action={renameUnit} className="flex flex-1 flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={unit.id} />
                <label htmlFor={`unit-${unit.id}`} className="sr-only">Unit title</label>
                <input id={`unit-${unit.id}`} name="title" defaultValue={unit.title} maxLength={120} className="h-10 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 font-bold" />
                <button type="submit" className="h-9 rounded-pill border border-line px-3 text-sm font-bold hover:bg-sunken">Rename</button>
              </form>
              <MoveButtons action={moveUnit} id={unit.id} label={unit.title} />
              {unit.videos.length === 0 && (
                <form action={deleteUnit}>
                  <input type="hidden" name="id" value={unit.id} />
                  <ConfirmButton label="Delete unit" confirmLabel="Click again to delete" />
                </form>
              )}
            </div>
            <ol className="grid gap-1">
              {unit.videos.map((v) => (
                <li key={v.id} className="flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 odd:bg-canvas">
                  <Link href={`/admin/lessons/${v.id}`} className="min-w-0 flex-1 truncate text-[15px] hover:text-accent">{v.title}</Link>
                  <span className="text-sm tabular-nums text-muted">{formatDuration(v.duration)}</span>
                  {!v.tryTask && <span className="rounded-pill bg-xp-soft px-2 text-xs font-bold text-xp">No Try step</span>}
                  <MoveButtons action={moveLesson} id={v.id} label={v.title} />
                </li>
              ))}
            </ol>
            <Link href={`/admin/pathways/${pathway.id}/lessons/new?unitId=${unit.id}`} className="justify-self-start text-sm font-bold text-accent">+ Add a lesson</Link>
          </div>
        ))}
        <UnitAdder pathwayId={pathway.id} />
      </section>

      <section className="grid max-w-2xl gap-3 border-t border-line pt-6">
        <h2 className="text-xl font-bold">Delete this pathway</h2>
        <p className="text-[15px] text-muted">
          {`Removes ${lessonIds.length} ${lessonIds.length === 1 ? 'lesson' : 'lessons'} and the progress and notes of ${learners} ${learners === 1 ? 'learner' : 'learners'}. Makes stay, unlinked.`}
        </p>
        <form action={deletePathway}>
          <input type="hidden" name="id" value={pathway.id} />
          <ConfirmButton label="Delete pathway" confirmLabel="Click again to delete everything" />
        </form>
      </section>
    </div>
  );
}
