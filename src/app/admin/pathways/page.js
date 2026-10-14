import React from 'react';
import Link from 'next/link';
import { listPathways } from '../../../lib/adminData';
import { formatDuration } from '../../../lib/youtube';
import Button from '../../../components/ui/Button';
import SkillIcon from '../../../components/ui/SkillIcon';
import FilterTabs from '../../../components/admin/FilterTabs';

const KINDS = [['', 'All'], ['COURSE', 'Courses'], ['SKILL', 'Short skills']];

export default async function AdminPathways({ searchParams = {} }) {
  const q = String(searchParams.q || '').slice(0, 100);
  const kind = String(searchParams.kind || '');
  const rows = await listPathways({ q, kind });
  const href = (k) => `/admin/pathways?${new URLSearchParams({ ...(q && { q }), ...(k && { kind: k }) })}`;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl font-bold">Courses & skills</h1>
        <Button href="/admin/pathways/new" size="sm">New course or skill</Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterTabs label="Kind" items={KINDS.map(([k, label]) => ({ label, href: href(k), active: kind === k }))} />
        <form role="search" className="flex gap-2">
          {kind && <input type="hidden" name="kind" value={kind} />}
          <label htmlFor="pathway-search" className="sr-only">Search courses and skills</label>
          <input id="pathway-search" type="search" name="q" defaultValue={q} placeholder="Search titles" className="h-10 w-56 min-w-0 rounded-md border border-line bg-surface px-3" />
          <Button type="submit" size="sm" variant="ghost">Search</Button>
        </form>
      </div>

      <p className="text-sm text-muted" role="status">{`${rows.length} ${rows.length === 1 ? 'result' : 'results'}`}</p>
      <ul className="grid gap-2">
        {rows.map((p) => (
          <li key={p.id}>
            <Link href={`/admin/pathways/${p.id}`} className="grid gap-1.5 rounded-md border border-line bg-surface px-4 py-3 hover:border-accent sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
              <span className="grid min-w-0 gap-0.5">
                <span className="flex min-w-0 items-center gap-2 font-bold">
                  <SkillIcon skill={p.skill} />
                  <span className="truncate">{p.title}</span>
                </span>
                <span className="text-sm text-muted">
                  {[p.kind === 'SKILL' ? 'Short skill' : 'Course', p.skill?.name, p.program].filter(Boolean).join(' · ')}
                </span>
              </span>
              <span className="flex flex-wrap gap-x-4 gap-y-1 text-sm tabular-nums text-muted">
                <span>{`${p.modules} modules · ${p.lessons} lessons · ${formatDuration(p.seconds)}`}</span>
                <span className={p.exams && p.examsLive < p.exams ? 'font-bold text-xp' : ''}>
                  {p.exams ? `Exams ${p.examsLive}/${p.exams} live` : 'No exams'}
                </span>
                {p.noTry > 0 && <span className="text-xp">{`${p.noTry} without Try`}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {!rows.length && <p className="text-muted">{q ? 'Nothing matches that search.' : 'No courses yet. Import the content library or create one.'}</p>}
    </div>
  );
}
