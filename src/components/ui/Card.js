import React from 'react';
import cn from '../../lib/cn';

export default function Card({
  as: Tag = 'div', className, children, ...props
}) {
  return (
    <Tag className={cn('rounded-lg border border-line bg-surface p-5', className)} {...props}>
      {children}
    </Tag>
  );
}
