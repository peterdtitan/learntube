import { q } from '../../src/lib/content/plan';

// Free drawing fundamentals: confident lines, simple 3D forms, perspective and shading, then
// building real objects from those shapes.

export default {
  slug: 'skill-draw-with-shapes',
  title: 'Draw anything with simple shapes',
  description: 'Loosen up your lines, draw boxes, spheres and cylinders in perspective, shade them, and build real objects from them.',
  makeTitle: 'A shaded drawing of an object from your home',
  skillId: 'drawing',
  by: 'The Pencil Room',
  modules: [
    {
      title: 'Confident lines',
      lessons: [
        {
          id: 'VtgB2pCC73M',
          title: 'How to actually start drawing',
          by: 'KeshArt',
          seconds: 151,
          try: 'Get any pencil and plain paper. Fill one page with doodles of what is on your desk, without erasing.',
          minutes: 15,
          questions: [
            q.tf('You need expensive materials to start drawing.', false, 'A pencil and plain paper are enough.'),
          ],
        },
        {
          id: 'ing1x95WZ_I',
          title: 'Lines, lines, lines',
          seconds: 1265,
          try: 'Fill a page with straight lines between pairs of dots, drawing from your shoulder, not your wrist.',
          minutes: 30,
          questions: [
            q.single('For long, straight lines, move from…', ['Your shoulder', 'Your fingertips', 'Your wrist only', 'It doesn’t matter'], 0),
            q.tf('Drawing a line quickly and confidently usually makes it straighter than drawing slowly.', true),
          ],
        },
        {
          id: 'UOC8ISSbFx0',
          title: 'Five warm-up exercises',
          by: 'KeshArt',
          seconds: 376,
          try: 'Do the five exercises for ten minutes. Make this your warm-up before every drawing session.',
          minutes: 20,
          questions: [
            q.tf('A short warm-up before drawing helps your lines get steadier.', true),
          ],
        },
      ],
    },
    {
      title: 'Simple shapes in 3D',
      lessons: [
        {
          id: 'lbuwzjSfCdY',
          title: 'Sketch simple 3D shapes',
          seconds: 1763,
          try: 'Draw ten cubes, ten cylinders and ten spheres from different angles. Draw through them, showing the hidden edges.',
          minutes: 45,
          questions: [
            q.tf('Drawing through a shape (showing hidden edges) helps you get it right.', true),
          ],
        },
        {
          id: 'NlaG6ecO3JQ',
          title: 'Sphere, cylinder, cone and cube',
          by: 'HamaTime Productions',
          seconds: 383,
          try: 'Draw each of the four forms three times, from a slightly different angle each time.',
          minutes: 25,
          questions: [
            q.multi('Which of these are basic forms you can build objects from?', ['Sphere', 'Cylinder', 'Cone', 'Cube'], [0, 1, 2, 3]),
          ],
        },
        {
          id: 'IjpkMgMkA-I',
          title: 'Draw boxes correctly',
          by: 'pikat',
          seconds: 515,
          try: 'Draw 20 boxes. Check each one: do the parallel edges head towards the same point?',
          minutes: 30,
          questions: [
            q.tf('In perspective, parallel edges of a box move towards the same vanishing point.', true),
          ],
        },
        {
          id: 'g9ge4XBNRwA',
          title: 'Perspective for beginners',
          by: 'SamDoesArts',
          seconds: 448,
          try: 'Draw a horizon line and one vanishing point, then draw five boxes above, on and below the horizon.',
          minutes: 30,
          questions: [
            q.single('In one-point perspective, lines going away from you meet at…', ['One vanishing point on the horizon', 'The edge of the page', 'Two points', 'Nowhere'], 0),
            q.tf('The horizon line sits at the viewer’s eye level.', true),
          ],
        },
      ],
    },
    {
      title: 'Light, shade and real objects',
      lessons: [
        {
          id: '9r2SIYXQNgI',
          title: 'Shade a sphere',
          by: 'Circle Line Art School',
          seconds: 240,
          try: 'Shade a sphere with a light coming from the top left: highlight, mid-tone, core shadow and cast shadow.',
          minutes: 30,
          questions: [
            q.order('Order the tones on a shaded sphere from lightest to darkest.', ['Highlight', 'Mid-tone', 'Core shadow'], 'The cast shadow on the table is usually darkest near the object.'),
          ],
        },
        {
          id: '-6F5q_5HC3o',
          title: 'Draw anything using simple shapes',
          by: 'RapidFireArt',
          seconds: 663,
          try: 'Choose an object at home (a mug, a lamp, a shoe). Block it in with simple shapes, refine the outline, shade it, and log it as your make.',
          minutes: 60,
          questions: [
            q.single('A mug is mostly built from…', ['A cylinder', 'A cube', 'A cone', 'A sphere'], 0),
            q.tf('Start with big simple shapes and add details last.', true),
          ],
        },
      ],
    },
  ],
};
