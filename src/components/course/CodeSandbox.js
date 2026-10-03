'use client';

import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Play, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';
import cn from '../../lib/cn';

export const DEFAULT_STARTER = `<h1>Hello!</h1>
<p>Edit this, then press Run.</p>

<style>
  body { font-family: system-ui, sans-serif; padding: 1rem; }
</style>

<script>
  console.log('Scripts run too. Their output shows below.');
</script>
`;

const MAX_LOG_LINES = 200;

// Runs first inside the frame and forwards console output and errors to the page.
function bridge(runId) {
  return `<script>(function () {
  var send = function (level, args) {
    var text = Array.prototype.map.call(args, function (a) {
      if (typeof a === 'string') return a;
      try { return JSON.stringify(a); } catch (e) { return String(a); }
    }).join(' ');
    parent.postMessage({ sandbox: ${JSON.stringify(runId)}, level: level, text: text }, '*');
  };
  ['log', 'info', 'warn', 'error'].forEach(function (level) {
    var original = console[level];
    console[level] = function () { send(level, arguments); original.apply(console, arguments); };
  });
  window.addEventListener('error', function (e) { send('error', [e.message + (e.lineno ? ' (line ' + e.lineno + ')' : '')]); });
  window.addEventListener('unhandledrejection', function (e) { send('error', ['Unhandled promise: ' + (e.reason && e.reason.message || e.reason)]); });
})();</script>`;
}

function draftKey(lessonId) {
  return `learntube:sandbox:${lessonId}`;
}

function readDraft(lessonId) {
  try {
    return window.localStorage.getItem(draftKey(lessonId));
  } catch {
    return null;
  }
}

function writeDraft(lessonId, value) {
  try {
    if (value === null) window.localStorage.removeItem(draftKey(lessonId));
    else window.localStorage.setItem(draftKey(lessonId), value);
  } catch {
    // Private windows can refuse storage; the sandbox still works, it just won't remember.
  }
}

// The preview is a sandboxed iframe without allow-same-origin, so learner code runs in an
// opaque origin: it can't read LearnTube's cookies, storage or page.
export default function CodeSandbox({ lessonId, starterCode }) {
  const starter = starterCode || DEFAULT_STARTER;
  const [code, setCode] = useState(starter);
  const [runState, setRunState] = useState(null);
  const [logs, setLogs] = useState([]);
  const runId = useRef('');
  const frameRef = useRef(null);
  const saveTimer = useRef(null);

  const run = useCallback((source) => {
    runId.current = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setLogs([]);
    setRunState({ id: runId.current, doc: bridge(runId.current) + source });
  }, []);

  useEffect(() => {
    const saved = readDraft(lessonId);
    const initial = saved ?? starter;
    setCode(initial);
    run(initial);
  }, [lessonId, starter, run]);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.source !== frameRef.current?.contentWindow || e.data?.sandbox !== runId.current) return;
      const line = { level: e.data.level, text: String(e.data.text) };
      setLogs((list) => [...list, line].slice(-MAX_LOG_LINES));
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  useEffect(() => () => clearTimeout(saveTimer.current), []);

  const change = (value) => {
    setCode(value);
    clearTimeout(saveTimer.current);
    // Matching the starter means there's nothing worth remembering.
    const draft = value === starter ? null : value;
    saveTimer.current = setTimeout(() => writeDraft(lessonId, draft), 500);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      run(code);
      return;
    }
    // Tab indents instead of leaving the editor; Esc then Tab still moves focus on.
    if (e.key === 'Tab' && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: start, selectionEnd: end } = el;
      const next = `${code.slice(0, start)}  ${code.slice(end)}`;
      change(next);
      requestAnimationFrame(() => {
        el.selectionStart = start + 2;
        el.selectionEnd = start + 2;
      });
    }
  };

  const reset = () => {
    change(starter);
    writeDraft(lessonId, null);
    run(starter);
  };

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted">
          HTML, CSS and JavaScript. Press Run, or Ctrl/⌘ + Enter. Your edits stay on this device.
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw size={15} aria-hidden="true" />
            Reset
          </Button>
          <Button size="sm" onClick={() => run(code)}>
            <Play size={15} aria-hidden="true" />
            Run
          </Button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <label htmlFor={`sandbox-${lessonId}`} className="sr-only">Code</label>
        <textarea
          id={`sandbox-${lessonId}`}
          value={code}
          onChange={(e) => change(e.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          wrap="off"
          className="h-72 min-w-0 resize-y rounded-md border border-line bg-sunken p-3 font-mono text-[13px] leading-relaxed text-ink focus:border-accent focus:outline-none"
        />
        {/* A fresh frame per run: Chrome can drop a srcdoc change made while the frame is
            still loading, and it throws away whatever the last run left behind. */}
        {runState ? (
          <iframe
            key={runState.id}
            ref={frameRef}
            title="Code preview"
            sandbox="allow-scripts allow-modals"
            srcDoc={runState.doc}
            className="h-72 w-full min-w-0 rounded-md border border-line bg-white"
          />
        ) : <div className="h-72 rounded-md border border-line bg-white" />}
      </div>

      <div className="grid gap-1">
        <h3 className="font-sans text-sm font-bold text-muted">Console</h3>
        <pre
          aria-live="polite"
          className="max-h-40 min-h-[3rem] overflow-auto rounded-md border border-line bg-sunken p-3 font-mono text-[13px] leading-relaxed"
        >
          {logs.length ? logs.map((l, i) => (
            // Lines never reorder, so the index is a stable key.
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={cn(l.level === 'error' && 'text-danger', l.level === 'warn' && 'text-xp')}>
              {l.text}
            </div>
          )) : <span className="text-muted">Nothing logged yet.</span>}
        </pre>
      </div>
    </div>
  );
}
