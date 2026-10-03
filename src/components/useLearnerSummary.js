'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export const SUMMARY_CHANGED = 'learntube:summary-changed';

// Call after anything that awards XP so the navbar refreshes its numbers.
export function notifySummaryChanged() {
  window.dispatchEvent(new Event(SUMMARY_CHANGED));
}

export default function useLearnerSummary() {
  const { status } = useSession();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (status !== 'authenticated') {
      setSummary(null);
      return undefined;
    }
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch('/api/me');
        if (!res.ok || cancelled) return;
        let data = await res.json();
        // Practice days and weeks follow the learner's own clock, so keep the stored zone current.
        const deviceZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (deviceZone && data.timeZone !== deviceZone) {
          const patched = await fetch('/api/me', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timeZone: deviceZone }),
          });
          if (patched.ok) data = await patched.json();
        }
        if (!cancelled) setSummary(data);
      } catch {
        // Stats are decoration; the page works without them.
      }
    };
    load();
    window.addEventListener(SUMMARY_CHANGED, load);
    return () => {
      cancelled = true;
      window.removeEventListener(SUMMARY_CHANGED, load);
    };
  }, [status]);

  return summary;
}
