import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdmin } from '../../lib/admin';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin · LearnTube', robots: { index: false } };

export default async function AdminLayout({ children }) {
  if (!(await getAdmin())) notFound();
  return (
    <div className="grid gap-6">
      <nav aria-label="Admin" className="flex flex-wrap items-center gap-4 border-b border-line pb-3 text-[15px]">
        <span className="rounded-pill bg-xp-soft px-3 py-1 text-xs font-bold uppercase tracking-widest text-xp">Admin</span>
        <Link href="/admin" className="font-bold hover:text-accent">Content</Link>
        <Link href="/admin/reports" className="font-bold hover:text-accent">Reports</Link>
      </nav>
      {children}
    </div>
  );
}
