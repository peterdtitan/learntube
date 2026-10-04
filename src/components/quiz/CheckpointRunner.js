'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { AlertTriangle, Clock, Maximize } from 'lucide-react';
import Button from '../ui/Button';
import QuestionInput from './QuestionInput';
import QuizResults from './QuizResults';
import { notifySummaryChanged } from '../useLearnerSummary';
import { QUIZ_XP } from '../../lib/xpValues';
import cn from '../../lib/cn';

function clock(seconds) {
  const s = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const ANNOUNCE_AT = [300, 60, 30, 10];

// Tracks leaving the page, leaving fullscreen, copying and pasting while `active`.
// Every event goes to the server straight away; see /api/attempts/:id/events.
function useIntegrity({
  active, attemptId, startedAt, onReturn, onFullscreenExit, onServer,
}) {
  const events = useRef([]);
  const awaySince = useRef(null);
  const timer = useRef(null);

  const flush = useCallback(async () => {
    if (!attemptId) return;
    try {
      const res = await fetch(`/api/attempts/${attemptId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: events.current }),
      });
      if (res.ok) onServer(await res.json());
    } catch {
      // Sent again with the next event and with the answers.
    }
  }, [attemptId, onServer]);

  const record = useCallback((event) => {
    events.current = [...events.current, { ...event, at: Date.now() - startedAt }];
    clearTimeout(timer.current);
    timer.current = setTimeout(flush, 250);
  }, [flush, startedAt]);

  useEffect(() => {
    if (!active) return undefined;
    const isAway = () => document.visibilityState === 'hidden' || !document.hasFocus();
    const check = () => {
      if (isAway() && awaySince.current === null) {
        awaySince.current = Date.now();
      } else if (!isAway() && awaySince.current !== null) {
        const seconds = Math.round((Date.now() - awaySince.current) / 1000);
        awaySince.current = null;
        if (seconds >= 1) {
          record({ type: 'leave', seconds });
          onReturn(seconds);
        }
      }
    };
    const onCopy = () => record({ type: 'copy', text: String(window.getSelection() || '') });
    const onPaste = (e) => record({ type: 'paste', text: e.clipboardData?.getData('text') || '' });
    const onFullscreen = () => {
      if (!document.fullscreenElement) {
        record({ type: 'fullscreen-exit' });
        onFullscreenExit();
      }
    };
    // Closing the tab mid-quiz: send what we have. The attempt stays open and the clock runs.
    const onHide = () => {
      const blob = new Blob([JSON.stringify({ events: events.current })], { type: 'application/json' });
      navigator.sendBeacon?.(`/api/attempts/${attemptId}/events`, blob);
    };

    window.addEventListener('blur', check);
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', check);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', onCopy);
    document.addEventListener('paste', onPaste);
    document.addEventListener('fullscreenchange', onFullscreen);
    window.addEventListener('pagehide', onHide);
    return () => {
      window.removeEventListener('blur', check);
      window.removeEventListener('focus', check);
      document.removeEventListener('visibilitychange', check);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', onCopy);
      document.removeEventListener('paste', onPaste);
      document.removeEventListener('fullscreenchange', onFullscreen);
      window.removeEventListener('pagehide', onHide);
    };
  }, [active, attemptId, record, onReturn, onFullscreenExit]);

  useEffect(() => () => clearTimeout(timer.current), []);
  return events;
}

export default function CheckpointRunner({
  quiz: initial, isSignedIn, extraTime, pathwayId,
}) {
  const boxRef = useRef(null);
  const [quiz, setQuiz] = useState(initial);
  const [step, setStep] = useState(initial.open ? 'resume' : 'intro');
  const [answers, setAnswers] = useState({});
  const [endAt, setEndAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [warning, setWarning] = useState(null);
  const [outOfFullscreen, setOutOfFullscreen] = useState(false);
  const [message, setMessage] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [announce, setAnnounce] = useState('');
  const submitting = useRef(false);

  const attemptId = quiz.open?.id;
  const startedAt = quiz.open ? new Date(quiz.open.startedAt).getTime() : Date.now();
  const p = quiz.penalties;

  const onServer = useCallback((data) => {
    if (typeof data.secondsLeft === 'number') setEndAt(Date.now() + data.secondsLeft * 1000);
  }, []);
  const onReturn = useCallback((seconds) => {
    setWarning({
      seconds,
      points: p.leave + Math.floor(seconds / 10) * p.away,
      clock: seconds * p.time,
    });
  }, [p]);
  const onFullscreenExit = useCallback(() => setOutOfFullscreen(true), []);

  const events = useIntegrity({
    active: step === 'running', attemptId, startedAt, onReturn, onFullscreenExit, onServer,
  });

  const enterFullscreen = async () => {
    try {
      if (boxRef.current?.requestFullscreen && !document.fullscreenElement) {
        await boxRef.current.requestFullscreen();
      }
      setOutOfFullscreen(false);
    } catch {
      // Some phones don't allow it; the quiz still runs and leaving is still tracked.
    }
  };

  const start = async () => {
    if (!isSignedIn) {
      signIn();
      return;
    }
    setMessage(null);
    await enterFullscreen(); // must happen inside the click
    const res = await fetch(`/api/quizzes/${quiz.id}/attempts`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (document.fullscreenElement) document.exitFullscreen?.();
      setMessage(data.error || 'That didn’t start. Try again.');
      return;
    }
    setQuiz(data);
    try {
      const saved = sessionStorage.getItem(`checkpoint:${data.open.id}`);
      if (saved) setAnswers(JSON.parse(saved));
    } catch {
      // Starting with blank answers is fine.
    }
    setEndAt(Date.now() + (data.open.secondsLeft ?? 0) * 1000);
    setStep('running');
  };

  const submit = useCallback(async () => {
    if (submitting.current) return;
    submitting.current = true;
    setStep('submitting');
    const res = await fetch(`/api/attempts/${attemptId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, events: events.current }),
    });
    const data = await res.json().catch(() => ({}));
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    if (!res.ok) {
      submitting.current = false;
      setStep('running');
      setMessage(data.error || 'That didn’t send. Check your connection and press Submit again.');
      return;
    }
    setOutcome(data);
    setStep('done');
    if (data.xpAwarded) notifySummaryChanged();
  }, [answers, attemptId, events]);

  // A reload mid-quiz keeps the answers (the clock keeps running on the server anyway).
  useEffect(() => {
    if (!attemptId || step !== 'running') return;
    try {
      sessionStorage.setItem(`checkpoint:${attemptId}`, JSON.stringify(answers));
    } catch {
      // Private windows can refuse; answers just won't survive a reload.
    }
  }, [answers, attemptId, step]);

  useEffect(() => {
    if (step !== 'running') return undefined;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [step]);

  const remaining = endAt ? (endAt - now) / 1000 : null;
  useEffect(() => {
    if (step === 'running' && remaining !== null && remaining <= 0) submit();
  }, [remaining, step, submit]);
  useEffect(() => {
    if (remaining === null) return;
    const hit = ANNOUNCE_AT.find((s) => Math.ceil(remaining) === s);
    if (hit) setAnnounce(hit >= 60 ? `${hit / 60} ${hit === 60 ? 'minute' : 'minutes'} left` : `${hit} seconds left`);
  }, [remaining]);

  const answered = quiz.questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== '' && answers[q.id] !== null).length;
  const minutes = Math.round(((quiz.timeLimitSec || 600) * (extraTime ? 1.5 : 1)) / 60);
  const cooling = quiz.retakeAt && new Date(quiz.retakeAt) > new Date() && !quiz.open;

  return (
    <div ref={boxRef} className={cn('mx-auto w-full max-w-3xl', step === 'running' && 'min-h-screen overflow-y-auto bg-canvas px-4 py-6 sm:px-8')}>
      {(step === 'intro' || step === 'resume') && (
        <div className="grid gap-6">
          <header className="grid gap-2">
            <p className="text-sm font-bold uppercase tracking-widest text-muted">{`Checkpoint · ${quiz.moduleTitle || 'Module'}`}</p>
            <h1 className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-tight">{quiz.title || 'Halfway checkpoint'}</h1>
            <p className="text-lg text-muted">
              {`${quiz.questionCount} questions · ${minutes} minutes · pass mark ${quiz.passPercent}% · `}
              <span className="font-bold text-xp">{`+${QUIZ_XP.CHECKPOINT} XP`}</span>
            </p>
          </header>

          <section className="grid gap-3 rounded-lg border border-line bg-surface p-5" aria-labelledby="rules-heading">
            <h2 id="rules-heading" className="text-lg font-bold">Before you start</h2>
            <ul className="grid list-disc gap-2 pl-5 text-[15px]">
              <li>
                The quiz opens full screen and the clock starts straight away.
                It submits itself when time runs out.
              </li>
              <li>{`Leaving the quiz (another tab, app or window) costs ${p.leave} points, plus ${p.away} for every 10 seconds away, and ${p.time === 1 ? 'that time' : `${p.time}× that time`} comes off your clock.`}</li>
              <li>{`Copying and pasting work, but each one is recorded, with the text, and costs ${p.copy} points.`}</li>
              <li>{`Deductions stop at ${p.max} points. You’ll see exactly what was deducted, and why, at the end.`}</li>
              <li>Not passing doesn’t lock anything. You can retake it after a short break.</li>
            </ul>
            <p className="text-sm text-muted">
              {extraTime ? 'You have extra time switched on (1.5×). ' : 'Need more time, for example with a screen reader? '}
              <Link href="/settings" className="font-bold text-accent">{extraTime ? 'Change in settings' : 'Turn on extra time in settings'}</Link>
            </p>
          </section>

          {cooling ? (
            <p className="rounded-md bg-xp-soft px-4 py-3 text-[15px] text-xp">
              {`Take a short break. You can retake it from ${new Date(quiz.retakeAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.`}
            </p>
          ) : (
            <Button onClick={start} className="justify-self-start">
              <Maximize size={16} aria-hidden="true" />
              {step === 'resume' ? 'Return to the quiz (the clock kept running)' : 'Start the checkpoint'}
            </Button>
          )}
          {quiz.best && (
            <p className="text-[15px] text-muted">{`Your best so far: ${Math.round(quiz.best.finalScore)}%${quiz.best.passed ? ' (passed)' : ''}.`}</p>
          )}
          {message && <p role="alert" className="text-[15px] text-danger">{message}</p>}
        </div>
      )}

      {(step === 'running' || step === 'submitting') && (
        <div className="grid gap-6">
          <div className="sticky top-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-canvas/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
            <span className={cn('inline-flex items-center gap-2 font-display text-2xl font-bold tabular-nums', remaining !== null && remaining < 60 && 'text-danger')}>
              <Clock size={20} aria-hidden="true" />
              <span aria-label="Time left">{remaining === null ? '–' : clock(remaining)}</span>
            </span>
            <span className="text-sm text-muted">{`${answered} of ${quiz.questions.length} answered`}</span>
            {confirming ? (
              <span className="flex items-center gap-2">
                <span className="text-sm">{`${quiz.questions.length - answered} unanswered.`}</span>
                <Button size="sm" onClick={submit} disabled={step === 'submitting'}>Submit anyway</Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>Keep going</Button>
              </span>
            ) : (
              <Button size="sm" disabled={step === 'submitting'} onClick={() => (answered < quiz.questions.length ? setConfirming(true) : submit())}>
                {step === 'submitting' ? 'Submitting…' : 'Submit'}
              </Button>
            )}
            <p className="sr-only" aria-live="polite">{announce}</p>
          </div>

          {outOfFullscreen && (
            <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-xp-soft px-4 py-3 text-[15px] text-xp">
              You left full screen. That’s been noted.
              <Button size="sm" onClick={enterFullscreen}>Back to full screen</Button>
            </div>
          )}

          <ol className="grid gap-8">
            {quiz.questions.map((q, i) => (
              <li key={q.id} className="grid gap-3">
                <p className="text-[18px] font-bold">{`${i + 1}. ${q.prompt}`}</p>
                <QuestionInput question={q} value={answers[q.id]} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))} disabled={step === 'submitting'} idPrefix="cp" />
              </li>
            ))}
          </ol>
          {message && <p role="alert" className="text-[15px] text-danger">{message}</p>}

          {warning && (
            <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4">
              <div role="alertdialog" aria-modal="true" aria-labelledby="leave-title" aria-describedby="leave-body" className="grid max-w-md gap-3 rounded-lg bg-surface p-6 shadow-xl">
                <h2 id="leave-title" className="flex items-center gap-2 text-xl font-bold">
                  <AlertTriangle className="text-danger" size={22} />
                  You left the quiz
                </h2>
                <p id="leave-body" className="text-[15px]">
                  {`You were away for ${warning.seconds} ${warning.seconds === 1 ? 'second' : 'seconds'}. That’s −${warning.points} points and ${warning.clock} seconds off your clock. Stay on this page until you submit.`}
                </p>
                <Button
                  // The dialog opens on return, so focus lands where the learner can act.
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  onClick={() => {
                    setWarning(null);
                    enterFullscreen();
                  }}
                >
                  Back to the quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 'done' && outcome && (
        <div className="grid gap-6">
          <h1 className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-tight">{quiz.title || 'Checkpoint'}</h1>
          <QuizResults
            result={outcome.result}
            passPercent={outcome.passPercent}
            xpAwarded={outcome.xpAwarded}
            showIntegrity
          />
          <div className="flex flex-wrap gap-3">
            {pathwayId && <Button href={`/pathways/${pathwayId}`}>Back to the pathway</Button>}
            {!outcome.result.passed && <p className="self-center text-sm text-muted">You can retake it in 5 minutes.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
