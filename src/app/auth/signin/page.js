'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white/80 dark:bg-gray-800/80 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">Sign in using your Google account.</p>
      <button
        type="button"
        onClick={() => signIn('google')}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-400 hover:bg-red-500 text-black"
      >
        Continue with Google
      </button>
    </div>
  );
}
