import { q } from '../../src/lib/content/plan';

// Free hand-sewing tutorials (mostly Sewn Company and Treasurie), in the order you need them
// to mend your own clothes.

export default {
  slug: 'skill-hand-sewing-repairs',
  title: 'Sew by hand: buttons, hems and repairs',
  description: 'Thread a needle, learn the three stitches that matter, and fix buttons, hems and holes in your own clothes.',
  makeTitle: 'Three clothes you mended yourself',
  skillId: 'sewing',
  by: 'Sewn Company',
  modules: [
    {
      title: 'Needle and thread',
      lessons: [
        {
          id: '2cZ9MrpmLf4',
          title: 'Thread a needle',
          seconds: 351,
          try: 'Cut a forearm’s length of thread at an angle and thread a needle three times.',
          minutes: 10,
          questions: [
            q.tf('Cutting thread at an angle makes it easier to pass through the eye of a needle.', true),
            q.single('A good length of thread for hand sewing is about…', ['Your forearm (30 to 50 cm)', 'Two metres', '5 cm', 'As long as possible'], 0, 'Long thread tangles.'),
          ],
        },
        {
          id: 'xM5n_gmpIrY',
          title: 'Tie a knot',
          by: 'StitchLabSewing',
          seconds: 122,
          try: 'Tie a knot at the end of your thread five times, until it holds when you tug it through fabric.',
          minutes: 10,
          questions: [
            q.tf('The knot at the end of the thread stops it pulling through the fabric.', true),
          ],
        },
      ],
    },
    {
      title: 'Three stitches you can’t sew without',
      lessons: [
        {
          id: 'oE1LnH8egMk',
          title: 'Running stitch, backstitch and whipstitch',
          seconds: 1411,
          try: 'On a scrap of cotton, sew a 10 cm line of each stitch from the video.',
          minutes: 40,
          questions: [
            q.match('Match the stitch to what it’s good for.', [['Running stitch', 'Quick seams and gathering'], ['Backstitch', 'Strong seams'], ['Whipstitch', 'Joining two edges']]),
          ],
        },
        {
          id: '3pRtOLrzheg',
          title: 'An easy, strong seam',
          seconds: 235,
          try: 'Sew two scraps together with a 1 cm seam, then pull them apart to test it.',
          minutes: 20,
          questions: [
            q.tf('A seam joins two pieces of fabric, usually with their right sides facing.', true),
          ],
        },
        {
          id: 'EZngDWBk0xE',
          title: 'Backstitching',
          seconds: 331,
          try: 'Sew a 15 cm backstitch seam, keeping the stitches the same length.',
          minutes: 20,
          questions: [
            q.single('Backstitch is the strongest hand stitch because…', ['Each stitch overlaps the one before', 'It uses thicker thread', 'It is the longest stitch', 'It needs no knot'], 0),
          ],
        },
      ],
    },
    {
      title: 'Buttons and snaps',
      lessons: [
        {
          id: 'Du6gq3ks0SQ',
          title: 'Sew on a flat button',
          by: 'Treasurie',
          seconds: 308,
          try: 'Sew a two- or four-hole button onto a scrap or a shirt that needs one, with a thread shank underneath.',
          minutes: 20,
          questions: [
            q.tf('Wrapping thread under a button (a shank) leaves room for the fabric of the buttonhole.', true),
          ],
        },
        {
          id: '0926Cxm3-1E',
          title: 'Sew on a shank button',
          by: 'University Sew',
          seconds: 426,
          try: 'Sew on a shank button (the kind with a loop at the back), like those on coats.',
          minutes: 20,
          questions: [
            q.single('A shank button has…', ['A loop or stem underneath', 'Four holes', 'No way to attach it', 'A snap'], 0),
          ],
        },
        {
          id: 'W0NMPTS6YGo',
          title: 'Sew on snaps',
          by: 'Treasurie',
          seconds: 181,
          try: 'Sew both halves of a snap onto two scraps so they line up and close.',
          minutes: 15,
          questions: [
            q.tf('The two halves of a snap need to line up exactly to close.', true),
          ],
        },
      ],
    },
    {
      title: 'Hems and holes',
      lessons: [
        {
          id: 'jlHyqT4K-p0',
          title: 'Slip stitch and blind hem',
          by: 'Craftsy',
          seconds: 174,
          try: 'Fold and press a 2 cm hem on a scrap and slip stitch it.',
          minutes: 25,
          questions: [
            q.tf('A blind hem is meant to be almost invisible from the outside.', true),
          ],
        },
        {
          id: 'pbiQt9RJg2Q',
          title: 'Blind hem a real garment',
          by: 'Cutesy Crafts',
          seconds: 155,
          try: 'Fix a fallen hem on a skirt, trousers or curtain with a blind hem.',
          minutes: 40,
          questions: [
            q.single('Each blind-hem stitch should catch…', ['Just one or two threads of the outer fabric', 'All the layers in big stitches', 'Only the lining', 'Nothing'], 0),
          ],
        },
        {
          id: 'q73Df5lHHps',
          title: 'The invisible (ladder) stitch',
          by: 'sewberry',
          seconds: 171,
          try: 'Close a 5 cm gap in a seam with a ladder stitch so the thread doesn’t show.',
          minutes: 20,
          questions: [
            q.tf('A ladder stitch closes a seam from the outside without the stitches showing.', true),
          ],
        },
        {
          id: 'tkrc-V8sRlk',
          title: 'Sew up a hole',
          by: 'Cinderella Sew',
          seconds: 158,
          try: 'Mend a hole or split seam in your own clothes and log a before-and-after photo as your make.',
          minutes: 30,
          questions: [
            q.single('Matching your thread colour to the fabric…', ['Makes a repair harder to see', 'Makes it weaker', 'Doesn’t matter', 'Is only for wool'], 0),
          ],
        },
      ],
    },
  ],
};
