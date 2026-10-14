import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getOverview } from '../../lib/adminData';
import Button from '../../components/ui/Button';
import cn from '../../lib/cn';

export default async function AdminOverview() {
  const { stats, attention } = await getOverview();
  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-bold">Overview</h1>
        <div className="flex flex-wrap gap-2">
          <Button href="/admin/quizzes?kind=CHECKPOINT" size="sm" variant="ghost">Module exams</Button>
          <Button href="/admin/pathways/new" size="sm">New course or skill</Button>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="font-display text-3xl font-bold tabular-nums">{s.value}</dd>
            {s.sub && <dd className="text-xs text-muted">{s.sub}</dd>}
          </div>
        ))}
      </dl>

      <section aria-labelledby="attention-heading" className="grid gap-3">
        <h2 id="attention-heading" className="text-xl font-bold">Needs attention</h2>
        {attention.length ? (
          <ul className="grid gap-2">
            {attention.map((a) => (
              <li key={a.text}>
                <Link
                  href={a.href}
                  className="group flex items-center gap-3 rounded-md border border-line bg-surface px-4 py-3 text-[15px] hover:border-accent"
                >
                  <AlertTriangle size={18} aria-hidden="true" className={cn('shrink-0', a.urgent ? 'text-danger' : 'text-xp')} />
                  <span className="flex-1">{a.text}</span>
                  <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-muted group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center gap-2 text-[15px] text-muted">
            <CheckCircle2 size={18} aria-hidden="true" className="text-accent" />
            Nothing waiting. Every exam with questions is live and there are no open reports.
          </p>
        )}
      </section>
    </div>
  );
}
