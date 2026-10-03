'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Button from '../../../components/ui/Button';

export default function SignIn() {
  const callbackUrl = useSearchParams().get('callbackUrl') || '/';
  return (
    <div className="mx-auto grid max-w-md gap-5 rounded-lg border border-line bg-surface p-8 sm:mt-10">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <p className="text-[15px] text-muted">
        Signing in saves your place in every lesson, your notes and makes, and your weekly streak.
        New here? Signing in creates your account.
      </p>
      <Button onClick={() => signIn('google', { callbackUrl })}>Continue with Google</Button>
    </div>
  );
}
