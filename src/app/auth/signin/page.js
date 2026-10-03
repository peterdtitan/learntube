import React from 'react';
import GoogleSignInButton from './GoogleSignInButton';

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
    </div>
  );
}
