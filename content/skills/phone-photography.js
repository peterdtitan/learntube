import { q } from '../../src/lib/content/plan';

// Free photography lessons that work with the camera you already carry: your phone.

export default {
  slug: 'skill-phone-photography',
  title: 'Take great photos with your phone',
  description: 'The basics of light and composition, people and everyday scenes, and editing on your phone with free apps.',
  makeTitle: 'A set of five edited photos you’re proud of',
  skillId: 'photography',
  by: 'Jamie Windsor',
  modules: [
    {
      title: 'The basics',
      lessons: [
        {
          id: 'hVuTuib65WM',
          title: 'Eighty percent of photography basics',
          by: 'Pat Kay',
          seconds: 590,
          try: 'Take ten photos of one object, changing only one thing each time: distance, angle or light.',
          minutes: 25,
          questions: [
            q.tf('Light is the single biggest thing that makes or breaks a photo.', true),
          ],
        },
        {
          id: '_ZYGsx1i5L8',
          title: 'Thirteen smartphone photo tips',
          seconds: 1105,
          try: 'Clean your lens, turn on the grid, and lock focus and exposure on a subject. Take five photos using three tips from the video.',
          minutes: 30,
          questions: [
            q.tf('Wiping your phone’s lens can make photos noticeably sharper.', true),
            q.single('Tapping and holding on the screen in most camera apps…', ['Locks focus and exposure', 'Deletes the photo', 'Switches to video', 'Turns on the flash'], 0),
          ],
        },
      ],
    },
    {
      title: 'Composition',
      lessons: [
        {
          id: 'U9izgAqa-fA',
          title: 'The rule of thirds',
          by: 'BarbsterFilms',
          seconds: 120,
          try: 'With the grid on, take five photos with the subject on a third line or where two lines cross.',
          minutes: 15,
          questions: [
            q.single('The rule of thirds puts your subject…', ['On the lines or crossings of a 3×3 grid', 'Exactly in the centre', 'In a corner', 'Out of frame'], 0),
          ],
        },
        {
          id: 'nKM3jkEOpuE',
          title: 'Framing and composition techniques',
          by: 'Learn Online Video',
          seconds: 332,
          try: 'Find a natural frame (a doorway, window or branches) and photograph something through it.',
          minutes: 20,
          questions: [
            q.tf('Leading lines guide the viewer’s eye towards the subject.', true),
          ],
        },
        {
          id: 'VUg33pNa5zE',
          title: 'Eight important composition tips',
          seconds: 711,
          try: 'Take a walk and make one photo for each of three tips from the video.',
          minutes: 40,
          questions: [
            q.tf('Simplifying the background usually makes a subject stand out more.', true),
          ],
        },
      ],
    },
    {
      title: 'Light and people',
      lessons: [
        {
          id: 'jD5CPDPQoiM',
          title: 'Use natural light',
          by: 'iPhone Photography School',
          seconds: 336,
          try: 'Photograph the same scene in the morning, at midday and in the hour before sunset. Compare them.',
          minutes: 30,
          questions: [
            q.single('Golden hour is…', ['The hour after sunrise and before sunset', 'Midday', 'Any hour with flash', 'Night time'], 0),
            q.tf('Harsh midday sun often creates strong shadows on faces.', true),
          ],
        },
        {
          id: 'AJlp_obQgq8',
          title: 'Take good pictures of people',
          by: 'Tim Shields',
          seconds: 521,
          try: 'Take portraits of a friend or family member by a window, trying three different angles.',
          minutes: 30,
          questions: [
            q.single('For a flattering portrait in daylight, put the person…', ['Facing soft light, like a window', 'With the sun directly behind them and no fill', 'Under a single bulb overhead', 'In the dark'], 0),
          ],
        },
      ],
    },
    {
      title: 'Edit and share',
      lessons: [
        {
          id: 'CCOlVPLP9Xw',
          title: 'Edit photos with Snapseed',
          by: 'Dee Nimmin',
          seconds: 535,
          try: 'Install Snapseed (free). Edit your five best photos, then log them as your make.',
          minutes: 45,
          questions: [
            q.tf('Good editing starts with small changes to exposure, contrast and crop.', true),
            q.tf('Snapseed is free on both Android and iPhone.', true),
          ],
        },
      ],
    },
  ],
};
