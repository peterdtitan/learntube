import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { getMake } from '../../../lib/makes';
import { COMMENT_PRESETS } from '../../../lib/comments';
import KudosButton from '../../../components/makes/KudosButton';
import CommentThread from '../../../components/community/CommentThread';

export const dynamic = 'force-dynamic';

export default async function MakePage({ params }) {
  const session = await getServerSession(authOptions);
  const viewerId = session?.user?.id || null;
  const make = await getMake(params.makeId, viewerId);
  if (!make) notFound();

  const when = new Date(make.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <article className="mx-auto grid max-w-3xl gap-6">
      <Link href="/makes" className="text-sm text-muted hover:text-ink">← All makes</Link>

      <div className="relative aspect-[4/3] max-w-full overflow-hidden rounded-lg border border-line bg-sunken">
        {make.imageUrl ? (
          <Image
            src={make.imageUrl}
            alt={make.title}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center" style={{ background: `${make.skill?.color || '#55616C'}22` }}>
            <span className="h-16 w-16 rounded-lg" style={{ background: make.skill?.color || '#55616C' }} />
          </div>
        )}
      </div>

      <header className="grid gap-2">
        <h1 className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-tight">{make.title}</h1>
        <p className="text-[15px] text-muted">
          {make.isMine ? 'You' : (
            <Link href={`/learners/${make.author.id}`} className="font-bold text-ink hover:text-accent">{make.author.name || 'A learner'}</Link>
          )}
          {make.lesson && make.pathwayId && (
            <>
              {' · from '}
              <Link href={`/pathways/${make.pathwayId}/learn/${make.lesson.id}`} className="hover:text-ink">{make.lesson.title}</Link>
            </>
          )}
          {` · ${when}`}
        </p>
      </header>

      {make.note && <p className="max-w-[65ch] whitespace-pre-wrap text-[17px] leading-relaxed">{make.note}</p>}

      <div>
        <KudosButton
          makeId={make.id}
          initialCount={make.kudosCount}
          initialGave={make.gaveKudos}
          isMine={make.isMine}
        />
      </div>

      <div className="border-t border-line pt-6">
        <CommentThread makeId={make.id} initialComments={make.comments} presets={COMMENT_PRESETS} />
      </div>
    </article>
  );
}
