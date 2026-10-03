import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { listMakes } from '../../lib/makes';
import MakeCard from '../../components/makes/MakeCard';
import Button from '../../components/ui/Button';
import cn from '../../lib/cn';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Makes · LearnTube' };

export default async function MakesPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const scope = searchParams?.view === 'mine' && userId ? 'mine' : 'recent';
  const makes = await listMakes({ viewerId: userId, scope, limit: 48 });

  const tabs = [
    { id: 'recent', label: 'Everyone', href: '/makes' },
    ...(userId ? [{ id: 'mine', label: 'Mine', href: '/makes?view=mine' }] : []),
  ];

  return (
    <div className="grid gap-6">
      <header className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Makes</h1>
        <p className="max-w-[60ch] text-lg text-muted">
          What learners made after each lesson. Give kudos to anything that took effort.
        </p>
      </header>

      <nav aria-label="Whose makes" className="flex gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            aria-current={scope === tab.id ? 'page' : undefined}
            className={cn(
              'rounded-pill border px-4 py-1.5 text-sm font-bold',
              scope === tab.id
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line text-muted hover:text-ink',
            )}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {makes.length ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {makes.map((m) => <MakeCard key={m.id} make={m} />)}
        </div>
      ) : (
        <div className="grid justify-items-center gap-3 rounded-lg border border-dashed border-line px-5 py-12 text-center">
          <p className="text-lg font-bold">
            {scope === 'mine' ? 'You haven’t logged a make yet.' : 'No makes yet.'}
          </p>
          <p className="max-w-[45ch] text-muted">
            At the end of each lesson there&apos;s a Log step.
            Add a title and a photo of what you made and it shows up here.
          </p>
          <Button href="/pathways" size="sm">Find a lesson</Button>
        </div>
      )}
    </div>
  );
}
