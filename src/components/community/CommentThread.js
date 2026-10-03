'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { X } from 'lucide-react';
import cn from '../../lib/cn';

export default function CommentThread({ makeId, initialComments, presets }) {
  const { status } = useSession();
  const [comments, setComments] = useState(initialComments);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const used = new Set(comments.filter((c) => c.isMine).map((c) => c.preset));

  const add = async (preset) => {
    if (status !== 'authenticated') {
      signIn();
      return;
    }
    setBusy(true);
    setMessage('');
    const res = await fetch(`/api/makes/${makeId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preset }),
    });
    setBusy(false);
    const data = await res.json().catch(() => ({}));
    if (res.ok) setComments(data.comments);
    else setMessage(data.error || 'That didn’t post. Try again.');
  };

  const remove = async (commentId) => {
    const res = await fetch(`/api/makes/${makeId}/comments/${commentId}`, { method: 'DELETE' });
    if (res.ok) setComments((list) => list.filter((c) => c.id !== commentId));
  };

  return (
    <section aria-labelledby="comments-heading" className="grid gap-4">
      <h2 id="comments-heading" className="text-xl font-bold">
        {comments.length ? `${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}` : 'Comments'}
      </h2>

      {comments.length > 0 ? (
        <ul className="grid gap-2">
          {comments.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 rounded-md bg-canvas px-4 py-3">
              <div className="grid gap-0.5">
                <Link href={`/learners/${c.author.id}`} className="text-sm font-bold text-muted hover:text-accent">
                  {c.isMine ? 'You' : c.author.name}
                </Link>
                <p className="text-[15px]">{c.text}</p>
              </div>
              {c.isMine && (
                <button type="button" onClick={() => remove(c.id)} aria-label={`Delete your comment "${c.text}"`} className="text-muted hover:text-ink">
                  <X size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No comments yet. Be the first to say something kind.</p>
      )}

      <div className="grid gap-2">
        <p className="text-sm font-bold">Add a comment</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={busy || used.has(p.id)}
              onClick={() => add(p.id)}
              className={cn(
                'rounded-pill border px-3.5 py-2 text-sm transition-colors',
                used.has(p.id) ? 'border-accent bg-accent-soft text-accent' : 'border-line hover:bg-sunken',
              )}
            >
              {p.text}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">Comments are picked from these phrases to keep things friendly.</p>
        {message && <p role="alert" className="text-sm text-danger">{message}</p>}
      </div>
    </section>
  );
}
