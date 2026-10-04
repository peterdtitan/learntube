'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import SubmitButton from '../admin/SubmitButton';
import { GOALS } from '../../lib/recommend';
import cn from '../../lib/cn';
import SkillIcon from '../ui/SkillIcon';

const DAYS = [
  { value: 2, label: 'Gentle' },
  { value: 3, label: 'Steady' },
  { value: 4, label: 'Keen' },
  { value: 5, label: 'All in' },
];

const STEPS = [
  { title: 'Hey star, what are your interests?', sub: 'Pick as many as you like. We’ll suggest where to start.' },
  { title: 'What brings you here?', sub: 'This helps us choose between quick skills and longer programs.' },
  { title: 'How many days a week can you practise?', sub: 'A little, often, beats a lot once. You can change it any time.' },
];

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

// Three short steps. Answers live in state and go up as hidden inputs, so the step that is
// showing doesn't decide what gets submitted.
export default function WelcomeSurvey({
  categories, initial, saveAction, skipAction,
}) {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState(initial.interests);
  const [goal, setGoal] = useState(initial.goal);
  const [days, setDays] = useState(initial.weeklyGoal);
  const heading = useRef(null);
  const reduce = useReducedMotion();

  const canContinue = [interests.length > 0, Boolean(goal), true][step];
  const go = (next) => {
    setStep(next);
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
          <p className="text-sm font-bold text-muted">{`Step ${step + 1} of ${STEPS.length}`}</p>
          <div className="h-1.5 overflow-hidden rounded-pill bg-sunken">
            <motion.div
              className="h-full rounded-pill bg-accent"
              initial={false}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            />
          </div>
        </div>
      </div>

      <form action={saveAction} className="grid gap-6">
        {interests.map((id) => <input key={id} type="hidden" name="interest" value={id} />)}
        <input type="hidden" name="goal" value={goal || ''} />
        <input type="hidden" name="weeklyGoal" value={days} />

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
                {STEPS[step].title}
              </h1>
              <p className="text-lg text-muted">{STEPS[step].sub}</p>
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
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => go(step - 1)}>Back</Button>
          ) : <span />}
          {step < STEPS.length - 1 ? (
            <Button onClick={() => go(step + 1)} disabled={!canContinue}>
              {step === 0 && interests.length ? `Continue with ${interests.length}` : 'Continue'}
            </Button>
          ) : (
            <SubmitButton pendingText="Finding your skills…">Show me where to start</SubmitButton>
          )}
        </div>
      </form>

      <form action={skipAction} className="justify-self-center">
        <Button type="submit" variant="quiet" size="sm">Skip for now</Button>
      </form>
    </div>
  );
}
