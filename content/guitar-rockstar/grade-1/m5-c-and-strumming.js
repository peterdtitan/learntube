import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'The C chord and strumming that grooves',
  lessons: {
    f18EV2dr008: {
      title: 'The C chord',
      try: 'Place C and play from the A string, fixing any buzz. Practise C to Am: two fingers stay put.',
      minutes: 15,
      questions: [
        q.single('Which is the lowest string you strum for C?', ['The A string', 'The low E', 'The D string', 'The G string'], 0),
        q.tf('C and Am share two finger positions, so changing between them is quick.', true),
      ],
    },
    CjM5fyXoV8w: {
      title: 'An exercise for any strumming pattern',
      try: 'Do the strumming exercise from the video on one chord: keep a constant down-up motion and change only which strokes hit the strings.',
      minutes: 20,
      questions: [
        q.single('The secret to any strumming pattern is…', ['A constant down-up motion, choosing which strokes hit', 'Stopping between strums', 'Only down strums', 'Strumming as hard as possible'], 0),
        q.single('In eighth-note strumming, down strums fall on…', ['The beats', 'The “and”s', 'Every other bar', 'Nowhere'], 0),
      ],
    },
    '36cR8twdq7Q': {
      title: 'Why your strumming sounds bad, and how to fix it',
      try: 'Record yourself strumming for 30 seconds. Listen for the problems from the video and fix one.',
      minutes: 15,
      questions: [
        q.multi('Which make strumming sound bad?', ['A tense, stiff wrist', 'Hitting every string on every strum', 'Gripping the pick too hard', 'A relaxed, steady motion'], [0, 1, 2]),
        q.tf('Recording yourself helps you hear problems you miss while playing.', true),
      ],
    },
    '0EbliWAtnw0': {
      title: 'Level up any strumming pattern',
      try: 'Add accents to your strumming pattern: play beats 2 and 4 a little louder. Then try accenting different beats.',
      minutes: 15,
      questions: [
        q.single('An accent is…', ['A strum played louder than the others', 'A missed strum', 'An up strum', 'A chord change'], 0),
        q.tf('Accents can make a simple pattern sound much more musical.', true),
      ],
    },
    'Ah-brqdByAY': {
      title: 'Sharps, flats and enharmonics',
      try: 'Name every note on the A string from the open string to the 12th fret, including sharps.',
      minutes: 15,
      questions: [
        q.single('A sharp (♯)…', ['Raises a note by one fret (a half step)', 'Lowers it by one fret', 'Raises it by two frets', 'Doesn’t change it'], 0),
        q.single('C♯ and D♭ are…', ['The same note with two names (enharmonic)', 'Different notes', 'A chord', 'Open strings'], 0),
        q.multi('Between which pairs of notes is there NO sharp or flat?', ['B and C', 'E and F', 'C and D', 'F and G'], [0, 1]),
      ],
    },
    '0EVHt__Ktnw': {
      title: 'Come As You Are riff',
      try: 'Learn the Come As You Are riff slowly from the video, then play along with the original.',
      minutes: 20,
      questions: [
        q.tf('Playing along with the original recording tests your timing.', true),
        q.single('A riff that repeats through a song is good practice for…', ['Accuracy and consistency', 'Tuning', 'Barre chords', 'Singing'], 0),
      ],
    },
    'k3PM4Qc0N-s': {
      title: 'Easy songs with open chords',
      try: 'Choose a song from the video and play it from start to finish with the chords you know.',
      minutes: 20,
      questions: [
        q.single('Most of the songs at this level use…', ['Open chords like A, C, D, E, Am, Dm and Em', 'Barre chords only', 'Power chords only', 'Jazz chords'], 0),
        q.tf('Playing whole songs is what makes all the exercises useful.', true),
      ],
    },
    '7rQGeJwWfe0': {
      title: 'Module practice routine',
      try: 'Practise the routine for a week, adding C to your one-minute changes.',
      minutes: 20,
      questions: [
        q.single('Which new chord joins your changes?', ['C', 'F', 'Bm', 'G7'], 0),
        q.tf('Revisiting old chord changes keeps them sharp.', true),
      ],
    },
  },
  checkpoint: programExam('C chord and strumming exam', [
    q.single('C is played from which string?', ['A', 'D', 'Low E', 'G'], 0),
    q.single('Changing C to Am is easy because…', ['Two fingers stay in place', 'No fingers move', 'Both use the low E', 'Both are minor'], 0),
    q.single('The most important thing for any strumming pattern is…', ['A constant down-up hand motion', 'Stopping between strums', 'Only strumming down', 'A thick pick'], 0),
    q.single('In “1 and 2 and 3 and 4 and”, up strums land on…', ['The “and”s', 'The numbers', 'Beat 1', 'Beat 3'], 0),
    q.single('An accent means…', ['Playing one strum louder', 'Skipping a strum', 'Changing chord', 'Muting the strings'], 0),
    q.tf('Accenting beats 2 and 4 gives a typical pop or rock feel.', true),
    q.multi('Which improve strumming?', ['A relaxed wrist', 'A looser grip on the pick', 'Not hitting all six strings every time', 'Strumming from the shoulder only'], [0, 1, 2]),
    q.single('A sharp raises a note by…', ['One fret (half step)', 'Two frets', 'An octave', 'Nothing'], 0),
    q.single('A flat lowers a note by…', ['One fret (half step)', 'Two frets', 'An octave', 'Nothing'], 0),
    q.single('F♯ is the same pitch as…', ['G♭', 'F', 'G', 'E'], 0),
    q.single('What is one fret above E?', ['F', 'E♯ only, never F', 'F♯', 'G'], 0),
    q.single('What is one fret above B?', ['C', 'B♯ only', 'C♯', 'A'], 0),
    q.num('How many different notes (including sharps) are there before they repeat?', 12, 0),
    q.single('The 12th fret on any string plays…', ['The same note as the open string, an octave higher', 'A random note', 'The next string’s note', 'Silence'], 0),
    q.tf('Recording your playing is one of the fastest ways to improve strumming.', true),
    q.order('Put the notes on the A string from open to the 3rd fret in order.', ['A', 'A♯', 'B', 'C']),
    q.single('Playing along with the original recording mainly tests…', ['Your timing', 'Your tuning', 'Your strings', 'Your memory only'], 0),
    q.multi('Which open chords do you know by now?', ['C', 'D', 'Am', 'F'], [0, 1, 2]),
    q.single('If a strumming pattern feels stiff, try…', ['Slowing down and relaxing your wrist', 'Strumming harder', 'Speeding up', 'Squeezing the pick'], 0),
    q.single('Enharmonic notes are…', ['Notes with different names but the same pitch', 'Notes an octave apart', 'Open strings', 'Notes in a chord'], 0),
  ]),
};
