import React from 'react';
import Link from 'next/link';
import { RiInstagramLine, RiTwitterXLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/peterokorafor', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://www.instagram.com/peterdtitan/', label: 'Instagram', Icon: RiInstagramLine },
  { href: 'https://twitter.com/PeterDeTitan', label: 'X (Twitter)', Icon: RiTwitterXLine },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-[2fr_1fr_1fr] sm:px-6 lg:px-8">
        <div className="grid max-w-sm gap-2">
          <Link href="/" className="font-display text-xl font-bold tracking-tight">
            Learn
            <span className="text-accent">Tube</span>
          </Link>
          <p className="text-[15px] text-muted">
            Free YouTube lessons, put in order. Every lesson belongs to its YouTube creator.
          </p>
        </div>
        <nav aria-label="Footer" className="grid content-start gap-2 text-[15px]">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-muted">Learn</h2>
          <Link href="/#skills" className="hover:text-accent">Skills</Link>
          <Link href="/pathways" className="hover:text-accent">Pathways</Link>
          <Link href="/makes" className="hover:text-accent">Makes</Link>
          <Link href="/leaderboard" className="hover:text-accent">Leaderboard</Link>
          <Link href="/dashboard" className="hover:text-accent">Dashboard</Link>
        </nav>
        <div className="grid content-start gap-3">
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-muted">Connect</h2>
          <div className="flex gap-4">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a key={href} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted sm:px-6 lg:px-8">
        {`© ${new Date().getFullYear()} MadHouse Inc.`}
      </p>
    </footer>
  );
}
