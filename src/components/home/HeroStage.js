import React from 'react';
import { Clock, Flame, Hand } from 'lucide-react';
import { XP } from '../../lib/xpValues';

// What every lesson offers, floating beside the headline on wide screens.
const BADGES = [
  {
    icon: Hand, title: `+${XP.TRY} XP`, sub: 'for every Try step', className: 'right-[30%] top-8', tilt: '-4deg', delay: '0s',
  },
  {
    icon: Flame, title: 'Weekly streaks', sub: 'practise a few days a week', className: 'right-10 top-6', tilt: '5deg', delay: '-2s',
  },
  {
    icon: Clock, title: 'Under 10 minutes', sub: 'every lesson, on YouTube', className: 'right-[18%] top-[7.5rem]', tilt: '3deg', delay: '-4s',
  },
];

// The home page's stage: a soft glow, a grid floor drifting away in perspective behind the
// 3D shelf, and floating badges. Everything here is decorative.
export default function HeroStage({ children }) {
  return (
    <section className="relative isolate overflow-hidden rounded-[28px] border border-line px-4 pb-5 pt-7 sm:px-8 sm:pt-10">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft/80 via-canvas/40 to-canvas" />
      <div aria-hidden="true" className="absolute -right-24 -top-28 -z-10 h-96 w-96 rounded-full bg-xp/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-28 top-48 -z-10 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[-30%] bottom-0 -z-10 h-[58%] overflow-hidden [mask-image:linear-gradient(to_top,black_15%,transparent)]">
        <div
          className="h-[200%] w-full origin-bottom motion-safe:animate-drift"
          style={{
            transform: 'perspective(500px) rotateX(62deg)',
            backgroundImage: 'linear-gradient(rgb(var(--lt-line)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--lt-line)) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        {BADGES.map(({
          icon: Icon, title, sub, className, tilt, delay,
        }) => (
          <div
            key={title}
            className={`absolute ${className} flex items-center gap-3 rounded-lg border border-line bg-surface/90 px-3.5 py-2.5 shadow-lg backdrop-blur motion-safe:animate-bob`}
            style={{ '--tilt': tilt, animationDelay: delay, transform: `rotate(${tilt})` }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-xp-soft text-xp">
              <Icon size={18} />
            </span>
            <span className="grid">
              <span className="text-sm font-bold">{title}</span>
              <span className="text-xs text-muted">{sub}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-8">{children}</div>
    </section>
  );
}
