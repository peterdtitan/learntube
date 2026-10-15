import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/sew-a-skirt.json';

// "Beginners sewing course", "tutorial for beginners in tailoring" and "how to sew a skirt"
// are top searches in Nigeria. Mostly Sew with Bunmi's Sewing 101 series, with Glory Allan on
// fabric and two quick tote bags as a first machine project.

export default {
  slug: 'skill-sew-a-skirt',
  title: 'Sew your first skirt on a machine',
  description: 'Learn your sewing machine and fabrics, sew a tote bag to practise, take accurate body measurements, then draft a pattern and sew a pencil skirt that fits you.',
  makeTitle: 'A skirt you drafted and sewed yourself on a machine',
  skillId: 'sewing',
  cover: '4FwJw1_VrJA',
  by: 'Sew with Bunmi',
  videos,
  lessons: {
    'TKaXzL7-kQI': {
      title: 'Sewing tools to start with',
      try: 'Gather your tools: fabric scissors (only for fabric), a tape measure, pins, chalk or a fabric marker, a seam ripper, and thread to match your fabric.',
      minutes: 15,
      questions: [
        q.single('Why keep fabric scissors only for fabric?', ['Cutting paper dulls them', 'They are too big for paper', 'It is bad luck', 'They are only for thread'], 0),
        q.single('A seam ripper is for…', ['Undoing stitches', 'Cutting fabric', 'Marking fabric', 'Threading the machine'], 0),
      ],
    },
    TFpLM52goYY: {
      title: 'Understanding fabric',
      try: 'Find a woven cotton fabric for practice. Locate the selvedge and the grainline, and wash and iron it before cutting.',
      minutes: 20,
      questions: [
        q.single('The selvedge is…', ['The finished edge of the fabric that doesn’t fray', 'The fold line', 'The bias', 'The wrong side'], 0),
        q.single('Which fabric is easiest for beginners?', ['A stable woven cotton', 'Slippery silk', 'Very stretchy knit', 'Thick leather'], 0),
        q.tf('Pre-washing fabric stops your finished piece shrinking later.', true),
      ],
    },
    'QMS-rhKrwGc': {
      title: 'Use a sewing machine',
      try: 'Wind a bobbin and thread your machine. Sew straight lines and curves on scrap fabric, backstitching at the start and end of each line.',
      minutes: 60,
      questions: [
        q.single('Why thread the machine with the presser foot up?', ['It opens the tension discs so the thread seats properly', 'It is easier to see', 'It stops the needle', 'It winds the bobbin'], 0),
        q.single('Backstitching at the start and end of a seam…', ['Locks the stitches so they don’t unravel', 'Makes the seam longer', 'Changes the stitch type', 'Removes stitches'], 0),
        q.single('To turn a corner neatly, you…', ['Stop with the needle down, lift the foot, pivot, then lower it', 'Keep sewing round it', 'Cut the thread', 'Lift the needle out'], 0),
      ],
    },
    swPrYNu1kGM: {
      title: 'A simple tote bag',
      try: 'Sew a tote bag with straight seams and handles. Press each seam as you go.',
      minutes: 90,
      questions: [
        q.single('Why press seams as you sew?', ['They lie flat and the finished piece looks neater', 'To shrink the fabric', 'To remove the thread', 'It is only for silk'], 0),
        q.tf('Boxing the bottom corners of a tote gives the bag a flat base.', true),
      ],
    },
    LhZ2_Q9AVMA: {
      title: 'An even quicker tote bag',
      try: 'Compare the two tote methods and finish your bag. Note which step was hardest on the machine.',
      minutes: 30,
      questions: [
        q.single('Sewing two pieces right sides together, then turning them out…', ['Hides the raw edges inside', 'Shows the seams outside', 'Ruins the fabric', 'Makes it reversible only'], 0),
        q.tf('Topstitching near the edge makes handles and openings stronger and neater.', true),
      ],
    },
    IIdSi07y_3E: {
      title: 'Read a measuring tape',
      try: 'Measure five things around you in inches, to the nearest 1/8 inch, and write them down. Then convert two of them to centimetres.',
      minutes: 20,
      questions: [
        q.single('One inch is about…', ['2.54 cm', '1 cm', '10 cm', '0.5 cm'], 0),
        q.single('Between whole inches, the longest small mark is…', ['The half inch', 'The 1/8 inch', 'The 1/16 inch', 'The quarter inch'], 0),
      ],
    },
    huxY95Vfxyg: {
      title: 'Take your body measurements',
      try: 'Take your waist, hip and skirt length measurements with a helper if you can. Measure twice and write them down.',
      minutes: 20,
      questions: [
        q.single('The hip measurement is taken…', ['Around the fullest part of the hips and bottom', 'At the waist', 'Just below the knee', 'Over the shoulders'], 0),
        q.single('When measuring, the tape should be…', ['Snug but not tight, and level all the way round', 'Pulled as tight as possible', 'Loose and twisted', 'Over thick clothes'], 0),
        q.tf('Measuring twice helps you catch mistakes before cutting fabric.', true),
      ],
    },
    iqdOTRGpbCM: {
      title: 'Sewing calculations for a good fit',
      try: 'Work out your pattern numbers: divide your hip and waist by four, and add the ease and seam allowance from the video.',
      minutes: 30,
      questions: [
        q.single('Ease is…', ['Extra room added so the garment is comfortable to move in', 'The seam', 'A type of fabric', 'The hem'], 0),
        q.single('Seam allowance is…', ['The extra fabric between the stitching line and the cut edge', 'The length of a stitch', 'The finished width', 'The hem depth only'], 0),
      ],
    },
    RmUNwROiyAE: {
      title: 'Draft a skirt pattern',
      try: 'Draft your pencil skirt pattern on paper using your measurements, then cut it out in fabric, transferring the dart marks.',
      minutes: 60,
      questions: [
        q.single('Darts in a skirt…', ['Take in fabric so the skirt fits from the hip into the smaller waist', 'Make it longer', 'Are decorative only', 'Replace the zip'], 0),
        q.single('The pattern should be placed with its grainline…', ['Parallel to the selvedge', 'Across the fabric at random', 'On the bias always', 'Along the cut edge'], 0),
      ],
    },
    '4FwJw1_VrJA': {
      title: 'Sew a pencil skirt',
      try: 'Sew your skirt: darts, side seams, zip and waistband, then hem it. Try it on, photograph it, and log it as your make.',
      minutes: 180,
      questions: [
        q.single('A waistband…', ['Finishes the top edge and holds the skirt at your waist', 'Is sewn at the hem', 'Replaces the side seams', 'Is optional on every skirt'], 0),
        q.tf('Trying the skirt on before the final hem lets you adjust the length.', true),
      ],
    },
  },
  modules: [
    {
      title: 'Tools, fabric and the machine',
      lessons: ['TKaXzL7-kQI', 'TFpLM52goYY', 'QMS-rhKrwGc'],
      checkpoint: exam('Tools and machine exam', [
        q.single('Which tool undoes a wrong seam?', ['A seam ripper', 'Pinking shears', 'A tape measure', 'Chalk'], 0),
        q.single('The bobbin holds…', ['The lower thread', 'The upper thread', 'The needle', 'The fabric'], 0),
        q.single('The presser foot…', ['Holds the fabric flat against the feed dogs while you sew', 'Cuts the thread', 'Winds the bobbin', 'Sets the stitch length'], 0),
        q.single('The feed dogs…', ['Move the fabric along under the needle', 'Hold the bobbin', 'Thread the needle', 'Cut the fabric'], 0),
        q.tf('You should turn the hand wheel towards you, not away from you.', true),
        q.single('Loops of thread under your seam usually mean…', ['The upper thread isn’t threaded properly or the tension is off', 'The fabric is too thick', 'The stitch is too short', 'You backstitched'], 0),
        q.single('Woven fabric…', ['Doesn’t stretch much and has a clear grain', 'Is always very stretchy', 'Has no edges', 'Can’t be sewn on a machine'], 0),
        q.single('The grainline runs…', ['Parallel to the selvedge', 'Diagonally', 'Across the fabric only', 'Nowhere'], 0),
        q.multi('Which belong in a beginner sewing kit?', ['Fabric scissors', 'Pins', 'Tape measure', 'Kitchen knife'], [0, 1, 2]),
        q.single('Why sew on scraps before your project?', ['To check tension and practise control', 'To waste fabric', 'To wind the bobbin', 'It is required'], 0),
        q.order('Put setting up the machine in order.', ['Wind the bobbin', 'Insert the bobbin', 'Thread the upper thread with the foot up', 'Bring up the bobbin thread', 'Test on a scrap']),
        q.single('Cotton fabric is ironed on…', ['A medium–high setting, often with steam', 'The lowest setting only', 'No heat ever', 'High heat with the fabric wet and plastic on top'], 0),
      ]),
    },
    {
      title: 'Your first project: a tote bag',
      lessons: ['swPrYNu1kGM', 'LhZ2_Q9AVMA'],
      checkpoint: exam('Tote bag exam', [
        q.single('“Right sides together” means…', ['The printed or good sides face each other while you sew', 'The wrong sides face each other', 'Side by side', 'One on top of the other, both facing up'], 0),
        q.single('Why turn a bag right side out after sewing?', ['To hide the raw seams inside', 'To make it shorter', 'To add handles', 'To press it'], 0),
        q.single('Boxed corners give a tote…', ['A flat base', 'Longer handles', 'A zip', 'A lining'], 0),
        q.tf('Backstitching where handles join the bag makes them stronger.', true),
        q.single('Topstitching is…', ['A visible line of stitching on the right side, near an edge', 'Hidden stitching', 'Hand stitching', 'Gluing'], 0),
        q.single('Pressing seams open or to one side makes the bag…', ['Look neater and sew more accurately', 'Shrink', 'Stiffer only', 'Weaker'], 0),
        q.multi('Which stop raw edges fraying?', ['Zigzag stitching the edge', 'Folding and sewing a hem', 'Hiding them inside a seam', 'Leaving them loose'], [0, 1, 2]),
        q.single('The handles should be sewn…', ['Evenly spaced from the side seams', 'At random', 'Only on one side', 'Inside the hem only'], 0),
        q.single('If your seam wanders, the easiest fix while sewing is to…', ['Keep your eyes on the seam guide, not the needle', 'Speed up', 'Push the fabric harder', 'Lift the foot'], 0),
        q.order('Put the tote bag in order.', ['Cut the fabric pieces', 'Make the handles', 'Sew the sides and bottom', 'Box the corners', 'Hem the top and attach the handles']),
        q.tf('Pins should be removed before the needle reaches them.', true),
        q.single('Interfacing is used to…', ['Stiffen and strengthen fabric', 'Join seams', 'Mark fabric', 'Replace thread'], 0),
      ]),
    },
    {
      title: 'Measure and calculate',
      lessons: ['IIdSi07y_3E', 'huxY95Vfxyg', 'iqdOTRGpbCM'],
      checkpoint: exam('Measuring exam', [
        q.single('How many sixteenths are in an inch?', ['16', '8', '10', '12'], 0),
        q.num('How many centimetres is 10 inches? (to one decimal place)', 25.4, 0.1),
        q.single('Your natural waist is usually…', ['The narrowest part of your torso, around the belly button area', 'Your hips', 'Under your bust', 'Your knees'], 0),
        q.single('Skirt length is measured…', ['From the waist down to where you want the hem', 'From the shoulder', 'Around the hips', 'From the knee up'], 0),
        q.single('Hip depth is…', ['The distance from the waist down to the fullest part of the hips', 'The hip circumference', 'The skirt length', 'The waist circumference'], 0),
        q.tf('Measuring over thick clothes makes measurements too big.', true),
        q.single('Why add ease to body measurements?', ['So you can move, sit and breathe in the garment', 'To make it tight', 'To save fabric', 'To shorten it'], 0),
        q.single('A skirt with front and back pieces each cut on a fold uses…', ['A quarter of the hip measurement (plus ease) for each half pattern piece', 'The full hip for each piece', 'Half the waist only', 'No calculation'], 0),
        q.single('Seam allowance must be added…', ['Around the pattern edges where pieces join', 'Only at the hem', 'Nowhere', 'Only to the waistband'], 0),
        q.multi('Which measurements do you need for a pencil skirt?', ['Waist', 'Hip', 'Skirt length', 'Shoulder width'], [0, 1, 2]),
        q.tf('Writing every measurement down before cutting saves costly mistakes.', true),
        q.single('The difference between your hip and waist is mostly taken in by…', ['Darts and side seam shaping', 'A longer hem', 'The zip only', 'The waistband only'], 0),
      ]),
    },
    {
      title: 'Draft and sew a skirt',
      lessons: ['RmUNwROiyAE', '4FwJw1_VrJA'],
      checkpoint: exam('Skirt exam', [
        q.order('Put sewing the skirt in order.', ['Sew the darts', 'Sew the side seams', 'Insert the zip', 'Attach the waistband', 'Hem the skirt']),
        q.single('Darts are sewn…', ['From the wide end to a point, tapering off', 'Straight across', 'From the point to the edge, backwards', 'By hand only'], 0),
        q.single('Why press darts after sewing?', ['So they lie flat and look smooth', 'To remove them', 'To make them longer', 'To mark the fabric'], 0),
        q.single('A pencil skirt…', ['Is fitted and narrow, following the hips', 'Is very full and gathered', 'Has no darts ever', 'Is cut on the bias only'], 0),
        q.single('A walking slit or vent in a pencil skirt…', ['Lets you walk comfortably', 'Is decoration only', 'Replaces the zip', 'Shortens it'], 0),
        q.tf('Placing pattern pieces on the grainline helps the skirt hang straight.', true),
        q.single('Transferring dart marks to the fabric is done with…', ['Chalk, a fabric marker or tailor’s tacks', 'A permanent pen on the right side', 'Glue', 'Scissors'], 0),
        q.single('A tight skirt at the hips can be fixed by…', ['Letting out the side seams if there is seam allowance', 'Shortening the hem', 'Adding a waistband', 'Removing the zip'], 0),
        q.multi('Which make a hem look neat?', ['An even width all the way round', 'Pressing before stitching', 'Matching thread', 'Pulling the fabric while sewing'], [0, 1, 2]),
        q.single('An invisible zip is sewn…', ['Close to the teeth, so the zip hides in the seam', 'On the outside', 'Across the waist', 'At the hem'], 0),
        q.tf('Trying on the skirt before the final steps lets you adjust the fit.', true),
        q.single('A waistband is often stiffened with…', ['Interfacing', 'Elastic only', 'Cardboard', 'Nothing ever'], 0),
      ]),
    },
  ],
};
