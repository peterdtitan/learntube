'use client';

import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { Plus, X } from 'lucide-react';
import SubmitButton from './SubmitButton';
import {
  Field, FormMessage, inputClass, textareaClass,
} from './fields';

const TYPES = [
  ['SINGLE', 'One right answer'],
  ['MULTI', 'Several right answers'],
  ['TRUE_FALSE', 'True or false'],
  ['ORDER', 'Put steps in order'],
  ['MATCH', 'Match pairs'],
  ['TEXT', 'Type a word or phrase'],
  ['NUMBER', 'Type a number'],
];

// Starting fields per type, so switching type never leaves the form in a broken state.
function blank(type) {
  switch (type) {
    case 'SINGLE': return { options: ['', ''], answer: 0 };
    case 'MULTI': return { options: ['', '', ''], answers: [] };
    case 'TRUE_FALSE': return { answer: true };
    case 'ORDER': return { items: ['', '', ''] };
    case 'MATCH': return { pairs: [['', ''], ['', ''], ['', '']] };
    case 'TEXT': return { accepted: [''] };
    case 'NUMBER': return { answer: '', tolerance: 0 };
    default: return {};
  }
}

const small = 'grid h-9 w-9 shrink-0 place-items-center rounded-pill text-muted hover:bg-sunken hover:text-ink disabled:opacity-30';

// `mark` adds a radio or checkbox per row for marking the right answers:
// { type, name, isOn(i), toggle(i, on) }.
function ListEditor({
  label, values, onChange, min = 2, max = 8, mark,
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="text-sm font-bold">{label}</legend>
      {values.map((v, i) => (
        // Rows are edited in place by position.
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="flex items-center gap-2">
          {mark && (
            <input
              type={mark.type}
              name={mark.name}
              checked={mark.isOn(i)}
              onChange={(e) => mark.toggle(i, e.target.checked)}
              aria-label={`${label} ${i + 1} is right`}
              className="h-4 w-4"
            />
          )}
          <input
            aria-label={`${label} ${i + 1}`}
            value={v}
            onChange={(e) => onChange(values.map((x, j) => (j === i ? e.target.value : x)))}
            className={inputClass('min-w-0 flex-1')}
          />
          <button
            type="button"
            className={small}
            disabled={values.length <= min}
            onClick={() => onChange(values.filter((_, j) => j !== i), i)}
            aria-label={`Remove ${label.toLowerCase()} ${i + 1}`}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      {values.length < max && (
        <button type="button" onClick={() => onChange([...values, ''])} className="inline-flex items-center gap-1 justify-self-start text-sm font-bold text-accent">
          <Plus size={15} />
          Add
        </button>
      )}
    </fieldset>
  );
}

// Keeps marked answers pointing at the same options after one is removed.
function afterRemoving(index, removed) {
  if (removed === undefined || index < removed) return index;
  return index === removed ? -1 : index - 1;
}

function setPair(pairs, row, side, text) {
  return pairs.map((p, j) => {
    if (j !== row) return p;
    return side === 0 ? [text, p[1]] : [p[0], text];
  });
}

export default function QuestionEditor({
  action, quizId, question, onDone,
}) {
  const [state, formAction] = useFormState(action, null);
  const [type, setType] = useState(question?.type || 'SINGLE');
  const [data, setData] = useState(question?.data || blank('SINGLE'));
  const [key, setKey] = useState(0);
  const set = (patch) => setData((d) => ({ ...d, ...patch }));

  // After adding a new question, clear the form for the next one.
  useEffect(() => {
    if (!state?.savedAt) return;
    if (question) onDone?.();
    else {
      setData(blank(type));
      setKey((k) => k + 1);
    }
  }, [state?.savedAt]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeType = (next) => {
    setType(next);
    setData(blank(next));
  };

  let fields = null;
  if (type === 'SINGLE') {
    fields = (
      <ListEditor
        label="Option"
        values={data.options}
        onChange={(options, removed) => set({
          options, answer: Math.max(0, afterRemoving(data.answer, removed)),
        })}
        mark={{
          type: 'radio',
          name: `right-${key}`,
          isOn: (i) => data.answer === i,
          toggle: (i) => set({ answer: i }),
        }}
      />
    );
  } else if (type === 'MULTI') {
    fields = (
      <ListEditor
        label="Option"
        values={data.options}
        onChange={(options, removed) => set({
          options,
          answers: data.answers.map((a) => afterRemoving(a, removed)).filter((a) => a >= 0),
        })}
        mark={{
          type: 'checkbox',
          name: `right-${key}`,
          isOn: (i) => data.answers.includes(i),
          toggle: (i, on) => set({
            answers: on ? [...data.answers, i] : data.answers.filter((a) => a !== i),
          }),
        }}
      />
    );
  } else if (type === 'TRUE_FALSE') {
    fields = (
      <fieldset className="flex gap-4">
        <legend className="mb-1 text-sm font-bold">The statement is</legend>
        {[[true, 'True'], [false, 'False']].map(([v, l]) => (
          <label key={l} className="flex items-center gap-2 text-[15px]">
            <input type="radio" name={`tf-${key}`} checked={data.answer === v} onChange={() => set({ answer: v })} className="h-4 w-4" />
            {l}
          </label>
        ))}
      </fieldset>
    );
  } else if (type === 'ORDER') {
    fields = (
      <>
        <ListEditor label="Step" values={data.items} onChange={(items) => set({ items })} />
        <p className="text-sm text-muted">Enter the steps in the right order. Learners see them shuffled.</p>
      </>
    );
  } else if (type === 'MATCH') {
    fields = (
      <fieldset className="grid gap-2">
        <legend className="text-sm font-bold">Pairs (left matches right)</legend>
        {data.pairs.map(([l, r], i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="flex items-center gap-2">
            {[[l, 0, 'Left'], [r, 1, 'Right']].map(([v, side, word]) => (
              <input
                key={word}
                aria-label={`${word} ${i + 1}`}
                value={v}
                onChange={(e) => set({ pairs: setPair(data.pairs, i, side, e.target.value) })}
                className={inputClass('min-w-0 flex-1')}
              />
            ))}
            <button type="button" className={small} disabled={data.pairs.length <= 2} onClick={() => set({ pairs: data.pairs.filter((_, j) => j !== i) })} aria-label={`Remove pair ${i + 1}`}>
              <X size={16} />
            </button>
          </div>
        ))}
        {data.pairs.length < 8 && (
          <button type="button" onClick={() => set({ pairs: [...data.pairs, ['', '']] })} className="inline-flex items-center gap-1 justify-self-start text-sm font-bold text-accent">
            <Plus size={15} />
            Add pair
          </button>
        )}
      </fieldset>
    );
  } else if (type === 'TEXT') {
    fields = (
      <>
        <ListEditor label="Accepted answer" values={data.accepted} onChange={(accepted) => set({ accepted })} min={1} max={10} />
        <p className="text-sm text-muted">Case, extra spaces and a trailing full stop are ignored.</p>
      </>
    );
  } else if (type === 'NUMBER') {
    fields = (
      <div className="flex flex-wrap gap-4">
        <Field id={`num-${key}`} label="Right answer">
          <input id={`num-${key}`} inputMode="decimal" value={data.answer} onChange={(e) => set({ answer: e.target.value })} className={inputClass('w-32 tabular-nums')} />
        </Field>
        <Field id={`tol-${key}`} label="Allow ±">
          <input id={`tol-${key}`} inputMode="decimal" value={data.tolerance} onChange={(e) => set({ tolerance: e.target.value })} className={inputClass('w-24 tabular-nums')} />
        </Field>
      </div>
    );
  }

  const prefix = question?.id || `new-${key}`;
  return (
    <form key={key} action={formAction} className="grid gap-4">
      <input type="hidden" name="quizId" value={quizId} />
      {question && <input type="hidden" name="id" value={question.id} />}
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="data" value={JSON.stringify(data)} />

      <Field id={`type-${prefix}`} label="Type">
        <select id={`type-${prefix}`} value={type} onChange={(e) => changeType(e.target.value)} className={inputClass('max-w-xs')}>
          {TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </Field>
      <Field id={`prompt-${prefix}`} label="Question">
        <textarea id={`prompt-${prefix}`} name="prompt" rows={2} maxLength={500} defaultValue={question?.prompt || ''} required className={textareaClass()} />
      </Field>
      {fields}
      <Field id={`exp-${prefix}`} label="Why it’s right" hint="Optional. Shown on the results screen.">
        <input id={`exp-${prefix}`} name="explanation" maxLength={500} defaultValue={question?.explanation || ''} className={inputClass()} />
      </Field>
      <FormMessage state={state} />
      <SubmitButton size="sm" className="justify-self-start">{question ? 'Save question' : 'Add question'}</SubmitButton>
    </form>
  );
}
