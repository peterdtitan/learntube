import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/braid-your-hair.json';

// "How to braid your own hair" and "how to cornrow for beginners" are top searches in the
// US and Nigeria. EverydayHairInspiration's talk-throughs teach the hand movements; Rekik N,
// Rayann410, ReTressed, Indybindy, Sita Bae1 and Seun Okimi cover textured and natural hair,
// cornrows and box braids.

export default {
  slug: 'skill-braid-your-hair',
  title: 'Braid your own hair',
  description: 'Learn the hand movements for a three-strand braid, then French and Dutch braids, then cornrows and box braids, on your own head, for straight, curly and natural hair.',
  makeTitle: 'Your own hair in a braided style you did yourself, photographed',
  skillId: 'beauty',
  cover: 'bVk0G-TQPEE',
  by: 'EverydayHairInspiration',
  videos,
  lessons: {
    '8rOx_oS6rSo': {
      title: 'Braiding for complete beginners',
      try: 'Practise on three pieces of yarn or string tied to a chair first. Braid 20 cm slowly, saying “right over middle, left over middle” as you go.',
      minutes: 15,
      questions: [
        q.single('In a basic three-strand braid you cross…', ['An outer strand over the middle, then the other outer strand over the middle', 'All three at once', 'Only the left strand', 'The middle strand under both'], 0),
        q.tf('Practising on yarn or a friend’s hair first makes learning the hand movements easier.', true),
      ],
    },
    sv09VPwAqMc: {
      title: 'The three-strand braid',
      try: 'Braid a section of your own hair from top to end and secure it with a band. Do it three times.',
      minutes: 15,
      questions: [
        q.single('To keep a braid neat, keep the tension…', ['Even on all three strands', 'Tight on one strand only', 'Loose then tight', 'It doesn’t matter'], 0),
        q.single('What secures the end of a braid?', ['A hair tie or band', 'A comb', 'Gel only', 'A clip at the top'], 0),
      ],
    },
    H4zMFGVQtsg: {
      title: 'Braid your own hair',
      try: 'Without a mirror, braid a section at the side of your head, feeling for the strands. Then check it in the mirror.',
      minutes: 15,
      questions: [
        q.tf('Many people braid their own hair by feel rather than by watching a mirror.', true, 'A mirror flips the movement, which can confuse your hands.'),
        q.single('Detangling before braiding helps because…', ['The strands separate cleanly and don’t snag', 'It makes the braid shorter', 'It adds volume', 'It replaces moisturiser'], 0),
      ],
    },
    P6kixAppktE: {
      title: 'French braid basics',
      try: 'On yarn, a friend or your own hair, start a French braid: one normal cross first, then add a little hair to each outer strand before crossing it over.',
      minutes: 15,
      questions: [
        q.single('What makes a French braid different from a three-strand braid?', ['You add new hair to the strands as you go', 'It uses four strands', 'You cross the strands under', 'It has no pattern'], 0),
        q.single('In a French braid, the strands cross…', ['Over the middle', 'Under the middle', 'Around the head', 'Behind the ear'], 0),
      ],
    },
    'm2g57cXO-2Q': {
      title: 'French braid your own hair, step by step',
      try: 'French braid your own hair from the front hairline to the nape, then finish with a normal braid and a band. Repeat until it stays neat.',
      minutes: 25,
      questions: [
        q.single('When French braiding, the new sections you add should be…', ['Small and even, from the hairline side', 'As big as possible', 'Only from the back', 'Taken randomly'], 0),
        q.tf('Once you run out of hair to add, you finish with a plain three-strand braid.', true),
      ],
    },
    zOhzF54UuSI: {
      title: 'French braid natural hair',
      try: 'If you have natural or textured hair, moisturise and stretch a section, then French braid it using a little gel or cream for grip.',
      minutes: 20,
      questions: [
        q.single('On natural hair, a little gel or cream before braiding helps…', ['Grip and smooth the strands', 'Shrink the braid', 'Change your hair colour', 'Remove the need to detangle'], 0),
        q.tf('Stretched, detangled natural hair is easier to braid neatly.', true),
      ],
    },
    gLbhvPBbdJQ: {
      title: 'The easiest Dutch braid',
      try: 'Do a Dutch braid on one side, crossing the strands under the middle instead of over.',
      minutes: 15,
      questions: [
        q.single('In a Dutch braid the strands cross…', ['Under the middle', 'Over the middle', 'Side to side only', 'Around a band'], 0),
        q.single('A Dutch braid looks…', ['Raised, sitting on top of the hair', 'Flat and tucked in', 'Exactly like a French braid', 'Like a ponytail'], 0),
      ],
    },
    'bVk0G-TQPEE': {
      title: 'Dutch braid your own hair, step by step',
      try: 'Dutch braid your own hair from the hairline to the end. Gently pull the edges of the finished braid to make it look fuller.',
      minutes: 25,
      questions: [
        q.single('Gently pulling the outer loops of a finished braid (pancaking) makes it…', ['Look fuller and wider', 'Come undone', 'Shorter', 'Tighter'], 0),
        q.tf('Two Dutch braids, one on each side, are a common everyday style.', true),
      ],
    },
    '5eaOlqOQ-vo': {
      title: 'Cornrows for beginners',
      try: 'Part a straight line with a rat-tail comb and cornrow along it on a doll head, a friend or your own hair, keeping the braid close to the scalp.',
      minutes: 20,
      questions: [
        q.single('A cornrow is…', ['A braid lying flat and close to the scalp, adding hair as it goes', 'A loose ponytail', 'A twist', 'A bun'], 0),
        q.single('Which tool makes clean, straight parts?', ['A rat-tail comb', 'A wide brush', 'Scissors', 'A hair dryer'], 0),
      ],
    },
    '4ItX5h7LFX0': {
      title: 'Overhand and underhand cornrows',
      try: 'Practise both methods from the video on a short row and decide which feels more natural for you.',
      minutes: 20,
      questions: [
        q.single('Most cornrows are done underhand, which means the strands cross…', ['Under the middle, so the braid sits on top', 'Over the middle', 'Not at all', 'Behind the head only'], 0),
        q.tf('Overhand and underhand cornrows look different on the head.', true),
      ],
    },
    KErgXXkOhx4: {
      title: 'Dos and don’ts for neat cornrows',
      try: 'Cornrow three straight rows. Check each one for even width and that you aren’t pulling the edges too tight.',
      minutes: 30,
      questions: [
        q.single('Braiding too tightly, especially at the edges, can cause…', ['Hair loss (traction alopecia)', 'Faster growth', 'Shinier hair', 'Nothing'], 0),
        q.multi('Which help cornrows look neat?', ['Clean, straight parts', 'Even sections picked up each time', 'Keeping the braid close to the scalp', 'Very large random sections'], [0, 1, 2]),
      ],
    },
    CmnYZ7Ks21A: {
      title: 'Box braid your own hair',
      try: 'Part one square section and box braid it to the end. When you’re ready, braid your chosen style and log a photo as your make.',
      minutes: 45,
      questions: [
        q.single('Box braids get their name from…', ['The square (box-shaped) parts at the root', 'Their colour', 'The box they come in', 'Their length'], 0),
        q.single('Extension hair added to braids is often called…', ['Attachment or braiding hair', 'Gel', 'Edge control', 'A relaxer'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Three-strand braids',
      lessons: ['8rOx_oS6rSo', 'sv09VPwAqMc', 'H4zMFGVQtsg'],
      checkpoint: exam('Three-strand braid exam', [
        q.order('Put a three-strand braid in order.', ['Split the hair into three equal strands', 'Cross the right strand over the middle', 'Cross the left strand over the new middle', 'Repeat to the end', 'Secure with a band']),
        q.single('Why split the hair into equal strands?', ['So the braid is even', 'So it is quicker', 'So it is tighter at one side', 'It doesn’t matter'], 0),
        q.single('After crossing the right strand over, which strand becomes the middle?', ['The one you just crossed', 'The left strand', 'None', 'All three'], 0),
        q.tf('Uneven tension makes a braid lean or look lumpy.', true),
        q.single('Practising on yarn first helps you…', ['Learn the hand movements without pulling your hair', 'Dye your hair', 'Measure your hair', 'Skip practice'], 0),
        q.single('Braiding by feel (without a mirror) works because…', ['A mirror reverses your movements', 'You can’t see in mirrors', 'It is faster always', 'It needs no hands'], 0),
        q.multi('Which help before you braid?', ['Detangling', 'Moisturising dry hair', 'A comb for parting', 'Wet, very tangled hair'], [0, 1, 2]),
        q.single('The braid keeps slipping loose. What helps?', ['Holding the strands closer to the head and keeping steady tension', 'Using bigger strands', 'Braiding faster', 'Letting go between crosses'], 0),
        q.tf('A basic braid is the foundation for French, Dutch and cornrow braids.', true),
        q.single('Where do your hands stay while braiding?', ['Close to where the strands cross', 'At the ends of the hair', 'On your shoulders', 'Far from the head'], 0),
        q.single('A soft scrunchie is gentler than a thin rubber band because…', ['It causes less breakage', 'It is tighter', 'It is cheaper', 'It is shiny'], 0),
        q.single('Your braid is loose at the top. What should you do next time?', ['Keep firm, even tension from the first cross', 'Start lower down', 'Pull hard at the end only', 'Use four strands'], 0),
      ]),
    },
    {
      title: 'French and Dutch braids',
      lessons: ['P6kixAppktE', 'm2g57cXO-2Q', 'zOhzF54UuSI', 'gLbhvPBbdJQ', 'bVk0G-TQPEE'],
      checkpoint: exam('French and Dutch braid exam', [
        q.single('French braid: strands cross…', ['Over the middle', 'Under the middle', 'Neither', 'Both, alternately'], 0),
        q.single('Dutch braid: strands cross…', ['Under the middle', 'Over the middle', 'Neither', 'Around a band'], 0),
        q.single('A Dutch braid is sometimes called…', ['An inside-out (reverse) French braid', 'A fishtail', 'A twist', 'A ponytail'], 0),
        q.single('Both French and Dutch braids…', ['Add new hair to the strands as you go down the head', 'Use only three fixed strands', 'Need extensions', 'Start at the nape'], 0),
        q.tf('A French braid lies flatter; a Dutch braid stands out on top of the hair.', true),
        q.single('When you run out of hair to add, you…', ['Finish with a plain braid to the ends', 'Stop and cut the rest', 'Start again', 'Twist the rest'], 0),
        q.single('Pancaking a braid means…', ['Gently pulling the outer loops to make it look fuller', 'Flattening it with an iron', 'Braiding it tightly', 'Undoing it'], 0),
        q.multi('Which help when braiding natural or textured hair?', ['Moisturising first', 'Stretching or blow-drying it', 'A little gel for grip', 'Braiding it dry and tangled'], [0, 1, 2]),
        q.single('Picking up very uneven new sections makes the braid…', ['Lumpy and uneven', 'Neater', 'Longer', 'Stronger'], 0),
        q.tf('Starting with a clean centre or side part helps two braids look even.', true),
        q.order('Put a French braid in order.', ['Take a section at the hairline and split it into three', 'Cross once without adding hair', 'Add hair to the outer strand, then cross it over', 'Repeat on both sides down the head', 'Finish with a plain braid and secure it']),
        q.single('Two braids, one on each side, are often called…', ['Double or boxer braids', 'A single plait', 'A bun', 'Locs'], 0),
      ]),
    },
    {
      title: 'Cornrows and box braids',
      lessons: ['5eaOlqOQ-vo', '4ItX5h7LFX0', 'KErgXXkOhx4', 'CmnYZ7Ks21A'],
      checkpoint: exam('Cornrows and box braids exam', [
        q.single('Cornrows are braided…', ['Close to the scalp along a parted line', 'Hanging loose from a ponytail', 'Only at the ends', 'Without any parts'], 0),
        q.single('The usual cornrow technique crosses strands…', ['Under (underhand)', 'Over (overhand) always', 'Around the finger', 'Not at all'], 0),
        q.single('What gives cornrows clean lines?', ['Neat, straight parts', 'Very tight braids', 'Hairspray only', 'Long hair'], 0),
        q.single('Traction alopecia is…', ['Hair loss from constant pulling, often at the edges', 'Dandruff', 'Split ends', 'Grey hair'], 0),
        q.multi('Which protect your edges and scalp?', ['Not braiding too tight', 'Avoiding heavy braids on fragile edges', 'Keeping braids in for many months without care', 'Moisturising the scalp and hair'], [0, 1, 3]),
        q.single('Box braids start from…', ['Square or rectangular parted sections', 'One big section', 'A ponytail', 'No parts'], 0),
        q.single('Knotless box braids start…', ['With your own hair, adding extension hair gradually', 'With a knot of extension hair at the root', 'Without extension hair ever', 'At the ends'], 0),
        q.tf('Smaller sections take longer but give more, thinner braids.', true),
        q.single('How should a fresh style feel?', ['Comfortable, not painful or bumpy', 'Very painful', 'Itchy and tight', 'Numb'], 0),
        q.single('A rat-tail comb is used to…', ['Make clean parts', 'Blow-dry', 'Curl', 'Detangle very thick knots only'], 0),
        q.order('Put cornrowing one row in order.', ['Part a straight row', 'Take a small section at the front and split it into three', 'Braid underhand, adding hair from the row each time', 'Braid past the end of the row and secure it']),
        q.single('Which product helps smooth edges and sections?', ['Gel or edge control', 'Shampoo', 'Conditioner rinse', 'Water only'], 0),
      ]),
    },
  ],
};
