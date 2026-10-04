'use client';

import React, { useEffect, useRef } from 'react';
import cn from '../../lib/cn';

const REST = 'perspective(900px) rotateX(0deg) rotateY(0deg)';

// Leans its child towards the mouse in 3D, with a soft glare where the pointer is. Mouse only
// (touch has no hover), and off for reduced motion. Styles are set directly on the element,
// so moving the mouse never re-renders the card.
export default function Tilt({ children, className, max = 7 }) {
  const ref = useRef(null);
  const glare = useRef(null);
  const still = useRef(false);
  const frame = useRef(0);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { still.current = query.matches; };
    update();
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const move = (e) => {
    if (e.pointerType !== 'mouse' || still.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateZ(0)`;
      glare.current.style.opacity = '1';
      glare.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgb(255 255 255 / 0.16), transparent 55%)`;
    });
  };
  const leave = () => {
    cancelAnimationFrame(frame.current);
    ref.current.style.transform = REST;
    glare.current.style.opacity = '0';
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ transform: REST }}
      className={cn('relative transition-transform duration-200 ease-out will-change-transform motion-reduce:transition-none', className)}
    >
      {children}
      <span ref={glare} aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200" />
    </div>
  );
}
