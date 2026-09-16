'use server';

import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { formatDuration } from '../../lib/youtube';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const pathways = await prisma.pathway.findMany({
    include: {
      units: { include: { videos: true } },
      videos: { where: { unitId: null } },
    },
  });

  let progressByVideoId = {};
  let recentProgress = [];
  if (session?.user?.id) {
    const progress = await prisma.videoProgress.findMany({
      where: { userId: session.user.id },
      include: { video: { include: { unit: true } } },
      orderBy: { watchedAt: 'desc' },
    });
    progressByVideoId = Object.fromEntries(progress.map((p) => [p.videoId, p]));
    recentProgress = progress.slice(0, 5);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-2">Continue Learning</h2>
        {!session?.user && (
          <p className="text-sm text-gray-600 dark:text-gray-300">Sign in to see your progress.</p>
        )}
        {session?.user && recentProgress.length === 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            No progress tracked yet — jump into a pathway below.
          </p>
        )}
        {session?.user && recentProgress.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {recentProgress.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/pathways/${p.video.pathwayId ?? p.video.unit?.pathwayId}/learn/${p.video.id}`}
                  className="block rounded-md bg-white/80 p-3 shadow-sm dark:bg-gray-800/80"
                >
                  <div className="font-semibold">{p.video.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {p.completed ? 'Completed' : `Stopped at ${formatDuration(p.stoppedAt)}`}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(p.watchedAt).toLocaleString()}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Available Pathways</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((pw) => {
            const videos = [...pw.units.flatMap((u) => u.videos), ...pw.videos];
            const completedCount = videos.filter((v) => progressByVideoId[v.id]?.completed).length;
            const percent = videos.length ? Math.round((completedCount / videos.length) * 100) : 0;

            return (
              <Link
                key={pw.id}
                href={`/pathways/${pw.id}`}
                className="block p-4 bg-white/80 dark:bg-gray-800/80 rounded"
              >
                <div className="font-semibold text-lg">{pw.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{pw.description}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {videos.length}
                  {' '}
                  lessons
                </p>
                {session?.user && (
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${percent}%` }} />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
