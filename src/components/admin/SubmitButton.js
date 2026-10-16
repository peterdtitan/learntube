'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from '../ui/Button';

// Forms using useFormAction pass `pending`; plain action forms get it from the form's status.
export default function SubmitButton({
  children, pendingText = 'Saving…', disabled = false, pending: submitting, ...props
}) {
  const status = useFormStatus();
  const pending = submitting ?? status.pending;
  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
