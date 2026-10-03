import React from 'react';
import Image from 'next/image';
import KudosButton from './KudosButton';

function firstName(name) {
  return (name || 'A learner').split(' ')[0];
}

export default function MakeCard({ make }) {
  const where = make.lesson?.title || make.pathway?.title;
  return (
    <article className="grid min-w-0 overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-[4/3] max-w-full bg-sunken">
        {make.imageUrl ? (
          <Image
            src={make.imageUrl}
            alt={make.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center"
            style={{ background: `${make.skill?.color || '#55616C'}22` }}
          >
            <span className="h-10 w-10 rounded-md" style={{ background: make.skill?.color || '#55616C' }} />
          </div>
        )}
      </div>
      <div className="grid gap-1 p-3">
        <h3 className="truncate font-sans text-[15px] font-bold">{make.title}</h3>
        <p className="truncate text-sm text-muted">
          {make.isMine ? 'You' : firstName(make.author.name)}
          {where && ` · ${where}`}
        </p>
        <KudosButton
          makeId={make.id}
          initialCount={make.kudosCount}
          initialGave={make.gaveKudos}
          isMine={make.isMine}
        />
      </div>
    </article>
  );
}
