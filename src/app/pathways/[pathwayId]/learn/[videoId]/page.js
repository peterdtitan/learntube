import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import prisma from '../../../../../lib/prismadb';
import { getPathwayWithUnits, getProgressByVideoId } from '../../../../../lib/course';
import CourseSidebar from '../../../../../components/course/CourseSidebar';
import Classroom from '../../../../../components/course/Classroom';
import LessonTabs from '../../../../../components/course/LessonTabs';
import Button from '../../../../../components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function LessonPage({ params }) {
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

  const [progressByVideoId, note, myMakes] = await Promise.all([
    getProgressByVideoId(userId, orderedVideos.map((v) => v.id)),
    userId ? prisma.note.findUnique({ where: { userId_videoId: { userId, videoId } } }) : null,
    userId
      ? prisma.make.findMany({
        where: { userId, videoId },
        orderBy: { createdAt: 'asc' },
        select: { id: true, title: true },
      })
      : [],
  ]);

  const progress = progressByVideoId[videoId];
  const index = orderedVideos.findIndex((v) => v.id === videoId);
  const prev = orderedVideos[index - 1];
  const next = orderedVideos[index + 1];
  const startAt = progress?.completed ? 0 : (progress?.stoppedAt || 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
        <CourseSidebar
          pathway={pathway}
          units={units}
          unassignedVideos={unassignedVideos}
          activeVideoId={videoId}
          progressByVideoId={progressByVideoId}
        />
      </aside>

      <div className="grid min-w-0 content-start gap-5">
        <header className="grid gap-1">
          <p className="text-sm text-muted">{`Lesson ${index + 1} of ${orderedVideos.length}`}</p>
          <h1 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight">{lesson.title}</h1>
          {lesson.description && <p className="text-[15px] text-muted">{lesson.description}</p>}
        </header>

        {!userId && (
          <p className="rounded-md bg-xp-soft px-4 py-3 text-[15px] text-xp">
            Sign in to save your place, your notes and your practice.
          </p>
        )}

        <Classroom
          lesson={{
            id: lesson.id,
            url: lesson.url,
            title: lesson.title,
            duration: lesson.duration,
            captionsLang: lesson.captionsLang,
            tryTask: lesson.tryTask,
          }}
          startAt={startAt}
          isSignedIn={Boolean(userId)}
          initialWatched={Boolean(progress?.completed)}
          initialTriedAt={progress?.triedAt ? progress.triedAt.toISOString() : null}
          myMakes={myMakes}
        />

        <LessonTabs
          videoId={lesson.id}
          transcript={lesson.transcript}
          initialNote={note?.content || ''}
          isSignedIn={Boolean(userId)}
          showSandbox={pathway.skill?.id === 'software-engineering'}
        />

        <nav aria-label="Lesson navigation" className="flex flex-wrap justify-between gap-3">
          {prev ? (
            <Button href={`/pathways/${pathwayId}/learn/${prev.id}`} variant="ghost" size="sm">
              {`← ${prev.title}`}
            </Button>
          ) : <span />}
          {next ? (
            <Button href={`/pathways/${pathwayId}/learn/${next.id}`} size="sm">
              {`${next.title} →`}
            </Button>
          ) : (
            <Button href="/" size="sm">Back to your workbench</Button>
          )}
        </nav>
      </div>
    </div>
  );
}
