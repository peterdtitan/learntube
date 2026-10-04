'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { Sparkles } from 'lucide-react';
import SubmitButton from './SubmitButton';
import { Field, FormMessage, inputClass } from './fields';

function NumberField({
  id, label, hint, value, unit,
}) {
  return (
    <Field id={id} label={label} hint={hint}>
      <span className="flex items-center gap-2">
        <input id={id} name={id} inputMode="numeric" defaultValue={value} className={inputClass('w-24 tabular-nums')} />
        {unit && <span className="text-sm text-muted">{unit}</span>}
      </span>
    </Field>
  );
}

export function QuizSettingsForm({ action, quiz, lessons }) {
  const [state, formAction] = useFormState(action, null);
  const checkpoint = quiz.kind === 'CHECKPOINT';
  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="id" value={quiz.id} />
      <Field id="title" label="Title" hint="Optional, e.g. “Dough basics checkpoint”.">
        <input id="title" name="title" maxLength={120} defaultValue={quiz.title || ''} className={inputClass()} />
      </Field>
      <div className="flex flex-wrap gap-6">
        <NumberField id="passPercent" label="Pass mark" value={quiz.passPercent} unit="%" />
        {checkpoint && <NumberField id="timeLimitMin" label="Time limit" value={Math.round((quiz.timeLimitSec || 600) / 60)} unit="minutes" />}
      </div>

      {checkpoint && (
        <>
          <Field id="afterVideoId" label="Comes after" hint="Where it sits in the module. Halfway by default.">
            <select id="afterVideoId" name="afterVideoId" defaultValue={quiz.afterVideoId || ''} className={inputClass('max-w-md')}>
              <option value="">The middle lesson</option>
              {lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
            </select>
          </Field>
          <fieldset className="grid gap-3 rounded-md border border-line p-4">
            <legend className="px-1 text-sm font-bold">Integrity deductions (points off the score)</legend>
            <div className="flex flex-wrap gap-6">
              <NumberField id="leavePenalty" label="Each time they leave" value={quiz.leavePenalty} />
              <NumberField id="awayPenalty" label="Per 10 s away" value={quiz.awayPenalty} />
              <NumberField id="copyPenalty" label="Each copy or paste" value={quiz.copyPenalty} />
              <NumberField id="maxPenalty" label="Most in total" value={quiz.maxPenalty} />
              <NumberField id="timePenalty" label="Clock penalty" value={quiz.timePenalty} unit="× time away" />
            </div>
            <p className="text-sm text-muted">
              Leaving is spotted when the quiz tab or window loses focus. Phones, second screens and
              apps outside the browser can’t be detected; the report shows exactly what was.
            </p>
          </fieldset>
        </>
      )}

      <label className="flex items-center gap-3 text-[15px] font-bold">
        <input type="checkbox" name="published" defaultChecked={quiz.published} className="h-4 w-4" />
        Published (learners can see it)
      </label>
      <FormMessage state={state} />
      <SubmitButton className="justify-self-start">Save settings</SubmitButton>
    </form>
  );
}

export function DraftForm({
  action, quizId, defaultCount, disabledReason,
}) {
  const [state, formAction] = useFormState(action, null);
  return (
    <form action={formAction} className="grid gap-3">
      <input type="hidden" name="quizId" value={quizId} />
      <div className="flex flex-wrap items-end gap-3">
        <NumberField id="count" label="How many" value={defaultCount} />
        <SubmitButton variant="ghost" pendingText="Drafting… (up to a minute)" disabled={Boolean(disabledReason)}>
          <Sparkles size={16} aria-hidden="true" />
          Draft questions with AI
        </SubmitButton>
      </div>
      {disabledReason && <p className="text-sm text-muted">{disabledReason}</p>}
      <FormMessage state={state} />
    </form>
  );
}
