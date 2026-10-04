import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../../../../lib/prismadb';
import { publicName } from '../../../../../lib/people';
import cn from '../../../../../lib/cn';

function seconds(s) {
  return s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;
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
                {['Learner', 'Submitted', 'Correct', 'Deducted', 'Final', 'Left', 'Away', 'Copies', 'Pastes'].map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quiz.attempts.map((a) => {
                const events = Array.isArray(a.events) ? a.events : [];
                const texts = events.filter((e) => e.type === 'copy' || e.type === 'paste');
                return (
                  <React.Fragment key={a.id}>
                    <tr className="border-t border-line align-top">
                      <td className="px-3 py-2">
                        <span className="font-bold">{publicName(a.user)}</span>
                        <span className="block text-xs text-muted">{a.user.email}</span>
                      </td>
                      <td className="px-3 py-2 text-sm tabular-nums">{a.submittedAt.toISOString().slice(0, 16).replace('T', ' ')}</td>
                      <td className="px-3 py-2 tabular-nums">{`${Math.round(a.score)}%`}</td>
                      <td className={cn('px-3 py-2 tabular-nums', a.penalty > 0 && 'font-bold text-danger')}>{a.penalty > 0 ? `−${a.penalty}` : '–'}</td>
                      <td className={cn('px-3 py-2 font-bold tabular-nums', a.passed ? 'text-accent' : 'text-muted')}>{`${Math.round(a.finalScore)}%`}</td>
                      <td className="px-3 py-2 tabular-nums">{a.leaveCount}</td>
                      <td className="px-3 py-2 tabular-nums">{seconds(a.awaySeconds)}</td>
                      <td className="px-3 py-2 tabular-nums">{a.copyCount}</td>
                      <td className="px-3 py-2 tabular-nums">{a.pasteCount}</td>
                    </tr>
                    {texts.length > 0 && (
                      <tr>
                        <td colSpan={9} className="px-3 pb-3">
                          <details className="text-sm">
                            <summary className="cursor-pointer font-bold">What was copied or pasted</summary>
                            <ul className="mt-1 grid gap-1">
                              {texts.map((e) => (
                                <li key={`${e.type}-${e.at}`} className="rounded-sm bg-sunken px-2 py-1">
                                  <span className="font-bold">{`${e.type === 'copy' ? 'Copied' : 'Pasted'} at ${seconds(Math.round(e.at / 1000))}: `}</span>
                                  <span className="break-words">{e.text || '(nothing)'}</span>
                                </li>
                              ))}
                            </ul>
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
