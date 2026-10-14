'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import { FormMessage } from './fields';

// One button that runs a server action and shows what it said back.
export default function ActionButton({
  action, children, pendingText, variant,
}) {
  const [state, formAction] = useFormState(action, null);
  return (
    <form action={formAction} className="grid gap-2">
      <SubmitButton pendingText={pendingText} variant={variant} className="justify-self-start">{children}</SubmitButton>
      <FormMessage state={state} />
    </form>
  );
}
