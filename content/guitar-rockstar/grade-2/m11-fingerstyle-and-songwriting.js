import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Playing by ear, sus chords, fingerstyle and songwriting',
  lessons: {
    heaI1aGdYCg: {
      title: 'Play by ear',
      try: 'Pick a simple song you know well and try to find its first chord and the bass notes by ear, before looking it up.',
      minutes: 20,
      questions: [
        q.single('A good first step for working out a song by ear is…', ['Finding the key or home note', 'Learning the solo', 'Reading tab', 'Tuning down'], 0),
        q.tf('Playing by ear improves with regular, patient practice.', true),
      ],
    },
    otjuDwSMRjk: {
      title: 'Sus chords',
      try: 'Play D, Dsus2 and Dsus4 one after another, then do the same with A. Use them to decorate a song.',
      minutes: 20,
      questions: [
        q.single('Dsus4 sounds “unresolved” because…', ['The fourth replaces the third and wants to fall back to it', 'It is minor', 'It is out of tune', 'It has no root'], 0),
        q.single('Moving D → Dsus4 → D is a classic way to…', ['Add movement to a held chord', 'Change key', 'Mute strings', 'Tune'], 0),
      ],
    },
    WyYuDpQ993c: {
      title: 'Shifting the F chord',
      try: 'Move your F shape up two frets and name the new chord. Try a few positions and listen.',
      minutes: 10,
      questions: [
        q.single('Moving a barre shape up the neck…', ['Changes which chord it is, keeping the same type', 'Changes it from major to minor', 'Has no effect', 'Lowers the pitch'], 0),
        q.single('The F barre shape moved up two frets becomes…', ['G', 'F♯', 'A', 'E'], 0),
      ],
    },
    OkTBizvNWoI: {
      title: 'Improvise without overthinking',
      try: 'Improvise over a backing track for five minutes using one scale. Focus on rhythm and repetition, not speed.',
      minutes: 20,
      questions: [
        q.tf('Simple, rhythmic phrases often sound better than lots of fast notes.', true),
        q.single('When improvising, silence (rests) is…', ['A useful part of the phrase', 'A mistake', 'Not allowed', 'Only at the end'], 0),
      ],
    },
    '2WB8otOcz78': {
      title: 'Fingerstyle for beginners',
      try: 'Use your thumb for the bass strings and fingers for the G, B and high E. Play a simple pattern over C, Am and G.',
      minutes: 20,
      questions: [
        q.single('In fingerstyle, the thumb usually plays…', ['The bass strings (low E, A, D)', 'The high E only', 'Nothing', 'Every string'], 0),
        q.single('In fingerstyle, “p i m a” stands for…', ['Thumb, index, middle, ring', 'Pick, index, middle, all', 'Pinky, index, middle, arm', 'Play in my apartment'], 0),
      ],
    },
    P2Y4n9H55wI: {
      title: 'Play Happy Birthday',
      try: 'Learn Happy Birthday from the video and play it for someone.',
      minutes: 20,
      questions: [
        q.single('Happy Birthday is in…', ['3/4 time', '4/4 time', '6/8 time', '2/4 time'], 0),
        q.tf('Playing for other people is good practice for performing.', true),
      ],
    },
    Df8c9ZFzhFI: {
      title: 'Songs for this module',
      try: 'Learn a song from the video using a sus chord or fingerstyle.',
      minutes: 20,
      questions: [
        q.tf('Sus chords often decorate songs by moving to and from the plain chord.', true),
        q.single('If a fingerstyle pattern is hard, you should…', ['Practise it slowly on one chord first', 'Strum instead forever', 'Play it faster', 'Use a pick'], 0),
      ],
    },
    '6ZSt-6D9wVo': {
      title: 'Write your first song',
      try: 'Write a short song: pick a four-chord progression, hum a melody over it, and write one verse and a chorus.',
      minutes: 60,
      questions: [
        q.multi('Which are common parts of a song?', ['Verse', 'Chorus', 'Bridge', 'Capo'], [0, 1, 2]),
        q.single('An easy way to start writing a song is…', ['Pick a chord progression and hum melodies over it', 'Learn 50 chords first', 'Write the solo first', 'Wait for inspiration'], 0),
        q.tf('Many hit songs use simple chord progressions.', true),
      ],
    },
    efWoqoxjEkc: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week, including five minutes of fingerstyle and five of playing by ear.',
      minutes: 20,
      questions: [
        q.single('Daily ear practice helps you…', ['Work out songs faster', 'Tune slower', 'Avoid chords', 'Play louder'], 0),
        q.tf('Writing songs is a skill that improves with practice, like any other.', true),
      ],
    },
  },
  checkpoint: programExam('Fingerstyle, sus chords and songwriting exam', [
    q.single('Dsus2 is D with the third replaced by…', ['The second (E)', 'The fourth (G)', 'The fifth', 'Nothing'], 0),
    q.single('Dsus4 is D with the third replaced by…', ['The fourth (G)', 'The second (E)', 'The seventh', 'The sixth'], 0),
    q.single('Sus chords usually want to…', ['Resolve back to the major or minor chord', 'Stay forever', 'Change key', 'Get louder'], 0),
    q.single('Moving a barre chord shape up two frets…', ['Raises its pitch by a whole step', 'Makes it minor', 'Lowers it', 'Changes nothing'], 0),
    q.single('F moved up two frets is…', ['G', 'A', 'F♯', 'E'], 0),
    q.single('In fingerstyle, the thumb is called…', ['p', 'i', 'm', 'a'], 0),
    q.single('In fingerstyle, the index finger is called…', ['i', 'p', 'm', 'a'], 0),
    q.single('Usually, fingers i, m and a play…', ['The G, B and high E strings', 'The low E only', 'The bass strings', 'Nothing'], 0),
    q.single('Happy Birthday has how many beats in a bar?', ['3', '4', '6', '2'], 0),
    q.tf('Playing by ear starts with finding the song’s home note or key.', true),
    q.multi('Which are song sections?', ['Verse', 'Chorus', 'Bridge', 'Barre'], [0, 1, 2]),
    q.single('A chorus is usually…', ['The repeated, catchiest part with the main message', 'The opening only', 'A guitar solo', 'The tuning section'], 0),
    q.single('A simple way to start a song is…', ['A short chord progression and a hummed melody', 'Writing the guitar solo first', 'Learning theory for years first', 'Copying a song exactly'], 0),
    q.tf('Rests (silence) are part of good improvised phrases.', true),
    q.single('When improvising, focusing on rhythm and repetition…', ['Makes phrases sound more musical', 'Is a mistake', 'Means fewer notes are wrong', 'Changes the key'], 0),
    q.order('Put writing a simple song in order.', ['Choose a chord progression', 'Hum or sing melodies over it', 'Write lyrics for a verse and chorus', 'Arrange the sections', 'Record it']),
    q.single('A common fingerstyle pattern starts with…', ['The thumb on the chord’s bass note', 'The ring finger on the low E', 'A strum', 'A slide'], 0),
    q.multi('Which help when working out a song by ear?', ['Hum the melody', 'Find the bass notes', 'Try likely chords in the key', 'Turn the music off'], [0, 1, 2]),
    q.single('Asus2 is A with the third replaced by…', ['B', 'D', 'E', 'C♯'], 0),
    q.single('Writing your songs down (chords and lyrics) helps you…', ['Remember and improve them', 'Play faster', 'Tune', 'Avoid practice'], 0),
  ]),
};
