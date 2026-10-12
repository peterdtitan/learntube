// Design tokens: the single source for the web app (via Tailwind) and, later, the mobile app.
// Plain CommonJS so tailwind.config.js and a React Native app can both require it.

const palette = {
  light: {
    canvas: '#F3F5F7',
    surface: '#FFFFFF',
    sunken: '#E9EDF1',
    ink: '#17212B',
    muted: '#55616C',
    line: '#D9DFE5',
    accent: '#2F6F62',
    accentSoft: '#DCEBE7',
    onAccent: '#FFFFFF',
    xp: '#8F5A0B',
    xpSoft: '#F7EAD2',
    danger: '#B42318',
  },
  dark: {
    canvas: '#11161B',
    surface: '#182027',
    sunken: '#0D1216',
    ink: '#E6EBEF',
    muted: '#9AA6B1',
    line: '#29333C',
    accent: '#6CC3AE',
    accentSoft: '#1E3631',
    onAccent: '#0B1A16',
    xp: '#E8B865',
    xpSoft: '#3A2E19',
    danger: '#F97066',
  },
};

// Fixed colours for the landing page's dark bands; the same in light and dark themes.
const brand = {
  pine: '#2F6F62',
  pineDeep: '#23564C',
  mint: '#6CC3AE',
  night: '#11161B',
  night2: '#182027',
  nightLine: '#29333C',
  moss: '#1E3631',
  gold: '#E8B865',
  haze: '#9AA6B1',
};

const fonts = {
  display: 'Bricolage Grotesque',
  body: 'Atkinson Hyperlegible',
};

const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  pill: '999px',
};

module.exports = {
  palette, brand, fonts, radius,
};
