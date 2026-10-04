import React from 'react';
import Link from 'next/link';
import prisma from '../../lib/prismadb';
import Button from '../../components/ui/Button';
import { formatDuration } from '../../lib/youtube';
import ConfirmButton from '../../components/admin/ConfirmButton';
import LibraryImport from '../../components/admin/LibraryImport';
import { demoContentCount } from '../../lib/content/importPathway';
import { importLibrarySkills, importLibraryTrack, removeDemo } from './content/actions';
import shortSkills from '../../../content/skills';

// Imports can take a while on a cold database.
export const maxDuration = 60;

export default async function AdminHome() {
  const [demoCount, skillCount, track] = await Promise.all([
    demoContentCount(),
    prisma.pathway.count({ where: { kind: 'SKILL', slug: { in: shortSkills.map((s) => s.slug) } } }),
    prisma.track.findUnique({
      where: { slug: 'cybersecurity-expert' },
      include: { _count: { select: { pathways: true } } },
    }),
  ]);
  const pathways = await prisma.pathway.findMany({
    orderBy: { title: 'asc' },
    include: {
      skill: { select: { name: true, color: true } },
      units: { select: { videos: { select: { duration: true } } } },
    },
  });

  return (
    <div className="grid gap-10">
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

      <section className="grid gap-4 rounded-lg border border-line bg-surface p-5" aria-labelledby="library-heading">
        <h2 id="library-heading" className="text-xl font-bold">Content library</h2>
        <div className="grid gap-2">
          <p className="font-bold">Cybersecurity Expert</p>
          <p className="text-[15px] text-muted">
            Three courses (IT Foundations, Networking, Security Operations) for CompTIA A+, Network+
            and Security+: 470 lessons of 10 minutes or less, with Try tasks, quick checks, timed
            checkpoints and games. Safe to run again: existing courses are left alone.
          </p>
          {track && <p className="text-sm text-accent">{`Imported: ${track._count.pathways} of 3 courses.`}</p>}
          <LibraryImport action={importLibraryTrack} slug="cybersecurity-expert" imported={Boolean(track)} />
        </div>
        <div className="grid gap-2 border-t border-line pt-4">
          <p className="font-bold">Short skills</p>
          <p className="text-[15px] text-muted">
            {`${shortSkills.length} skills you can pick up in under 15 hours: ${shortSkills.map((s) => s.title).join(' · ')}.`}
          </p>
          {skillCount > 0 && <p className="text-sm text-accent">{`Imported: ${skillCount} of ${shortSkills.length} skills.`}</p>}
          <LibraryImport
            action={importLibrarySkills}
            slug="skills"
            imported={skillCount > 0}
            label="Import short skills"
            againLabel="Import any missing skills"
          />
        </div>
        {demoCount > 0 && (
          <form action={removeDemo} className="grid gap-2 border-t border-line pt-4">
            <p className="text-[15px]">{`${demoCount} sample pathways from the original demo seed are still here, with placeholder videos. Remove them before going live.`}</p>
            <ConfirmButton label="Remove demo pathways" confirmLabel="Click again to remove them and their progress" className="justify-self-start" />
          </form>
        )}
      </section>
    </div>
  );
}
