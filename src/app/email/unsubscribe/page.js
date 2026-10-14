import React from 'react';
import Link from 'next/link';
import { SCOPES, readUnsubscribeToken } from '../../../lib/email/unsubscribe';
import { PRIVATE } from '../../../lib/seo';
import SubmitButton from '../../../components/admin/SubmitButton';
import unsubscribe from './actions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Unsubscribe · Skillreps', ...PRIVATE };

// Asks before changing anything: mail scanners open links in emails, and opening a link
// shouldn't be enough to unsubscribe someone.
export default function UnsubscribePage({ searchParams = {} }) {
  const token = readUnsubscribeToken(searchParams.t);
  const label = token && SCOPES[token.scope].label;
  let body;
  if (!token) {
    body = (
      <p className="text-[15px] text-muted">
        This link isn’t valid. You can change which emails you get in your settings.
      </p>
    );
  } else if (searchParams.done) {
    body = (
      <p role="status" className="text-[15px]">
        {`Done. You won’t get ${label} any more. You can turn them back on in your settings.`}
      </p>
    );
  } else {
    body = (
      <form action={unsubscribe} className="grid gap-4">
        <input type="hidden" name="t" value={searchParams.t} />
        <p className="text-[15px]">{`Stop getting ${label} from Skillreps?`}</p>
        <SubmitButton pendingText="Unsubscribing…" className="justify-self-start">Unsubscribe</SubmitButton>
      </form>
    );
  }
  return (
    <div className="mx-auto grid max-w-md gap-5 rounded-lg border border-line bg-surface p-8 sm:mt-10">
      <h1 className="text-3xl font-bold">Emails</h1>
      {body}
      <Link href="/settings#emails" className="text-sm font-bold text-accent hover:underline">Email settings</Link>
    </div>
  );
}
