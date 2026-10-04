import React from 'react';
import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';
import { LEGAL } from '../../../lib/legal';

export const metadata = { title: 'Sign in · LearnTube' };

// Only same-site paths are allowed as a return destination.
function safeCallback(value) {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/';
}

export default function SignIn({ searchParams }) {
  return (
    <div className="mx-auto grid max-w-md gap-5 rounded-lg border border-line bg-surface p-8 sm:mt-10">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-[15px] text-muted">
        Signing in saves your place in every lesson, your notes and makes, and your weekly streak.
        New here? Signing in creates your account.
      </p>
      <GoogleSignInButton callbackUrl={safeCallback(searchParams?.callbackUrl)} />
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
