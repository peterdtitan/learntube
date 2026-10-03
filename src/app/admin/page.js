import React from 'react';
import Link from 'next/link';
import prisma from '../../lib/prismadb';
import Button from '../../components/ui/Button';
import { formatDuration } from '../../lib/youtube';

export default async function AdminHome() {
  const pathways = await prisma.pathway.findMany({
    orderBy: { title: 'asc' },
    include: {
      skill: { select: { name: true, color: true } },
      units: { select: { videos: { select: { duration: true } } } },
    },
  });

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Pathways</h1>
        <Button href="/admin/pathways/new" size="sm">New pathway</Button>
      </div>
      <ul className="grid gap-2">
        {pathways.map((p) => {
          const lessons = p.units.flatMap((u) => u.videos);
          return (
            <li key={p.id}>
              <Link href={`/admin/pathways/${p.id}`} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-surface px-4 py-3 hover:border-accent">
                <span className="flex items-center gap-2 font-bold">
                  <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: p.skill?.color || '#9AA6B1' }} />
                  {p.title}
                </span>
                <span className="text-sm text-muted tabular-nums">
                  {`${p.skill?.name || 'No skill'} · ${p.units.length} units · ${lessons.length} lessons · ${formatDuration(lessons.reduce((s, v) => s + v.duration, 0))}`}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {!pathways.length && <p className="text-muted">No pathways yet. Create the first one.</p>}
    </div>
  );
}
