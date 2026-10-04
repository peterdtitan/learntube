
export const LEGAL = {
  company: 'Elev8r Software Ltd.',
  country: 'Nigeria',
  contactEmail: 'peterdtitan@gmail.com',
  minimumAge: 13,
  updated: '4 October 2026',
};

export function placeholders(values = LEGAL) {
  return Object.entries(values)
    .filter(([, v]) => typeof v === 'string' && /\[[^\]]+\]/.test(v))
    .map(([k]) => k);
}

export default LEGAL;
