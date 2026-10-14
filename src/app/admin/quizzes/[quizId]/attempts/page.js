import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../../../../lib/prismadb';
import { publicName } from '../../../../../lib/people';
import cn from '../../../../../lib/cn';

function seconds(s) {
  return s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;
}

const clockAt = (ms) => {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

// One line per thing the exam recorded, in plain words.
function describeEvent(e) {
  const where = e.via === 'window' ? 'another window' : 'another tab or app';
  switch (e.type) {
    case 'leave': return { text: `Left for ${seconds(e.seconds)} (${where})`, counted: true };
    case 'blip': return { text: `Away ${seconds(e.seconds)} (${where}), too short to count`, counted: false };
    case 'copy': return { text: `Copied: ${e.text || '(nothing)'}`, counted: true };
    case 'paste': return { text: `Pasted: ${e.text || '(nothing)'}`, counted: true };
    case 'fullscreen-exit': return { text: 'Left full screen (not counted)', counted: false };
    default: return null;
  }
}

// Every finished attempt, with what the integrity tracking recorded. Shown to admins only
// (the admin layout returns 404 for everyone else).
export default async function QuizAttempts({ params }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.quizId },
    include: {
      attempts: {
        where: { submittedAt: { not: null } },
        orderBy: { submittedAt: 'desc' },
        take: 200,
        include: {
          user: {
            select: {
              id: true, name: true, displayName: true, email: true,
            },
          },
        },
      },
    },
  });
  if (!quiz) notFound();
  const flagged = quiz.attempts.filter((a) => a.penalty > 0).length;

  return (
    <div className="grid gap-6">
      <Link href={`/admin/quizzes/${quiz.id}`} className="text-sm text-muted hover:text-ink">← Back to the quiz</Link>
      <header className="grid gap-1">
        <h1 className="text-3xl font-bold">{`Results: ${quiz.title || 'quiz'}`}</h1>
        <p className="text-[15px] text-muted">
          {`${quiz.attempts.length} finished ${quiz.attempts.length === 1 ? 'attempt' : 'attempts'}`}
          {quiz.kind === 'CHECKPOINT' && `, ${flagged} with integrity deductions`}
          . Learners see the same breakdown for their own attempts.
        </p>
      </header>

      {quiz.attempts.length ? (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[760px] text-left text-[15px]">
            <thead className="bg-sunken text-sm text-muted">
              <tr>
                {['Learner', 'Submitted', 'Device', 'Correct', 'Deducted', 'Final', 'Left', 'Away', 'Copies', 'Pastes'].map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quiz.attempts.map((a) => {
                const events = Array.isArray(a.events) ? a.events : [];
                const device = events.find((e) => e.type === 'device')?.kind;
                const log = events
                  .map((e) => ({ ...e, line: describeEvent(e) }))
                  .filter((e) => e.line);
                return (
                  <React.Fragment key={a.id}>
                    <tr className="border-t border-line align-top">
                      <td className="px-3 py-2">
                        <span className="font-bold">{publicName(a.user)}</span>
                        <span className="block text-xs text-muted">{a.user.email}</span>
                      </td>
                      <td className="px-3 py-2 text-sm tabular-nums">{a.submittedAt.toISOString().slice(0, 16).replace('T', ' ')}</td>
                      <td className="px-3 py-2 text-sm capitalize">{device || '–'}</td>
                      <td className="px-3 py-2 tabular-nums">{`${Math.round(a.score)}%`}</td>
                      <td className={cn('px-3 py-2 tabular-nums', a.penalty > 0 && 'font-bold text-danger')}>{a.penalty > 0 ? `−${a.penalty}` : '–'}</td>
                      <td className={cn('px-3 py-2 font-bold tabular-nums', a.passed ? 'text-accent' : 'text-muted')}>{`${Math.round(a.finalScore)}%`}</td>
                      <td className="px-3 py-2 tabular-nums">{a.leaveCount}</td>
                      <td className="px-3 py-2 tabular-nums">{seconds(a.awaySeconds)}</td>
                      <td className="px-3 py-2 tabular-nums">{a.copyCount}</td>
                      <td className="px-3 py-2 tabular-nums">{a.pasteCount}</td>
                    </tr>
                    {log.length > 0 && (
                      <tr>
                        <td colSpan={10} className="px-3 pb-3">
                          <details className="text-sm">
                            <summary className="cursor-pointer font-bold">{`What was recorded (${log.length})`}</summary>
                            <ol className="mt-1 grid gap-1">
                              {log.map((e) => (
                                <li key={`${e.type}-${e.at}`} className={cn('rounded-sm px-2 py-1', e.line.counted ? 'bg-sunken' : 'text-muted')}>
                                  <span className="font-bold tabular-nums">{`${clockAt(e.at)} `}</span>
                                  <span className="break-words">{e.line.text}</span>
                                </li>
                              ))}
                            </ol>
                          </details>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-line px-5 py-10 text-center text-muted">Nobody has finished this quiz yet.</p>
      )}
    </div>
  );
}
