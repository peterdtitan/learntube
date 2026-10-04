'use client';

import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import cn from '../../lib/cn';

const choice = 'flex cursor-pointer items-center gap-3 rounded-md border border-line px-4 py-3 text-[16px] has-[:checked]:border-accent has-[:checked]:bg-accent-soft';
const field = 'h-11 w-full rounded-md border border-line bg-surface px-3 text-[16px] focus:border-accent focus:outline-none';

// Answers one question of any type. `value` is the learner's answer in the shape
// gradeQuestion expects; ORDER starts from the shuffled list it was given.
export default function QuestionInput({
  question: q, value, onChange, disabled = false, idPrefix = 'q',
}) {
  const name = `${idPrefix}-${q.id}`;

  switch (q.type) {
    case 'SINGLE':
      return (
        <fieldset className="grid gap-2" disabled={disabled}>
          <legend className="sr-only">{q.prompt}</legend>
          {q.options.map((opt, i) => (
            // Options never reorder within a question.
            // eslint-disable-next-line react/no-array-index-key
            <label key={i} className={choice}>
              <input type="radio" name={name} checked={value === i} onChange={() => onChange(i)} className="h-4 w-4 accent-accent" />
              {opt}
            </label>
          ))}
        </fieldset>
      );
    case 'MULTI': {
      const picked = Array.isArray(value) ? value : [];
      return (
        <fieldset className="grid gap-2" disabled={disabled}>
          <legend className="text-sm text-muted">{`Choose ${q.pick}.`}</legend>
          {q.options.map((opt, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <label key={i} className={choice}>
              <input
                type="checkbox"
                checked={picked.includes(i)}
                onChange={(e) => onChange(e.target.checked
                  ? [...picked, i]
                  : picked.filter((x) => x !== i))}
                className="h-4 w-4"
              />
              {opt}
            </label>
          ))}
        </fieldset>
      );
    }
    case 'TRUE_FALSE':
      return (
        <fieldset className="flex flex-wrap gap-2" disabled={disabled}>
          <legend className="sr-only">{q.prompt}</legend>
          {[[true, 'True'], [false, 'False']].map(([v, label]) => (
            <label key={label} className={cn(choice, 'min-w-[8rem] justify-center')}>
              <input type="radio" name={name} checked={value === v} onChange={() => onChange(v)} className="h-4 w-4" />
              {label}
            </label>
          ))}
        </fieldset>
      );
    case 'ORDER': {
      const list = Array.isArray(value) && value.length === q.items.length ? value : q.items;
      const move = (i, d) => {
        const next = [...list];
        [next[i], next[i + d]] = [next[i + d], next[i]];
        onChange(next);
      };
      return (
        <ol className="grid gap-2" aria-label="Put these in order">
          {list.map((item, i) => (
            <li key={item} className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2">
              <span className="w-6 text-center font-bold tabular-nums text-muted">{i + 1}</span>
              <span className="flex-1 text-[16px]">{item}</span>
              <button type="button" disabled={disabled || i === 0} onClick={() => move(i, -1)} aria-label={`Move “${item}” up`} className="grid h-9 w-9 place-items-center rounded-pill hover:bg-sunken disabled:opacity-30">
                <ArrowUp size={16} />
              </button>
              <button type="button" disabled={disabled || i === list.length - 1} onClick={() => move(i, 1)} aria-label={`Move “${item}” down`} className="grid h-9 w-9 place-items-center rounded-pill hover:bg-sunken disabled:opacity-30">
                <ArrowDown size={16} />
              </button>
            </li>
          ))}
        </ol>
      );
    }
    case 'MATCH': {
      const chosen = Array.isArray(value) ? value : [];
      return (
        <div className="grid gap-2">
          {q.lefts.map((left, i) => (
            <div key={left} className="grid items-center gap-2 sm:grid-cols-[1fr_1fr]">
              <label htmlFor={`${name}-${i}`} className="text-[16px] font-bold">{left}</label>
              <select
                id={`${name}-${i}`}
                disabled={disabled}
                value={chosen[i] ?? ''}
                onChange={(e) => {
                  const next = [...chosen];
                  next[i] = e.target.value || null;
                  onChange(next);
                }}
                className={field}
              >
                <option value="">Choose…</option>
                {q.rights.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          ))}
        </div>
      );
    }
    case 'TEXT':
      return (
        <>
          <label htmlFor={name} className="sr-only">Your answer</label>
          <input id={name} disabled={disabled} value={value ?? ''} onChange={(e) => onChange(e.target.value)} autoComplete="off" className={field} />
        </>
      );
    case 'NUMBER':
      return (
        <>
          <label htmlFor={name} className="sr-only">Your answer (a number)</label>
          <input id={name} disabled={disabled} inputMode="decimal" value={value ?? ''} onChange={(e) => onChange(e.target.value)} autoComplete="off" className={cn(field, 'max-w-[12rem] tabular-nums')} />
        </>
      );
    default:
      return null;
  }
}
