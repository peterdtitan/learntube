'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

const RECHECK_MS = 30000;
const cache = { at: 0, unread: 0 };

// Rechecks when the tab comes back into focus and on page changes, at most every 30s
// (always on /notifications, which marks everything read). No polling.
export default function NotificationBell() {
  const pathname = usePathname();
  const [unread, setUnread] = useState(cache.unread);

  useEffect(() => {
    let cancelled = false;
    const load = async (force) => {
      if (!force && Date.now() - cache.at < RECHECK_MS) {
        setUnread(cache.unread);
        return;
      }
      try {
        const res = await fetch('/api/notifications/unread');
        if (!res.ok) return;
        cache.unread = (await res.json()).unread;
        cache.at = Date.now();
        if (!cancelled) setUnread(cache.unread);
      } catch {
        // The badge is a nicety; leave it as it was.
      }
    };
    load(pathname?.startsWith('/notifications'));
    const onVisible = () => { if (document.visibilityState === 'visible') load(true); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [pathname]);

  const label = unread ? `Notifications, ${unread} new` : 'Notifications';
  return (
    <Link
      href="/notifications"
      aria-label={label}
      title={label}
      className="relative grid h-9 w-9 place-items-center rounded-pill text-ink hover:bg-sunken"
    >
      <Bell size={19} />
      {unread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-pill bg-accent px-1 text-[11px] font-bold leading-none text-on-accent tabular-nums">
          {unread > 9 ? '9+' : unread}
        </span>
      )}
    </Link>
  );
}
