'use client';

import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';

const MAX_EDGE = 1600;

// Phone photos are often 4-8 MB; scale to 1600px JPEG before upload. Falls back to the original.
async function shrink(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1.5 * 1024 * 1024) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => { canvas.toBlob(resolve, 'image/jpeg', 0.85); });
    return blob ? new File([blob], 'photo.jpg', { type: 'image/jpeg' }) : file;
  } catch {
    return file;
  }
}

export default function LogMakeForm({ videoId, suggestion, onLogged }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!photo) { setPreview(null); return undefined; }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage('Give your make a title.');
      return;
    }
    setStatus('saving');
    setMessage('');

    let imageUrl = null;
    if (photo) {
      const body = new FormData();
      body.append('file', await shrink(photo));
      const res = await fetch('/api/uploads', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('idle');
        setMessage(data.error || 'The photo didn’t upload. Try again, or log without it.');
        return;
      }
      imageUrl = data.url;
    }

    const res = await fetch('/api/makes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, note, imageUrl, videoId,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus('idle');
      setMessage(data.error || 'That didn’t save. Try again.');
      return;
    }
    setTitle('');
    setNote('');
    setPhoto(null);
    setStatus('idle');
    onLogged(data.xpAwarded || 0, data.milestones || []);
  };

  return (
    <form onSubmit={submit} className="grid gap-3" noValidate>
      <div className="grid gap-1">
        <label htmlFor="make-title" className="text-sm font-bold">What did you make?</label>
        <input
          id="make-title"
          value={title}
          maxLength={120}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={suggestion || 'e.g. My first garter swatch'}
          className="h-11 rounded-md border border-line bg-surface px-3 text-[15px] placeholder:text-muted"
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="make-note" className="text-sm font-bold">
          Note
          <span className="font-normal text-muted"> (optional)</span>
        </label>
        <textarea
          id="make-note"
          rows={3}
          value={note}
          maxLength={2000}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What went well, what you'd change next time"
          className="rounded-md border border-line bg-surface px-3 py-2 text-[15px] placeholder:text-muted"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="make-photo" className="inline-flex h-9 cursor-pointer items-center rounded-pill border border-line px-4 text-sm font-bold hover:bg-sunken">
          {photo ? 'Change photo' : 'Add a photo'}
          <input
            id="make-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
        </label>
        {preview && (
          // A local object URL preview; next/image can't optimise blob: URLs.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview of your make" className="h-14 w-14 rounded-sm object-cover" />
        )}
        {photo && <button type="button" onClick={() => setPhoto(null)} className="text-sm text-muted underline">Remove</button>}
      </div>
      {message && <p role="alert" className="text-sm text-danger">{message}</p>}
      <Button type="submit" disabled={status === 'saving'} className="justify-self-start">
        {status === 'saving' ? 'Saving…' : 'Log it'}
      </Button>
    </form>
  );
}
