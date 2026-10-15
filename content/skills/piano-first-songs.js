import { q } from '../../src/lib/content/plan';
import { exam } from './exams/exam';
import videos from './videos/piano-first-songs.json';

// Two of YouTube's most-watched beginner piano teachers: Pianote (Lisa Witt) and Become a
// Piano Superhuman. "How to play piano" and "keyboard lessons for beginners" are among the
// top learning searches in both the US and Nigeria.

export default {
  slug: 'skill-piano-first-songs',
  title: 'Play your first songs on the piano',
  description: 'Find your way around the keys, read simple notes, play the four chords behind hundreds of songs, and play real songs with both hands. Any piano or keyboard works, even a free piano app to start.',
  makeTitle: 'A recording of you playing a song with both hands',
  skillId: 'piano',
  cover: '4SXQ_wlbWog',
  by: 'Pianote',
  videos,
  lessons: {
    '4SXQ_wlbWog': {
      title: 'Your first piano lesson',
      try: 'Find every C on your keyboard (left of each group of two black keys). Then play C D E F G with your right hand using fingers 1 to 5, up and down, five times.',
      minutes: 15,
      questions: [
        q.single('How do you find C on a piano?', ['It is just left of each group of two black keys', 'It is just right of each group of three black keys', 'It is the first white key on the left only', 'It is always a black key'], 0),
        q.single('In piano finger numbers, the thumb is…', ['1', '5', '0', '3'], 0),
        q.tf('The black keys come in repeating groups of two and three.', true),
      ],
    },
    tEtukfFv3Wk: {
      title: 'How to play piano: posture, hands and keys',
      try: 'Sit at the right height with your forearms level with the keys. Play a slow five-finger pattern with each hand, keeping your fingers curved as if holding a ball.',
      minutes: 15,
      questions: [
        q.single('Your fingers should be…', ['Gently curved, as if holding a small ball', 'Completely flat', 'Stiff and straight', 'Tucked under your palm'], 0),
        q.single('The musical alphabet uses the letters…', ['A to G', 'A to Z', 'A to E', 'C to K'], 0),
        q.tf('Sitting so your forearms are roughly level with the keys helps you play relaxed.', true),
      ],
    },
    'NlfjF-SiOrM': {
      title: 'The best tips for getting started',
      try: 'Set a timer for 15 minutes and practise today. Write down one tip from the video you will use every session.',
      minutes: 15,
      questions: [
        q.single('Which is a better practice habit for beginners?', ['Short sessions most days', 'One very long session a month', 'Only practising pieces you already know', 'Practising only when inspired'], 0),
        q.tf('Practising slowly and correctly builds speed faster than rushing.', true),
      ],
    },
    PyOKefHURsg: {
      title: 'Read notes the easy way',
      try: 'Write out the treble clef lines (E G B D F) and spaces (F A C E). Then name ten notes from any simple sheet music, checking each one.',
      minutes: 20,
      questions: [
        q.single('The lines of the treble clef, from the bottom, are…', ['E G B D F', 'F A C E', 'G B D F A', 'A C E G'], 0),
        q.single('The spaces of the treble clef, from the bottom, spell…', ['FACE', 'EGBDF', 'ACEG', 'GBDFA'], 0),
        q.single('Which hand usually reads the treble clef?', ['The right hand', 'The left hand', 'Both hands always', 'Neither'], 0),
      ],
    },
    XGKdMYSitAY: {
      title: 'Use a metronome',
      try: 'Open a free metronome app at 60 BPM and play C D E F G up and down, one note per click. Raise it by 5 BPM only when it feels easy.',
      minutes: 15,
      questions: [
        q.single('BPM on a metronome stands for…', ['Beats per minute', 'Bars per measure', 'Big piano music', 'Beats per melody'], 0),
        q.single('When something is too hard at the current tempo, you should…', ['Slow the metronome down', 'Turn it off and rush', 'Speed it up', 'Skip the hard part'], 0),
      ],
    },
    'HwnQ04H-YnU': {
      title: 'Six concepts that help you learn fast',
      try: 'Pick the concept from the video you most need. Practise one short passage with it for ten minutes and note what changed.',
      minutes: 15,
      questions: [
        q.tf('Breaking a song into small sections and mastering each one is faster than always playing it from the start.', true),
        q.single('Playing hands separately before hands together helps because…', ['Each hand learns its part before you combine them', 'It is the only way to play', 'It makes the song shorter', 'It avoids reading notes'], 0),
      ],
    },
    '2mPS-2guHVo': {
      title: 'Piano chords for beginners',
      try: 'Build C major, F major and G major by counting half steps (4 then 3). Play each one, then try the minor version by lowering the middle note.',
      minutes: 20,
      questions: [
        q.single('Which notes make a C major chord?', ['C E G', 'C D E', 'C F A', 'C E♭ G'], 0),
        q.single('To turn a major chord into a minor chord you…', ['Lower the middle note by one half step', 'Raise the top note', 'Add a black key on top', 'Play it louder'], 0),
        q.single('A half step on the piano is…', ['From one key to the very next key, black or white', 'Two white keys', 'One octave', 'Any black key'], 0),
      ],
    },
    '1D3aWUx771A': {
      title: 'Four chords that play hundreds of songs',
      try: 'Play C, G, Am and F in a loop, four beats each, with your right hand. Then add the root note of each chord in your left hand.',
      minutes: 25,
      questions: [
        q.single('In the key of C, the famous four-chord progression is often…', ['C, G, Am, F', 'C, D, E, F', 'Am, Bm, Cm, Dm', 'C, C♯, D, D♯'], 0),
        q.single('The root of an A minor chord is…', ['A', 'C', 'E', 'G'], 0),
        q.tf('Many pop songs use the same few chords in different orders and rhythms.', true),
      ],
    },
    '7WS_wasGBxA': {
      title: 'Three beautiful chord progressions',
      try: 'Learn one progression from the video and play it slowly with a steady rhythm for three minutes without stopping.',
      minutes: 20,
      questions: [
        q.single('A chord progression is…', ['A series of chords played one after another', 'One chord held down', 'A scale played fast', 'A type of keyboard'], 0),
        q.tf('Moving to the nearest notes between chords (voice leading) makes changes smoother.', true),
      ],
    },
    '5yJCM0nheL0': {
      title: 'Your first song with four chords',
      try: 'Play the song from the video with chords in your right hand and roots in your left. Get through it once without stopping, even if slowly.',
      minutes: 30,
      questions: [
        q.single('Your left hand often plays…', ['The root (bass) note of each chord', 'The melody only', 'Nothing', 'Random notes'], 0),
        q.tf('Keeping a steady beat matters more than playing every note perfectly.', true),
      ],
    },
    'CiMippx--Jk': {
      title: 'Four songs that are perfect for beginners',
      try: 'Choose one of the four songs and learn the first section hands separately, then hands together, slowly.',
      minutes: 30,
      questions: [
        q.single('The best way to learn a new song section is usually…', ['Hands separately first, then together, slowly', 'Both hands at full speed straight away', 'Only by ear with no practice', 'Starting from the end'], 0),
        q.tf('It is fine to slow a song right down while you learn it.', true),
      ],
    },
    'x0y-P6MnENM': {
      title: 'Four beginner songs that impress',
      try: 'Learn a second song from this video. Record yourself playing it through and listen back for uneven rhythm.',
      minutes: 30,
      questions: [
        q.single('Listening back to a recording of yourself helps you…', ['Hear timing and evenness you miss while playing', 'Play faster automatically', 'Avoid practising', 'Tune the piano'], 0),
        q.tf('Playing chords in a broken (one note at a time) pattern can make simple songs sound fuller.', true),
      ],
    },
    yrgO3R8mgGo: {
      title: 'A beginner practice routine',
      try: 'Practise with the routine from the video: warm-up, chords, then your song. Record a full song with both hands and log it as your make.',
      minutes: 40,
      questions: [
        q.order('Put a good practice session in order.', ['Warm up your fingers', 'Practise chords or technique', 'Work on the hard part of your song', 'Play the whole song through']),
        q.single('Which part of a song deserves the most practice time?', ['The hardest few bars', 'The part you already know best', 'The very first note', 'The ending only'], 0),
      ],
    },
  },
  modules: [
    {
      title: 'Find your way around the keys',
      lessons: ['4SXQ_wlbWog', 'tEtukfFv3Wk', 'NlfjF-SiOrM'],
      checkpoint: exam('Keyboard basics exam', [
        q.single('Which white key sits just left of a group of two black keys?', ['C', 'F', 'E', 'B'], 0),
        q.single('Which white key sits just left of a group of three black keys?', ['F', 'C', 'G', 'A'], 0),
        q.single('After G in the musical alphabet comes…', ['A', 'H', 'F', 'C'], 0),
        q.single('Middle C is…', ['The C nearest the middle of the keyboard', 'The lowest C', 'A black key', 'The highest C'], 0),
        q.single('Your pinky finger is number…', ['5', '1', '4', '2'], 0),
        q.tf('Finger numbers are the same on both hands: thumbs are 1.', true),
        q.single('Playing C D E F G with fingers 1 2 3 4 5 is called…', ['A five-finger position', 'A chord', 'An octave jump', 'A scale in thirds'], 0),
        q.single('An octave is…', ['From one note to the next note with the same name', 'Any two black keys', 'Eight black keys', 'Half a keyboard'], 0),
        q.multi('Which help you play relaxed?', ['Curved fingers', 'Level forearms', 'Raised, tense shoulders', 'Sitting at a comfortable distance'], [0, 1, 3]),
        q.tf('A cheap keyboard or a free piano app is enough to start learning.', true),
        q.single('How many different letter names do the white keys use?', ['7', '12', '8', '5'], 0),
        q.order('Put the notes of a C five-finger position in order, from left to right.', ['C', 'D', 'E', 'F', 'G']),
      ]),
    },
    {
      title: 'Read notes and keep time',
      lessons: ['PyOKefHURsg', 'XGKdMYSitAY', 'HwnQ04H-YnU'],
      checkpoint: exam('Reading and rhythm exam', [
        q.single('The treble clef usually shows notes for the…', ['Right hand', 'Left hand', 'Feet', 'Pedal only'], 0),
        q.single('The bass clef usually shows notes for the…', ['Left hand', 'Right hand', 'Metronome', 'Both thumbs only'], 0),
        q.single('A note on the bottom line of the treble clef is…', ['E', 'F', 'G', 'C'], 0),
        q.single('A note in the bottom space of the treble clef is…', ['F', 'E', 'A', 'D'], 0),
        q.single('The lines of the bass clef, from the bottom, are…', ['G B D F A', 'E G B D F', 'A C E G', 'F A C E'], 0),
        q.single('A metronome set to 60 BPM clicks…', ['Once a second', 'Twice a second', 'Once a minute', '60 times a second'], 0),
        q.tf('You should only speed up the metronome once a passage feels easy at the current tempo.', true),
        q.single('A whole note in 4/4 time lasts…', ['Four beats', 'One beat', 'Two beats', 'Half a beat'], 0),
        q.single('A half note lasts…', ['Two beats', 'Four beats', 'One beat', 'Three beats'], 0),
        q.single('A quarter note lasts…', ['One beat', 'Two beats', 'Four beats', 'Half a beat'], 0),
        q.multi('Which help you learn a piece faster?', ['Practising small sections', 'Hands separately first', 'Always playing from the start at full speed', 'Using a metronome'], [0, 1, 3]),
        q.match('Match each note value to its length in 4/4 time.', [['Whole note', '4 beats'], ['Half note', '2 beats'], ['Quarter note', '1 beat']]),
      ]),
    },
    {
      title: 'Chords',
      lessons: ['2mPS-2guHVo', '1D3aWUx771A', '7WS_wasGBxA'],
      checkpoint: exam('Chords exam', [
        q.single('A major chord is built from the root, then up…', ['4 half steps, then 3 more', '3 half steps, then 4 more', '2 half steps, then 2 more', '5 half steps, then 5 more'], 0),
        q.single('Which notes make a G major chord?', ['G B D', 'G A B', 'G C E', 'G B♭ D'], 0),
        q.single('Which notes make an F major chord?', ['F A C', 'F G A', 'F A♭ C', 'F B D'], 0),
        q.single('Which notes make an A minor chord?', ['A C E', 'A C♯ E', 'A B C', 'A D F'], 0),
        q.single('Lowering the middle note of C major by a half step gives…', ['C minor', 'C major 7', 'F major', 'A minor'], 0),
        q.tf('Am, C, F and G can all be played on white keys only.', true),
        q.single('The root of a chord is…', ['The note the chord is named after', 'The highest note', 'Any black key', 'The middle note'], 0),
        q.single('An inversion of a chord…', ['Uses the same notes with a different one at the bottom', 'Uses different notes', 'Is always minor', 'Has only two notes'], 0),
        q.tf('Inversions help your hand move less between chords.', true),
        q.multi('Which are minor chords?', ['Am', 'Dm', 'G', 'Em'], [0, 1, 3]),
        q.single('In C, the chords C, G, Am and F are often called…', ['I, V, vi, IV', 'I, II, III, IV', 'V, IV, III, II', 'vi, vi, vi, vi'], 0),
        q.order('Put the steps for building any major chord in order.', ['Pick the root note', 'Count up 4 half steps', 'Count up 3 more half steps', 'Play all three notes together']),
      ]),
    },
    {
      title: 'Play your first songs',
      lessons: ['5yJCM0nheL0', 'CiMippx--Jk', 'x0y-P6MnENM', 'yrgO3R8mgGo'],
      checkpoint: exam('Songs and practice exam', [
        q.single('A simple way to accompany a melody is for the left hand to play…', ['The root of each chord', 'The same melody', 'Every black key', 'Nothing at all'], 0),
        q.single('Broken chords mean…', ['Playing a chord’s notes one after another', 'A chord with a wrong note', 'A chord you stop halfway', 'Two chords at once'], 0),
        q.order('Put the steps for learning a new song in order.', ['Listen to the song', 'Learn the right-hand part slowly', 'Learn the left-hand part slowly', 'Play hands together slowly', 'Speed up with a metronome']),
        q.tf('When a bar is hard, practise just that bar rather than the whole song each time.', true),
        q.single('You keep stopping at the same chord change. What helps most?', ['Practise just that change slowly until it is smooth', 'Play the whole song faster', 'Skip that chord', 'Play louder'], 0),
        q.single('Which keeps a song moving when you make a mistake?', ['Keeping the beat going and carrying on', 'Stopping to restart every time', 'Changing the key', 'Slowing down to a stop'], 0),
        q.multi('Which belong in a beginner practice routine?', ['A short warm-up', 'Chord or technique practice', 'Work on one hard passage', 'Only playing what you already know'], [0, 1, 2]),
        q.single('How long should a beginner practise each day?', ['Short focused sessions, like 15 to 30 minutes', 'Exactly 4 hours', 'Only on weekends', 'It doesn’t matter at all'], 0),
        q.tf('Recording yourself is a useful way to check rhythm and evenness.', true),
        q.single('Playing hands together for the first time, you should…', ['Go much slower than hands separately', 'Go faster', 'Close your eyes', 'Use the pedal throughout'], 0),
        q.single('The sustain pedal…', ['Lets notes keep ringing after you lift your fingers', 'Makes notes quieter', 'Changes the key', 'Is for the left hand'], 0),
        q.single('A song’s chord chart says C G Am F. Your right hand can play…', ['Each chord in turn while the left plays roots', 'Only C', 'The notes A to G in order', 'Black keys only'], 0),
      ]),
    },
  ],
};
