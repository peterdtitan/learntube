'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Columns2, PanelRightClose } from 'lucide-react';
import cn from '../../lib/cn';

const WIDE_KEY = 'learntube:workspace-wide';

function readWide(fallback) {
  try {
    const saved = localStorage.getItem(WIDE_KEY);
    return saved === null ? fallback : saved === '1';
  } catch {
    return fallback;
  }
}

// The lesson page's layout. On phones and tablets everything is one column: the video
// (pinned at the top by Classroom), the steps, then the tools. On laptops and up the tools
// (notes, code, transcript, course outline) get their own column that stays in view while
// the lesson scrolls, so you can watch and write at once. "Wider" makes it half and half,
// which code lessons start with.
//
// `tools` is [{ id, label, content }]. Every panel stays mounted, so switching tabs never
// loses unsaved notes or sandbox code.
export default function LessonWorkspace({
  header, stage, after = [], nav, tools, defaultTab, startWide = false,
}) {
  const [active, setActive] = useState(defaultTab || tools[0].id);
  const [wide, setWide] = useState(startWide);
  const tabRefs = useRef({});
  useEffect(() => setWide(readWide(startWide)), [startWide]);

  const toggleWide = () => {
    setWide((w) => {
      try {
        localStorage.setItem(WIDE_KEY, w ? '0' : '1');
      } catch {
        // Not remembered in private windows; the toggle still works.
      }
      return !w;
    });
  };

  const onTabKey = (e) => {
    const i = tools.findIndex((t) => t.id === active);
    let next = null;
    if (e.key === 'ArrowRight') next = tools[(i + 1) % tools.length];
    if (e.key === 'ArrowLeft') next = tools[(i - 1 + tools.length) % tools.length];
    if (e.key === 'Home') [next] = tools;
    if (e.key === 'End') next = tools[tools.length - 1];
    if (!next) return;
    e.preventDefault();
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const extras = after.filter(Boolean);
  // Rows the main column uses on wide screens, so the tools column spans all of them.
  const rows = 3 + extras.length;

  return (
    <div
      className={cn(
        'grid gap-5 lg:gap-x-8',
        wide
          ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'
          : 'lg:grid-cols-[minmax(0,1fr)_minmax(340px,400px)] xl:grid-cols-[minmax(0,1fr)_440px]',
      )}
      style={{ '--rows': rows }}
    >
      <div className="lg:col-start-1">{header}</div>
      {stage}

      <section
        aria-label="Lesson tools"
        className="flex min-w-0 flex-col rounded-lg border border-line bg-surface lg:sticky lg:top-20 lg:col-start-2 lg:row-start-1 lg:h-[calc(100dvh-6rem)] lg:self-start lg:[grid-row-end:span_var(--rows)]"
      >
        <div className="flex items-center gap-1 border-b border-line pl-2 pr-1">
          <div role="tablist" aria-label="Lesson tools" className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
            {tools.map((tool) => (
              <button
                key={tool.id}
                ref={(el) => { tabRefs.current[tool.id] = el; }}
                role="tab"
                type="button"
                id={`tab-${tool.id}`}
                aria-selected={active === tool.id}
                aria-controls={`panel-${tool.id}`}
                tabIndex={active === tool.id ? 0 : -1}
                onClick={() => setActive(tool.id)}
                onKeyDown={onTabKey}
                className={cn(
                  '-mb-px shrink-0 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-bold transition-colors',
                  active === tool.id ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-ink',
                )}
              >
                {tool.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleWide}
            aria-pressed={wide}
            aria-label={wide ? 'Make the tools narrower' : 'Make the tools wider'}
            title={wide ? 'Narrower' : 'Wider'}
            className="hidden h-9 w-9 shrink-0 place-items-center rounded-pill text-muted hover:bg-sunken hover:text-ink lg:grid"
          >
            {wide ? <PanelRightClose size={18} aria-hidden="true" /> : <Columns2 size={18} aria-hidden="true" />}
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
          {tools.map((tool) => (
            <div
              key={tool.id}
              role="tabpanel"
              id={`panel-${tool.id}`}
              aria-labelledby={`tab-${tool.id}`}
              hidden={active !== tool.id}
              className="min-h-0 flex-1"
            >
              {tool.content}
            </div>
          ))}
        </div>
      </section>

      {extras.map((node, i) => (
        // Fixed slots in a fixed order.
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="min-w-0 lg:col-start-1">{node}</div>
      ))}
      <div className="lg:col-start-1">{nav}</div>
    </div>
  );
}
