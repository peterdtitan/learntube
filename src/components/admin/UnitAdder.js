'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import { FormMessage } from './fields';
import { createUnit } from '../../app/admin/actions';

export default function UnitAdder({ pathwayId }) {
  const [state, formAction] = useFormState(createUnit, null);
  const formRef = useRef(null);
  useEffect(() => { if (state?.ok) formRef.current?.reset(); }, [state]);
  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-end gap-2">
      <input type="hidden" name="pathwayId" value={pathwayId} />
      <div className="grid min-w-[240px] flex-1 gap-1">
        <label htmlFor="new-unit" className="text-sm font-bold">New module</label>
        <input id="new-unit" name="title" required maxLength={120} placeholder="e.g. Knife skills" className="h-11 rounded-md border border-line bg-surface px-3 text-[15px] placeholder:text-muted" />
      </div>
      <SubmitButton variant="ghost">Add module</SubmitButton>
      <div className="w-full"><FormMessage state={state} /></div>
    </form>
  );
}
