'use client';

import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Check } from 'lucide-react';

import VideoPlayer from './VideoPlayer';
import PracticeControls from './PracticeControls';
import LogMakeForm from './LogMakeForm';
import XpToast from './XpToast';
import Button from '../ui/Button';
import { notifySummaryChanged } from '../useLearnerSummary';
import { XP } from '../../lib/xpValues';
import cn from '../../lib/cn';

async function saveProgress(videoId, stoppedAt, completed) {
  try {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, stoppedAt: Math.floor(stoppedAt), completed }),
    });
    return res.ok ? res.json() : null;
  } catch {
    return null; // Progress saving should never interrupt playback.
  }
}

function Step({
  number, title, xp, done, children,
}) {
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-2 border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0">
      <span
        className={cn(
          'grid h-7 w-7 place-items-center rounded-full text-sm font-bold',
          done ? 'bg-accent text-on-accent' : 'bg-accent-soft text-accent',
        )}
        aria-hidden="true"
      >
        {done ? <Check size={15} strokeWidth={3} /> : number}
      </span>
      <div className="grid min-w-0 gap-2">
        <h3 className="flex flex-wrap items-center gap-2 font-sans text-[17px] font-bold">
          {title}
          <span className="rounded-pill bg-xp-soft px-2 py-0.5 text-xs text-xp tabular-nums">{`+${xp} XP`}</span>
          {done && <span className="sr-only">(done)</span>}
        </h3>
        {children}
      </div>
    </li>
  );
}

export default function Classroom({
  lesson, startAt, isSignedIn, initialWatched, initialTriedAt, myMakes, showLog = true,
}) {
  const router = useRouter();
  const playerRef = useRef(null);
  const [rate, setRate] = useState(1);
  const [loop, setLoop] = useState(null);
  const [loopStart, setLoopStart] = useState(null);
  const [watched, setWatched] = useState(initialWatched);
  const [triedAt, setTriedAt] = useState(initialTriedAt);
  const [trying, setTrying] = useState(false);
  const [toast, setToast] = useState(null);
  const [logOpen, setLogOpen] = useState(myMakes.length === 0);
  const clearToast = useCallback(() => setToast(null), []);

  // A newly reached milestone takes over the toast, e.g. "You reached 250 XP!".
  const celebrate = useCallback((message, xp, milestones = []) => {
    setToast({ message: milestones.length ? `${milestones[0]}!` : message, xp, at: Date.now() });
    if (xp > 0) notifySummaryChanged();
    router.refresh();
  }, [router]);

  const handleProgress = useCallback((time) => {
    if (isSignedIn) saveProgress(lesson.id, time, false);
  }, [lesson.id, isSignedIn]);

  const handleComplete = useCallback(async () => {
    setWatched(true);
    if (!isSignedIn) return;
    const data = await saveProgress(lesson.id, lesson.endSec || lesson.duration, true);
    if (data?.xpAwarded) celebrate('Watched to the end', data.xpAwarded, data.milestones);
  }, [lesson.id, lesson.endSec, lesson.duration, isSignedIn, celebrate]);

  const handleLoopClick = () => {
    const now = playerRef.current?.getCurrentTime();
    if (loop) {
      setLoop(null);
      return;
    }
    if (now === null || now === undefined) return;
    if (loopStart === null) {
      setLoopStart(now);
      return;
    }
    if (now - loopStart < 1) {
      setLoopStart(null); // Too short to loop; start over.
      return;
    }
    setLoop({ start: loopStart, end: now });
    setLoopStart(null);
    playerRef.current.seekTo(loopStart);
  };

  const markTried = async () => {
    if (!isSignedIn) {
      signIn();
      return;
    }
    setTrying(true);
    const res = await fetch(`/api/lessons/${lesson.id}/try`, { method: 'POST' });
    setTrying(false);
    if (!res.ok) return;
    const data = await res.json();
    setTriedAt(data.triedAt);
    celebrate('Nice work. Practice counted.', data.xpAwarded, data.milestones);
  };

  return (
    <div className="grid gap-4">
      <VideoPlayer
        ref={playerRef}
        videoId={lesson.id}
        youtubeUrl={lesson.url}
        startAt={startAt}
        duration={lesson.duration}
        clipStart={lesson.startSec || 0}
        clipEnd={lesson.endSec || null}
        captionsLang={lesson.captionsLang}
        playbackRate={rate}
        loop={loop}
        onProgress={handleProgress}
        onComplete={handleComplete}
      />
      <PracticeControls
        rate={rate}
        onRate={setRate}
        loop={loop}
        loopStart={loopStart}
        onLoopClick={handleLoopClick}
        onBack={() => {
          const now = playerRef.current?.getCurrentTime();
          if (now !== null && now !== undefined) playerRef.current.seekTo(now - 10);
        }}
      />

      <section aria-labelledby="steps-heading" className="rounded-lg border border-line bg-surface p-5">
        <h2 id="steps-heading" className="sr-only">This lesson’s steps</h2>
        <ol className="grid">
          <Step number={1} title="Watch the step" xp={XP.WATCH} done={watched}>
            <p className="text-[15px] text-muted">
              {watched
                ? 'Watched to the end. Rewatch any part with the controls above.'
                : 'Watch to the end. Slow it down or loop the tricky part as often as you need.'}
            </p>
          </Step>

          <Step number={2} title="Try it yourself" xp={XP.TRY} done={Boolean(triedAt)}>
            {lesson.tryTask && <p className="text-[17px] font-bold">{lesson.tryTask}</p>}
            {triedAt ? (
              <p className="text-[15px] text-muted">Done. That counts as a practice day this week.</p>
            ) : (
              <Button size="sm" onClick={markTried} disabled={trying} className="justify-self-start">
                {isSignedIn ? 'I tried it' : 'Sign in to track practice'}
              </Button>
            )}
          </Step>

          {showLog && (
          <Step number={3} title="Log what you made" xp={XP.LOG} done={myMakes.length > 0}>
            {myMakes.length > 0 && (
              <ul className="grid gap-1 text-[15px]">
                {myMakes.map((m) => (
                  <li key={m.id} className="flex items-center gap-2">
                    <Check size={15} className="text-accent" />
                    {m.title}
                  </li>
                ))}
              </ul>
            )}
            {isSignedIn && logOpen && (
              <LogMakeForm
                videoId={lesson.id}
                suggestion={lesson.tryTask}
                onLogged={(xp, milestones) => {
                  setLogOpen(false);
                  celebrate('Logged to your makes', xp, milestones);
                }}
              />
            )}
            {isSignedIn && !logOpen && (
              <Button variant="ghost" size="sm" onClick={() => setLogOpen(true)} className="justify-self-start">
                Log another make
              </Button>
            )}
            {!isSignedIn && (
              <p className="text-[15px] text-muted">Sign in to keep a record of what you make.</p>
            )}
          </Step>
          )}
        </ol>
      </section>

      <XpToast toast={toast} onDone={clearToast} />
    </div>
  );
}
