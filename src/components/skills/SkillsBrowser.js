'use client';

import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import SkillCard from './SkillCard';
import cn from '../../lib/cn';
import SkillIcon from '../ui/SkillIcon';
import { buildSearchIndex, orList, searchCatalog } from '../../lib/skillSearch';

export const SEARCH_ID = 'skill-search';
const LOG_AFTER = 1200; // a search counts once the learner stops typing for this long

// Tells /api/search-log what was searched and opened. A beacon still arrives when opening a
// result takes the learner off the page.
function logSearch(body) {
  const data = JSON.stringify(body);
  try {
    if (navigator.sendBeacon?.('/api/search-log', new Blob([data], { type: 'application/json' }))) return;
  } catch {
    // Fall back to fetch below.
  }
  fetch('/api/search-log', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data, keepalive: true,
  }).catch(() => {});
}

// Everything the search looks through: short skills, programs and the courses in them.
function catalogItems(skills, programs) {
  return [
    ...skills.map((s) => ({
      key: `skill:${s.id}`,
      kind: 'skill',
      slug: s.slug,
      title: s.title,
      category: s.skill?.name,
      parent: s.track?.title,
      description: s.description,
      makeTitle: s.makeTitle,
      href: `/pathways/${s.id}`,
      skill: s,
    })),
    ...programs.flatMap((t) => [
      {
        key: `program:${t.slug}`,
        kind: 'program',
        slug: t.slug,
        title: t.title,
        category: t.skill?.name,
        description: t.description,
        href: `/tracks/${t.slug}`,
        icon: t.skill,
        courseCount: t.courses.length,
      },
      ...t.courses.map((c) => ({
        key: `course:${c.id}`,
        kind: 'course',
        slug: c.slug,
        title: c.title,
        parent: t.title,
        description: c.description,
        href: `/pathways/${c.id}`,
        icon: t.skill,
      })),
    ]),
  ];
}

function CatalogRow({ item }) {
  return (
    <Link href={item.href} className="group flex min-w-0 items-center gap-3 rounded-lg border border-line bg-surface p-4 hover:border-accent">
      <SkillIcon skill={item.icon} size="sm" className="rounded-md" />
      <span className="grid min-w-0 gap-0.5">
        <span className="font-bold leading-snug">{item.title}</span>
        <span className="text-sm text-muted">
          {item.kind === 'program' ? `Program · ${item.courseCount} courses` : `Course in ${item.parent}`}
        </span>
      </span>
      <ArrowRight size={18} className="ml-auto shrink-0 text-accent transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
    </Link>
  );
}

// "JavaScript or Software Engineer", each a link.
function TryInstead({ suggestions }) {
  return suggestions.map((s, i) => (
    <React.Fragment key={s.item.key}>
      {i > 0 && (i === suggestions.length - 1 ? ' or ' : ', ')}
      <Link href={s.item.href} className="font-bold text-accent underline underline-offset-2 hover:no-underline">{s.label}</Link>
    </React.Fragment>
  ));
}

function GroupLabel({ children }) {
  return <h3 className="text-xs font-bold uppercase tracking-widest text-muted">{children}</h3>;
}

// Search, then category chips, over short skills. Everything is already on the page, so
// searching and filtering happen here.
export default function SkillsBrowser({
  skills, programs = [], signedIn, initialQuery = '',
}) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState(null);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const index = useMemo(() => buildSearchIndex(catalogItems(skills, programs)), [skills, programs]);
  const found = useMemo(() => searchCatalog(index, query), [index, query]);
  const logged = useRef(new Set());
  const outcome = found && {
    query: query.trim(),
    results: found.results.length,
    missing: Boolean(found.missing),
    suggested: found.missing ? found.missing.suggestions.map((s) => s.label) : [],
  };

  // Count each search once per visit, when the learner has stopped typing it.
  const settled = outcome && outcome.query.toLowerCase();
  useEffect(() => {
    if (!signedIn || !outcome || settled.length < 2) return undefined;
    if (logged.current.has(settled)) return undefined;
    const timer = setTimeout(() => {
      logged.current.add(settled);
      logSearch(outcome);
    }, LOG_AFTER);
    return () => clearTimeout(timer);
    // `outcome` follows `settled` and `found`; listing it would restart the wait every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settled, found, signedIn]);

  // Which result the search led to, so admins can see if people find what they meant.
  const openResult = (event) => {
    const href = event.target.closest('a')?.getAttribute('href');
    const item = href && found?.results.find((r) => r.href === href);
    if (!signedIn || !item) return;
    logged.current.add(settled);
    logSearch({ ...outcome, clicked: item.title });
  };

  // Keep ?q= in the address, so a search survives going back and can be shared.
  useEffect(() => {
    const timer = setTimeout(() => {
      const url = new URL(window.location.href);
      if (query.trim()) url.searchParams.set('q', query.trim());
      else url.searchParams.delete('q');
      if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const categories = Object.values(skills.reduce((acc, s) => {
    if (s.skill) acc[s.skill.id] = s.skill;
    return acc;
  }, {}));
  const shown = categoryId ? skills.filter((s) => s.skill?.id === categoryId) : skills;
  const clear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const chip = (id, label, category) => (
    <button
      key={id || 'all'}
      type="button"
      aria-pressed={!found && categoryId === id}
      onClick={() => {
        setQuery('');
        setCategoryId(id);
      }}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-pill border border-line bg-surface px-3.5 py-2 text-sm',
        !found && categoryId === id && 'border-accent ring-1 ring-inset ring-accent',
      )}
    >
      {category && <SkillIcon skill={category} />}
      {label}
    </button>
  );

  const results = found?.results || [];
  const rows = results.filter((r) => r.kind !== 'skill');
  const cards = results.filter((r) => r.kind === 'skill');
  const programsGroup = rows.length > 0 && (
    <section key="programs" className="grid gap-3">
      <GroupLabel>Programs and courses</GroupLabel>
      <div className="grid gap-3 md:grid-cols-2">
        {rows.map((r) => <CatalogRow key={r.key} item={r} />)}
      </div>
    </section>
  );
  const skillsGroup = cards.length > 0 && (
    <section key="skills" className="grid gap-3">
      {rows.length > 0 && <GroupLabel>Short skills</GroupLabel>}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {cards.map((r) => <SkillCard key={r.key} skill={r.skill} signedIn={signedIn} />)}
      </div>
    </section>
  );
  const groups = results[0]?.kind === 'skill' ? [skillsGroup, programsGroup] : [programsGroup, skillsGroup];

  const missing = found?.missing;
  const tryText = missing?.suggestions.length
    ? ` You may want to try ${orList(missing.suggestions.map((s) => s.label))}.`
    : '';
  let announce = `${shown.length} skills shown`;
  if (missing) announce = `We don’t have “${missing.text}” yet.${tryText}`;
  else if (found) announce = `${results.length} ${results.length === 1 ? 'match' : 'matches'}`;

  return (
    <div className="grid gap-5">
      <form
        ref={formRef}
        role="search"
        className="relative max-w-2xl"
        onSubmit={(event) => {
          event.preventDefault();
          // On a phone this closes the keyboard, so the results are in view.
          inputRef.current?.blur();
        }}
      >
        <label htmlFor={SEARCH_ID} className="sr-only">Search skills and programs</label>
        <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          ref={inputRef}
          id={SEARCH_ID}
          type="search"
          value={query}
          maxLength={80}
          onChange={(event) => {
            setQuery(event.target.value);
            setCategoryId(null);
          }}
          onFocus={() => {
            // On a phone, lift the box up under the header so results show above the keyboard.
            if (!window.matchMedia('(max-width: 639px)').matches) return;
            const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setTimeout(() => formRef.current?.scrollIntoView({ block: 'start', behavior: still ? 'auto' : 'smooth' }), 250);
          }}
          placeholder="Search skills and programs"
          autoComplete="off"
          enterKeyHint="search"
          className="h-12 w-full rounded-pill border border-line bg-surface pl-12 pr-12 text-base placeholder:text-muted focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-pill text-muted hover:bg-sunken hover:text-ink"
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </form>

      {/* One row that scrolls sideways on a phone, so the skills start near the top. */}
      <div className="-mx-4 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,#000_calc(100%-2.5rem),transparent)] [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 sm:[mask-image:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 pr-10 sm:w-auto sm:flex-wrap sm:pr-0" role="group" aria-label="Filter by category">
          {chip(null, 'All skills')}
          {categories.map((c) => chip(c.id, c.name, c))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{announce}</p>

      {found ? (
        <div className="grid gap-6" onClickCapture={openResult}>
          {missing ? (
            <div className="grid gap-2 rounded-lg border border-line bg-surface p-5">
              <p className="text-lg leading-relaxed">
                <strong>{`We don’t have “${missing.text}” yet.`}</strong>
                {' '}
                {missing.suggestions.length > 0 ? (
                  <>
                    {'You may want to try '}
                    <TryInstead suggestions={missing.suggestions} />
                    .
                  </>
                ) : 'Try another word, or browse the skills by category.'}
              </p>
              <button type="button" onClick={clear} className="justify-self-start text-sm font-bold text-accent hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <p className="text-muted">{`${results.length} ${results.length === 1 ? 'match' : 'matches'} for “${query.trim()}”`}</p>
          )}
          {groups}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {shown.map((s) => <SkillCard key={s.id} skill={s} signedIn={signedIn} />)}
        </div>
      )}
    </div>
  );
}
