import React from 'react';
import Link from 'next/link';
import { searchInsights } from '../../../lib/adminData';
import FilterTabs from '../../../components/admin/FilterTabs';

const PERIODS = [7, 30, 90];

function SearchTable({ caption, rows, missing }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full min-w-[34rem] text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-line text-xs uppercase tracking-widest text-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-bold">Search</th>
            <th scope="col" className="px-4 py-3 text-right font-bold">Searches</th>
            <th scope="col" className="px-4 py-3 font-bold">{missing ? 'We suggested' : 'Results'}</th>
            <th scope="col" className="px-4 py-3 font-bold">Opened most</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.query} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-bold">
                <Link href={`/skills?q=${encodeURIComponent(r.query)}`} className="hover:text-accent hover:underline">{r.query}</Link>
              </td>
              <td className="px-4 py-3 text-right tabular-nums">{r.searches}</td>
              <td className="px-4 py-3 text-muted">
                {missing ? (r.suggested.join(', ') || 'Nothing close') : r.results}
              </td>
              <td className="px-4 py-3 text-muted">
                {r.topOpened
                  ? `${r.topOpened} (${Math.round((r.opened / r.searches) * 100)}% opened something)`
                  : 'Nothing opened'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// What learners search for on the skills page, and what they want that isn't taught yet.
export default async function AdminSearches(props) {
  const searchParams = await props.searchParams;
  const days = PERIODS.includes(Number(searchParams.days)) ? Number(searchParams.days) : 30;
  const insights = await searchInsights(days);
  const foundShare = insights.total ? Math.round((insights.found / insights.total) * 100) : 0;
  const stats = [
    { label: 'Searches', value: insights.total },
    { label: 'Found something', value: `${foundShare}%` },
    { label: 'Not taught yet', value: insights.total - insights.found },
  ];

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <h1 className="text-3xl font-bold">Searches</h1>
        <p className="max-w-2xl text-[15px] text-muted">
          What learners type in the skills search. Each learner counts once per search per day,
          and admins’ searches aren’t counted. Use “Wanted, not taught yet” to choose what to add
          next, and give a skill more search words in src/lib/searchTerms.js when people miss it.
        </p>
        <FilterTabs
          label="Period"
          items={PERIODS.map((d) => ({
            label: `Last ${d} days`, href: `/admin/searches?days=${d}`, active: d === days,
          }))}
        />
      </div>

      <dl className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="grid gap-1 rounded-lg border border-line bg-surface p-4">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="font-display text-3xl font-bold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>

      {insights.total === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-5 py-8 text-center text-muted">
          {`No searches in the last ${days} days yet.`}
        </p>
      ) : (
        <>
          <section aria-labelledby="wanted-heading" className="grid gap-3">
            <h2 id="wanted-heading" className="text-xl font-bold">Wanted, not taught yet</h2>
            {insights.wanted.length ? (
              <SearchTable caption="Searches for things we don’t teach yet" rows={insights.wanted} missing />
            ) : (
              <p className="text-[15px] text-muted">Every search found something we teach.</p>
            )}
          </section>
          <section aria-labelledby="top-heading" className="grid gap-3">
            <h2 id="top-heading" className="text-xl font-bold">Top searches</h2>
            <SearchTable caption="The most common searches" rows={insights.popular} />
          </section>
        </>
      )}
    </div>
  );
}
