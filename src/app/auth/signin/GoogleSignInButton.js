'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import Button from '../../../components/ui/Button';

export default function GoogleSignInButton({ callbackUrl }) {
  return <Button onClick={() => signIn('google', { callbackUrl })}>Continue with Google</Button>;
}
