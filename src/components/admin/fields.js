import React from 'react';

const INPUT = 'rounded-md border border-line bg-surface px-3 text-[15px] placeholder:text-muted';

export function Field({
  id, label, hint, children,
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-sm font-bold">{label}</label>
      {children}
      {hint && <p className="text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function inputClass(extra = '') {
  return `${INPUT} h-11 ${extra}`;
}

export function textareaClass(extra = '') {
  return `${INPUT} py-2 ${extra}`;
}

export function FormMessage({ state }) {
  if (state?.error) return <p role="alert" className="text-sm text-danger">{state.error}</p>;
  if (state?.ok) return <p role="status" className="text-sm text-accent">{state.ok}</p>;
  return null;
}
