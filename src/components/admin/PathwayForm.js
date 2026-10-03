'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import {
  Field, FormMessage, inputClass, textareaClass,
} from './fields';

export default function PathwayForm({
  action, pathway, skills, submitLabel,
}) {
  const [state, formAction] = useFormState(action, null);
  return (
    <form action={formAction} className="grid gap-4">
      {pathway && <input type="hidden" name="id" value={pathway.id} />}
      <Field id="pw-title" label="Title">
        <input id="pw-title" name="title" required maxLength={120} defaultValue={pathway?.title} className={inputClass()} />
      </Field>
      <Field id="pw-skill" label="Skill">
        <select id="pw-skill" name="skillId" defaultValue={pathway?.skillId || ''} className={inputClass()}>
          <option value="">No skill</option>
          {skills.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </Field>
      <Field id="pw-make" label="You'll make" hint="What a learner has made by the end, e.g. “A lined zip pouch”.">
        <input id="pw-make" name="makeTitle" maxLength={160} defaultValue={pathway?.makeTitle || ''} className={inputClass()} />
      </Field>
      <Field id="pw-desc" label="Description">
        <textarea id="pw-desc" name="description" rows={3} maxLength={600} defaultValue={pathway?.description || ''} className={textareaClass()} />
      </Field>
      <FormMessage state={state} />
      <SubmitButton className="justify-self-start">{submitLabel}</SubmitButton>
    </form>
  );
}
