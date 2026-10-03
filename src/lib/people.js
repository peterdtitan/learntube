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

// What other learners see. Never the full account name unless the learner chose it:
// their display name, or first name plus last initial ("Ada L.").
export function publicName(user) {
  const chosen = user?.displayName?.trim();
  if (chosen) return chosen;
  const parts = (user?.name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'A learner';
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.` : parts[0];
}

export const DISPLAY_NAME_MAX = 40;

// Letters (any language), digits, spaces and . ' - _ ; 2 to 40 characters.
export function validateDisplayName(value) {
  if (typeof value !== 'string') return { error: 'Display name must be text.' };
  const name = value.trim().replace(/\s+/g, ' ');
  if (name.length < 2) return { error: 'Use at least 2 characters.' };
  if (name.length > DISPLAY_NAME_MAX) return { error: `Use ${DISPLAY_NAME_MAX} characters or fewer.` };
  if (!/^[\p{L}\p{N} .'’_-]+$/u.test(name)) return { error: 'Use letters, numbers, spaces and . \' - _ only.' };
  return { name };
}
