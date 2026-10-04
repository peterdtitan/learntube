'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import QuestionInput from './QuestionInput';
import QuizResults from './QuizResults';
import { notifySummaryChanged } from '../useLearnerSummary';
import { QUIZ_XP } from '../../lib/xpValues';

async function post(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

// The few questions after a lesson: untimed, retake as often as you like, XP on first pass.
export default function LessonCheck({
  quizId, questionCount, best, isSignedIn,
}) {
  const router = useRouter();
  const [state, setState] = useState({ step: 'intro' });
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState(null);

  const start = async () => {
    if (!isSignedIn) {
      signIn();
      return;
    }
    setMessage(null);
    const { ok, data } = await post(`/api/quizzes/${quizId}/attempts`);
    if (!ok) {
      setMessage(data.error || 'That didn’t load. Try again.');
      return;
    }
    setAnswers({});
    setState({ step: 'answering', quiz: data });
  };

  const submit = async (e) => {
    e.preventDefault();
    setState((s) => ({ ...s, submitting: true }));
    const { ok, data } = await post(`/api/attempts/${state.quiz.open.id}/submit`, { answers });
    if (!ok) {
      setMessage(data.error || 'That didn’t send. Try again.');
      setState((s) => ({ ...s, submitting: false }));
      return;
    }
    setState({ step: 'done', ...data });
    if (data.xpAwarded) notifySummaryChanged();
    router.refresh();
  };

  return (
    <section aria-labelledby="check-heading" className="grid gap-4 rounded-lg border border-line bg-surface p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="check-heading" className="text-lg font-bold">Quick check</h2>
        <span className="text-sm text-muted">
          {`${questionCount} ${questionCount === 1 ? 'question' : 'questions'} · `}
          <span className="font-bold text-xp">{`+${QUIZ_XP.LESSON_CHECK} XP`}</span>
        </span>
      </header>

      {state.step === 'intro' && (
        <div className="flex flex-wrap items-center gap-3">
          <p className="flex-1 text-[15px] text-muted">
            {best
              ? `Your best: ${Math.round(best.finalScore)}%. Recalling it again later helps it stick.`
              : 'Recalling what you just watched is one of the best ways to remember it. No timer.'}
          </p>
          <Button size="sm" onClick={start}>{best ? 'Take it again' : 'Start'}</Button>
        </div>
      )}

      {state.step === 'answering' && (
        <form onSubmit={submit} className="grid gap-5">
          {state.quiz.questions.map((q, i) => (
            <div key={q.id} className="grid gap-2">
              <p className="text-[17px] font-bold">{`${i + 1}. ${q.prompt}`}</p>
              <QuestionInput question={q} value={answers[q.id]} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} idPrefix="check" />
            </div>
          ))}
          <Button type="submit" disabled={state.submitting} className="justify-self-start">
            {state.submitting ? 'Checking…' : 'Check my answers'}
          </Button>
        </form>
      )}

      {state.step === 'done' && (
        <div className="grid gap-4">
          <QuizResults
            result={state.result}
            passPercent={state.passPercent}
            xpAwarded={state.xpAwarded}
          />
          <Button variant="ghost" size="sm" onClick={start} className="justify-self-start">Try again</Button>
        </div>
      )}

      {message && <p role="alert" className="text-sm text-danger">{message}</p>}
    </section>
  );
}
