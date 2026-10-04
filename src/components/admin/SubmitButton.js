'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from '../ui/Button';

export default function SubmitButton({
  children, pendingText = 'Saving…', disabled = false, ...props
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
