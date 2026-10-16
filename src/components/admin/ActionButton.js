'use client';

import React from 'react';
import SubmitButton from './SubmitButton';
import useFormAction from './useFormAction';
import { FormMessage } from './fields';

// One button that runs a server action and shows what it said back.
export default function ActionButton({
  action, children, pendingText, variant,
}) {
  const { state, onSubmit, pending } = useFormAction(action);
  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <SubmitButton pending={pending} pendingText={pendingText} variant={variant} className="justify-self-start">{children}</SubmitButton>
      <FormMessage state={state} />
    </form>
  );
}
