'use server';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../../lib/auth';
import prisma from '../../../../../lib/prismadb';
import { getPathwayWithUnits, getProgressByVideoId } from '../../../../../lib/course';
import CourseSidebar from '../../../../../components/course/CourseSidebar';
import LessonPlayer from '../../../../../components/course/LessonPlayer';
import LessonTabs from '../../../../../components/course/LessonTabs';

export default async function LessonPage({ params }) {
  const { pathwayId, videoId } = params;

  const data = await getPathwayWithUnits(pathwayId);
  if (!data) notFound();

  const {
    pathway, units, unassignedVideos, orderedVideos,
  } = data;
  const video = orderedVideos.find((v) => v.id === videoId);
  if (!video) notFound();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const progressByVideoId = await getProgressByVideoId(userId, orderedVideos.map((v) => v.id));

  let initialNote = '';
  if (userId) {
    const note = await prisma.note.findUnique({
      where: { userId_videoId: { userId, videoId } },
    });
    initialNote = note?.content || '';
  }

  const index = orderedVideos.findIndex((v) => v.id === videoId);
  const prevVideo = index > 0 ? orderedVideos[index - 1] : null;
  const nextVideo = index < orderedVideos.length - 1 ? orderedVideos[index + 1] : null;
  const startAt = progressByVideoId[videoId]?.completed
    ? 0
    : (progressByVideoId[videoId]?.stoppedAt || 0);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-6 lg:h-fit lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
        <CourseSidebar
          pathway={pathway}
          units={units}
          unassignedVideos={unassignedVideos}
          activeVideoId={videoId}
          progressByVideoId={progressByVideoId}
        />
      </aside>

      <div className="min-w-0">
        <LessonPlayer video={video} startAt={startAt} isSignedIn={Boolean(userId)} />

        <div className="mt-4 flex flex-col gap-1">
          <h1 className="text-xl font-semibold">{video.title}</h1>
          {video.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
          )}
        </div>

        {!userId && (
          <p className="mt-3 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
            Sign in to save your progress and notes for this course.
          </p>
        )}

        <LessonTabs
          videoId={video.id}
          transcript={video.transcript}
          initialNote={initialNote}
          isSignedIn={Boolean(userId)}
        />

        <div className="mt-6 flex items-center justify-between">
          {prevVideo ? (
            <Link
              href={`/pathways/${pathwayId}/learn/${prevVideo.id}`}
              className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium dark:bg-slate-700"
            >
              {'← '}
              {prevVideo.title}
            </Link>
          ) : <span />}

          {nextVideo ? (
            <Link
              href={`/pathways/${pathwayId}/learn/${nextVideo.id}`}
              className="rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-black hover:bg-red-500"
            >
              {nextVideo.title}
              {' →'}
            </Link>
          ) : (
            <Link
              href="/pathways"
              className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-500"
            >
              Finish course
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
