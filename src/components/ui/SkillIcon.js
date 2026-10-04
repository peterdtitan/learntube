import React from 'react';
import {
  BarChart3, Camera, ChefHat, Code2, Guitar, Megaphone, Music, Pencil, Scissors, ShieldCheck,
  Sparkles,
} from 'lucide-react';
import cn from '../../lib/cn';

// A ball of yarn, drawn to match lucide's 24px, 2px-stroke style (lucide has no yarn icon).
function Yarn({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M4.5 7.5c4.5 0 9 3 11 10" />
      <path d="M7.5 3.8c3.5 2.2 6.5 6.4 7.4 12.2" />
      <path d="M3.2 12.5c3.5-.4 7.4 1.5 9.6 6.4" />
      <path d="M17 17c1.5 1.5 2.5 2 4 2" />
    </svg>
  );
}

const ICONS = {
  cooking: ChefHat,
  knitting: Yarn,
  sewing: Scissors,
  drawing: Pencil,
  guitar: Guitar,
  photography: Camera,
  'software-engineering': Code2,
  data: BarChart3,
  'digital-marketing': Megaphone,
  'music-production': Music,
  cybersecurity: ShieldCheck,
};

export function skillIcon(id) {
  return ICONS[id] || Sparkles;
}

const SIZES = {
  xs: { box: 'h-[18px] w-[18px] rounded-[5px]', icon: 11 },
  sm: { box: 'h-6 w-6 rounded-md', icon: 14 },
  md: { box: 'h-10 w-10 rounded-md', icon: 20 },
  lg: { box: 'h-14 w-14 rounded-lg', icon: 28 },
};

// The skill's icon, white on its colour. Decorative: the skill's name is always next to it.
export default function SkillIcon({ skill, size = 'xs', className }) {
  const Icon = skillIcon(skill?.id);
  const s = SIZES[size];
  return (
    <span
      aria-hidden="true"
      className={cn('inline-grid shrink-0 place-items-center text-white', s.box, className)}
      style={{ background: skill?.color || '#55616C' }}
    >
      <Icon size={s.icon} strokeWidth={size === 'xs' ? 2.5 : 2} />
    </span>
  );
}
