import React from 'react';
import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';
import { LEGAL } from '../../../lib/legal';
import { PRIVATE } from '../../../lib/seo';

export const metadata = { title: 'Sign in · Skillreps', ...PRIVATE };

// NextAuth's error codes, in words. Anything unexpected gets the general message.
const ERRORS = {
  AccessDenied: 'Sign-in was cancelled. Try again when you’re ready.',
  OAuthAccountNotLinked: 'That email is already linked to another sign-in. Use the Google account you first signed in with.',
  Configuration: 'Sign-in isn’t working on our side right now. Please try again in a few minutes.',
};
const DEFAULT_ERROR = 'Something went wrong signing in with Google. Please try again.';

// Only same-site paths are allowed as a return destination.
function safeCallback(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}

export default function SignIn({ searchParams }) {
  return (
    <div className="mx-auto grid max-w-md gap-5 rounded-lg border border-line bg-surface p-8 sm:mt-10">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-[15px] text-muted">
        Skillreps is free, with an account: it saves your place in every lesson, your notes and
        makes, and your weekly streak. New here? Signing in creates your account.
      </p>
      {searchParams?.error && (
        <p role="alert" className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-[15px]">
          {ERRORS[searchParams.error] || DEFAULT_ERROR}
        </p>
      )}
      <GoogleSignInButton callbackUrl={safeCallback(searchParams?.callbackUrl)} />
      <p className="text-[15px]">
        {'New to Skillreps? '}
        <Link href="/start" className="font-bold text-accent hover:underline">Find your first skill</Link>
        {' in three quick questions.'}
      </p>
      <p className="text-sm text-muted">
        {`By continuing you confirm you’re ${LEGAL.minimumAge} or older and agree to the `}
        <Link href="/terms" className="font-bold text-accent">Terms</Link>
        {' and '}
        <Link href="/privacy" className="font-bold text-accent">Privacy policy</Link>
        .
      </p>
    </div>
  );
}
