'use client';

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Button from '../ui/Button';

export default function FollowButton({
  userId, initialFollowing, initialFollowers, onChange,
}) {
  const { status } = useSession();
  const [following, setFollowing] = useState(initialFollowing);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    if (status !== 'authenticated') {
      signIn();
      return;
    }
    setBusy(true);
    const res = await fetch(`/api/learners/${userId}/follow`, { method: following ? 'DELETE' : 'POST' });
    setBusy(false);
    if (!res.ok) return;
    const data = await res.json();
    setFollowing(data.following);
    onChange?.(data.followers ?? initialFollowers);
  };

  return (
    <Button size="sm" variant={following ? 'ghost' : 'primary'} onClick={toggle} disabled={busy} aria-pressed={following}>
      {following ? 'Following' : 'Follow'}
    </Button>
  );
}
