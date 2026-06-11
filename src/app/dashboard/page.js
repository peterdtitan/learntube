'use server';

import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const pathways = await prisma.pathway.findMany({ include: { videos: true } });

  let recentProgress = [];
  if (session?.user?.id) {
    recentProgress = await prisma.videoProgress.findMany({
      where: { userId: session.user.id },
      include: { video: true },
      orderBy: { watchedAt: 'desc' },
      take: 10,
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-medium mb-2">Your Recent Progress</h2>
        {session?.user ? (
          recentProgress.length ? (
            <ul className="space-y-3">
              {recentProgress.map((p) => (
                <li key={p.id} className="p-3 bg-white/80 dark:bg-gray-800/80 rounded shadow-sm">
                  <div className="font-semibold">{p.video.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Stopped at: {Math.floor(p.stoppedAt)}s</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Watched on: {new Date(p.watchedAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-300">No progress tracked yet.</p>
          )
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">Sign in to see your progress.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Available Pathways</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((pw) => (
            <div key={pw.id} className="p-4 bg-white/80 dark:bg-gray-800/80 rounded">
              <div className="font-semibold text-lg">{pw.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{pw.description}</div>
              <ul className="text-sm">
                {pw.videos.map((v) => (
                  <li key={v.id} className="py-1">{v.title} — {Math.floor(v.duration)}s</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
