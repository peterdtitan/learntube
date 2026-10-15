import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'The blues',
  lessons: {
    JBUKxR_y0nA: {
      title: 'Seventh chord grips',
      try: 'Learn A7, D7 and E7 from the video and play each one, then change between them.',
      minutes: 20,
      questions: [
        q.single('A dominant 7th chord adds which note to a major chord?', ['The flat seventh', 'The second', 'The fourth', 'The octave'], 0),
        q.single('7th chords are especially common in…', ['Blues', 'Lullabies only', 'Classical opera only', 'No music'], 0),
      ],
    },
    aMygcs5teLM: {
      title: 'Strumming the blues',
      try: 'Strum a shuffle (swing) feel on A7: long-short, long-short, for two minutes.',
      minutes: 15,
      questions: [
        q.single('A shuffle or swing feel divides each beat into…', ['A long note then a short note', 'Two equal notes', 'Four equal notes', 'Three equal accents'], 0),
        q.tf('Blues rhythm often has a swung, bouncing feel.', true),
      ],
    },
    rLm99QI8eWs: {
      title: 'The 12-bar blues',
      try: 'Play a 12-bar blues in A using A7, D7 and E7, counting the bars out loud.',
      minutes: 20,
      questions: [
        q.single('How many bars are in one cycle of a 12-bar blues?', ['12', '8', '16', '4'], 0),
        q.single('A 12-bar blues in A uses which chords?', ['A, D and E (often as 7th chords)', 'A, B and C', 'Am, Dm and Em only', 'A only'], 0),
        q.single('The 12-bar blues uses which chords of the key?', ['I, IV and V', 'I, ii and iii', 'vi, vii and I', 'Only I'], 0),
      ],
    },
    '6iLluqLwRAA': {
      title: 'Start blues soloing',
      try: 'Improvise over a 12-bar blues backing track in A using the A minor pentatonic at the 5th fret.',
      minutes: 20,
      questions: [
        q.single('A great scale for soloing over a blues in A is…', ['A minor pentatonic', 'C♯ major', 'F major', 'B♭ minor'], 0),
        q.tf('Bends and vibrato help blues solos sound expressive.', true),
      ],
    },
    us8J0Ex6SiM: {
      title: 'Blues improvisation',
      try: 'Play a “question and answer”: one short phrase, then a reply phrase, over the backing track.',
      minutes: 15,
      questions: [
        q.single('“Question and answer” phrasing means…', ['One phrase followed by a phrase that responds to it', 'Asking the audience questions', 'Playing two guitars', 'Changing key'], 0),
        q.tf('Leaving space between phrases makes solos easier to follow.', true),
      ],
    },
    xWexaS61NwY: {
      title: 'Easy 12-bar blues riffs',
      try: 'Learn the shuffle riff from the video in A and play it through a whole 12-bar cycle, moving it for the D and E bars.',
      minutes: 20,
      questions: [
        q.single('The classic blues shuffle riff alternates between…', ['The root with the fifth and the root with the sixth', 'Two minor chords', 'Open and muted strings', 'Harmonics'], 0),
        q.tf('The same riff shape is moved to the IV and V chords in a 12-bar blues.', true),
      ],
    },
    aE3jY5TwcBg: {
      title: 'Beginner blues songs',
      try: 'Play a blues song from the video, with the shuffle riff or 7th chords.',
      minutes: 20,
      questions: [
        q.tf('Many famous songs are built on the 12-bar blues.', true),
        q.single('Knowing the 12-bar form lets you…', ['Jam on many blues songs straight away', 'Avoid learning chords', 'Skip rhythm', 'Tune faster'], 0),
      ],
    },
    U_bE9uA4HX4: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week: 7th chords, shuffle strumming, the 12-bar and a little soloing every day.',
      minutes: 20,
      questions: [
        q.single('A daily blues routine should include…', ['Rhythm and soloing', 'Only scales', 'Only tuning', 'Only theory'], 0),
        q.tf('Playing along with backing tracks is great practice for jamming.', true),
      ],
    },
  },
  checkpoint: programExam('Blues exam', [
    q.single('A dominant 7th chord is a major chord plus…', ['A flat seventh', 'A major seventh', 'A second', 'A sixth'], 0),
    q.multi('Which are dominant 7th chords?', ['A7', 'D7', 'E7', 'Am'], [0, 1, 2]),
    q.single('How many bars long is the standard blues form?', ['12', '8', '10', '16'], 0),
    q.single('A 12-bar blues uses the…', ['I, IV and V chords', 'ii, iii and vi chords', 'I chord only', 'vii chord'], 0),
    q.single('In the key of A, the IV chord is…', ['D', 'E', 'B', 'C'], 0),
    q.single('In the key of A, the V chord is…', ['E', 'D', 'F♯', 'G'], 0),
    q.single('In the key of E, the IV and V chords are…', ['A and B', 'D and E', 'F and G', 'C and D'], 0),
    q.single('A shuffle feel sounds…', ['Long-short, long-short', 'Even and straight', 'Very fast only', 'Without rhythm'], 0),
    q.single('Which scale suits soloing over a blues in A?', ['A minor pentatonic', 'A♭ major', 'D♯ minor', 'G major only'], 0),
    q.single('The A minor pentatonic box shape starts at the…', ['5th fret', '2nd fret', '9th fret', '12th fret'], 0),
    q.tf('Bends, slides and vibrato help blues solos sound expressive.', true),
    q.single('“Question and answer” phrasing is…', ['A phrase followed by a response phrase', 'Talking while playing', 'Two guitars at once', 'A tuning method'], 0),
    q.single('The classic shuffle riff alternates the root with…', ['The fifth and the sixth', 'The second and third', 'The seventh only', 'Open strings only'], 0),
    q.order('Put the sections of a standard 12-bar blues in A in order.', ['Four bars of A', 'Two bars of D', 'Two more bars of A', 'One bar of E', 'One bar of D', 'Two last bars of A (the turnaround)']),
    q.single('Bars 5 and 6 of a standard 12-bar blues usually play…', ['The IV chord', 'The V chord', 'The vi chord', 'Silence'], 0),
    q.single('Bar 9 of a standard 12-bar blues usually plays…', ['The V chord', 'The IV chord', 'The I chord', 'The ii chord'], 0),
    q.tf('A turnaround at the end of the 12 bars leads back to the start.', true),
    q.multi('Which help when jamming the blues?', ['Knowing the 12-bar form', 'Listening to the other players', 'Leaving space', 'Playing as loud as possible'], [0, 1, 2]),
    q.single('Leaving space between phrases helps a solo…', ['Breathe and be easier to follow', 'Sound wrong', 'Speed up', 'Change key'], 0),
    q.single('Blues rhythm guitar often uses…', ['7th chords and shuffle riffs', 'Only open strings', 'Only fingerpicking', 'Only harmonics'], 0),
  ]),
};
