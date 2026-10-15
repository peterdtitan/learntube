import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/everyday-makeup.json';

// "How to do makeup for beginners" is a top search in the US and Nigeria, including
// "makeup for dark skin". Lessons from Nigerian and international artists: Jane Ughe,
// Judith Egbo, Nellie Gbadebo, Lade Adejo, Cyntibenmakeover and Okemute Ugwuamaka, with
// technique videos from Nina Ubhi, TheMakeupChair and Jennifer Chiu.

export default {
  slug: 'skill-everyday-makeup',
  title: 'Do a natural everyday makeup look',
  description: 'Prep your skin, match and apply foundation, shape your brows, line your eyes and lips, and put together a soft everyday look, with options for every skin tone.',
  makeTitle: 'Your everyday makeup look, photographed in daylight',
  skillId: 'beauty',
  cover: 'I-TCxGwgbHs',
  by: 'Cyntibenmakeover',
  videos,
  lessons: {
    YKniUSh5fUo: {
      title: 'Prep oily or combination skin',
      try: 'Work out your skin type: wash your face, wait an hour, and note where it looks shiny or feels tight. Then prep with cleanser, moisturiser and a primer if you have one.',
      minutes: 15,
      questions: [
        q.single('Why prep skin before makeup?', ['So makeup goes on smoothly and lasts longer', 'To make it darker', 'It replaces foundation', 'It isn’t needed'], 0),
        q.single('Oily skin usually benefits from…', ['A light, oil-free moisturiser and a mattifying primer', 'No moisturiser at all, ever', 'Heavy oils', 'Skipping cleanser'], 0),
      ],
    },
    _TZX3pvSL1M: {
      title: 'Prep dry skin',
      try: 'If your skin is dry anywhere, moisturise it well and let it sink in for a few minutes before you apply any makeup.',
      minutes: 10,
      questions: [
        q.tf('Letting moisturiser sink in before foundation helps stop patchiness.', true),
        q.single('Dry, flaky patches under foundation usually look…', ['Cakey and textured', 'Smoother', 'Shinier', 'Invisible'], 0),
      ],
    },
    '80B3HH5cv0s': {
      title: 'Apply foundation',
      try: 'Swatch two or three foundation shades on your jawline in daylight. Pick the one that disappears, and apply a thin layer with a damp sponge or brush.',
      minutes: 20,
      questions: [
        q.single('Where should you test a foundation shade?', ['On your jawline, in daylight', 'On the back of your hand under shop lights', 'On your forehead only', 'On a friend'], 0),
        q.single('The right shade…', ['Disappears into your skin', 'Looks lighter than your neck', 'Looks orange', 'Shows a clear line on the jaw'], 0),
        q.tf('Starting with a thin layer and building up where needed looks more natural than one thick layer.', true),
      ],
    },
    kesCKoaCNkE: {
      title: 'Quick, easy brows',
      try: 'Brush your brows up, then fill sparse areas with short, light strokes that follow the hair. Keep the front softer than the tail.',
      minutes: 15,
      questions: [
        q.single('For natural-looking brows, the front (nearest your nose) should be…', ['Softer and lighter than the tail', 'The darkest part', 'A solid block', 'Left out completely'], 0),
        q.tf('Brushing brows with a spoolie blends the product and looks more natural.', true),
      ],
    },
    ezgkVQRGxSY: {
      title: 'Brows with a pencil',
      try: 'Map your brow: where it starts, arches and ends. Draw a soft outline with a pencil, fill it with light strokes, and clean the edges with concealer.',
      minutes: 15,
      questions: [
        q.single('Brow mapping helps you find…', ['Where your brow should start, arch and end', 'Your skin type', 'Your foundation shade', 'Your lip shape'], 0),
        q.single('Concealer around the brow is used to…', ['Sharpen and clean the edges', 'Colour the hairs', 'Prime the lids', 'Set the lips'], 0),
      ],
    },
    oSL5PhWl_ok: {
      title: 'Eyeliner for beginners',
      try: 'Line your upper lash line with a pencil in small dashes close to the lashes, then join them up. Smudge it softly for an everyday look.',
      minutes: 15,
      questions: [
        q.single('An easy way for beginners to line the eyes is…', ['Small dashes along the lash line, joined up', 'One fast line from corner to corner', 'Drawing only on the lower waterline', 'With your eyes closed'], 0),
        q.tf('A pencil liner is easier to control and smudge than liquid liner for beginners.', true),
      ],
    },
    '-ZBHc5mKuRQ': {
      title: 'Liquid eyeliner',
      try: 'Try a small liquid flick on one eye, resting your elbow on a table for a steady hand. Clean up mistakes with a cotton bud and micellar water.',
      minutes: 10,
      questions: [
        q.single('What helps you draw a steady liquid line?', ['Resting your elbow on a table', 'Holding your breath for a minute', 'Moving quickly', 'Keeping your hand in the air'], 0),
        q.single('A neat way to fix a liner mistake is…', ['A cotton bud with a little micellar water or remover', 'Adding more liner on top', 'Rubbing with your finger', 'Leaving it'], 0),
      ],
    },
    loEdT_8IReM: {
      title: 'Apply lip liner',
      try: 'Line your lips following your natural edge, then fill in a little towards the centre so there’s no harsh line when the lipstick wears off.',
      minutes: 10,
      questions: [
        q.single('Lip liner helps lipstick…', ['Stay in place and keep a clean shape', 'Dry faster', 'Change colour', 'Smell nice'], 0),
        q.tf('Filling in slightly with liner stops a hard ring showing as lipstick wears off.', true),
      ],
    },
    HLOQyveCOsw: {
      title: 'Easy lip combos',
      try: 'Make one lip combo from what you own: a liner a shade deeper than your lips plus a gloss or lipstick. Try it with your everyday look.',
      minutes: 10,
      questions: [
        q.single('A lip combo is…', ['A liner plus a lipstick or gloss worn together', 'Two lipsticks of the same colour', 'Lip balm only', 'A lip scrub'], 0),
        q.single('For a natural look, choose a liner that is…', ['Close to or slightly deeper than your natural lip colour', 'Bright white', 'Much lighter than your skin', 'Neon'], 0),
      ],
    },
    Hapv5VgU47Y: {
      title: 'The “no makeup” makeup look',
      try: 'Do the no-foundation look: spot-conceal where you need it, brush your brows, add mascara, blush and a tinted lip balm. Time yourself.',
      minutes: 20,
      questions: [
        q.single('A “no makeup” look usually uses…', ['Concealer only where needed, with light, natural products', 'Full coverage foundation everywhere', 'Heavy contour', 'Bright eyeshadow'], 0),
        q.tf('Spot concealing (only where needed) can replace foundation for an everyday look.', true),
      ],
    },
    x_kD3IUQpX0: {
      title: 'A clean everyday look',
      try: 'Follow the clean look: light base, brushed brows, a soft flush of blush on the cheeks, and a glossy lip.',
      minutes: 20,
      questions: [
        q.single('Blush is placed on…', ['The apples of the cheeks, blended up towards the temples', 'The nose only', 'The chin', 'The eyelids only'], 0),
        q.tf('Cream products blend easily into skin for a natural look.', true),
      ],
    },
    'I-TCxGwgbHs': {
      title: 'A full face for beginners',
      try: 'Do a full face slowly, following the video step by step. Note which steps you will keep for your everyday look.',
      minutes: 40,
      questions: [
        q.order('Put a basic makeup routine in order.', ['Prep the skin', 'Foundation', 'Concealer', 'Set with powder', 'Brows, eyes and lips']),
        q.single('Setting powder…', ['Helps makeup last and reduces shine', 'Adds colour to the lips', 'Removes makeup', 'Primes the skin'], 0),
      ],
    },
    'RIybFS-s4Gc': {
      title: 'Soft glam for dark skin',
      try: 'Create your final everyday look, photograph it in daylight near a window, and log the photo as your make.',
      minutes: 40,
      questions: [
        q.single('Why check your makeup in daylight?', ['It shows true colours and any patches', 'It makes makeup last longer', 'It hides mistakes', 'It changes the shade'], 0),
        q.tf('Shades made for deeper skin tones often have red, orange or golden undertones.', true),
      ],
    },
  },
  modules: [
    {
      title: 'Prep your skin and base',
      lessons: ['YKniUSh5fUo', '_TZX3pvSL1M', '80B3HH5cv0s'],
      checkpoint: exam('Skin prep and base exam', [
        q.order('Put skin prep in order.', ['Cleanse', 'Moisturise', 'Sunscreen in the daytime', 'Primer, if you use one']),
        q.single('Oily skin is usually shiniest on…', ['The T-zone: forehead, nose and chin', 'The ears', 'The neck', 'The eyelids only'], 0),
        q.single('Combination skin is…', ['Oily in some areas and dry or normal in others', 'Always oily', 'Always dry', 'Sensitive only'], 0),
        q.single('Your foundation looks grey or ashy on deep skin. The shade is probably…', ['Too light or the wrong undertone', 'Perfect', 'Too dark', 'Expired only'], 0),
        q.single('Undertone describes…', ['The subtle warm, cool or neutral colour beneath your skin', 'How oily your skin is', 'Your foundation brand', 'Your lip shade'], 0),
        q.tf('A damp makeup sponge gives a lighter, more natural finish than a dry one.', true),
        q.single('Concealer usually goes…', ['Only where you need extra coverage, like under the eyes or on spots', 'All over the face thickly', 'On the lips', 'On the eyebrows only'], 0),
        q.multi('Which help foundation look natural?', ['The right shade, tested in daylight', 'Thin layers built up where needed', 'Blending down onto the neck', 'A thick layer in one go'], [0, 1, 2]),
        q.single('Before makeup, dry skin needs…', ['Moisturiser time to sink in', 'Extra powder', 'A matte primer only', 'Nothing'], 0),
        q.tf('Doing a patch test helps check a new product won’t irritate your skin.', true),
        q.single('Sunscreen in your morning routine…', ['Protects skin from sun damage, for every skin tone', 'Is only for pale skin', 'Replaces moisturiser always', 'Removes makeup'], 0),
        q.single('Setting powder is applied…', ['Lightly, after foundation and concealer', 'Before moisturiser', 'On the lips', 'Under primer'], 0),
      ]),
    },
    {
      title: 'Brows, eyes and lips',
      lessons: ['kesCKoaCNkE', 'ezgkVQRGxSY', 'oSL5PhWl_ok', '-ZBHc5mKuRQ', 'loEdT_8IReM', 'HLOQyveCOsw'],
      checkpoint: exam('Brows, eyes and lips exam', [
        q.single('Short, hair-like strokes when filling brows look…', ['More natural than a solid block of colour', 'Messier', 'Darker', 'The same as a stencil'], 0),
        q.single('A brow pencil shade should usually be…', ['Close to your natural hair colour, or a shade lighter', 'Jet black for everyone', 'Bright red', 'Much darker than your hair'], 0),
        q.single('Where is the brow usually at its darkest and sharpest?', ['Towards the tail', 'At the very front', 'In the middle only', 'Nowhere'], 0),
        q.single('Tightlining means…', ['Lining the upper waterline close to the lashes', 'Lining the lips', 'Filling brows', 'Applying blush'], 0),
        q.single('Which liner is easiest for a beginner to blend and smudge?', ['A soft pencil', 'Liquid liner', 'Gel pot liner with a thin brush', 'A felt-tip pen'], 0),
        q.tf('Resting your elbow on a table steadies your hand for eyeliner.', true),
        q.single('Lip liner is drawn…', ['Along the natural edge of the lips', 'Far outside the lips', 'In the centre only', 'On the teeth'], 0),
        q.multi('Which are good lip combos for an everyday look?', ['Brown liner with a clear gloss', 'Liner close to your lip colour with a nude lipstick', 'Neon green liner with white gloss', 'Liner a shade deeper than your lips with a tinted balm'], [0, 1, 3]),
        q.single('Mascara is applied by…', ['Wiggling the wand from the lash roots out to the tips', 'Painting only the tips', 'Pressing on the eyelid', 'Brushing the brows'], 0),
        q.tf('Sharing mascara or eyeliner can spread eye infections.', true),
        q.single('A liner mistake is easiest to fix with…', ['A cotton bud and a little remover', 'More liner', 'Foundation on top', 'Water and soap rubbed hard'], 0),
        q.order('Put a simple eye routine in order.', ['Brows', 'Eyeliner', 'Mascara']),
      ]),
    },
    {
      title: 'Your everyday look',
      lessons: ['Hapv5VgU47Y', 'x_kD3IUQpX0', 'I-TCxGwgbHs', 'RIybFS-s4Gc'],
      checkpoint: exam('Everyday look exam', [
        q.single('An everyday look should be…', ['Quick, comfortable and suited to your skin', 'As heavy as possible', 'Different every day', 'The same as a bridal look'], 0),
        q.single('Blush adds…', ['A natural flush of colour to the cheeks', 'Coverage to spots', 'Shape to the brows', 'Shine to the lips'], 0),
        q.single('Highlighter is placed…', ['On the high points of the face, like cheekbones', 'All over the face', 'Under the chin', 'On the eyelashes'], 0),
        q.single('“Soft glam” means…', ['A polished but soft look, with blended colour', 'No makeup at all', 'Bright, graphic colours', 'Only lipstick'], 0),
        q.tf('Blending well is what makes most makeup look natural.', true),
        q.order('Put the full face in order.', ['Prep', 'Base: foundation and concealer', 'Powder', 'Brows and eyes', 'Blush and lips', 'Setting spray, if used']),
        q.multi('Which keep makeup and skin healthy?', ['Removing makeup before sleeping', 'Cleaning brushes and sponges regularly', 'Throwing out old mascara after a few months', 'Sharing eye products'], [0, 1, 2]),
        q.single('Your makeup looks good indoors but patchy outside. What helps?', ['Check and blend it in daylight', 'Add more powder', 'Use a darker foundation', 'Skip moisturiser'], 0),
        q.single('A “no makeup” look often swaps foundation for…', ['Spot concealing', 'Heavy contour', 'Glitter', 'White eyeliner'], 0),
        q.tf('Cream blush is applied before powder; powder blush usually goes after powder.', true),
        q.single('Setting spray mainly…', ['Helps makeup last and look less powdery', 'Removes makeup', 'Adds coverage', 'Colours the lips'], 0),
        q.single('The best way to get faster at your everyday look is…', ['Practise the same steps regularly', 'Buy more products', 'Change your routine daily', 'Skip prep'], 0),
      ]),
    },
  ],
};
