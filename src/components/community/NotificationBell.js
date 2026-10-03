'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';

// Rechecks on every page change and when the tab comes back into focus; no polling.
export default function NotificationBell() {
  const pathname = usePathname();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/notifications/unread');
        if (res.ok && !cancelled) setUnread((await res.json()).unread);
      } catch {
        // The badge is a nicety; leave it as it was.
      }
    };
    load();
    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
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
