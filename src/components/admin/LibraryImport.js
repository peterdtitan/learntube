'use client';

import React from 'react';
import SubmitButton from './SubmitButton';
import useFormAction from './useFormAction';
import { FormMessage } from './fields';

export default function LibraryImport({
  action, slug, imported, label = 'Import program', againLabel = 'Import any missing courses',
  publishOption = true, pendingText = 'Importing… (up to a minute)',
}) {
  const { state, onSubmit, pending } = useFormAction(action);
  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input type="hidden" name="slug" value={slug} />
      {publishOption && (
        <label className="flex items-center gap-2 text-[15px]">
          <input type="checkbox" name="publish" className="h-4 w-4" />
          Publish its quizzes straight away (otherwise they import as drafts to review)
        </label>
      )}
      <SubmitButton pending={pending} pendingText={pendingText} className="justify-self-start">
        {imported ? againLabel : label}
      </SubmitButton>
      <FormMessage state={state} />
    </form>
  );
}
