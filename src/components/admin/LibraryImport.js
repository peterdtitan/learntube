'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import { FormMessage } from './fields';

export default function LibraryImport({ action, slug, imported }) {
  const [state, formAction] = useFormState(action, null);
  return (
    <form action={formAction} className="grid gap-3">
      <input type="hidden" name="slug" value={slug} />
      <label className="flex items-center gap-2 text-[15px]">
        <input type="checkbox" name="publish" className="h-4 w-4" />
        Publish its quizzes straight away (otherwise they import as drafts to review)
      </label>
      <SubmitButton pendingText="Importing… (up to a minute)" className="justify-self-start">
        {imported ? 'Import any missing courses' : 'Import program'}
      </SubmitButton>
      <FormMessage state={state} />
    </form>
  );
}
