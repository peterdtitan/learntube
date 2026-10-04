import { q } from '../../src/lib/content/plan';

// Sheep & Stitch's free total-beginner series, ending with their step-by-step scarf.

export default {
  slug: 'skill-knit-a-scarf',
  title: 'Knit your first scarf',
  description: 'From a slip knot to a finished garter-stitch scarf: cast on, knit, purl, fix mistakes and bind off.',
  makeTitle: 'A scarf you knitted yourself',
  skillId: 'knitting',
  cover: '24lR2IRS57A', // the video whose thumbnail is the skill's cover
  by: 'Sheep & Stitch',
  modules: [
    {
      title: 'Yarn, needles and casting on',
      lessons: [
        {
          id: '44Wj6fP2gW8',
          title: 'Choose your yarn',
          seconds: 601,
          try: 'Pick a smooth, light-coloured worsted or chunky yarn and needles to match the size on its label (often 5 to 8 mm).',
          minutes: 15,
          questions: [
            q.tf('A smooth, light-coloured yarn makes it easier to see your stitches as a beginner.', true),
            q.single('Where do you find the needle size that suits a yarn?', ['On the yarn label', 'On the needle tip', 'It is always 4 mm', 'In the pattern only'], 0),
          ],
        },
        {
          id: 'oj21JDDSrgM',
          title: 'Tie a slip knot',
          seconds: 190,
          try: 'Tie five slip knots in a row, pulling each one off and starting again until it feels easy.',
          minutes: 10,
          questions: [
            q.tf('A slip knot tightens when you pull the tail.', true),
          ],
        },
        {
          id: '1vm6oaYzHyA',
          title: 'Cast on',
          seconds: 497,
          try: 'Cast on 20 stitches. Slide them off and cast on again until the stitches are even.',
          minutes: 25,
          questions: [
            q.single('Casting on is…', ['Putting the first row of stitches on the needle', 'Finishing the last row', 'Joining a new ball of yarn', 'Fixing a dropped stitch'], 0),
          ],
        },
      ],
    },
    {
      title: 'The knit stitch',
      lessons: [
        {
          id: 'Egp4NRhlMDg',
          title: 'The knit stitch',
          seconds: 484,
          try: 'Knit ten rows on your 20 stitches. Count your stitches at the end of every row.',
          minutes: 40,
          questions: [
            q.single('Knitting every row gives a bumpy, squishy fabric called…', ['Stockinette', 'Garter stitch', 'Rib', 'Seed stitch'], 1),
            q.tf('Counting stitches at the end of each row helps you catch mistakes early.', true),
          ],
        },
        {
          id: 'wwDN5qt-Bvs',
          title: 'Tips for new knitters',
          seconds: 687,
          try: 'Knit five more rows using one tip from the video that you weren’t doing before.',
          minutes: 25,
          questions: [
            q.tf('Very tight stitches make knitting harder to work.', true, 'Let the stitches slide easily along the needle.'),
          ],
        },
      ],
    },
    {
      title: 'Fixing mistakes',
      lessons: [
        {
          id: 'FcKrw4LcWgw',
          title: 'Fix a dropped stitch',
          seconds: 506,
          try: 'On purpose, drop one stitch a couple of rows down, then pick it back up the way the video shows.',
          minutes: 20,
          questions: [
            q.single('A dropped stitch left alone will…', ['Fix itself', 'Run down the fabric like a ladder', 'Make the scarf wider', 'Do nothing'], 1),
          ],
        },
        {
          id: '1oP6EyCT93g',
          title: 'Fix extra stitches',
          seconds: 398,
          try: 'Count your stitches. If you have more than 20, find the extra one and fix it.',
          minutes: 15,
          questions: [
            q.single('A common cause of an extra stitch is…', ['Wrapping the yarn over the needle by accident', 'Using wool yarn', 'Knitting too slowly', 'Counting'], 0),
          ],
        },
      ],
    },
    {
      title: 'Purl and stitch patterns',
      lessons: [
        {
          id: '7ePhLqw6HDM',
          title: 'The purl stitch',
          seconds: 487,
          try: 'On a new swatch, knit one row and purl one row, four times. Notice the smooth V side.',
          minutes: 35,
          questions: [
            q.single('Knit one row, purl one row gives…', ['Garter stitch', 'Stockinette stitch', 'Moss stitch', 'Lace'], 1),
            q.tf('For a purl stitch, the yarn sits in front of your work.', true),
          ],
        },
        {
          id: 'lD93m4_PXrg',
          title: 'Easy stitch patterns',
          seconds: 272,
          try: 'Pick a stitch pattern for your scarf: garter (easiest, lies flat) or one from the video. Write the pattern down.',
          minutes: 15,
          questions: [
            q.tf('Garter stitch lies flat, which is why it is popular for scarves.', true, 'Stockinette curls at the edges.'),
          ],
        },
      ],
    },
    {
      title: 'Knit and finish the scarf',
      lessons: [
        {
          id: '24lR2IRS57A',
          title: 'Knit the scarf, step by step',
          seconds: 1630,
          try: 'Cast on the scarf and knit until it is as long as you are tall, or as long as you like. Do some rows every day.',
          minutes: 300,
          questions: [
            q.tf('Knitting a few rows every day is better than one long session a week.', true),
          ],
        },
        {
          id: 'NHx9AyRnM4A',
          title: 'Join a new ball of yarn',
          seconds: 610,
          try: 'When your first ball runs out, join the next one without a knot using one of the two methods.',
          minutes: 15,
          questions: [
            q.tf('Joining new yarn at the edge of a row makes the ends easier to hide.', true),
          ],
        },
        {
          id: 'VSwjIUiQZlM',
          title: 'Bind off',
          seconds: 313,
          try: 'Bind off your scarf, weave the ends into the back with a tapestry needle, then log a photo of it as your make.',
          minutes: 30,
          questions: [
            q.single('Binding off…', ['Locks the last row so it won’t unravel', 'Adds stitches', 'Changes colour', 'Starts a new row'], 0),
            q.tf('Binding off too tightly can make the end of the scarf pucker.', true),
          ],
        },
      ],
    },
  ],
};
