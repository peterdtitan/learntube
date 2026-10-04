'use client';

import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, ChevronLeft, ChevronRight, Pause, Play,
} from 'lucide-react';
import SkillIcon from '../ui/SkillIcon';
import { formatMinutes } from '../../lib/estimate';
import cn from '../../lib/cn';

const TURN_MS = 3400;
// Server and client agree on the first render; the real size comes from the layout effect.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Skills on a slowly turning 3D ring. Clicking (or tabbing to) a card brings it to the front;
// the front card opens. Turning stops on hover, on focus, with Pause, and for reduced motion.
export default function SkillCarousel({ items }) {
  const stage = useRef(null);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(220);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const [byUser, setByUser] = useState(false);

  const count = items.length;
  const step = 360 / count;
  // Far enough out that neighbouring cards don't overlap.
  const radius = Math.round((cardWidth / 2 + 14) / Math.tan(Math.PI / count));

  useIsoLayoutEffect(() => {
    const measure = () => {
      const width = stage.current?.offsetWidth || 900;
      setCardWidth(Math.round(Math.min(240, Math.max(150, width * 0.22))));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setStill(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const turning = !still && !paused && !hovered && !focused && count > 1;
  useEffect(() => {
    if (!turning) return undefined;
    const t = setInterval(() => setIndex((i) => i + 1), TURN_MS);
    return () => clearInterval(t);
  }, [turning]);

  // `index` keeps counting up so the ring always turns the short way; this is the card in front.
  const front = ((index % count) + count) % count;
  const goTo = (i) => {
    // The nearest rotation that puts card i in front.
    const half = Math.floor(count / 2);
    const delta = ((((i - front) % count) + count + half) % count) - half;
    setByUser(true);
    setIndex((n) => n + delta);
  };
  const current = items[front];

  return (
    <section aria-roledescription="carousel" aria-label="Skills to explore" className="grid gap-5">
      <div
        ref={stage}
        className="relative overflow-hidden"
        // Card: a 16:9 cover plus two lines of title.
        style={{ height: Math.round(cardWidth * 0.5625) + 100, perspective: '1100px' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
      >
        <div aria-hidden="true" className="absolute inset-x-[15%] bottom-0 h-8 rounded-[50%] bg-ink/10 blur-xl" />
        <ul
          className="absolute left-1/2 top-3 [transform-style:preserve-3d]"
          style={{
            width: cardWidth,
            marginLeft: -cardWidth / 2,
            transform: `translateZ(${-radius}px) rotateY(${-index * step}deg)`,
            transition: still ? 'none' : 'transform 900ms cubic-bezier(.2,.7,.2,1)',
          }}
        >
          {items.map((item, i) => {
            const away = Math.min(Math.abs(i - front), count - Math.abs(i - front));
            const isFront = i === front;
            return (
              <li
                key={item.key}
                className="absolute inset-x-0 top-0 transition-opacity duration-700"
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                  opacity: Math.max(0.18, 1 - away * 0.22),
                  backfaceVisibility: 'hidden',
                }}
              >
                <Link
                  href={item.href}
                  aria-current={isFront ? 'true' : undefined}
                  onFocus={() => !isFront && goTo(i)}
                  onClick={(e) => {
                    if (isFront) return;
                    e.preventDefault();
                    goTo(i);
                  }}
                  className={cn(
                    'block overflow-hidden rounded-lg border bg-surface shadow-lg transition-[border-color,box-shadow] duration-300',
                    isFront ? 'border-accent shadow-xl' : 'border-line',
                  )}
                >
                  <span className="relative block aspect-video bg-sunken">
                    {item.cover && (
                      // Eager: lazy loading doesn't fire reliably for cards turned in 3D.
                      <Image src={item.cover} alt="" fill sizes="240px" loading="eager" className="object-cover" />
                    )}
                    {item.kind === 'program' && (
                      <span className="absolute left-2 top-2 rounded-pill bg-xp px-2 py-0.5 text-[11px] font-bold text-white">Program</span>
                    )}
                  </span>
                  <span className="flex items-start gap-2 p-3">
                    <SkillIcon skill={item.skill} className="mt-0.5" />
                    <span className="line-clamp-2 text-[13px] font-bold leading-snug">{item.title}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid min-w-0 gap-0.5" aria-live={byUser ? 'polite' : 'off'}>
          <p className="truncate text-lg font-bold">{current.title}</p>
          <p className="text-sm text-muted">
            {`${current.skill?.name || 'Skill'} · ≈ ${formatMinutes(current.minutes)}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goTo((front - 1 + count) % count)} aria-label="Previous skill" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface hover:border-accent">
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          {!still && (
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Start turning' : 'Stop turning'} className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface hover:border-accent">
              {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
          )}
          <button type="button" onClick={() => goTo((front + 1) % count)} aria-label="Next skill" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface hover:border-accent">
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <Link href={current.href} className="ml-1 inline-flex h-10 items-center gap-1.5 rounded-pill bg-accent px-4 text-sm font-bold text-on-accent hover:bg-accent/90">
            {current.kind === 'program' ? 'See program' : 'Start'}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
