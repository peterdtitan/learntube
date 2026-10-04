'use client';

import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import dynamic from 'next/dynamic';
import { signIn } from 'next-auth/react';
import {
  Blocks, Check, Shuffle, Timer, X,
} from 'lucide-react';
import Button from '../ui/Button';
import QuestionInput from './QuestionInput';
import { gradeQuestion, publicQuestion, correctAnswerText } from '../../lib/quizGrade';
import { notifySummaryChanged } from '../useLearnerSummary';
import { QUIZ_XP } from '../../lib/xpValues';
import cn from '../../lib/cn';

const TowerScene = dynamic(() => import('./TowerScene'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-lg bg-sunken" />,
});

const SPEED_SECONDS = 20;
const MATCH_PAIRS = 6;

function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const hasAnswer = (v) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length);

// Sends the answers for XP: the server grades them again, so the game can't be scripted for XP.
async function claimXp(quizId, answers) {
  try {
    const start = await fetch(`/api/quizzes/${quizId}/attempts`, { method: 'POST' });
    if (!start.ok) return null;
    const { open } = await start.json();
    const res = await fetch(`/api/attempts/${open.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

// One question at a time with instant feedback; used by Tower and Speed round.
function QuestionRound({
  questions, mode, onFinish, color,
}) {
  const shown = useMemo(() => questions.map((q) => publicQuestion(q, Math.random())), [questions]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(undefined);
  const [feedback, setFeedback] = useState(null);
  const [answers, setAnswers] = useState({});
  const [stats, setStats] = useState({
    right: 0, wrong: 0, points: 0, streak: 0, best: 0,
  });
  const [deadline, setDeadline] = useState(() => Date.now() + SPEED_SECONDS * 1000);
  const [now, setNow] = useState(Date.now());

  const q = questions[index];
  const timed = mode === 'speed';
  const left = Math.max(0, (deadline - now) / 1000);

  const check = useCallback((given) => {
    if (feedback) return;
    const credit = gradeQuestion(q, given);
    const right = credit === 1;
    setAnswers((a) => ({ ...a, [q.id]: given }));
    setStats((s) => {
      const streak = right ? s.streak + 1 : 0;
      const bonus = timed ? Math.round(left * 5) : 0;
      return {
        right: s.right + (right ? 1 : 0),
        wrong: s.wrong + (right ? 0 : 1),
        points: s.points + (right ? (100 + bonus) * Math.min(3, 1 + Math.floor(streak / 3)) : 0),
        streak,
        best: Math.max(s.best, streak),
      };
    });
    setFeedback({ right, answer: correctAnswerText(q), explanation: q.explanation });
  }, [feedback, left, q, timed]);

  useEffect(() => {
    if (!timed || feedback) return undefined;
    const t = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(t);
  }, [timed, feedback]);
  useEffect(() => {
    if (timed && !feedback && left <= 0) check(value);
  }, [timed, feedback, left, check, value]);

  const next = () => {
    if (index + 1 >= questions.length) {
      onFinish({ ...stats, answers, total: questions.length });
      return;
    }
    setIndex(index + 1);
    setValue(undefined);
    setFeedback(null);
    setDeadline(Date.now() + SPEED_SECONDS * 1000);
    setNow(Date.now());
  };

  return (
    <div className={cn('grid gap-6', mode === 'tower' && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]')}>
      {mode === 'tower' && (
        <div className="h-[280px] overflow-hidden rounded-lg border border-line bg-gradient-to-b from-accent-soft to-surface sm:h-[380px] lg:order-2 lg:h-[460px]">
          <TowerScene placed={stats.right} missed={stats.wrong} color={color} label={`Your tower is ${stats.right} blocks tall`} />
        </div>
      )}
      <div className="grid content-start gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
          <span>{`Question ${index + 1} of ${questions.length}`}</span>
          {timed ? (
            <span className="flex items-center gap-3">
              <span className="font-bold text-xp tabular-nums">{`${stats.points} pts`}</span>
              {stats.streak >= 3 && <span className="rounded-pill bg-xp-soft px-2 font-bold text-xp">{`×${Math.min(3, 1 + Math.floor(stats.streak / 3))} streak`}</span>}
              <span className={cn('inline-flex items-center gap-1 font-bold tabular-nums', left < 5 && 'text-danger')}>
                <Timer size={15} aria-hidden="true" />
                {Math.ceil(left)}
              </span>
            </span>
          ) : (
            <span className="font-bold">{`${stats.right} ${stats.right === 1 ? 'block' : 'blocks'}`}</span>
          )}
        </div>
        {timed && (
          <div className="h-1.5 overflow-hidden rounded-pill bg-sunken" aria-hidden="true">
            <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${(left / SPEED_SECONDS) * 100}%` }} />
          </div>
        )}
        <p className="text-[19px] font-bold">{q.prompt}</p>
        <QuestionInput question={shown[index]} value={value} onChange={setValue} disabled={Boolean(feedback)} idPrefix={`g${index}`} />
        {!feedback && (
          <Button onClick={() => check(value)} disabled={!hasAnswer(value)} className="justify-self-start">Check</Button>
        )}
        {feedback && (
          <div role="status" className={cn('grid gap-2 rounded-md px-4 py-3', feedback.right ? 'bg-accent-soft' : 'bg-xp-soft')}>
            <p className="flex items-center gap-2 font-bold">
              {feedback.right ? <Check size={18} className="text-accent" /> : <X size={18} className="text-danger" />}
              {feedback.right && (mode === 'tower' ? 'Right! Another block.' : 'Right!')}
              {!feedback.right && `Not quite. Answer: ${feedback.answer}`}
            </p>
            {feedback.explanation && <p className="text-[15px] text-muted">{feedback.explanation}</p>}
            <Button size="sm" onClick={next} className="justify-self-start">
              {index + 1 >= questions.length ? 'See how you did' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Memory pairs from matching questions and single-answer questions (question → answer).
function MatchUp({ questions, onFinish }) {
  const cards = useMemo(() => {
    const pairs = shuffle(questions.flatMap((q) => {
      if (q.type === 'MATCH') return q.data.pairs.map(([a, b]) => [a, b]);
      if (q.type === 'SINGLE' && q.prompt.length <= 70) return [[q.prompt, q.data.options[q.data.answer]]];
      return [];
    })).slice(0, MATCH_PAIRS);
    return shuffle(pairs.flatMap(([a, b], i) => [
      { id: `${i}a`, pair: i, text: a }, { id: `${i}b`, pair: i, text: b },
    ]));
  }, [questions]);
  const [open, setOpen] = useState([]);
  const [done, setDone] = useState([]);
  const [moves, setMoves] = useState(0);

  const flip = (card) => {
    if (open.length === 2 || open.includes(card.id) || done.includes(card.pair)) return;
    const next = [...open, card.id];
    setOpen(next);
    if (next.length < 2) return;
    setMoves((m) => m + 1);
    const [a, b] = next.map((id) => cards.find((c) => c.id === id));
    setTimeout(() => {
      if (a.pair === b.pair) {
        const finished = [...done, a.pair];
        setDone(finished);
        if (finished.length * 2 === cards.length) {
          onFinish({ moves: moves + 1, pairs: finished.length });
        }
      }
      setOpen([]);
    }, a.pair === b.pair ? 350 : 900);
  };

  if (cards.length < 4) {
    return <p className="text-muted">This module doesn’t have enough matching questions for Match-up yet. Try Tower or Speed round.</p>;
  }
  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted">{`Find the pairs. ${done.length} of ${cards.length / 2} found · ${moves} moves`}</p>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => {
          const faceUp = open.includes(card.id) || done.includes(card.pair);
          return (
            <li key={card.id}>
              <button
                type="button"
                onClick={() => flip(card)}
                aria-label={faceUp ? card.text : 'Hidden card'}
                className={cn(
                  'grid h-28 w-full place-items-center rounded-lg border p-3 text-center text-[15px] font-bold transition-colors',
                  done.includes(card.pair) && 'border-accent bg-accent-soft text-accent',
                  !done.includes(card.pair) && faceUp && 'border-accent bg-surface',
                  !faceUp && 'border-line bg-sunken text-transparent hover:bg-line',
                )}
              >
                {faceUp ? card.text : '?'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const MODES = [
  {
    id: 'tower', title: 'Tower', icon: Blocks, body: 'Every right answer stacks a block. How tall can you build it?',
  },
  {
    id: 'speed', title: 'Speed round', icon: Timer, body: `${SPEED_SECONDS} seconds a question. Faster answers and streaks score more.`,
  },
  {
    id: 'match', title: 'Match-up', icon: Shuffle, body: 'Flip cards to find the pairs. A memory game for this module.',
  },
];

export default function ModuleGame({
  quizId, questions, color, isSignedIn, moduleTitle, pathwayId, passPercent,
}) {
  const [mode, setMode] = useState(null);
  const [round, setRound] = useState(0);
  const [summary, setSummary] = useState(null);
  const [reward, setReward] = useState(null);
  // A fresh shuffle for every round.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const order = useMemo(() => shuffle(questions), [questions, round]);

  const finish = async (result) => {
    setSummary(result);
    if (result.answers && isSignedIn) {
      const data = await claimXp(quizId, result.answers);
      setReward(data);
      if (data?.xpAwarded) notifySummaryChanged();
    }
  };
  const again = () => {
    setSummary(null);
    setReward(null);
    setRound((r) => r + 1);
  };

  return (
    <div className="grid gap-6">
      <header className="grid gap-2">
        <p className="text-sm font-bold uppercase tracking-widest text-muted">{`End of module · ${moduleTitle}`}</p>
        <h1 className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-tight">Module games</h1>
        <p className="text-lg text-muted">
          {`${questions.length} questions from this module. Score ${passPercent}% in Tower or Speed round for `}
          <span className="font-bold text-xp">{`+${QUIZ_XP.MODULE_GAME} XP`}</span>
          {isSignedIn ? '.' : ' (sign in to keep it).'}
        </p>
      </header>

      {!mode && (
        <ul className="grid gap-3 md:grid-cols-3">
          {MODES.map((m) => (
            <li key={m.id}>
              <button type="button" onClick={() => setMode(m.id)} className="grid h-full w-full gap-2 rounded-lg border border-line bg-surface p-5 text-left hover:border-accent">
                <m.icon size={26} className="text-accent" aria-hidden="true" />
                <span className="text-lg font-bold">{m.title}</span>
                <span className="text-[15px] text-muted">{m.body}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {mode && !summary && (
        <div className="grid gap-4">
          <Button variant="quiet" size="sm" onClick={() => setMode(null)} className="justify-self-start">← Choose another game</Button>
          {mode === 'match'
            ? <MatchUp key={round} questions={order} onFinish={finish} />
            : <QuestionRound key={`${mode}-${round}`} questions={order} mode={mode} onFinish={finish} color={color} />}
        </div>
      )}

      {summary && (
        <section className="grid gap-4 rounded-lg border border-line bg-surface p-6" aria-live="polite">
          {mode === 'match' ? (
            <p className="text-2xl font-bold">{`All ${summary.pairs} pairs in ${summary.moves} moves.`}</p>
          ) : (
            <>
              <p className="font-display text-5xl font-bold tabular-nums">{`${summary.right} / ${summary.total}`}</p>
              <p className="text-[15px] text-muted">
                {mode === 'tower' ? `Your tower is ${summary.right} blocks tall.` : `${summary.points} points · best streak ${summary.best}.`}
                {reward?.xpAwarded > 0 && <span className="ml-2 font-bold text-xp">{`+${reward.xpAwarded} XP`}</span>}
                {reward && !reward.xpAwarded && reward.result?.passed && ' You’ve already earned the XP for this game.'}
                {!isSignedIn && (
                  <button type="button" onClick={() => signIn()} className="ml-2 font-bold text-accent">Sign in to earn XP</button>
                )}
              </p>
            </>
          )}
          <div className="flex flex-wrap gap-3">
            <Button onClick={again}>Play again</Button>
            <Button variant="ghost" onClick={() => { again(); setMode(null); }}>Another game</Button>
            {pathwayId && <Button variant="ghost" href={`/pathways/${pathwayId}`}>Back to the pathway</Button>}
          </div>
        </section>
      )}
    </div>
  );
}
