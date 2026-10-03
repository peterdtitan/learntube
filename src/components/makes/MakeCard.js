import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import KudosButton from './KudosButton';
import cn from '../../lib/cn';

// compact: a horizontal row for feeds, where a full-width photo would crowd out everything else.
export default function MakeCard({ make, compact = false }) {
  const where = make.lesson?.title || make.pathway?.title;
  const href = `/makes/${make.id}`;
  return (
    <article
      className={cn(
        'grid min-w-0 overflow-hidden rounded-lg border border-line bg-surface',
        compact && 'grid-cols-[112px_minmax(0,1fr)] items-center sm:grid-cols-[148px_minmax(0,1fr)]',
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cn('relative block max-w-full bg-sunken', compact ? 'aspect-square h-full' : 'aspect-[4/3]')}
      >
        {make.imageUrl ? (
          <Image
            src={make.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span
            className="absolute inset-0 grid place-items-center"
            style={{ background: `${make.skill?.color || '#55616C'}22` }}
          >
            <span className="h-10 w-10 rounded-md" style={{ background: make.skill?.color || '#55616C' }} />
          </span>
        )}
      </Link>
      <div className="grid gap-1 p-3">
        <h3 className="truncate font-sans text-[15px] font-bold">
          <Link href={href} className="hover:text-accent">{make.title}</Link>
        </h3>
        <p className="truncate text-sm text-muted">
          {make.isMine ? 'You' : (
            <Link href={`/learners/${make.author.id}`} className="hover:text-ink">{make.author.name}</Link>
          )}
          {where && ` · ${where}`}
        </p>
        <div className="flex items-center gap-1">
          <KudosButton
            makeId={make.id}
            initialCount={make.kudosCount}
            initialGave={make.gaveKudos}
            isMine={make.isMine}
          />
          <Link
            href={`${href}#comments-heading`}
            className="inline-flex items-center gap-1.5 rounded-pill px-2 py-1 text-sm font-bold tabular-nums text-muted hover:text-ink"
            aria-label={`${make.commentCount} comments`}
          >
            <MessageCircle size={16} />
            {make.commentCount}
          </Link>
        </div>
      </div>
    </article>
  );
}
