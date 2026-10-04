import React from 'react';
import Link from 'next/link';
import { LEGAL } from '../../lib/legal';

// Shared layout for the privacy policy and terms: readable measure, numbered sections.
export function Section({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="grid gap-3">
      <h2 id={`${id}-heading`} className="text-xl font-bold">{title}</h2>
      <div className="grid gap-3 text-[16px] leading-relaxed [&_li]:pl-1 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function Mail() {
  return <a href={`mailto:${LEGAL.contactEmail}`} className="font-bold text-accent">{LEGAL.contactEmail}</a>;
}

export default function LegalPage({
  title, intro, other, children,
}) {
  return (
    <article className="mx-auto grid max-w-[68ch] gap-8">
      <header className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">{title}</h1>
        <p className="text-sm text-muted">{`Last updated ${LEGAL.updated}`}</p>
        <p className="text-lg text-muted">{intro}</p>
      </header>
      {children}
      <footer className="border-t border-line pt-6 text-[15px] text-muted">
        {'Questions? Email '}
        <Mail />
        {'. See also our '}
        <Link href={other.href} className="font-bold text-accent">{other.label}</Link>
        .
      </footer>
    </article>
  );
}
