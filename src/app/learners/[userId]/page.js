import React from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { getProfile } from '../../../lib/social';
import MakeCard from '../../../components/makes/MakeCard';
import MilestoneCard from '../../../components/community/MilestoneCard';
import ProfileHeader from './ProfileHeader';

export const dynamic = 'force-dynamic';

export default async function LearnerPage({ params }) {
  const session = await getServerSession(authOptions);
  const profile = await getProfile(params.userId, session?.user?.id || null);
  if (!profile) notFound();

  return (
    <div className="grid gap-10">
      <ProfileHeader profile={profile} />

      {profile.milestones.length > 0 && (
        <section className="grid gap-3">
          <h2 className="text-xl font-bold">Milestones</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {profile.milestones.map((m) => <MilestoneCard key={m.id} milestone={m} />)}
          </div>
        </section>
      )}

      <section className="grid gap-3">
        <h2 className="text-xl font-bold">Makes</h2>
        {profile.makes.length ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {profile.makes.map((m) => <MakeCard key={m.id} make={m} />)}
          </div>
        ) : (
          <p className="text-muted">{profile.isMe ? 'Your makes will show up here.' : 'No makes yet.'}</p>
        )}
      </section>
    </div>
  );
}
