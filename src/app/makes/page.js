import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { listMakes } from '../../lib/makes';
import { getFollowingFeed } from '../../lib/social';
import MakeCard from '../../components/makes/MakeCard';
import MilestoneCard from '../../components/community/MilestoneCard';
import Button from '../../components/ui/Button';
import cn from '../../lib/cn';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Makes · LearnTube' };

function Empty({ title, body, action }) {
  return (
    <div className="grid justify-items-center gap-3 rounded-lg border border-dashed border-line px-5 py-12 text-center">
      <p className="text-lg font-bold">{title}</p>
      <p className="max-w-[45ch] text-muted">{body}</p>
      {action}
    </div>
  );
}

function FollowingFeed({ feed }) {
  if (!feed.following) {
    return (
      <Empty
        title="You’re not following anyone yet."
        body="Open any learner’s name on a make to see their profile and follow them. Their makes and milestones will show up here."
        action={<Button href="/makes" size="sm">Browse everyone’s makes</Button>}
      />
    );
  }
  if (!feed.items.length) {
    return <Empty title="Nothing new yet." body="When people you follow log makes or hit milestones, they’ll appear here." />;
  }
  return (
    <div className="mx-auto grid w-full max-w-2xl gap-4">
      {feed.items.map((item) => (item.type === 'milestone'
        ? <MilestoneCard key={`m-${item.id}`} milestone={item} />
        : <MakeCard key={`k-${item.id}`} make={item} compact />))}
    </div>
  );
}

export default async function MakesPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const requested = searchParams?.view;
  const view = userId && ['mine', 'following'].includes(requested) ? requested : 'recent';

  const tabs = [
    { id: 'recent', label: 'Everyone', href: '/makes' },
    ...(userId ? [
      { id: 'following', label: 'Following', href: '/makes?view=following' },
      { id: 'mine', label: 'Mine', href: '/makes?view=mine' },
    ] : []),
  ];

  const feed = view === 'following' ? await getFollowingFeed(userId) : null;
  const makes = view === 'following' ? [] : await listMakes({ viewerId: userId, scope: view, limit: 48 });

  return (
    <div className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Makes</h1>
        <p className="max-w-[60ch] text-lg text-muted">
          What learners made after each lesson. Give kudos, leave a kind word, and cheer people on.
        </p>
      </header>

      <nav aria-label="Whose makes" className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={view === tab.id ? 'page' : undefined}
            className={cn(
              'rounded-pill border px-4 py-1.5 text-sm font-bold',
              view === tab.id
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line text-muted hover:text-ink',
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {view === 'following' && <FollowingFeed feed={feed} />}
      {view !== 'following' && (makes.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {makes.map((m) => <MakeCard key={m.id} make={m} />)}
        </div>
      ) : (
        <Empty
          title={view === 'mine' ? 'You haven’t logged a make yet.' : 'No makes yet.'}
          body="At the end of each lesson there’s a Log step. Add a title and a photo of what you made and it shows up here."
          action={<Button href="/pathways" size="sm">Find a lesson</Button>}
        />
      ))}
    </div>
  );
}
