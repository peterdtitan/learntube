import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { Search } from 'lucide-react';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { getPathwayOverviews } from '../../lib/course';
import PathwayCard from '../../components/home/PathwayCard';
import cn from '../../lib/cn';
import SkillIcon from '../../components/ui/SkillIcon';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Pathways · LearnTube' };

const MAX_QUERY = 80;

function chipHref(q, skillId) {
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (skillId) params.set('skill', skillId);
  const query = params.toString();
  return query ? `/pathways?${query}` : '/pathways';
}

export default async function PathwaysPage({ searchParams = {} }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const q = String(searchParams.q || '').trim().slice(0, MAX_QUERY);

  const skills = await prisma.skill.findMany({
    where: { pathways: { some: { kind: 'COURSE' } } },
    orderBy: { order: 'asc' },
    select: { id: true, name: true, color: true },
  });
  const skill = skills.find((s) => s.id === searchParams.skill) || null;
  const pathways = await getPathwayOverviews(userId, { q, skillId: skill?.id, kind: 'COURSE' });
  const searching = Boolean(q || skill);
  // Courses that belong to a program, grouped so the program can be shown first.
  const tracks = Object.values(pathways.reduce((acc, p) => {
    if (!p.track) return acc;
    acc[p.track.slug] = acc[p.track.slug]
      || { slug: p.track.slug, title: p.track.title, items: [] };
    acc[p.track.slug].items.push(p);
    return acc;
  }, {})).map((t) => ({
    ...t, courses: [...t.items].sort((a, b) => a.track.order - b.track.order).map((p) => p.title),
  }));

  let summary = `${pathways.length} ${pathways.length === 1 ? 'pathway' : 'pathways'}`;
  if (q) summary += ` matching “${q}”`;
  if (skill) summary += ` in ${skill.name}`;

  return (
    <div className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Pathways</h1>
        <p className="max-w-[60ch] text-lg text-muted">
          Short, ordered lessons that end with something you made.
          Pick one and start with lesson one.
        </p>
      </header>

      <div className="grid gap-3">
        <form action="/pathways" role="search" className="flex max-w-xl gap-2">
          {skill && <input type="hidden" name="skill" value={skill.id} />}
          <label htmlFor="pathway-search" className="sr-only">Search pathways</label>
          <div className="relative flex-1">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="pathway-search"
              type="search"
              name="q"
              defaultValue={q}
              maxLength={MAX_QUERY}
              placeholder="Try “bread”, “crochet” or “python”"
              className="h-11 w-full rounded-pill border border-line bg-surface pl-10 pr-4 text-[15px] placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>
          <button type="submit" className="h-11 rounded-pill bg-accent px-5 text-[15px] font-bold text-on-accent">Search</button>
        </form>

        {skills.length > 1 && (
          <nav aria-label="Filter by skill" className="flex flex-wrap gap-2">
            {[{ id: null, name: 'All skills' }, ...skills].map((s) => {
              const active = (skill?.id || null) === s.id;
              return (
                <Link
                  key={s.id || 'all'}
                  href={chipHref(q, s.id)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-sm',
                    active ? 'border-accent bg-accent-soft font-bold text-accent' : 'border-line text-muted hover:text-ink',
                  )}
                >
                  <SkillIcon skill={s} />
                  {s.name}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {searching && (
        <p className="flex flex-wrap items-baseline gap-x-3 text-[15px] text-muted" role="status">
          {summary}
          <Link href="/pathways" className="font-bold text-accent">Clear</Link>
        </p>
      )}

      {!searching && tracks.length > 0 && (
        <section aria-labelledby="programs-heading" className="grid gap-3">
          <h2 id="programs-heading" className="text-sm font-bold uppercase tracking-widest text-muted">Programs</h2>
          {tracks.map((t) => (
            <Link key={t.slug} href={`/tracks/${t.slug}`} className="grid gap-1 rounded-lg border border-line bg-surface p-5 hover:border-accent">
              <span className="text-2xl font-bold">{t.title}</span>
              <span className="text-[15px] text-muted">{`${t.courses.length} courses: ${t.courses.join(' → ')}`}</span>
            </Link>
          ))}
        </section>
      )}

      {pathways.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {pathways.map((p) => <PathwayCard key={p.id} pathway={p} signedIn={Boolean(userId)} />)}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-line px-5 py-10 text-center text-muted">
          {searching
            ? 'No pathways match that yet. Try a shorter word, or another skill.'
            : 'No pathways yet. Check back soon.'}
        </p>
      )}
    </div>
  );
}
