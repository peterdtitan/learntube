'use server';

import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { formatDuration } from '../../lib/youtube';

export default async function PathwaysPage() {
  const session = await getServerSession(authOptions);

  const pathways = await prisma.pathway.findMany({
    include: {
      units: { include: { videos: true } },
      videos: { where: { unitId: null } },
    },
  });

  let progressByVideoId = {};
  if (session?.user?.id) {
    const progress = await prisma.videoProgress.findMany({
      where: { userId: session.user.id },
    });
    progressByVideoId = Object.fromEntries(progress.map((p) => [p.videoId, p]));
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Pathways</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Structured, unit-by-unit courses built from bite-sized videos.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pathways.map((pw) => {
          const videos = [...pw.units.flatMap((u) => u.videos), ...pw.videos];
          const totalDuration = videos.reduce((sum, v) => sum + v.duration, 0);
          const completedCount = videos.filter((v) => progressByVideoId[v.id]?.completed).length;
          const percent = videos.length ? Math.round((completedCount / videos.length) * 100) : 0;
          const started = completedCount > 0 || videos.some((v) => progressByVideoId[v.id]);

          return (
            <Link
              key={pw.id}
              href={`/pathways/${pw.id}`}
              className="flex flex-col gap-2 rounded-lg bg-white/80 p-4 shadow-sm transition-transform hover:-translate-y-0.5 dark:bg-gray-800/80"
            >
              {pw.category && (
                <span className="w-fit rounded-full bg-red-400/10 px-2 py-0.5 text-xs font-medium text-red-500">
                  {pw.category}
                </span>
              )}
              <div className="font-semibold text-lg">{pw.title}</div>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{pw.description}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {videos.length}
                {' lessons · '}
                {formatDuration(totalDuration)}
              </p>

              {session?.user && (
                <div className="mt-1">
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {started ? `${percent}% complete` : 'Not started'}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {pathways.length === 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-300">No pathways available yet.</p>
      )}
    </div>
  );
}
