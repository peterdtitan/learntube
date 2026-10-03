import React from 'react';
import Button from '../components/ui/Button';

export const metadata = { title: 'Page not found · LearnTube' };

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-lg justify-items-start gap-4 py-16">
      <p className="text-sm font-bold uppercase tracking-widest text-muted">404</p>
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">We couldn’t find that page.</h1>
      <p className="text-lg text-muted">
        The link may be out of date, or the lesson or make may have been removed.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/">Go to the home page</Button>
        <Button href="/pathways" variant="ghost">Browse pathways</Button>
      </div>
    </div>
  );
}
