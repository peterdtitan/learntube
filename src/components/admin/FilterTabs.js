import React from 'react';
import Link from 'next/link';
import cn from '../../lib/cn';

// A row of filter links; the current one is marked for screen readers too.
export default function FilterTabs({ label, items }) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-1 rounded-pill bg-sunken p-1">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-current={item.active ? 'true' : undefined}
          className={cn(
            'rounded-pill px-3.5 py-1.5 text-sm font-bold text-muted hover:text-ink',
            item.active && 'bg-surface text-ink shadow-sm',
          )}
        >
          {item.label}
          {item.count !== undefined && <span className="ml-1.5 tabular-nums text-muted">{item.count}</span>}
        </Link>
      ))}
    </nav>
  );
}
