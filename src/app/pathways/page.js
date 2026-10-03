import React from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { getPathwayOverviews } from '../../lib/course';
import PathwayCard from '../../components/home/PathwayCard';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pathways · LearnTube' };

export default async function PathwaysPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const pathways = await getPathwayOverviews(userId);

  return (
    <div className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Pathways</h1>
        <p className="max-w-[60ch] text-lg text-muted">
          Short, ordered lessons that end with something you made.
          Pick one and start with lesson one.
        </p>
      </header>
      {pathways.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((p) => <PathwayCard key={p.id} pathway={p} signedIn={Boolean(userId)} />)}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-line px-5 py-10 text-center text-muted">
          No pathways yet. Check back soon.
        </p>
      )}
    </div>
  );
}
