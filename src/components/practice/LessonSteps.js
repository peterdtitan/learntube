import React from 'react';
import { XP } from '../../lib/xpValues';

const STEPS = [
  { title: 'Watch the step', xp: XP.WATCH, body: 'Short segments with captions. Loop the tricky part and slow it down as often as you need.' },
  { title: 'Try it yourself', xp: XP.TRY, body: 'Every lesson ends with a task for your hands: cast on 20 stitches, dice an onion, write a form.' },
  { title: 'Log what you made', xp: XP.LOG, body: 'Add a photo and a note to your makes. Other learners can give kudos.' },
];

export default function LessonSteps() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {STEPS.map((step, i) => (
        <li key={step.title} className="grid content-start gap-2 rounded-lg border border-line bg-surface p-5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-soft text-sm font-bold text-accent">{i + 1}</span>
          <h3 className="flex flex-wrap items-center justify-between gap-2 font-sans text-[17px] font-bold">
            {step.title}
            <span className="rounded-pill bg-xp-soft px-2.5 py-0.5 text-[13px] text-xp tabular-nums">{`+${step.xp} XP`}</span>
          </h3>
          <p className="text-[15px] text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
