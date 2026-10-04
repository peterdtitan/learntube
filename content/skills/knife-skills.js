import { q } from '../../src/lib/content/plan';

// Knife skills from cooking schools and test kitchens: the first thing a commis or sous chef
// has to get right.

export default {
  slug: 'skill-knife-skills',
  title: 'Chop, slice and dice like a line cook',
  description: 'Hold a chef’s knife safely, keep it sharp, and learn the cuts every recipe asks for: dice, mince, julienne and chiffonade.',
  makeTitle: 'A bowl of fresh salsa, every vegetable cut by you',
  skillId: 'cooking',
  cover: 'YrHpeEwk_-U', // the video whose thumbnail is the skill's cover
  by: 'Kroger Culinary 411',
  modules: [
    {
      title: 'Hold it, keep it sharp',
      lessons: [
        {
          id: '20gwf7YttQM',
          title: 'Hold a chef’s knife',
          by: 'Le Cordon Bleu',
          seconds: 96,
          try: 'Practise the pinch grip and the claw (fingertips tucked) on a carrot, slowly, for five minutes.',
          minutes: 10,
          questions: [
            q.single('In the pinch grip, your thumb and index finger hold…', ['The blade, just in front of the handle', 'The very end of the handle', 'The tip of the knife', 'Nothing, the palm does it all'], 0),
            q.tf('In the claw grip, your fingertips are tucked back behind your knuckles.', true, 'The flat of the blade rests against your knuckles, not your fingertips.'),
          ],
        },
        {
          id: '1eL7llVPuJg',
          title: 'Basic knife skills',
          seconds: 493,
          try: 'Set up a damp towel under your board so it can’t slide, then slice a cucumber into even rounds.',
          minutes: 20,
          questions: [
            q.tf('A damp towel under a cutting board stops it sliding.', true),
            q.tf('A dull knife is safer than a sharp one.', false, 'A dull knife needs more force and slips more easily.'),
          ],
        },
        {
          id: 'Rrd1YYynJoA',
          title: 'Use a honing steel',
          by: 'Made In',
          seconds: 183,
          try: 'Hone your knife with five strokes per side at a steady angle, before you cook.',
          minutes: 10,
          questions: [
            q.single('Honing a knife…', ['Straightens the edge', 'Removes lots of metal', 'Is the same as sharpening', 'Makes the knife heavier'], 0),
          ],
        },
        {
          id: 'Wk3scs5FqCY',
          title: 'Sharpen a dull knife',
          by: 'Tasty',
          seconds: 358,
          try: 'Test your knife on a sheet of paper. If it tears rather than slices, sharpen it (or have it sharpened).',
          minutes: 15,
          questions: [
            q.tf('Sharpening removes metal to make a new edge; honing just realigns it.', true),
          ],
        },
      ],
    },
    {
      title: 'The core cuts',
      lessons: [
        {
          id: 'G-Fg7l7G1zw',
          title: 'Slice, dice and julienne',
          by: 'Tasty',
          seconds: 394,
          try: 'Julienne one carrot and dice one pepper. Aim for pieces of the same size.',
          minutes: 25,
          questions: [
            q.single('Why cut pieces to the same size?', ['So they cook evenly', 'It looks fancy, nothing else', 'So the knife stays sharp', 'To save time'], 0),
            q.single('A julienne cut makes…', ['Thin matchsticks', 'Small cubes', 'Thin ribbons of leaves', 'Rounds'], 0),
          ],
        },
        {
          id: 'dCGS067s0zo',
          title: 'Dice an onion',
          by: 'Gordon Ramsay',
          seconds: 75,
          try: 'Dice two onions, leaving the root on to hold the layers together.',
          minutes: 20,
          questions: [
            q.tf('Leaving the root end on an onion keeps it together while you dice.', true),
          ],
        },
        {
          id: '2Yt6pKLU_10',
          title: 'Mince garlic fast',
          by: 'America’s Test Kitchen',
          seconds: 59,
          try: 'Peel and mince three cloves of garlic.',
          minutes: 10,
          questions: [
            q.single('Mincing means cutting into…', ['Very small pieces', 'Big chunks', 'Long sticks', 'Rounds'], 0),
          ],
        },
        {
          id: 'YrHpeEwk_-U',
          title: 'Nine essential knife skills',
          by: 'Epicurious',
          seconds: 780,
          try: 'Practise two cuts from the video you haven’t tried yet, including a chiffonade of basil or spinach.',
          minutes: 30,
          questions: [
            q.single('A chiffonade is…', ['Leaves rolled up and sliced into thin ribbons', 'A large dice', 'A way to peel', 'A sauce'], 0),
          ],
        },
      ],
    },
    {
      title: 'Put it together',
      lessons: [
        {
          id: 'dtEfBKJZrVQ',
          title: 'The three knife skills everyone should know',
          by: 'America’s Test Kitchen',
          seconds: 786,
          try: 'Make a salsa: dice tomatoes, onion and pepper, mince garlic and chili, chiffonade coriander. Log a photo as your make.',
          minutes: 45,
          questions: [
            q.tf('Mise en place means getting all your ingredients cut and ready before you start cooking.', true),
            q.multi('Which cuts would you use for a salsa?', ['Dice', 'Mince', 'Chiffonade', 'Carve'], [0, 1, 2]),
          ],
        },
      ],
    },
  ],
};
