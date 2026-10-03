// The only things learners can say on a make. Adding a phrase is a one-line change;
// removing one hides existing comments that used it.
export const COMMENT_PRESETS = [
  { id: 'nice-work', text: 'Nice work!' },
  { id: 'clean-finish', text: 'Such a clean finish' },
  { id: 'want-to-try', text: 'This makes me want to try it' },
  { id: 'keep-going', text: 'Keep going, you’ve got this' },
  { id: 'how-long', text: 'How long did this take?' },
  { id: 'love-colours', text: 'Love the colours' },
];

const BY_ID = Object.fromEntries(COMMENT_PRESETS.map((p) => [p.id, p.text]));

export function presetText(id) {
  return BY_ID[id] || null;
}
