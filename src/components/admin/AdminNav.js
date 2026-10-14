'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen, Flag, LayoutDashboard, Library, Mail, Timer, Users,
} from 'lucide-react';
import cn from '../../lib/cn';

const ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/pathways', label: 'Courses & skills', icon: BookOpen },
  { href: '/admin/quizzes', label: 'Exams & quizzes', icon: Timer },
  { href: '/admin/library', label: 'Content library', icon: Library },
  { href: '/admin/learners', label: 'Learners', icon: Users },
  { href: '/admin/emails', label: 'Emails', icon: Mail },
  {
    href: '/admin/reports', label: 'Reports', icon: Flag, badge: 'reports',
  },
];

// A sidebar on laptops; a row of tabs that scrolls sideways on phones.
export default function AdminNav({ badges = {} }) {
  const pathname = usePathname() || '/admin';
  const active = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));
  return (
    <nav aria-label="Admin" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:sticky lg:top-24 lg:self-start">
      <p className="mb-3 hidden text-xs font-bold uppercase tracking-widest text-xp lg:block">Admin</p>
      <ul className="flex gap-1 lg:grid">
        {ITEMS.map(({
          href, label, icon: Icon, badge,
        }) => (
          <li key={href} className="shrink-0">
            <Link
              href={href}
              aria-current={active(href) ? 'page' : undefined}
              className={cn(
                'flex items-center gap-2.5 whitespace-nowrap rounded-pill px-3.5 py-2 text-[15px] text-muted hover:bg-sunken hover:text-ink lg:rounded-md',
                active(href) && 'bg-accent-soft font-bold text-ink hover:bg-accent-soft',
              )}
            >
              <Icon size={17} aria-hidden="true" />
              {label}
              {badge && badges[badge] > 0 && (
                <span className="ml-auto rounded-pill bg-danger/15 px-1.5 text-xs font-bold tabular-nums text-danger">
                  {badges[badge]}
                  <span className="sr-only"> open</span>
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
