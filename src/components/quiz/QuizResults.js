import React from 'react';
import { Check, ShieldAlert, X } from 'lucide-react';
import cn from '../../lib/cn';

function formatSeconds(s) {
  return s >= 60 ? `${Math.floor(s / 60)} min ${s % 60} s` : `${s} s`;
}

// Score, any penalties with their reasons, and every question with the right answer.
export default function QuizResults({
  result, passPercent, xpAwarded = 0, showIntegrity = false,
}) {
  const { questions = [], penalties = [], late } = result.results || {};
  const integrity = result.integrity || {};
  const events = integrity.events || [];
  const copies = events.filter((e) => e.type === 'copy' || e.type === 'paste');

  return (
    <div className="grid gap-6">
      <section className="grid gap-2 rounded-lg border border-line bg-surface p-5" aria-live="polite">
        <p className="text-sm font-bold uppercase tracking-widest text-muted">{result.passed ? 'Passed' : 'Not yet'}</p>
        <p className="font-display text-5xl font-bold tabular-nums">{`${Math.round(result.finalScore)}%`}</p>
        <p className="text-[15px] text-muted">
          {result.passed
            ? `You needed ${passPercent}%.`
            : `You need ${passPercent}% to pass. Have another look at the answers below, then try again.`}
          {xpAwarded > 0 && <span className="ml-2 font-bold text-xp">{`+${xpAwarded} XP`}</span>}
        </p>
        {result.penalty > 0 && (
          <p className="text-[15px]">
            {`You answered ${Math.round(result.score)}% correctly; ${Math.round(result.penalty)} points came off for the reasons below.`}
          </p>
        )}
      </section>

      {showIntegrity && (penalties.length > 0 || late) && (
        <section className="grid gap-3 rounded-lg border border-danger/40 bg-surface p-5" aria-labelledby="integrity-heading">
          <h2 id="integrity-heading" className="flex items-center gap-2 text-lg font-bold">
            <ShieldAlert size={20} className="text-danger" />
            Score deductions
          </h2>
          <ul className="grid gap-1 text-[15px]">
            {penalties.map((p) => (
              <li key={p.reason} className="flex justify-between gap-4">
                <span>{`${p.reason} × ${p.count}`}</span>
                <span className="font-bold tabular-nums text-danger">{`−${p.points}`}</span>
              </li>
            ))}
          </ul>
          {integrity.awaySeconds > 0 && (
            <p className="text-sm text-muted">{`You were away from the quiz for ${formatSeconds(integrity.awaySeconds)} in total, across ${integrity.leaveCount} ${integrity.leaveCount === 1 ? 'time' : 'times'}.`}</p>
          )}
          {copies.length > 0 && (
            <details className="text-sm">
              <summary className="cursor-pointer font-bold">{`What was copied or pasted (${copies.length})`}</summary>
              <ul className="mt-2 grid gap-1">
                {copies.map((e) => (
                  <li key={`${e.type}-${e.at}`} className="rounded-sm bg-sunken px-2 py-1">
                    <span className="font-bold">{e.type === 'copy' ? 'Copied: ' : 'Pasted: '}</span>
                    <span className="break-words">{e.text || '(nothing selected)'}</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </section>
      )}

      <section className="grid gap-3" aria-labelledby="answers-heading">
        <h2 id="answers-heading" className="text-lg font-bold">Answers</h2>
        <ol className="grid gap-2">
          {questions.map((r, i) => (
            <li key={r.id} className="grid gap-1 rounded-md border border-line bg-surface p-4">
              <p className="flex items-start gap-2 font-bold">
                <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full', r.correct ? 'bg-accent text-on-accent' : 'bg-danger text-white')}>
                  {r.correct
                    ? <Check size={13} strokeWidth={3} />
                    : <X size={13} strokeWidth={3} />}
                </span>
                <span>{`${i + 1}. ${r.prompt}`}</span>
                <span className="sr-only">{r.correct ? '(right)' : '(wrong)'}</span>
              </p>
              {!r.correct && <p className="pl-7 text-[15px]">{`Answer: ${r.answer}`}</p>}
              {r.credit > 0 && r.credit < 1 && <p className="pl-7 text-sm text-muted">{`Partly right (${Math.round(r.credit * 100)}%).`}</p>}
              {r.explanation && <p className="pl-7 text-[15px] text-muted">{r.explanation}</p>}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
