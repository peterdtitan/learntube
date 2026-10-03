// Reasons learners can pick when reporting a make.
export const REPORT_REASONS = [
  { id: 'offensive', text: 'Offensive, hateful or harassing' },
  { id: 'spam', text: 'Spam or advertising' },
  { id: 'personal-info', text: 'Shares someone’s personal information' },
  { id: 'not-a-make', text: 'Not something they made' },
  { id: 'other', text: 'Something else' },
];

const REASON_TEXT = Object.fromEntries(REPORT_REASONS.map((r) => [r.id, r.text]));

export function reasonText(id) {
  return REASON_TEXT[id] || null;
}

// Reports from this many different learners hide a make until an admin reviews it.
export const AUTO_HIDE_REPORTS = 3;

// Prisma filter for makes a viewer may see: anything visible, plus their own hidden ones.
export function visibleMakesFor(viewerId) {
  return viewerId ? { OR: [{ hiddenAt: null }, { userId: viewerId }] } : { hiddenAt: null };
}
