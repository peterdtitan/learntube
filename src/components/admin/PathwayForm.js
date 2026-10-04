'use client';

import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';
import {
  Field, FormMessage, inputClass, textareaClass,
} from './fields';

const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// Which option matches the stored cover: a lesson's thumbnail, none (auto) or an upload.
function initialChoice(imageUrl, covers) {
  if (!imageUrl) return 'auto';
  const match = covers.find((c) => imageUrl === ytThumb(c.videoId));
  return match ? match.videoId : 'keep';
}

function CoverField({ pathway, covers, autoCover }) {
  const [choice, setChoice] = useState(initialChoice(pathway.imageUrl, covers));
  const [upload, setUpload] = useState(null);
  useEffect(() => () => upload && URL.revokeObjectURL(upload), [upload]);

  let preview = pathway.imageUrl;
  if (upload) preview = upload;
  else if (choice === 'auto') preview = autoCover;
  else if (choice !== 'keep') preview = ytThumb(choice);

  return (
    <fieldset className="grid gap-3 rounded-md border border-line p-4">
      <legend className="px-1 text-sm font-bold">Cover image</legend>
      <div className="grid gap-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-start">
        <div className="aspect-video overflow-hidden rounded-md bg-sunken">
          {preview && (
            // eslint-disable-next-line @next/next/no-img-element -- previews a local file too
            <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="grid gap-3">
          <Field id="pw-cover" label="Use a lesson's thumbnail">
            <select
              id="pw-cover"
              name="cover"
              value={choice}
              onChange={(e) => setChoice(e.target.value)}
              disabled={Boolean(upload)}
              className={inputClass()}
            >
              <option value="auto">Automatic (the first lesson)</option>
              {choice === 'keep' && <option value="keep">Keep the uploaded image</option>}
              {covers.map((c) => <option key={c.videoId} value={c.videoId}>{c.title}</option>)}
            </select>
          </Field>
          <Field id="pw-cover-file" label="Or upload an image" hint="JPEG, PNG or WebP, up to 4 MB. Wide (16:9) works best.">
            <input
              id="pw-cover-file"
              name="coverFile"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const [file] = e.target.files || [];
                setUpload(file ? URL.createObjectURL(file) : null);
              }}
              className="text-sm"
            />
          </Field>
        </div>
      </div>
    </fieldset>
  );
}

export default function PathwayForm({
  action, pathway, skills, submitLabel, covers = [], autoCover = null,
}) {
  const [state, formAction] = useFormState(action, null);
  return (
    <form action={formAction} className="grid gap-4">
      {pathway && <input type="hidden" name="id" value={pathway.id} />}
      <Field id="pw-title" label="Title">
        <input id="pw-title" name="title" required maxLength={120} defaultValue={pathway?.title} className={inputClass()} />
      </Field>
      <Field id="pw-skill" label="Skill">
        <select id="pw-skill" name="skillId" defaultValue={pathway?.skillId || ''} className={inputClass()}>
          <option value="">No skill</option>
          {skills.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </Field>
      <Field id="pw-make" label="You'll make" hint="What a learner has made by the end, e.g. “A lined zip pouch”.">
        <input id="pw-make" name="makeTitle" maxLength={160} defaultValue={pathway?.makeTitle || ''} className={inputClass()} />
      </Field>
      <Field id="pw-desc" label="Description">
        <textarea id="pw-desc" name="description" rows={3} maxLength={600} defaultValue={pathway?.description || ''} className={textareaClass()} />
      </Field>
      {pathway && <CoverField pathway={pathway} covers={covers} autoCover={autoCover} />}
      <FormMessage state={state} />
      <SubmitButton className="justify-self-start">{submitLabel}</SubmitButton>
    </form>
  );
}
