import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { getLeaderboard } from '../../lib/leaderboard';
import ScopePicker from './ScopePicker';
import cn from '../../lib/cn';
import { initials } from '../../lib/people';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Leaderboard · LearnTube' };

function Tabs({ label, current, options }) {
  return (
    <nav aria-label={label} className="flex rounded-pill border border-line bg-surface p-1">
      {options.map((o) => (
        <Link
          key={o.id}
          href={o.href}
          aria-current={current === o.id ? 'page' : undefined}
          className={cn(
            'rounded-pill px-4 py-1.5 text-sm font-bold',
            current === o.id ? 'bg-accent text-on-accent' : 'text-muted hover:text-ink',
          )}
        >
          {o.label}
        </Link>
      ))}
    </nav>
  );
}

function Row({ entry }) {
  return (
    <li className={cn('flex items-center gap-4 rounded-md px-4 py-3', entry.isViewer ? 'bg-accent-soft' : 'odd:bg-canvas')}>
      <span className="w-8 text-right font-display text-lg font-bold tabular-nums text-muted">{entry.rank}</span>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sunken text-sm font-bold">{initials(entry.name)}</span>
      <Link href={`/learners/${entry.userId}`} className="flex-1 truncate text-[15px] font-bold hover:text-accent">
        {entry.isViewer ? `${entry.name} (you)` : entry.name}
      </Link>
      <span className="font-bold tabular-nums text-xp">{`${entry.xp.toLocaleString('en')} XP`}</span>
    </li>
  );
}

export default async function LeaderboardPage({ searchParams = {} }) {
  const session = await getServerSession(authOptions);
  const viewerId = session?.user?.id || null;

  const period = searchParams.period === 'all' ? 'all' : 'week';
  const audience = searchParams.audience === 'following' && viewerId ? 'following' : 'everyone';
  const [scopeType, scopeId] = (searchParams.scope || '').split(':');
  const filter = ['skill', 'pathway'].includes(scopeType) && scopeId ? { type: scopeType, id: scopeId } : { type: 'all' };

  const [board, skills] = await Promise.all([
    getLeaderboard({
      viewerId, filter, period, audience,
    }),
    prisma.skill.findMany({
      where: { pathways: { some: {} } },
      orderBy: { order: 'asc' },
      select: { id: true, name: true, pathways: { select: { id: true, title: true }, orderBy: { title: 'asc' } } },
    }),
  ]);

  const scopeValue = filter.type === 'all' ? 'all' : `${filter.type}:${filter.id}`;
  const scopeLabel = filter.type === 'skill'
    ? skills.find((s) => s.id === filter.id)?.name
    : skills.flatMap((s) => s.pathways).find((p) => p.id === filter.id)?.title;
  const link = (overrides) => {
    const params = new URLSearchParams({ period, audience, ...overrides });
    if (scopeValue !== 'all') params.set('scope', scopeValue);
    return `/leaderboard?${params}`;
  };
  const viewerOutsideTop = board.viewer && !board.entries.some((e) => e.isViewer);

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <header className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Leaderboard</h1>
        <p className="text-lg text-muted">
          {period === 'week'
            ? 'Who practised most this week. It resets every Monday, so everyone gets a fresh start.'
            : 'Total XP since each learner joined.'}
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs
          label="Time period"
          current={period}
          options={[
            { id: 'week', label: 'This week', href: link({ period: 'week' }) },
            { id: 'all', label: 'All time', href: link({ period: 'all' }) },
          ]}
        />
        {viewerId && (
          <Tabs
            label="Who to include"
            current={audience}
            options={[
              { id: 'everyone', label: 'Everyone', href: link({ audience: 'everyone' }) },
              { id: 'following', label: 'Following', href: link({ audience: 'following' }) },
            ]}
          />
        )}
      </div>
      <ScopePicker
        value={scopeValue}
        groups={skills.map((s) => ({ skill: s, pathways: s.pathways }))}
        period={period}
        audience={audience}
      />

      {board.entries.length ? (
        <ol className="grid gap-1" aria-label={`Leaderboard${scopeLabel ? ` for ${scopeLabel}` : ''}`}>
          {board.entries.map((e) => <Row key={e.userId} entry={e} />)}
        </ol>
      ) : (
        <p className="rounded-lg border border-dashed border-line px-5 py-10 text-center text-muted">
          {`No XP earned ${period === 'week' ? 'this week ' : ''}${scopeLabel ? `in ${scopeLabel} ` : ''}yet${audience === 'following' ? ' by you or people you follow' : ''}. Finish a Try step to get on the board.`}
        </p>
      )}

      {viewerOutsideTop && (
        <ol className="grid gap-1 border-t border-line pt-3" aria-label="Your position">
          <Row entry={{ ...board.viewer, isViewer: true }} />
        </ol>
      )}
      {board.viewerHidden && (
        <p className="text-sm text-muted">
          You’re hidden from leaderboards.
          {' '}
          <Link href="/dashboard" className="font-bold text-accent">Change this on your dashboard</Link>
        </p>
      )}
    </div>
  );
}
