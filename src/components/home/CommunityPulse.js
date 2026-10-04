'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Camera, Flame, Hand, Users,
} from 'lucide-react';
import CheerButton from '../community/CheerButton';
import { initials } from '../../lib/people';
import { timeAgo } from '../../lib/notificationText';

// Counts up from zero the first time it scrolls into view.
function CountUp({ value }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    if (reduce || value === 0) {
      setShown(value);
      return undefined;
    }
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 900);
      setShown(Math.round(value * (1 - (1 - t) ** 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, value, reduce]);
  return <span ref={ref} className="tabular-nums">{shown.toLocaleString('en')}</span>;
}

function Avatar({ name, color }) {
  return (
    <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ background: color || '#2F6F62' }}>
      {initials(name)}
    </span>
  );
}

function FeedItem({ item }) {
  if (item.type === 'make') {
    return (
      <div className="flex items-center gap-3">
        <Avatar name={item.author.name} color={item.skill?.color} />
        <p className="min-w-0 flex-1 text-[15px]">
          <Link href={`/learners/${item.author.id}`} className="font-bold hover:text-accent">{item.author.name}</Link>
          {' made '}
          <Link href={`/makes/${item.id}`} className="font-bold text-accent hover:underline">{item.title}</Link>
          {item.skill && <span className="text-muted">{` · ${item.skill.name}`}</span>}
          <span className="block text-sm text-muted">{timeAgo(item.createdAt)}</span>
        </p>
        <Camera size={16} className="shrink-0 text-muted" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <Avatar name={item.author.name} color="#C9961A" />
      <p className="min-w-0 flex-1 text-[15px]">
        <Link href={`/learners/${item.author.id}`} className="font-bold hover:text-accent">{item.author.name}</Link>
        {` ${item.text}`}
        <span className="block text-sm text-muted">{timeAgo(item.createdAt)}</span>
      </p>
      <CheerButton
        milestoneId={item.id}
        initialCount={item.cheerCount}
        initialCheered={item.cheered}
        isMine={item.isMine}
      />
    </div>
  );
}

export default function CommunityPulse({ stats, feed }) {
  const reduce = useReducedMotion();
  const STATS = [
    { icon: Users, value: stats.learners, label: 'learners practised this week' },
    { icon: Hand, value: stats.tried, label: 'Try steps done this week' },
    { icon: Flame, value: stats.makes, label: 'makes shared this week' },
  ];
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-4 rounded-lg border border-line bg-surface p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Icon size={20} aria-hidden="true" />
            </span>
            <div>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display text-3xl font-bold"><CountUp value={value} /></dd>
              <dd className="text-sm text-muted" aria-hidden="true">{label}</dd>
            </div>
          </div>
        ))}
      </dl>
      {feed.length ? (
        <ol className="grid gap-4 rounded-lg border border-line bg-surface p-5" aria-label="Recent activity">
          {feed.map((item, i) => (
            <motion.li
              key={`${item.type}-${item.id}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <FeedItem item={item} />
            </motion.li>
          ))}
        </ol>
      ) : (
        <p className="rounded-lg border border-dashed border-line px-5 py-8 text-center text-muted">
          It’s quiet right now. Finish a Try step and log what you made to get things going.
        </p>
      )}
    </div>
  );
}
