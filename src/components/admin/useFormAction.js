'use client';

import { startTransition, useActionState } from 'react';

// React 19 clears a form once its action finishes, even when the action sends back an error,
// so a rejected save would wipe what was typed. Submitting from onSubmit keeps the fields;
// forms that want a fresh start after saving still reset themselves.
export default function useFormAction(action) {
  const [state, run, pending] = useActionState(action, null);
  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget, event.nativeEvent.submitter);
    startTransition(() => run(data));
  };
  return { state, onSubmit, pending };
}
