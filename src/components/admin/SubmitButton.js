'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from '../ui/Button';

export default function SubmitButton({ children, pendingText = 'Saving…', ...props }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
