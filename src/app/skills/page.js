import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { ArrowRight } from 'lucide-react';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { getShortSkills, learnToPhrase } from '../../lib/skills';
import Typewriter from '../../components/skills/Typewriter';
import SkillsBrowser from '../../components/skills/SkillsBrowser';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Skills · LearnTube' };

export default async function SkillsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const [skills, tracks] = await Promise.all([
    getShortSkills(userId),
    prisma.track.findMany({
      where: { pathways: { some: {} } },
      select: {
        slug: true, title: true, description: true, _count: { select: { pathways: true } },
      },
    }),
  ]);
  const phrases = [
    ...skills.map((s) => learnToPhrase(s.title)),
    ...tracks.map((t) => `become a ${t.title}`),
  ];

  return (
    <div className="grid gap-10">
      <header className="grid gap-4 pt-2">
        <h1 className="min-h-[2.1em] text-[clamp(2.25rem,5.4vw,3.75rem)] font-bold leading-[1.05] sm:min-h-[1.1em]">
          Learn to
          {' '}
          <Typewriter phrases={phrases} />
        </h1>
        <p className="max-w-[60ch] text-lg leading-relaxed text-muted">
          Short skills you can pick up in a few weeks. Each one takes under 15 hours, uses the best
          free videos on YouTube, and ends with something you made.
        </p>
      </header>

      {skills.length ? (
        <SkillsBrowser skills={skills} signedIn={Boolean(userId)} />
      ) : (
        <p className="rounded-lg border border-dashed border-line px-5 py-8 text-center text-muted">
          Skills are on their way. Check back soon.
        </p>
      )}

      {tracks.length > 0 && (
        <section aria-labelledby="further-heading" className="grid gap-4 border-t border-line pt-8">
          <div className="grid gap-1">
            <h2 id="further-heading" className="text-2xl font-bold">Ready to go further?</h2>
            <p className="text-muted">Programs string longer courses together, all the way to a certification.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((t) => (
              <Link key={t.slug} href={`/tracks/${t.slug}`} className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface p-5 hover:border-accent">
                <span className="grid gap-1">
                  <span className="text-xl font-bold">{t.title}</span>
                  <span className="text-sm text-muted">{`${t._count.pathways} courses, taken in order`}</span>
                </span>
                <ArrowRight size={20} className="shrink-0 text-accent" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
