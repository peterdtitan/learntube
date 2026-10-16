import React from 'react';
import Link from 'next/link';
import prisma from '../../../lib/prismadb';
import { QUIZ_KINDS, listQuizzes } from '../../../lib/adminData';
import FilterTabs from '../../../components/admin/FilterTabs';
import SubmitButton from '../../../components/admin/SubmitButton';
import Button from '../../../components/ui/Button';
import cn from '../../../lib/cn';
import { publishReady, setQuizPublished } from './actions';

const KIND_TABS = [['CHECKPOINT', 'Module exams'], ['MODULE_GAME', 'Games'], ['LESSON_CHECK', 'Quick checks'], ['all', 'All kinds']];
const STATUSES = [['', 'All'], ['draft', 'Drafts'], ['live', 'Live']];

function Stat({ children, warn }) {
  return <span className={cn('tabular-nums', warn && 'font-bold text-xp')}>{children}</span>;
}

export default async function AdminQuizzes(props) {
  const searchParams = await props.searchParams;
  const kind = KIND_TABS.some(([k]) => k === searchParams.kind) ? searchParams.kind : 'CHECKPOINT';
  const status = ['draft', 'live'].includes(searchParams.status) ? searchParams.status : '';
  const pathwayId = String(searchParams.pathway || '');
  const [rows, pathways] = await Promise.all([
    listQuizzes({ kind, status, pathwayId }),
    prisma.pathway.findMany({ orderBy: { title: 'asc' }, select: { id: true, title: true } }),
  ]);
  const href = (changes) => {
    const params = {
      kind, status, pathway: pathwayId, ...changes,
    };
    return `/admin/quizzes?${new URLSearchParams(Object.entries(params).filter(([, v]) => v))}`;
  };
  const ready = rows.filter((r) => !r.published && r.ready && !r.short);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Exams & quizzes</h1>
        <p className="max-w-2xl text-[15px] text-muted">
          Learners only see published quizzes. Exams imported from the content library arrive as
          drafts: check a few questions, then publish them here. An exam is ready when its bank has
          at least as many questions as it asks per attempt.
        </p>
      </div>

      <div className="grid gap-3">
        <FilterTabs
          label="Kind"
          items={KIND_TABS.map(([k, label]) => ({
            label, href: href({ kind: k }), active: kind === k,
          }))}
        />
        <div className="flex flex-wrap items-center gap-3">
          <FilterTabs label="Status" items={STATUSES.map(([s, label]) => ({ label, href: href({ status: s }), active: status === s }))} />
          <form className="flex min-w-0 gap-2">
            <input type="hidden" name="kind" value={kind} />
            {status && <input type="hidden" name="status" value={status} />}
            <label htmlFor="quiz-pathway" className="sr-only">Course or skill</label>
            <select id="quiz-pathway" name="pathway" defaultValue={pathwayId} className="h-10 min-w-0 max-w-[16rem] rounded-md border border-line bg-surface px-2 text-[15px]">
              <option value="">Every course and skill</option>
              {pathways.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
            <Button type="submit" size="sm" variant="ghost">Show</Button>
          </form>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" role="status">
          {`${rows.length} ${rows.length === 1 ? 'quiz' : 'quizzes'} · ${rows.filter((r) => r.published).length} live`}
        </p>
        {ready.length > 0 && (
          <form action={publishReady}>
            {ready.map((r) => <input key={r.id} type="hidden" name="id" value={r.id} />)}
            <SubmitButton size="sm" pendingText="Publishing…">{`Publish ${ready.length} ready ${ready.length === 1 ? 'draft' : 'drafts'}`}</SubmitButton>
          </form>
        )}
      </div>

      <ul className="grid gap-2">
        {rows.map((r) => (
          <li key={r.id} className="grid gap-3 rounded-md border border-line bg-surface px-4 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="grid min-w-0 gap-1">
              <Link href={`/admin/quizzes/${r.id}`} className="min-w-0 font-bold hover:text-accent">
                <span className="block truncate">{r.title || r.place || QUIZ_KINDS[r.kind]}</span>
              </Link>
              <span className="truncate text-sm text-muted">
                {[QUIZ_KINDS[r.kind], r.pathway?.title, r.title && r.place].filter(Boolean).join(' · ')}
              </span>
              <span className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                <Stat warn={r.short || !r.ready}>
                  {r.kind === 'CHECKPOINT'
                    ? `${r.perAttempt} of ${r.bank} questions per attempt${r.short ? ' (bank too small)' : ''}`
                    : `${r.bank} ${r.bank === 1 ? 'question' : 'questions'}`}
                </Stat>
                {r.minutes && <Stat>{`${r.minutes} min`}</Stat>}
                <Stat>{r.attempts ? `${r.attempts} attempts · ${r.passRate}% passed` : 'No attempts yet'}</Stat>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn('rounded-pill px-2.5 py-1 text-xs font-bold', r.published ? 'bg-accent-soft text-accent' : 'bg-xp-soft text-xp')}>
                {r.published ? 'Live' : 'Draft'}
              </span>
              <form action={setQuizPublished}>
                <input type="hidden" name="id" value={r.id} />
                <input type="hidden" name="published" value={String(!r.published)} />
                <SubmitButton
                  size="sm"
                  variant="ghost"
                  disabled={!r.published && !r.ready}
                  pendingText="Saving…"
                  aria-label={`${r.published ? 'Unpublish' : 'Publish'} ${r.title || r.place || 'quiz'}`}
                >
                  {r.published ? 'Unpublish' : 'Publish'}
                </SubmitButton>
              </form>
            </div>
          </li>
        ))}
      </ul>
      {!rows.length && <p className="text-muted">No quizzes match these filters.</p>}
    </div>
  );
}
