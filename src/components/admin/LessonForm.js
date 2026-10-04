'use client';

import React, { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import {
  Field, FormMessage, inputClass, textareaClass,
} from './fields';
import loadYouTubeApi from '../../lib/youtubeApi';
import { formatDuration } from '../../lib/youtube';

// Loads the video in an off-screen player just long enough to read its length.
async function measureDuration(videoId) {
  const YT = await loadYouTubeApi();
  if (!YT) return null;
  return new Promise((resolve) => {
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:-9999px;width:320px;height:180px';
    const target = document.createElement('div');
    host.appendChild(target);
    document.body.appendChild(host);
    let player;
    const finish = (value) => {
      player?.destroy?.();
      host.remove();
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), 10000);
    player = new YT.Player(target, {
      videoId,
      events: {
        onReady: () => {
          clearTimeout(timer);
          const d = Math.round(player.getDuration());
          finish(d > 0 ? d : null);
        },
        onError: () => {
          clearTimeout(timer);
          finish(null);
        },
      },
    });
  });
}

export default function LessonForm({
  action, lesson, units, defaultUnitId,
}) {
  const [state, formAction] = useFormState(action, null);
  const titleRef = useRef(null);
  const durationRef = useRef(null);
  const [lookup, setLookup] = useState({ status: 'idle' });

  const checkVideo = async (url) => {
    if (!url.trim()) return;
    setLookup({ status: 'loading' });
    const res = await fetch(`/api/admin/youtube?url=${encodeURIComponent(url)}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setLookup({ status: 'error', message: data.error || 'Couldn’t check that video.' });
      return;
    }
    if (titleRef.current && !titleRef.current.value) titleRef.current.value = data.title;
    setLookup({ status: 'ok', message: `“${data.title}” by ${data.channel}` });
    const seconds = await measureDuration(data.id);
    if (seconds && durationRef.current) durationRef.current.value = formatDuration(seconds);
  };

  return (
    <form action={formAction} className="grid gap-4">
      {lesson && <input type="hidden" name="id" value={lesson.id} />}
      <Field id="ls-url" label="YouTube link" hint="Paste the video link; the title and length fill in automatically.">
        <input
          id="ls-url"
          name="url"
          required
          defaultValue={lesson?.url || ''}
          onBlur={(e) => checkVideo(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=…"
          className={inputClass()}
        />
      </Field>
      {lookup.status === 'loading' && <p className="text-sm text-muted">Checking the video…</p>}
      {lookup.status === 'ok' && <p className="text-sm text-accent">{lookup.message}</p>}
      {lookup.status === 'error' && <p role="alert" className="text-sm text-danger">{lookup.message}</p>}

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_140px]">
        <Field id="ls-title" label="Lesson title">
          <input id="ls-title" ref={titleRef} name="title" required maxLength={160} defaultValue={lesson?.title || ''} className={inputClass()} />
        </Field>
        <Field id="ls-duration" label="Length" hint="e.g. 6:05">
          <input
            id="ls-duration"
            ref={durationRef}
            name="duration"
            required
            inputMode="numeric"
            defaultValue={lesson ? formatDuration(lesson.duration) : ''}
            className={inputClass('tabular-nums')}
          />
        </Field>
      </div>

      <Field id="ls-unit" label="Unit">
        <select id="ls-unit" name="unitId" defaultValue={lesson?.unitId || defaultUnitId} className={inputClass()}>
          {units.map((u) => <option key={u.id} value={u.id}>{u.title}</option>)}
        </select>
      </Field>
      <Field id="ls-try" label="Try it yourself" hint="The hands-on step after watching, e.g. “Cast on 20 stitches”.">
        <input id="ls-try" name="tryTask" required maxLength={300} defaultValue={lesson?.tryTask || ''} className={inputClass()} />
      </Field>
      <Field id="ls-practice" label="Practice time (minutes)" hint="How long the Try step takes. Leave blank to estimate 1.5× the video.">
        <input id="ls-practice" name="practiceMinutes" inputMode="numeric" defaultValue={lesson?.practiceMinutes ?? ''} className={inputClass('w-28 tabular-nums')} />
      </Field>
      <Field id="ls-desc" label="Short description">
        <input id="ls-desc" name="description" maxLength={600} defaultValue={lesson?.description || ''} className={inputClass()} />
      </Field>
      <Field id="ls-transcript" label="Transcript" hint="Optional. Shown under the video.">
        <textarea id="ls-transcript" name="transcript" rows={5} defaultValue={lesson?.transcript || ''} className={textareaClass()} />
      </Field>
      <Field id="ls-lang" label="Captions language" hint="Two-letter code YouTube uses for captions, e.g. en, fr, yo.">
        <input id="ls-lang" name="captionsLang" maxLength={10} defaultValue={lesson?.captionsLang || 'en'} className={inputClass('w-28')} />
      </Field>
      <Field
        id="ls-code"
        label="Code sandbox starter"
        hint="Optional. HTML, CSS and JavaScript the sandbox opens with. Adding it shows the sandbox on this lesson."
      >
        <textarea
          id="ls-code"
          name="starterCode"
          rows={6}
          spellCheck={false}
          defaultValue={lesson?.starterCode || ''}
          className={textareaClass('font-mono text-[13px]')}
        />
      </Field>
      <FormMessage state={state} />
      <SubmitButton className="justify-self-start">{lesson ? 'Save lesson' : 'Add lesson'}</SubmitButton>
    </form>
  );
}
