'use client';

import React, { useState } from 'react';
import FollowButton from '../../../components/community/FollowButton';
import { initials } from '../../../lib/people';

export default function ProfileHeader({ profile }) {
  const [followers, setFollowers] = useState(profile.followers);
  const stats = [
    { label: 'XP', value: profile.xp.toLocaleString('en') },
    { label: 'week streak', value: profile.streakWeeks },
    { label: profile.makeCount === 1 ? 'make' : 'makes', value: profile.makeCount },
    { label: followers === 1 ? 'follower' : 'followers', value: followers },
    { label: 'following', value: profile.following },
  ];

  return (
    <header className="grid gap-5">
      <div className="flex flex-wrap items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-xl font-bold text-accent">{initials(profile.name)}</span>
        <h1 className="flex-1 text-[clamp(1.8rem,4vw,2.4rem)] font-bold leading-tight">
          {profile.isMe ? `${profile.name} (you)` : profile.name}
        </h1>
        {!profile.isMe && (
          <FollowButton
            userId={profile.id}
            initialFollowing={profile.isFollowing}
            initialFollowers={followers}
            onChange={setFollowers}
          />
        )}
      </div>
      <dl className="flex flex-wrap gap-x-8 gap-y-3">
        {stats.map((s) => (
          <div key={s.label} className="grid">
            <dt className="order-2 text-sm text-muted">{s.label}</dt>
            <dd className="order-1 font-display text-2xl font-bold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
