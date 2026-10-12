import React from 'react';
import Image from 'next/image';
import cn from '../../lib/cn';

// App screenshots in device frames. Phone shots are 603x1311 (with status bar); laptop shots 16:10.
export function Phone({
  src, alt, className, priority = false,
}) {
  return (
    <div className={cn('device-phone', className)}>
      <div>
        <Image src={src} alt={alt} width={603} height={1311} priority={priority} className="block h-auto w-full" sizes="(min-width: 1024px) 300px, 45vw" />
      </div>
    </div>
  );
}

export function Laptop({
  src, alt, className, priority = false,
}) {
  return (
    <div className={className}>
      <div className="device-lid">
        <div>
          <Image src={src} alt={alt} width={1440} height={900} priority={priority} className="block h-auto w-full" sizes="(min-width: 1024px) 760px, 92vw" />
        </div>
      </div>
      <div className="device-base" />
    </div>
  );
}

export function XpPill({
  children, tilt = '0deg', delay = '0s', className,
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex items-center rounded-pill bg-gold px-4 py-2 font-display text-lg font-extrabold text-[#2B1E05] shadow-lg motion-safe:animate-bob', className)}
      style={{ '--tilt': tilt, animationDelay: delay, transform: `rotate(${tilt})` }}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, dark = false }) {
  return (
    <p className={cn('text-sm font-bold uppercase tracking-[0.2em]', dark ? 'text-mint' : 'text-accent')}>
      {children}
    </p>
  );
}

// Full-width band content, lined up with the header.
export function Wrap({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}
