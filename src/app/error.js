'use client';

import React, { useEffect } from 'react';
import Button from '../components/ui/Button';

// Shown when a page throws. The digest matches the error in the Vercel logs.
export default function Error({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- surface the error in the browser console
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto grid max-w-lg justify-items-start gap-4 py-16">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Something went wrong on our side.</h1>
      <p className="text-lg text-muted">
        Your progress is saved. Try again, and if it keeps happening, come back in a few minutes.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="ghost">Go to the home page</Button>
      </div>
      {error?.digest && <p className="text-xs text-muted">{`Reference: ${error.digest}`}</p>}
    </div>
  );
}
