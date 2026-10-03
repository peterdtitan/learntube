export function firstName(name) {
  return (name || 'A learner').split(' ')[0];
}

export function initials(name) {
  return (name || '?')
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
