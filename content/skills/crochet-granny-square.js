import { q } from '../../src/lib/content/plan';

// Hopeful Turns' free BEGINNERS series: the stitches a granny square needs, then the square.

export default {
  slug: 'skill-crochet-granny-square',
  title: 'Crochet a granny square',
  description: 'Hold a hook, chain, single and double crochet, then make a classic granny square from a magic ring.',
  makeTitle: 'A finished granny square (or a few, ready to join)',
  skillId: 'knitting',
  by: 'Hopeful Turns',
  modules: [
    {
      title: 'Hook, yarn and your first chain',
      lessons: [
        {
          id: 'bcfxeFmh5bg',
          title: 'Tools and supplies',
          seconds: 878,
          try: 'Get a 5 mm hook, smooth light-coloured worsted yarn, scissors and a tapestry needle.',
          minutes: 10,
          questions: [
            q.tf('A light-coloured, smooth yarn makes your stitches easier to see.', true),
          ],
        },
        {
          id: 'FfuecCpzixI',
          title: 'Make a slip knot',
          seconds: 305,
          try: 'Make a slip knot on your hook five times until it feels natural.',
          minutes: 10,
          questions: [
            q.single('What is the first thing on your hook before you chain?', ['A slip knot', 'A magic ring', 'A double crochet', 'Nothing'], 0),
          ],
        },
        {
          id: 'sgU6XvVWtco',
          title: 'Hold the hook and yarn',
          seconds: 338,
          try: 'Practise holding the hook and tensioning the yarn over your fingers for five minutes.',
          minutes: 10,
          questions: [
            q.tf('Your yarn hand controls the tension of the yarn.', true),
          ],
        },
        {
          id: 'VKOSdFe_T0I',
          title: 'Chain stitch',
          seconds: 396,
          try: 'Chain 30. Pull it out and chain 30 again until the chains are about the same size.',
          minutes: 25,
          questions: [
            q.single('Most crochet projects start with…', ['A row of chain stitches (or a ring)', 'A bind off', 'A purl row', 'A seam'], 0),
          ],
        },
      ],
    },
    {
      title: 'The core stitches',
      lessons: [
        {
          id: 'd-UNumGxIUg',
          title: 'Single crochet',
          seconds: 1086,
          try: 'Chain 16 and work single crochet back and forth for 8 rows. Count 15 stitches each row.',
          minutes: 45,
          questions: [
            q.tf('Counting stitches every row helps your edges stay straight.', true),
            q.single('Single crochet is the shortest of these stitches:', ['Single crochet', 'Half double crochet', 'Double crochet', 'Treble crochet'], 0),
          ],
        },
        {
          id: 'PuOdmevVv0A',
          title: 'Double crochet',
          seconds: 1042,
          try: 'Chain 17 and work 6 rows of double crochet.',
          minutes: 45,
          questions: [
            q.single('Before a double crochet you…', ['Yarn over once', 'Yarn over twice', 'Skip the yarn over', 'Make a slip knot'], 0),
            q.tf('Granny squares are built mostly from double crochet clusters.', true),
          ],
        },
        {
          id: 'xa8EE0q3w3E',
          title: 'Slip stitch',
          seconds: 299,
          try: 'Chain 10 and join it into a ring with a slip stitch.',
          minutes: 10,
          questions: [
            q.single('A slip stitch is often used to…', ['Join a round', 'Add height', 'Increase quickly', 'Change hooks'], 0),
          ],
        },
      ],
    },
    {
      title: 'The granny square',
      lessons: [
        {
          id: 'aCXo4B14xi0',
          title: 'The magic ring',
          seconds: 307,
          try: 'Make a magic ring, work 6 single crochet into it and pull it tight. Repeat until the centre closes fully.',
          minutes: 20,
          questions: [
            q.tf('A magic ring can be pulled tight so the centre has no hole.', true),
          ],
        },
        {
          id: 'v2S3aiIOBV4',
          title: 'Crochet a granny square',
          seconds: 1799,
          try: 'Make a granny square of at least four rounds, weave in the ends, and log a photo of it as your make.',
          minutes: 120,
          questions: [
            q.single('In a classic granny square, the corners are made of…', ['Two clusters with chains between them', 'A single stitch', 'A slip knot', 'A bind off'], 0),
            q.tf('Each new round of a granny square adds one more cluster along each side.', true),
          ],
        },
      ],
    },
  ],
};
