import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Practise smarter and sound like a musician',
  lessons: {
    Q3HC7gUTkNc: {
      title: 'The six areas you should be practising',
      try: 'Write the six areas from the video on paper and rate yourself 1 to 5 in each. Plan a week that works on your two weakest.',
      minutes: 20,
      questions: [
        q.single('Practising across several areas (technique, songs, theory, ear…) helps because…', ['Balanced skills make you a more complete player', 'It is faster to learn one thing', 'Songs are not important', 'Theory replaces playing'], 0),
        q.tf('Your weakest areas usually deserve the most practice time.', true),
      ],
    },
    'jFHF-U91jow': {
      title: 'Strengthen weak fingers',
      try: 'Do the finger exercises from the video for five minutes a day this week, slowly and relaxed.',
      minutes: 15,
      questions: [
        q.single('Finger exercises work best when done…', ['Slowly, relaxed and regularly', 'Fast and tense', 'Once a month', 'Only before gigs'], 0),
        q.tf('Independence between fingers takes regular practice to build.', true),
      ],
    },
    xKg3N7NGqGk: {
      title: 'Beyond the same old D chord',
      try: 'Play three D variations from the video (like Dsus2, Dsus4 and D with a moving top note) in a song that uses D.',
      minutes: 20,
      questions: [
        q.single('Using variations of a chord mainly adds…', ['Colour and movement to your playing', 'A new key', 'Volume', 'Speed'], 0),
        q.tf('Small changes to the top notes of a chord can make a part sound more interesting.', true),
      ],
    },
    tP9CmjQMpSQ: {
      title: 'Link chords with notes',
      try: 'Join C to G and A to D with the walking notes from the video, then add one to a song you know.',
      minutes: 20,
      questions: [
        q.single('Linking chords with a few single notes creates…', ['A walking line that leads into the next chord', 'A new chord', 'A tuning change', 'Silence'], 0),
        q.single('A chromatic run moves…', ['One fret (half step) at a time', 'Two frets at a time', 'Only on open strings', 'Randomly'], 0),
      ],
    },
    bWelpo7z4AM: {
      title: 'Play a duet',
      try: 'Play one part of a duet from the video with a friend or a recording of yourself playing the other part.',
      minutes: 30,
      questions: [
        q.single('In a guitar duet, the two parts are often…', ['Rhythm (chords) and melody', 'Two identical parts always', 'Tuning and playing', 'Bass and drums'], 0),
        q.tf('Recording one part and playing the other along with it is a way to practise duets alone.', true),
      ],
    },
    AM8JjUwhlf0: {
      title: 'Mindful listening',
      try: 'Listen to one song with full attention and no distractions. Write down every instrument and change you notice.',
      minutes: 15,
      questions: [
        q.single('Mindful listening means…', ['Listening to music with full, focused attention', 'Listening while doing other tasks', 'Only listening to guitar', 'Listening at high volume'], 0),
        q.tf('Careful listening improves your playing as well as your ear.', true),
      ],
    },
    th4HE45_SEs: {
      title: 'Great guitar tone starts here',
      try: 'Strum one chord near the bridge, over the sound hole and near the neck. Describe how the tone changes.',
      minutes: 20,
      questions: [
        q.single('Picking near the bridge usually sounds…', ['Brighter and thinner', 'Warmer and rounder', 'Quieter', 'Out of tune'], 0),
        q.single('Picking nearer the neck usually sounds…', ['Warmer and rounder', 'Brighter and thinner', 'Distorted', 'Silent'], 0),
        q.tf('Much of your tone comes from your hands, not just your gear.', true),
      ],
    },
    bCtY6Nv7E0g: {
      title: 'Work out songs on your own',
      try: 'Work out the chords of a simple song by ear, then check them against a chord sheet.',
      minutes: 30,
      questions: [
        q.single('A good first step when working out a song is…', ['Finding the key (the home chord)', 'Learning the solo', 'Changing the tuning', 'Buying the tab'], 0),
        q.tf('Most simple songs use chords from one key, which narrows down the options.', true),
      ],
    },
    Rl1edOcrNvs: {
      title: 'Module practice routine',
      try: 'Build your routine from the six areas and follow it for a week, ticking off each area you practise.',
      minutes: 20,
      questions: [
        q.tf('A routine that rotates areas keeps practice varied and balanced.', true),
        q.single('Tracking what you practise helps you…', ['See which areas you are neglecting', 'Skip practice', 'Tune faster', 'Play louder'], 0),
      ],
    },
  },
  checkpoint: programExam('Practice and musicianship exam', [
    q.single('Balanced practice covers…', ['Several areas like technique, songs, ear and theory', 'Only songs', 'Only scales', 'Only speed'], 0),
    q.single('Your weakest practice area deserves…', ['More focused time', 'Less time', 'No time', 'Only weekend time'], 0),
    q.single('Finger exercises should be done…', ['Slowly and relaxed', 'As fast as possible', 'With tension', 'Never'], 0),
    q.single('A chord variation like Dsus2 or Dsus4 adds…', ['Colour and movement', 'A key change', 'A tempo change', 'Distortion'], 0),
    q.single('Single notes that walk from one chord to the next are called…', ['A bass run or walking line', 'A barre', 'A harmonic', 'A capo change'], 0),
    q.single('A chromatic run moves by…', ['Half steps (one fret at a time)', 'Whole steps only', 'Octaves', 'Fifths'], 0),
    q.single('In a duet, one player often plays chords while the other plays…', ['The melody', 'The same chords', 'Nothing', 'The tuning'], 0),
    q.single('Picking near the bridge makes the sound…', ['Brighter', 'Warmer', 'Quieter', 'Lower'], 0),
    q.single('Picking near the neck makes the sound…', ['Warmer', 'Brighter', 'Harsher', 'Higher'], 0),
    q.tf('Tone depends on your hands, technique and touch as well as gear.', true),
    q.single('Mindful listening means…', ['Focused, distraction-free listening', 'Background listening', 'Listening only to guitar', 'Listening loudly'], 0),
    q.single('To work out a song by ear, first find…', ['The key or home chord', 'The tempo in BPM', 'The guitar brand', 'The solo'], 0),
    q.multi('Which help work out chords by ear?', ['Finding the bass notes', 'Trying chords from the song’s key', 'Humming the melody', 'Guessing random chords forever'], [0, 1, 2]),
    q.tf('A recording of yourself can act as a duet partner.', true),
    q.single('In the key of G, the most common chords are…', ['G, C, D and Em', 'G, A♭, B and E♭', 'F, B♭ and E♭', 'Only G'], 0),
    q.order('Put working out a song in order.', ['Listen carefully several times', 'Find the key', 'Find the bass notes', 'Try chords from the key', 'Check against a chord sheet']),
    q.single('Timeboxing practice (a set time per task) helps…', ['Make sure every area gets attention', 'Skip hard tasks', 'Practise only songs', 'Avoid routines'], 0),
    q.single('A “walking” line from C to G might pass through…', ['B and A', 'F♯ and D♯', 'E♭ and A♭', 'No notes'], 0),
    q.tf('Varying the chords you use (with variations) keeps songs interesting.', true),
    q.single('This module is mainly about…', ['Practising smarter and playing more musically', 'Learning barre chords', 'Changing strings', 'Tuning'], 0),
  ]),
};
