'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Menu, X } from 'lucide-react';

import ThemeSwitcher from '../app/ThemeSwitcher';
import Button from './ui/Button';
import Pill from './ui/Pill';
import useLearnerSummary from './useLearnerSummary';
import NotificationBell from './community/NotificationBell';
import cn from '../lib/cn';
import { initials } from '../lib/people';

const LINKS = [
  { href: '/skills', label: 'Skills', match: (p) => p.startsWith('/skills') },
  { href: '/pathways', label: 'Pathways', match: (p) => p.startsWith('/pathways') },
  { href: '/makes', label: 'Makes', match: (p) => p.startsWith('/makes') },
  { href: '/leaderboard', label: 'Leaderboard', match: (p) => p.startsWith('/leaderboard') },
];

function streakLabel(summary) {
  if (summary.streakWeeks > 0) return `${summary.streakWeeks}-week streak`;
  return `${summary.doneThisWeek}/${summary.weeklyGoal} days this week`;
}

function useDismiss(open, setOpen) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen]);
  return ref;
}

function AccountMenu({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, setOpen);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account"
        onClick={() => setOpen(!open)}
        className="grid h-9 w-9 place-items-center rounded-pill bg-accent-soft text-sm font-bold text-accent"
      >
        {initials(user.name)}
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-11 z-50 w-48 rounded-md border border-line bg-surface p-1.5 shadow-lg">
          <p className="truncate px-3 py-2 text-sm text-muted">{user.name || user.email}</p>
          <Link role="menuitem" href="/dashboard" onClick={() => setOpen(false)} className="block rounded-sm px-3 py-2 text-[15px] hover:bg-sunken">
            Dashboard
          </Link>
          <Link role="menuitem" href={`/learners/${user.id}`} onClick={() => setOpen(false)} className="block rounded-sm px-3 py-2 text-[15px] hover:bg-sunken">
            Your profile
          </Link>
          <Link role="menuitem" href="/settings" onClick={() => setOpen(false)} className="block rounded-sm px-3 py-2 text-[15px] hover:bg-sunken">
            Settings
          </Link>
          {user.isAdmin && (
            <Link role="menuitem" href="/admin" onClick={() => setOpen(false)} className="block rounded-sm px-3 py-2 text-[15px] font-bold text-accent hover:bg-sunken">
              Admin
            </Link>
          )}
          <button role="menuitem" type="button" onClick={() => signOut()} className="block w-full rounded-sm px-3 py-2 text-left text-[15px] hover:bg-sunken">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const summary = useLearnerSummary();
  const pathname = usePathname() || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useDismiss(menuOpen, setMenuOpen);

  useEffect(() => setMenuOpen(false), [pathname]);

  const stats = summary && (
    <>
      <Pill variant="xp">{`${summary.xp.total} XP`}</Pill>
      <Pill>{streakLabel(summary)}</Pill>
    </>
  );

  return (
    <header ref={menuRef} className="sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-[22px] font-bold tracking-tight">
          Learn
          <span className="text-accent">Tube</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn('text-[15px] text-muted hover:text-ink', link.match(pathname) && 'font-bold text-ink')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">{stats}</div>
          <ThemeSwitcher />
          {session?.user && <NotificationBell />}
          {session?.user
            ? <AccountMenu user={session.user} />
            : <Button size="sm" onClick={() => signIn()}>Sign in</Button>}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-pill text-ink md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Main" className="border-t border-line bg-canvas px-4 pb-4 pt-2 md:hidden">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block py-3 text-[17px] font-bold">
              {link.label}
            </Link>
          ))}
          {stats && <div className="flex flex-wrap gap-2 pt-2 sm:hidden">{stats}</div>}
        </nav>
      )}
    </header>
  );
}
