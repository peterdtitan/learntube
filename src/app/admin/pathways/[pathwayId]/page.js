import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowDown, ArrowUp, Gamepad2, Sparkles, Timer,
} from 'lucide-react';
import prisma from '../../../../lib/prismadb';
import PathwayForm from '../../../../components/admin/PathwayForm';
import ConfirmButton from '../../../../components/admin/ConfirmButton';
import UnitAdder from '../../../../components/admin/UnitAdder';
import { formatDuration, parseYouTubeId } from '../../../../lib/youtube';
import { estimatePathway, formatMinutes, funEquivalent } from '../../../../lib/estimate';
import { createQuiz } from '../../quizzes/actions';
import { publishPathwayQuizzes } from '../../content/actions';
import {
  deletePathway, deleteUnit, moveLesson, moveUnit, renameUnit, updatePathway,
} from '../../actions';
import { thumbnailUrl } from '../../../../lib/covers';

const QUIZ_SELECT = {
  select: {
    id: true,
    kind: true,
    published: true,
    timeLimitSec: true,
    _count: { select: { questions: true } },
  },
};

// Opens the quiz if it exists, otherwise creates it first.
function QuizButton({
  kind, videoId, unitId, quiz, icon: Icon, label,
}) {
  const status = quiz ? `${quiz._count.questions} q${quiz.published ? '' : ' · draft'}` : 'add';
  return (
    <form action={createQuiz}>
      <input type="hidden" name="kind" value={kind} />
      {videoId && <input type="hidden" name="videoId" value={videoId} />}
      {unitId && <input type="hidden" name="unitId" value={unitId} />}
      <button
        type="submit"
        className={`inline-flex h-8 items-center gap-1.5 rounded-pill border px-3 text-xs font-bold ${quiz?.published ? 'border-accent text-accent' : 'border-dashed border-line text-muted hover:text-ink'}`}
      >
        <Icon size={13} aria-hidden="true" />
        {`${label} (${status})`}
      </button>
    </form>
  );
}

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
      include: {
        units: {
          orderBy: { order: 'asc' },
          include: {
            quizzes: QUIZ_SELECT,
            videos: { orderBy: { order: 'asc' }, include: { quizzes: QUIZ_SELECT } },
          },
        },
      },
    }),
    prisma.skill.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true } }),
  ]);
  if (!pathway) notFound();

  const lessonIds = pathway.units.flatMap((u) => u.videos.map((v) => v.id));
  const learners = lessonIds.length
    ? (await prisma.videoProgress.findMany({ where: { videoId: { in: lessonIds } }, distinct: ['userId'], select: { userId: true } })).length
    : 0;

  // Each YouTube video once (split videos have several lessons), for the cover picker.
  const covers = Object.values(pathway.units.flatMap((u) => u.videos).reduce((acc, v) => {
    const videoId = parseYouTubeId(v.url);
    if (videoId && !acc[videoId]) acc[videoId] = { videoId, title: v.title.replace(/ \(part \d+ of \d+\)$/, '') };
    return acc;
  }, {}));
  const firstCover = thumbnailUrl(covers[0]?.videoId);

  const estimate = estimatePathway(pathway.units);
  const fun = funEquivalent(estimate.total, pathway.skillId);

  return (
    <div className="grid gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin" className="text-sm text-muted hover:text-ink">← All pathways</Link>
        <Link href={`/pathways/${pathway.id}`} className="text-sm font-bold text-accent">View as a learner</Link>
      </div>

      <section className="grid max-w-2xl gap-4">
        <h1 className="text-3xl font-bold">{pathway.title}</h1>
        <PathwayForm
          action={updatePathway}
          pathway={pathway}
          skills={skills}
          covers={covers}
          autoCover={firstCover}
          submitLabel="Save details"
        />
      </section>

      <section className="grid max-w-2xl gap-1 rounded-lg border border-line bg-surface p-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Time to learn, as learners see it</h2>
        <p className="text-2xl font-bold">
          {`≈ ${formatMinutes(estimate.total)}`}
          {fun && <span className="ml-2 text-lg font-normal text-xp">{`· about ${fun.label}`}</span>}
        </p>
        <p className="text-sm text-muted">
          {`${formatMinutes(estimate.video)} video, ${formatMinutes(estimate.practice)} practice, ${formatMinutes(estimate.quizzes)} published quizzes. Set each lesson’s practice time on the lesson page.`}
        </p>
      </section>

      <section className="grid gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">Modules and lessons</h2>
          <span className="flex flex-wrap gap-2">
            {[[true, 'Publish all quizzes'], [false, 'Unpublish all']].map(([published, label]) => (
              <form key={label} action={publishPathwayQuizzes}>
                <input type="hidden" name="pathwayId" value={pathway.id} />
                <input type="hidden" name="published" value={String(published)} />
                <button type="submit" className="h-9 rounded-pill border border-line px-4 text-sm font-bold hover:bg-sunken">{label}</button>
              </form>
            ))}
          </span>
        </div>
        <p className="max-w-2xl text-[15px] text-muted">
          Each module is a week. Give lessons a quick check, and each module a timed checkpoint
          (it sits halfway through) and end-of-module games.
        </p>
        {pathway.units.map((unit, n) => (
          <div key={unit.id} className="grid gap-3 rounded-lg border border-line bg-surface p-4">
            <div className="flex flex-wrap items-center gap-2">
              <form action={renameUnit} className="flex flex-1 flex-wrap items-center gap-2">
                <input type="hidden" name="id" value={unit.id} />
                <span className="text-sm font-bold uppercase tracking-widest text-muted">{`Week ${n + 1}`}</span>
                <label htmlFor={`unit-${unit.id}`} className="sr-only">Module title</label>
                <input id={`unit-${unit.id}`} name="title" defaultValue={unit.title} maxLength={120} className="h-10 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 font-bold" />
                <button type="submit" className="h-9 rounded-pill border border-line px-3 text-sm font-bold hover:bg-sunken">Rename</button>
              </form>
              <MoveButtons action={moveUnit} id={unit.id} label={unit.title} />
              {unit.videos.length === 0 && (
                <form action={deleteUnit}>
                  <input type="hidden" name="id" value={unit.id} />
                  <ConfirmButton label="Delete module" confirmLabel="Click again to delete" />
                </form>
              )}
            </div>
            <ol className="grid gap-1">
              {unit.videos.map((v) => (
                <li key={v.id} className="flex flex-wrap items-center gap-2 rounded-md px-2 py-1.5 odd:bg-canvas">
                  <Link href={`/admin/lessons/${v.id}`} className="min-w-0 flex-1 truncate text-[15px] hover:text-accent">{v.title}</Link>
                  <span className="text-sm tabular-nums text-muted">
                    {v.endSec ? `${formatDuration(v.startSec || 0)}–${formatDuration(v.endSec)} · ` : ''}
                    {formatDuration(v.duration)}
                  </span>
                  {v.duration > 600 && <span className="rounded-pill bg-xp-soft px-2 text-xs font-bold text-xp">Over 10 min</span>}
                  {!v.tryTask && <span className="rounded-pill bg-xp-soft px-2 text-xs font-bold text-xp">No Try step</span>}
                  <QuizButton kind="LESSON_CHECK" videoId={v.id} quiz={v.quizzes.find((q) => q.kind === 'LESSON_CHECK')} icon={Sparkles} label="Quick check" />
                  <MoveButtons action={moveLesson} id={v.id} label={v.title} />
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap items-center gap-2 border-t border-line pt-3">
              <Link href={`/admin/pathways/${pathway.id}/lessons/new?unitId=${unit.id}`} className="mr-auto text-sm font-bold text-accent">+ Add a lesson</Link>
              <QuizButton kind="CHECKPOINT" unitId={unit.id} quiz={unit.quizzes.find((q) => q.kind === 'CHECKPOINT')} icon={Timer} label="Checkpoint" />
              <QuizButton kind="MODULE_GAME" unitId={unit.id} quiz={unit.quizzes.find((q) => q.kind === 'MODULE_GAME')} icon={Gamepad2} label="Games" />
            </div>
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
