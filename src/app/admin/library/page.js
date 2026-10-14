import React from 'react';
import Link from 'next/link';
import prisma from '../../../lib/prismadb';
import ConfirmButton from '../../../components/admin/ConfirmButton';
import LibraryImport from '../../../components/admin/LibraryImport';
import { demoContentCount, syncExams } from '../../../lib/content/importPathway';
import { libraryExamPlans, shortSkills } from '../../../lib/content/library';
import {
  importLibrarySkills, importLibraryTrack, removeDemo, updateLibraryExams,
} from '../content/actions';

// Imports can take a while on a cold database.
export const maxDuration = 60;

function Panel({ title, children }) {
  return (
    <section className="grid gap-3 rounded-lg border border-line bg-surface p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default async function AdminLibrary() {
  const [demoCount, skillCount, track, pending] = await Promise.all([
    demoContentCount(),
    prisma.pathway.count({ where: { kind: 'SKILL', slug: { in: shortSkills.map((s) => s.slug) } } }),
    prisma.track.findUnique({
      where: { slug: 'cybersecurity-expert' },
      include: { _count: { select: { pathways: true } } },
    }),
    // What "Update module exams" would do right now, without doing it.
    syncExams(libraryExamPlans(), { dryRun: true }),
  ]);
  const upToDate = pending.added === 0 && pending.created === 0;

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Content library</h1>
        <p className="max-w-2xl text-[15px] text-muted">
          Courses, skills and exams that ship with the app. Importing is safe to run again:
          anything already here is left alone.
        </p>
      </div>

      <Panel title="Module exams">
        <p className="text-[15px] text-muted">
          Adds new exam questions from the library to courses and skills you’ve already imported,
          and sets each exam’s time and questions per attempt. Existing questions, your edits and
          learners’ results are never touched. New exams arrive as drafts.
        </p>
        <p role="status" className={upToDate ? 'text-[15px] text-accent' : 'text-[15px] font-bold text-xp'}>
          {upToDate
            ? `Up to date: ${pending.exams} imported exams have every library question.`
            : `Ready to add ${pending.added} questions across ${pending.exams} exams${pending.created ? `, including ${pending.created} new exams` : ''}.`}
        </p>
        {pending.skipped.length > 0 && (
          <p className="text-sm text-muted">{`Renamed modules are skipped: ${pending.skipped.join('; ')}.`}</p>
        )}
        <LibraryImport
          action={updateLibraryExams}
          slug="exams"
          imported
          againLabel="Update module exams"
          publishOption={false}
          pendingText="Updating…"
        />
        <p className="text-sm">
          {'Then publish the drafts from '}
          <Link href="/admin/quizzes?kind=CHECKPOINT&status=draft" className="font-bold text-accent hover:underline">Exams & quizzes</Link>
          .
        </p>
      </Panel>

      <Panel title="Cybersecurity Expert">
        <p className="text-[15px] text-muted">
          Three courses (IT Foundations, Networking, Security Operations) for CompTIA A+, Network+
          and Security+: 470 lessons of 10 minutes or less, with Try tasks, quick checks, timed
          module exams and games.
        </p>
        {track && <p className="text-sm text-accent">{`Imported: ${track._count.pathways} of 3 courses.`}</p>}
        <LibraryImport action={importLibraryTrack} slug="cybersecurity-expert" imported={Boolean(track)} />
      </Panel>

      <Panel title="Short skills">
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
      </Panel>

      {demoCount > 0 && (
        <Panel title="Demo content">
          <form action={removeDemo} className="grid gap-3">
            <p className="text-[15px]">{`${demoCount} sample pathways from the original demo seed are still here, with placeholder videos. Remove them before going live.`}</p>
            <ConfirmButton label="Remove demo pathways" confirmLabel="Click again to remove them and their progress" className="justify-self-start" />
          </form>
        </Panel>
      )}
    </div>
  );
}
