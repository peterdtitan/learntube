import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import {
  Heart, MessageCircle, PartyPopper, UserPlus,
} from 'lucide-react';
import { authOptions } from '../../lib/auth';
import { listNotifications, markAllRead } from '../../lib/notifications';
import { timeAgo } from '../../lib/notificationText';
import cn from '../../lib/cn';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Notifications · LearnTube' };

const ICONS = {
  KUDOS: Heart, COMMENT: MessageCircle, FOLLOW: UserPlus, CHEER: PartyPopper,
};

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) redirect('/auth/signin?callbackUrl=/notifications');

  // Read the list first so the unread ones are still marked on this visit.
  const notifications = await listNotifications(userId);
  await markAllRead(userId);

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <header className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight">Notifications</h1>
        <p className="text-lg text-muted">Kudos, comments, cheers and new followers.</p>
      </header>

      {notifications.length ? (
        <ul className="grid gap-1">
          {notifications.map((n) => {
            const Icon = ICONS[n.kind] || Heart;
            return (
              <li key={n.id}>
                <Link
                  href={n.href}
                  className={cn(
                    'flex items-start gap-3 rounded-md px-4 py-3 hover:bg-sunken',
                    n.unread && 'bg-accent-soft hover:bg-accent-soft',
                  )}
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-accent">
                    <Icon size={16} />
                  </span>
                  <span className="grid min-w-0 flex-1 gap-0.5">
                    <span className="text-[15px]">
                      <strong>{n.actor.name}</strong>
                      {` ${n.text}`}
                    </span>
                    <time dateTime={new Date(n.createdAt).toISOString()} className="text-sm text-muted">
                      {timeAgo(n.createdAt)}
                    </time>
                  </span>
                  {n.unread && <span className="sr-only">(new)</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-line px-5 py-10 text-center text-muted">
          Nothing yet. When someone gives kudos, comments on a make, cheers a milestone
          or follows you, it shows up here.
        </p>
      )}
    </div>
  );
}
