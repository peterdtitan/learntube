import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import { lessonMetadata } from '../../../../../lib/seo';
import prisma from '../../../../../lib/prismadb';
import { getPathwayWithUnits, getProgressByVideoId } from '../../../../../lib/course';
import { getPathwayOutline } from '../../../../../lib/outline';
import LessonCheck from '../../../../../components/quiz/LessonCheck';
import CourseSidebar from '../../../../../components/course/CourseSidebar';
import Classroom from '../../../../../components/course/Classroom';
import LessonWorkspace from '../../../../../components/course/LessonWorkspace';
import NotesPanel from '../../../../../components/course/NotesPanel';
import CodeSandbox from '../../../../../components/course/CodeSandbox';
import Button from '../../../../../components/ui/Button';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const params = await props.params;
  return lessonMetadata(params.pathwayId, params.videoId);
}

// Skills whose lessons always get the code sandbox; any lesson with starter code gets it too.
const SANDBOX_SKILLS = ['software-engineering'];

export default async function LessonPage(props) {
  const params = await props.params;
  const { pathwayId, videoId } = params;

  const data = await getPathwayWithUnits(pathwayId);
  if (!data) notFound();
  const {
    pathway, units, unassignedVideos, orderedVideos,
  } = data;
  const lesson = orderedVideos.find((v) => v.id === videoId);
  if (!lesson) notFound();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  const [progressByVideoId, note, myMakes, outline] = await Promise.all([
    getProgressByVideoId(userId, orderedVideos.map((v) => v.id)),
    userId ? prisma.note.findUnique({ where: { userId_videoId: { userId, videoId } } }) : null,
    userId
      ? prisma.make.findMany({
        where: { userId, videoId },
        orderBy: { createdAt: 'asc' },
        select: { id: true, title: true },
      })
      : [],
    getPathwayOutline(pathwayId, userId),
  ]);
  const week = outline.modules.find((m) => m.lessons.some((l) => l.id === videoId));
  const lessonIndex = week ? week.lessons.findIndex((l) => l.id === videoId) : -1;
  const check = week?.lessons[lessonIndex]?.check;
  const checkpointNext = week?.checkpoint && lessonIndex === week.checkpointAfter
    ? week.checkpoint
    : null;
  const gameNext = week?.game && lessonIndex === week.lessons.length - 1 ? week.game : null;

  const progress = progressByVideoId[videoId];
  const index = orderedVideos.findIndex((v) => v.id === videoId);
  const prev = orderedVideos[index - 1];
  const next = orderedVideos[index + 1];
  // An early part of a split video: the Try step and make come with its last part.
  const continuesInNext = Boolean(lesson.endSec && next && next.url === lesson.url);
  const startAt = progress?.completed ? 0 : (progress?.stoppedAt || 0);

  const sandbox = Boolean(lesson.starterCode) || SANDBOX_SKILLS.includes(pathway.skill?.id);
  const card = 'grid min-w-0 gap-0.5 rounded-lg border border-line bg-surface px-4 py-3 hover:border-accent';

  return (
    <LessonWorkspace
      header={(
        <header className="grid gap-1">
          <p className="text-sm text-muted">{`Lesson ${index + 1} of ${orderedVideos.length}`}</p>
          <h1 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight">{lesson.title}</h1>
          {lesson.description && <p className="text-[15px] text-muted">{lesson.description}</p>}
          {!userId && (
            <p className="mt-2 rounded-md bg-xp-soft px-4 py-3 text-[15px] text-xp">
              Sign in to save your place, your notes and your practice.
            </p>
          )}
        </header>
      )}
      stage={(
        <Classroom
          lesson={{
            id: lesson.id,
            url: lesson.url,
            title: lesson.title,
            duration: lesson.duration,
            startSec: lesson.startSec,
            endSec: lesson.endSec,
            captionsLang: lesson.captionsLang,
            tryTask: lesson.tryTask,
          }}
          startAt={startAt}
          isSignedIn={Boolean(userId)}
          initialWatched={Boolean(progress?.completed)}
          initialTriedAt={progress?.triedAt ? progress.triedAt.toISOString() : null}
          myMakes={myMakes}
          showLog={!continuesInNext}
        />
      )}
      after={[
        check && (
          <LessonCheck
            key={check.id}
            quizId={check.id}
            questionCount={check.questionCount}
            best={check.best != null ? { finalScore: check.best } : null}
            isSignedIn={Boolean(userId)}
          />
        ),
        (checkpointNext || gameNext) && (
          <aside aria-label="What’s next" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-xp bg-xp-soft/40 p-5">
            <div className="grid min-w-0 gap-1">
              <p className="font-bold">{checkpointNext ? `Module exam: ${week.title}` : `You’ve reached the end of ${week.title}`}</p>
              <p className="text-[15px] text-muted">
                {checkpointNext
                  ? `${checkpointNext.questionCount} timed questions on this module. ${checkpointNext.best != null ? `Your best: ${Math.round(checkpointNext.best)}%.` : 'Take it when you’re ready.'}`
                  : 'Play the module games to lock in what you learned.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {checkpointNext && (
                <Button href={`/pathways/${pathwayId}/checkpoint/${checkpointNext.id}`} size="sm">Take the exam</Button>
              )}
              {gameNext && (
                <Button href={`/pathways/${pathwayId}/modules/${week.id}/game`} size="sm" variant={checkpointNext ? 'ghost' : 'primary'}>Play the games</Button>
              )}
            </div>
          </aside>
        ),
      ]}
      nav={(
        <nav aria-label="Lesson navigation" className="grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link href={`/pathways/${pathwayId}/learn/${prev.id}`} className={card}>
              <span className="text-xs font-bold uppercase tracking-widest text-muted">← Previous</span>
              <span className="truncate text-[15px] font-bold">{prev.title}</span>
            </Link>
          ) : <span className="hidden sm:block" />}
          {next ? (
            <Link href={`/pathways/${pathwayId}/learn/${next.id}`} className={`${card} sm:text-right`}>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Next →</span>
              <span className="truncate text-[15px] font-bold">{next.title}</span>
            </Link>
          ) : (
            <Link href="/" className={`${card} sm:text-right`}>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Finished</span>
              <span className="truncate text-[15px] font-bold">Back to your workbench</span>
            </Link>
          )}
        </nav>
      )}
      tools={[
        {
          id: 'notes',
          label: 'Notes',
          content: <NotesPanel videoId={lesson.id} initialContent={note?.content || ''} isSignedIn={Boolean(userId)} />,
        },
        ...(sandbox ? [{
          id: 'code',
          label: 'Code',
          content: <CodeSandbox lessonId={lesson.id} starterCode={lesson.starterCode} />,
        }] : []),
        {
          id: 'transcript',
          label: 'Transcript',
          content: lesson.transcript
            ? <p className="max-w-[70ch] whitespace-pre-wrap text-[15px] leading-relaxed">{lesson.transcript}</p>
            : <p className="text-[15px] text-muted">No transcript for this lesson yet.</p>,
        },
        {
          id: 'outline',
          label: 'Course',
          content: (
            <CourseSidebar
              pathway={pathway}
              units={units}
              unassignedVideos={unassignedVideos}
              activeVideoId={videoId}
              progressByVideoId={progressByVideoId}
              modules={outline.modules}
            />
          ),
        },
      ]}
      defaultTab={sandbox ? 'code' : 'notes'}
      startWide={sandbox}
    />
  );
}
