import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/draw-anime.json';

// "How to draw anime" is one of the top drawing searches in both the US and Nigeria. Art WL's
// pencil series takes you from the head to a shaded character, with Whyt Manga on faces.

export default {
  slug: 'skill-draw-anime',
  title: 'Draw anime characters',
  description: 'Build an anime head and face from simple guidelines, draw expressive eyes and hair, put together a full character, and shade it with one pencil.',
  makeTitle: 'An original anime character you designed, drew and shaded',
  skillId: 'drawing',
  cover: 'GcIqy9tvncA',
  by: 'Art WL',
  videos,
  lessons: {
    UlNZuBJaUtU: {
      title: 'The anime head and face',
      try: 'Draw five heads facing forward: a circle, a jaw, a centre line and an eye line. Keep the lines light.',
      minutes: 30,
      questions: [
        q.single('The first shape for an anime head is usually…', ['A circle for the skull', 'A square', 'The eyes', 'The hair'], 0),
        q.single('The vertical centre line on a face helps you…', ['Keep the features balanced on both sides', 'Shade the face', 'Draw the hair', 'Erase mistakes'], 0),
      ],
    },
    'bgI8pqezB-c': {
      title: 'Faces for beginners',
      try: 'Draw the same face three ways: facing forward, turned three-quarters, and in profile. Curve the centre line as the head turns.',
      minutes: 30,
      questions: [
        q.single('When a head turns to a three-quarter view, the centre line…', ['Curves and moves towards the side the head turns', 'Stays straight in the middle', 'Disappears', 'Moves to the ear'], 0),
        q.tf('Anime faces usually have small noses and mouths compared with the eyes.', true),
      ],
    },
    '7Slk95Odq4Y': {
      title: 'Basic anatomy for beginners',
      try: 'Draw a simple full-body figure with stick lines and shapes, about seven heads tall, before adding any clothes.',
      minutes: 30,
      questions: [
        q.single('Starting a figure with a stick figure and simple shapes helps you…', ['Get the pose and proportions right before details', 'Finish faster without thinking', 'Skip anatomy', 'Shade it'], 0),
        q.single('Body proportions are often measured in…', ['Head heights', 'Centimetres only', 'Eye widths only', 'Hand lengths only'], 0),
      ],
    },
    CFQbbfBnM5w: {
      title: 'Male anime eyes',
      try: 'Draw a pair of narrower male anime eyes with a strong upper lash line and a small highlight.',
      minutes: 15,
      questions: [
        q.single('Male anime eyes are often drawn…', ['Narrower, with sharper lines', 'Bigger and rounder than female eyes', 'Without pupils', 'As circles only'], 0),
        q.tf('The upper lash line is usually the darkest, thickest line of an anime eye.', true),
      ],
    },
    tQIxaVnKvn4: {
      title: 'Female anime eyes',
      try: 'Draw three pairs of large anime eyes, each with an iris, pupil, lashes and highlights. Keep the highlights the same side in both eyes.',
      minutes: 30,
      questions: [
        q.single('The white highlight in anime eyes shows…', ['Where the light reflects', 'The pupil', 'A tear only', 'The eyelid'], 0),
        q.single('Highlights in both eyes should be…', ['On the same side, matching the light source', 'On opposite sides', 'Anywhere', 'Left out'], 0),
      ],
    },
    '2jIFIOr9Zt0': {
      title: 'Drawing hair',
      try: 'Draw a hairstyle on one of your heads. Start from the parting and draw hair in clumps, not single strands.',
      minutes: 30,
      questions: [
        q.single('Anime hair is easiest to draw in…', ['Clumps or locks flowing from the parting', 'Hundreds of single strands', 'A flat block', 'Straight lines only'], 0),
        q.single('Hair should sit…', ['Slightly outside the skull line, with volume', 'Exactly on the skull line', 'Inside the head', 'Only at the back'], 0),
      ],
    },
    ULc6pWzQnwI: {
      title: 'Hair dos and don’ts',
      try: 'Look at your hairstyle and fix one “don’t” from the video, such as flat hair or strands that all point the same way.',
      minutes: 20,
      questions: [
        q.tf('Varying the size and direction of hair clumps makes hair look more natural.', true),
        q.single('A common hair mistake is…', ['Drawing hair flat against the head with no volume', 'Starting from the parting', 'Using clumps', 'Adding layers'], 0),
      ],
    },
    GcIqy9tvncA: {
      title: 'Draw a full character',
      try: 'Draw a full anime character from head to toe: pose, body shapes, face, hair and clothes.',
      minutes: 60,
      questions: [
        q.order('Put drawing a character in order.', ['Sketch the pose with simple shapes', 'Draw the head and face guidelines', 'Add features and hair', 'Add clothes', 'Clean up the lines']),
        q.single('Why sketch lightly first?', ['Light lines are easy to erase and correct', 'Dark lines are faster', 'It saves pencil', 'It is required'], 0),
      ],
    },
    KjmdOlBdFnc: {
      title: 'Draw with only one pencil',
      try: 'Draw a head with one pencil, getting light and dark only by changing pressure.',
      minutes: 30,
      questions: [
        q.single('With only one pencil, darker tones come from…', ['More pressure and more layers', 'A different paper', 'Erasing', 'Water'], 0),
        q.tf('Light pressure first, then building up, gives more control than pressing hard straight away.', true),
      ],
    },
    ayGwVQQJDr0: {
      title: 'Shading with a pencil',
      try: 'Pick a light source, then shade your character’s face and hair: shadows under the hair, chin and nose.',
      minutes: 40,
      questions: [
        q.single('Shadows fall…', ['On the side away from the light source', 'Towards the light', 'Everywhere equally', 'Only on hair'], 0),
        q.single('Where does hair cast a shadow on the face?', ['On the forehead, just under the fringe', 'On the chin only', 'Nowhere', 'On the ears only'], 0),
      ],
    },
    '7mK1vqZqnEs': {
      title: 'Shading an anime character',
      try: 'Finish your original character with clean lines and shading. Photograph it in good light and log it as your make.',
      minutes: 60,
      questions: [
        q.single('Softer pencils like 2B or 4B give…', ['Darker, softer lines', 'Lighter, harder lines', 'Coloured lines', 'No marks'], 0),
        q.single('Blending shading with a tissue or blending stump makes it…', ['Smoother', 'Darker only', 'Sharper', 'Disappear'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Heads, faces and bodies',
      lessons: ['UlNZuBJaUtU', 'bgI8pqezB-c', '7Slk95Odq4Y'],
      checkpoint: exam('Heads and faces exam', [
        q.single('In a front-facing anime head, the eyes usually sit…', ['Around the middle of the head or a little below', 'At the very top', 'At the chin', 'Above the hairline'], 0),
        q.single('The gap between the eyes is about…', ['One eye’s width', 'Three eye widths', 'Half an eye', 'No gap'], 0),
        q.single('The ears usually line up…', ['Between the eye line and the bottom of the nose', 'With the chin', 'Above the head', 'With the mouth only'], 0),
        q.single('The centre line on a profile view…', ['Is no longer visible as the face is side-on', 'Stays in the middle', 'Splits the eye', 'Becomes the hairline'], 0),
        q.tf('Guidelines are drawn lightly and erased later.', true),
        q.single('Anime jaws are often drawn…', ['Narrow and pointed towards the chin', 'Very square always', 'Without a chin', 'Round like a ball'], 0),
        q.single('A typical adult anime figure is about…', ['Seven to eight heads tall', 'Two heads tall', 'Fifteen heads tall', 'One head tall'], 0),
        q.single('Chibi characters have…', ['Very big heads and small bodies', 'Realistic proportions', 'No heads', 'Very long legs'], 0),
        q.multi('Which are common first steps for a head?', ['A circle for the skull', 'A jaw shape', 'A centre line', 'Shading the hair'], [0, 1, 2]),
        q.single('As the head tilts down, the eye line…', ['Curves downward', 'Curves upward', 'Stays straight', 'Disappears'], 0),
        q.tf('Drawing simple shapes for the body first makes poses easier to get right.', true),
        q.order('Put the head steps in order.', ['Circle for the skull', 'Jaw and chin', 'Centre and eye lines', 'Place the features']),
      ]),
    },
    {
      title: 'Eyes and hair',
      lessons: ['CFQbbfBnM5w', 'tQIxaVnKvn4', '2jIFIOr9Zt0', 'ULc6pWzQnwI'],
      checkpoint: exam('Eyes and hair exam', [
        q.multi('Which parts make up an anime eye?', ['Upper lash line', 'Iris and pupil', 'Highlights', 'Nostril'], [0, 1, 2]),
        q.single('Large, round eyes with big highlights usually look…', ['Young, cute or innocent', 'Old and tired', 'Angry only', 'Realistic'], 0),
        q.single('Narrow, sharp eyes often suggest…', ['A cool, serious or older character', 'A baby', 'A sleepy character only', 'Nothing'], 0),
        q.single('Highlights in both eyes should…', ['Match the same light source', 'Be on opposite sides', 'Be random', 'Be black'], 0),
        q.tf('The top of the eye (upper lash line) is usually drawn darker and thicker than the bottom.', true),
        q.single('Hair grows from…', ['The scalp, starting at the parting and hairline', 'The forehead line only', 'The ears', 'Anywhere on the face'], 0),
        q.single('Drawing hair in clumps instead of strands…', ['Looks cleaner and is easier', 'Looks messier', 'Takes longer', 'Is wrong'], 0),
        q.single('Hair that hugs the skull line exactly looks…', ['Flat; hair needs volume above the skull', 'Perfect', 'Too long', 'Shaded'], 0),
        q.multi('Which make hair look natural?', ['Varying clump sizes', 'Overlapping layers', 'Every strand parallel', 'Movement in the tips'], [0, 1, 3]),
        q.single('Eyebrows help show…', ['Expression and emotion', 'Hair colour only', 'Age only', 'Nothing'], 0),
        q.tf('Changing only the eyes and eyebrows can change a character’s emotion.', true),
        q.order('Put drawing an anime eye in order.', ['Upper lash line', 'Lower lash line', 'Iris and pupil', 'Highlights', 'Shading']),
      ]),
    },
    {
      title: 'Characters and shading',
      lessons: ['GcIqy9tvncA', 'KjmdOlBdFnc', 'ayGwVQQJDr0', '7mK1vqZqnEs'],
      checkpoint: exam('Character and shading exam', [
        q.single('Before shading, you should decide…', ['Where the light comes from', 'The character’s name', 'The paper size', 'The pencil brand'], 0),
        q.single('H pencils are…', ['Harder and lighter', 'Softer and darker', 'Coloured', 'Erasers'], 0),
        q.single('B pencils are…', ['Softer and darker', 'Harder and lighter', 'Only for lines', 'Pens'], 0),
        q.single('A cast shadow under the chin falls…', ['On the neck', 'On the forehead', 'On the hair', 'Nowhere'], 0),
        q.tf('Building shading in light layers gives smoother results than pressing hard once.', true),
        q.single('Clean line art means…', ['Final confident lines with the sketch erased', 'Only the sketch', 'Shading only', 'Coloured lines'], 0),
        q.multi('Which make a character feel original?', ['A unique hairstyle', 'Distinct clothes or accessories', 'A clear personality in the expression', 'Copying another character exactly'], [0, 1, 2]),
        q.single('A kneaded eraser is useful for…', ['Lifting highlights out of shading', 'Sharpening pencils', 'Drawing lines', 'Blending only'], 0),
        q.single('Shadows on folds of clothing go…', ['In the creases and on the side away from the light', 'On the top of every fold', 'Everywhere equally', 'Nowhere'], 0),
        q.tf('Keeping the light from one direction makes a drawing look consistent.', true),
        q.single('Your shading looks flat. What helps most?', ['A wider range from light to dark', 'Only mid-greys', 'More outlines', 'Erasing everything'], 0),
        q.order('Put finishing a character in order.', ['Sketch the pose', 'Draw the face, hair and clothes', 'Clean up the lines', 'Shade from the light source', 'Add highlights']),
      ]),
    },
  ],
};
