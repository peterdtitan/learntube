import React from 'react';
import Link from 'next/link';
import { listLearners } from '../../../lib/adminData';
import { publicName } from '../../../lib/people';
import Button from '../../../components/ui/Button';

const date = (d) => (d ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(d) : '—');

export default async function AdminLearners({ searchParams = {} }) {
  const q = String(searchParams.q || '').slice(0, 100);
  const page = Math.max(1, Number.parseInt(searchParams.page, 10) || 1);
  const { learners, total, pages } = await listLearners({ q, page });
  const pageHref = (n) => `/admin/learners?${new URLSearchParams({ ...(q && { q }), page: String(n) })}`;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-bold">Learners</h1>
        <form role="search" className="flex gap-2">
          <label htmlFor="learner-search" className="sr-only">Search learners</label>
          <input id="learner-search" type="search" name="q" defaultValue={q} placeholder="Name or email" className="h-10 w-56 min-w-0 rounded-md border border-line bg-surface px-3" />
          <Button type="submit" size="sm" variant="ghost">Search</Button>
        </form>
      </div>
      <p className="text-sm text-muted" role="status">{`${total} ${total === 1 ? 'learner' : 'learners'}${q ? ` matching “${q}”` : ''}`}</p>

      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <table className="w-full min-w-[44rem] text-left text-[15px]">
          <caption className="sr-only">Learners, newest first</caption>
          <thead className="border-b border-line text-sm text-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-bold">Learner</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">XP</th>
              <th scope="col" className="px-4 py-3 text-right font-bold">Makes</th>
              <th scope="col" className="px-4 py-3 font-bold">Last practice</th>
              <th scope="col" className="px-4 py-3 font-bold">Emails</th>
            </tr>
          </thead>
          <tbody>
            {learners.map((l) => (
              <tr key={l.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/learners/${l.id}`} className="font-bold hover:text-accent">{publicName(l)}</Link>
                  {l.role === 'ADMIN' && <span className="ml-2 rounded-pill bg-xp-soft px-2 text-xs font-bold text-xp">Admin</span>}
                  {!l.onboardedAt && <span className="ml-2 rounded-pill bg-sunken px-2 text-xs font-bold text-muted">New</span>}
                  <span className="block text-sm text-muted">{l.email}</span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{l.xp}</td>
                <td className="px-4 py-3 text-right tabular-nums">{l._count.makes}</td>
                <td className="px-4 py-3 tabular-nums">{date(l.lastActive)}</td>
                <td className="px-4 py-3 text-sm">
                  {[l.emailReminders && 'Reminders', l.emailWeekly && 'Recap'].filter(Boolean).join(', ') || 'Off'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <nav aria-label="Pages" className="flex items-center gap-3 text-[15px]">
          {page > 1 && <Link href={pageHref(page - 1)} className="font-bold text-accent">← Newer</Link>}
          <span className="text-muted">{`Page ${page} of ${pages}`}</span>
          {page < pages && <Link href={pageHref(page + 1)} className="font-bold text-accent">Older →</Link>}
        </nav>
      )}
    </div>
  );
}
