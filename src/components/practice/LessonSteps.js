'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Camera, Check, Hand, Play,
} from 'lucide-react';
import { XP } from '../../lib/xpValues';
import cn from '../../lib/cn';

export const STEPS = [
  { title: 'Watch the step', xp: XP.WATCH, body: 'Short segments with captions. Loop the tricky part and slow it down as often as you need.' },
  { title: 'Try it yourself', xp: XP.TRY, body: 'Every lesson ends with a task for your hands: cast on 20 stitches, dice an onion, write a form.' },
  { title: 'Log what you made', xp: XP.LOG, body: 'Add a photo and a note to your makes. Other learners can give kudos.' },
];

const CYCLE_MS = 3600;

// Small looping pictures of each step. They only move while their step is the active one.
function Picture({ index, active, still }) {
  const moving = active && !still;
  if (index === 0) {
    return (
      <div className="relative grid h-20 place-items-center overflow-hidden rounded-md bg-[#1B2228]">
        <Play size={26} className="text-white" fill="currentColor" aria-hidden="true" />
        <div className="absolute inset-x-3 bottom-2.5 h-1 overflow-hidden rounded-pill bg-white/25">
          <motion.div
            className="h-full bg-accent"
            initial={false}
            animate={{ width: moving ? ['0%', '100%'] : '62%' }}
            transition={moving ? { duration: CYCLE_MS / 1000, ease: 'linear' } : { duration: 0 }}
          />
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative grid h-20 place-items-center rounded-md bg-accent-soft">
        <motion.span
          className="text-accent"
          animate={moving ? { rotate: [0, -12, 10, -6, 0], y: [0, -3, 0] } : {}}
          transition={{ duration: 1.2, repeat: moving ? Infinity : 0, repeatDelay: 0.4 }}
        >
          <Hand size={30} aria-hidden="true" />
        </motion.span>
        <AnimatePresence>
          {moving && (
            <motion.span
              className="absolute right-4 top-3 grid h-6 w-6 place-items-center rounded-full bg-accent text-on-accent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                delay: 1.4, type: 'spring', stiffness: 400, damping: 15,
              }}
            >
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return (
    <div className="relative grid h-20 place-items-center overflow-hidden rounded-md bg-xp-soft">
      <motion.div
        className="grid h-12 w-16 place-items-center rounded-sm border-2 border-white bg-surface shadow-md"
        animate={moving
          ? { y: [24, 0], rotate: [-8, -3], opacity: [0, 1] }
          : { y: 0, rotate: -3, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Camera size={18} className="text-xp" aria-hidden="true" />
      </motion.div>
      <AnimatePresence>
        {moving && (
          <motion.span
            className="absolute right-3 top-2 rounded-pill bg-xp px-2 py-0.5 text-xs font-bold text-white"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: -2 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            {`+${XP.LOG} XP`}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// The three steps of every lesson, highlighted in turn. Pauses while hovered or focused, and
// holds still for reduced motion.
export default function LessonSteps() {
  const still = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (still || paused) return undefined;
    const t = setInterval(() => setActive((i) => (i + 1) % STEPS.length), CYCLE_MS);
    return () => clearInterval(t);
  }, [still, paused]);

  return (
    <ol
      className="grid gap-4 md:grid-cols-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {STEPS.map((step, i) => {
        const on = !still && i === active;
        return (
          <li
            key={step.title}
            className={cn(
              'grid content-start gap-3 rounded-lg border bg-surface p-5 transition-[border-color,box-shadow] duration-300',
              on ? 'border-accent shadow-md' : 'border-line',
            )}
          >
            <Picture index={i} active={on} still={still} />
            <div className="flex items-center gap-2">
              <span className={cn('grid h-7 w-7 place-items-center rounded-full text-sm font-bold transition-colors', on ? 'bg-accent text-on-accent' : 'bg-accent-soft text-accent')}>{i + 1}</span>
              <h3 className="flex flex-1 flex-wrap items-center justify-between gap-2 font-sans text-[17px] font-bold">
                {step.title}
                <span className="rounded-pill bg-xp-soft px-2.5 py-0.5 text-[13px] text-xp tabular-nums">{`+${step.xp} XP`}</span>
              </h3>
            </div>
            <p className="text-[15px] text-muted">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
