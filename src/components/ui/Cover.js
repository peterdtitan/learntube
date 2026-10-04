import React from 'react';
import Image from 'next/image';
import SkillIcon from './SkillIcon';
import cn from '../../lib/cn';

// A 16:9 cover. Decorative, since the title is always beside it. Without an image it shows
// the skill's icon on a tint of its colour.
export default function Cover({
  src, skill, sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw', priority = false, className,
}) {
  return (
    <div className={cn('relative aspect-video w-full overflow-hidden bg-sunken', className)}>
      {src ? (
        <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center" style={{ background: `${skill?.color || '#55616C'}26` }}>
          <SkillIcon skill={skill} size="lg" />
        </div>
      )}
    </div>
  );
}
