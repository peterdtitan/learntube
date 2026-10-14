'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, Check, Clock, Sparkles,
} from 'lucide-react';
import Button from '../ui/Button';
import Cover from '../ui/Cover';
import SubmitButton from '../admin/SubmitButton';
import {
  GOALS, comingSoon, itemHref, startOptions, weeksToFinish,
} from '../../lib/recommend';
import { START_COOKIE, START_MAX_AGE, serializeStart } from '../../lib/picks';
import { formatMinutes } from '../../lib/estimate';
import { LEGAL } from '../../lib/legal';
import cn from '../../lib/cn';
import SkillIcon from '../ui/SkillIcon';

const DAYS = [
  { value: 2, label: 'Gentle' },
  { value: 3, label: 'Steady' },
  { value: 4, label: 'Keen' },
  { value: 5, label: 'All in' },
];

const QUESTIONS = [
  { title: 'Hey star, what are your interests?', sub: 'Pick as many as you like. We’ll suggest where to start.' },
  { title: 'What brings you here?', sub: 'This helps us choose between quick skills and longer programs.' },
  { title: 'How many days a week can you practise?', sub: 'A little, often, beats a lot once. You can change it any time.' },
];
const RESULT = 3;

function Choice({
  selected, onClick, children, role = 'checkbox', className,
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-3 rounded-lg border border-line bg-surface p-4 text-left transition-[border-color,box-shadow,transform] duration-150 hover:border-accent active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100',
        selected && 'border-accent ring-1 ring-inset ring-accent',
        className,
      )}
    >
      {children}
      {selected && (
        <span className="absolute right-2.5 top-2.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-on-accent">
          <Check size={12} strokeWidth={3} aria-hidden="true" />
        </span>
      )}
    </button>
  );
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

function paceLabel(minutes, days) {
  const weeks = weeksToFinish(minutes, days);
  if (!weeks) return null;
  if (weeks > 12) return `about ${Math.round(weeks / 4.3)} months at ${days} days a week`;
  return `about ${weeks} ${weeks === 1 ? 'week' : 'weeks'} at ${days} days a week`;
}

// One recommendation. The first is shown large; the others are smaller alternatives.
function Option({
  item, days, selected, onSelect, large,
}) {
  const pace = paceLabel(item.minutes, days);
  return (
    <Choice
      role="radio"
      selected={selected}
      onClick={onSelect}
      className={cn('w-full items-stretch gap-0 overflow-hidden p-0', large ? 'flex-col sm:flex-row' : 'flex-col')}
    >
      <Cover
        src={item.cover}
        skill={item.skill}
        sizes={large ? '(min-width: 640px) 320px, 100vw' : '(min-width: 640px) 360px, 100vw'}
        className={large ? 'sm:w-80 sm:shrink-0' : ''}
      />
      <span className={cn('grid content-start gap-2', large ? 'p-5 pr-10' : 'p-4 pr-9')}>
        {item.skill && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted">
            <SkillIcon skill={item.skill} />
            {item.kind === 'program' ? `${item.skill.name} · program` : item.skill.name}
          </span>
        )}
        <span className={cn('font-display font-bold leading-snug', large ? 'text-2xl' : 'text-lg')}>{item.title}</span>
        {large && item.makeTitle && (
          <span className="text-[15px] text-muted">
            <span className="font-bold text-ink">You’ll make: </span>
            {item.makeTitle}
          </span>
        )}
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} aria-hidden="true" />
            {`≈ ${formatMinutes(item.minutes)}`}
          </span>
          <span>{item.kind === 'program' ? `${item.courses} courses · ${plural(item.lessons, 'lesson')}` : plural(item.lessons, 'lesson')}</span>
        </span>
        {large && pace && <span className="text-sm font-bold text-xp">{`That’s ${pace}.`}</span>}
      </span>
    </Choice>
  );
}

// The start questions. Visitors answer them at /start and finish by signing up; signed-in
// learners answer them at /welcome and finish by saving. Answers live in state and go up as
// hidden inputs, so the step that is showing doesn't decide what gets submitted.
export default function WelcomeSurvey({
  categories, items, initial, mode = 'member', saveAction, skipAction,
}) {
  const [step, setStep] = useState(initial.step || 0);
  const [interests, setInterests] = useState(initial.interests);
  const [goal, setGoal] = useState(initial.goal);
  const [days, setDays] = useState(initial.weeklyGoal || 3);
  const [choice, setChoice] = useState(0);
  const heading = useRef(null);
  const reduce = useReducedMotion();
  const visitor = mode === 'visitor';

  const { options, fromInterests } = useMemo(
    () => startOptions(items, { interests, goal }),
    [items, interests, goal],
  );
  const soon = comingSoon(interests, items, categories);
  const pick = options[choice] || options[0] || null;

  const canContinue = [interests.length > 0, Boolean(goal), true][step];
  const go = (next) => {
    setStep(next);
    if (next === RESULT) setChoice(0);
    // Move focus to the new question so screen readers announce it.
    requestAnimationFrame(() => heading.current?.focus());
  };
  const toggle = (id) => setInterests((list) => (list.includes(id)
    ? list.filter((x) => x !== id)
    : [...list, id]));
  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
      initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -40 },
    };

  // The answers wait in a cookie while Google signs them in; /welcome/done saves them.
  const signUp = () => {
    const value = serializeStart({
      interests, goal, weeklyGoal: days, pick: pick && { kind: pick.kind, id: pick.id },
    });
    document.cookie = `${START_COOKIE}=${value}; path=/; max-age=${START_MAX_AGE}; samesite=lax`;
    signIn('google', { callbackUrl: '/welcome/done' });
  };

  const title = step === RESULT ? 'Here’s where to start' : QUESTIONS[step].title;
  let sub = step === RESULT ? null : QUESTIONS[step].sub;
  if (step === RESULT) {
    if (!options.length) sub = 'We’re still adding the first lessons. Sign up and we’ll have them ready.';
    else if (fromInterests) sub = options.length > 1 ? 'Picked from your answers. Tap another to start there instead.' : 'Picked from your answers.';
    else sub = 'Nothing in your interests is ready yet, so here’s what other learners love.';
  }

  // Visitors have nothing to submit yet: their answers wait in a cookie (see signUp).
  const Wrapper = visitor ? 'div' : 'form';

  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6">
      <div className="flex items-center gap-3">
        <motion.span
          aria-hidden="true"
          className="grid h-10 w-10 place-items-center rounded-full bg-xp-soft text-xp"
          animate={reduce ? {} : { rotate: [0, 14, -10, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4 }}
        >
          <Sparkles size={20} />
        </motion.span>
        <div className="grid flex-1 gap-1.5">
          <p className="text-sm font-bold text-muted">
            {step === RESULT ? 'Your first skill' : `Question ${step + 1} of ${QUESTIONS.length}`}
          </p>
          <div className="h-1.5 overflow-hidden rounded-pill bg-sunken">
            <motion.div
              className="h-full rounded-pill bg-accent"
              initial={false}
              animate={{ width: `${((step + 1) / (QUESTIONS.length + 1)) * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            />
          </div>
        </div>
      </div>

      <Wrapper action={visitor ? undefined : saveAction} className="grid gap-6">
        {!visitor && (
          <>
            {interests.map((id) => <input key={id} type="hidden" name="interest" value={id} />)}
            <input type="hidden" name="goal" value={goal || ''} />
            <input type="hidden" name="weeklyGoal" value={days} />
            <input type="hidden" name="next" value={pick ? itemHref(pick) : ''} />
          </>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={slide.initial}
            animate={slide.animate}
            exit={slide.exit}
            transition={{ duration: reduce ? 0.1 : 0.25 }}
            className="grid gap-5"
          >
            <div className="grid gap-1.5">
              <h1 ref={heading} tabIndex={-1} className="text-[clamp(1.75rem,4.5vw,2.75rem)] font-bold leading-tight outline-none">
                {title}
              </h1>
              {sub && <p className="text-lg text-muted">{sub}</p>}
            </div>

            {step === 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="group" aria-label="Interests">
                {categories.map((c) => (
                  <Choice key={c.id} selected={interests.includes(c.id)} onClick={() => toggle(c.id)} className="flex-col items-start gap-2">
                    <SkillIcon skill={c} size="md" />
                    <span className="font-bold leading-snug">{c.name}</span>
                    <span className="text-xs text-muted">{c.available ? `${c.available} to learn` : 'Coming soon'}</span>
                  </Choice>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="What brings you here">
                {GOALS.map((g) => (
                  <Choice key={g.id} role="radio" selected={goal === g.id} onClick={() => setGoal(g.id)} className="flex-col items-start gap-1 pr-10">
                    <span className="font-bold">{g.label}</span>
                    <span className="text-sm text-muted">{g.hint}</span>
                  </Choice>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Practice days per week">
                {DAYS.map((d) => (
                  <Choice key={d.value} role="radio" selected={days === d.value} onClick={() => setDays(d.value)} className="flex-col items-start gap-0.5">
                    <span className="font-display text-3xl font-bold tabular-nums">{d.value}</span>
                    <span className="text-sm text-muted">{`days · ${d.label}`}</span>
                  </Choice>
                ))}
              </div>
            )}

            {step === RESULT && options.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Where to start">
                {options.map((item, i) => (
                  <div key={`${item.kind}-${item.id}`} className={i === 0 ? 'sm:col-span-2' : ''}>
                    <Option
                      item={item}
                      days={days}
                      large={i === 0}
                      selected={choice === i}
                      onSelect={() => setChoice(i)}
                    />
                  </div>
                ))}
              </div>
            )}
            {step === RESULT && soon.length > 0 && (
              <p className="text-sm text-muted">
                {`${soon.map((s) => s.name).join(', ')}: coming soon. We’re picking the best free lessons now.`}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => go(step - 1)}>Back</Button>
          ) : <span />}
          {step < 2 && (
            <Button onClick={() => go(step + 1)} disabled={!canContinue}>
              {step === 0 && interests.length ? `Continue with ${interests.length}` : 'Continue'}
            </Button>
          )}
          {step === 2 && <Button onClick={() => go(RESULT)}>Show me where to start</Button>}
          {step === RESULT && !visitor && (
            <SubmitButton pendingText="Saving…">{pick ? `Start ${pick.title}` : 'Go to my home'}</SubmitButton>
          )}
          {step === RESULT && visitor && (
            <button
              type="button"
              onClick={signUp}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-pill bg-accent px-6 text-base font-bold text-on-accent hover:bg-accent/90"
            >
              Sign up with Google to start
              <ArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </button>
          )}
        </div>
      </Wrapper>

      {visitor && step === RESULT && (
        <div className="grid gap-2 text-sm text-muted sm:justify-self-end sm:text-right">
          <p>
            {'Already have an account? '}
            <button type="button" onClick={signUp} className="font-bold text-accent hover:underline">Sign in</button>
          </p>
          <p className="max-w-[34rem]">
            {`Free, with a Google account. By continuing you confirm you’re ${LEGAL.minimumAge} or older and agree to the `}
            <Link href="/terms" className="font-bold text-accent hover:underline">Terms</Link>
            {' and '}
            <Link href="/privacy" className="font-bold text-accent hover:underline">Privacy policy</Link>
            .
          </p>
        </div>
      )}

      {!visitor && (
        <form action={skipAction} className="justify-self-center">
          <Button type="submit" variant="quiet" size="sm">Skip for now</Button>
        </form>
      )}
    </div>
  );
}
