// Lets phones add Skillreps to the home screen with its own name, icon and colours.
export default function manifest() {
  return {
    name: 'Skillreps',
    short_name: 'Skillreps',
    description: 'Learn a skill by making something. Free YouTube lessons, put in order.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3F5F7',
    theme_color: '#2F6F62',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
