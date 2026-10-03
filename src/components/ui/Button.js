import React from 'react';
import Link from 'next/link';
import cn from '../../lib/cn';

const VARIANTS = {
  primary: 'bg-accent text-on-accent hover:bg-accent/90',
  ghost: 'border border-line bg-transparent text-ink hover:bg-sunken',
  quiet: 'bg-transparent text-muted hover:text-ink',
};

const SIZES = {
  md: 'h-11 px-5 text-[15px]',
  sm: 'h-9 px-4 text-sm',
};

// Renders a Link when given href, otherwise a button.
export default function Button({
  href, variant = 'primary', size = 'md', className, children, type = 'button', ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-pill font-bold transition-colors',
    'disabled:cursor-not-allowed disabled:bg-line disabled:text-muted',
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  if (href) {
    return <Link href={href} className={classes} {...props}>{children}</Link>;
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={classes} {...props}>{children}</button>
  );
}
