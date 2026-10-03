import React from 'react';

// Placeholder shapes while a server-rendered page loads.
// Only use it on routes that never call notFound(): a loading boundary makes Next
// send a 200 before the page can decide it should be a 404.
export default function PageSkeleton() {
  return (
    <div className="grid animate-pulse gap-6" aria-busy="true" aria-label="Loading">
      <div className="h-10 w-2/3 max-w-md rounded-md bg-sunken" />
      <div className="h-5 w-full max-w-xl rounded-md bg-sunken" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-48 rounded-lg bg-sunken" />
        <div className="h-48 rounded-lg bg-sunken" />
      </div>
    </div>
  );
}
