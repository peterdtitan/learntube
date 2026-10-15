import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'The F chord, the major scale and 16th-note strumming',
  lessons: {
    '4cR1sa1_d_8': {
      title: 'The easiest F chord',
      try: 'Start with the easy F shape from the video. Play each string to find any buzz, then strum it four times.',
      minutes: 20,
      questions: [
        q.single('The F chord is often hard at first because…', ['The first finger presses two or more strings at once (a barre)', 'It uses only open strings', 'It needs a capo', 'It is minor'], 0),
        q.tf('Learning a smaller version of F first is a common path to the full chord.', true),
      ],
    },
    DcIXL7IU7Ko: {
      title: 'Three F chord variations',
      try: 'Play the three F variations from the video. Pick the one you can play cleanly and use it in a song.',
      minutes: 15,
      questions: [
        q.single('Fmaj7 is often used as…', ['An easier stepping stone before F', 'A replacement for G', 'A tuning chord', 'A barre on the 7th fret'], 0),
        q.single('The full F barre chord presses all six strings at…', ['The 1st fret with the first finger', 'The 5th fret', 'The 3rd fret', 'Open position'], 0),
      ],
    },
    Xhg6xXD8lR8: {
      title: 'Mute unwanted strings',
      try: 'Play the small F and mute the low strings you don’t want with the tip of your fretting finger or your thumb.',
      minutes: 10,
      questions: [
        q.tf('Muting the strings you don’t want lets you strum more freely.', true),
        q.single('A muted string makes…', ['A dull click instead of a note', 'A loud note', 'A harmonic', 'Nothing at all ever'], 0),
      ],
    },
    nkn7i3shkKk: {
      title: 'Make your own chord book',
      try: 'Start a chord book: draw a chart for every chord you know, with a note about how to play it cleanly.',
      minutes: 20,
      questions: [
        q.single('A personal chord book helps you…', ['Remember chords and notice your progress', 'Tune the guitar', 'Skip practice', 'Play faster'], 0),
        q.tf('Writing things down helps you remember them.', true),
      ],
    },
    i4zGDoRvn5o: {
      title: 'The major scale',
      try: 'Play the C major scale in open position up and down slowly, saying the note names: C D E F G A B C.',
      minutes: 20,
      questions: [
        q.single('The C major scale is…', ['C D E F G A B C', 'C D E♭ F G A♭ B♭ C', 'C E G C', 'C D E G A C'], 0),
        q.single('The major scale’s pattern of steps is…', ['Whole, whole, half, whole, whole, whole, half', 'All whole steps', 'All half steps', 'Half, whole, half, whole'], 0),
        q.tf('The major scale is the basis for chords and keys in most music.', true),
      ],
    },
    NEVXie3LRaU: {
      title: '16th-note strumming',
      try: 'Count “1 e and a 2 e and a” and strum down-up at that speed over one chord, then try one of the patterns from the video.',
      minutes: 15,
      questions: [
        q.single('In 16th-note strumming, each beat is split into…', ['Four', 'Two', 'Three', 'One'], 0),
        q.single('16th notes are counted…', ['1 e and a', '1 and', '1 2 3', '1 trip let'], 0),
      ],
    },
    xWAgPIQhNg0: {
      title: 'An exercise for your pinky',
      try: 'Do the pinky exercise from the video for five minutes, slowly, keeping your hand relaxed.',
      minutes: 10,
      questions: [
        q.tf('Your fourth finger (pinky) gets stronger with regular gentle exercises.', true),
        q.single('Slow, relaxed finger exercises are better than fast tense ones because…', ['They build control without strain', 'They are more fun', 'They tune the guitar', 'They are shorter'], 0),
      ],
    },
    dmqsX8tQRHY: {
      title: 'Songs with the F chord',
      try: 'Play a song from the video that uses F. Use the F version you play most cleanly.',
      minutes: 20,
      questions: [
        q.single('C, F and G together are…', ['The I, IV and V chords in the key of C', 'All minor chords', 'Barre chords only', 'Power chords'], 0),
        q.tf('Using an easier F version in songs is fine while you build the full chord.', true),
      ],
    },
    q_0X6b_MFGw: {
      title: 'Chords in a key',
      try: 'Write out the chords in the key of C: C, Dm, Em, F, G, Am (and B diminished). Play the six you know.',
      minutes: 15,
      questions: [
        q.single('In the key of C, which chords are major?', ['C, F and G', 'Dm, Em and Am', 'C, D and E', 'All of them'], 0),
        q.single('In the key of C, which chords are minor?', ['Dm, Em and Am', 'C, F and G', 'C and G', 'None'], 0),
      ],
    },
    '8sxiIhOXQiQ': {
      title: 'Update your practice schedule',
      try: 'Rewrite your practice schedule with the F chord, the major scale and 16th-note strumming, and follow it for a week.',
      minutes: 20,
      questions: [
        q.tf('A practice schedule should change as your skills grow.', true),
        q.single('Which belongs in your updated routine?', ['F chord changes', 'Only tuning', 'Only songs you know perfectly', 'Nothing new'], 0),
      ],
    },
  },
  checkpoint: programExam('F chord and major scale exam', [
    q.single('A barre means…', ['One finger presses several strings at the same fret', 'Using a capo', 'Muting all strings', 'A type of pick'], 0),
    q.single('The full F barre chord sits at…', ['The 1st fret', 'The 3rd fret', 'The 5th fret', 'Open position'], 0),
    q.single('An easier stepping stone to F is…', ['Fmaj7 or a small (four-string) F', 'G', 'E7', 'A power chord'], 0),
    q.single('A buzz on a barred string usually means…', ['The barre finger isn’t pressing that string firmly, or isn’t close to the fret', 'The guitar is broken', 'You need lighter strings always', 'The pick is wrong'], 0),
    q.single('The C major scale has which notes?', ['C D E F G A B', 'C D E♭ F G A♭ B♭', 'C E G', 'C D E G A'], 0),
    q.single('Where are the half steps in a major scale?', ['Between the 3rd–4th and 7th–8th notes', 'Between every note', 'Between the 1st–2nd only', 'Nowhere'], 0),
    q.single('In the key of C, the IV chord is…', ['F', 'G', 'Am', 'Dm'], 0),
    q.single('In the key of C, the V chord is…', ['G', 'F', 'Em', 'C'], 0),
    q.single('In the key of C, the vi chord is…', ['Am', 'Em', 'Dm', 'F'], 0),
    q.single('The chord built on the 7th note of a major key is…', ['Diminished', 'Major', 'Minor', 'Sus4'], 0),
    q.tf('In any major key, the I, IV and V chords are major.', true),
    q.single('16th notes split each beat into…', ['Four', 'Two', 'Three', 'Six'], 0),
    q.single('In 16th-note strumming, down strums fall on…', ['“1” and “and”', '“e” and “a”', 'Only “a”', 'Only beats 2 and 4'], 0),
    q.single('Muting unwanted strings with the fretting hand lets you…', ['Strum more freely without wrong notes ringing', 'Play louder notes', 'Skip tuning', 'Avoid barres'], 0),
    q.multi('Which chords are in the key of C?', ['C', 'F', 'Am', 'E'], [0, 1, 2]),
    q.tf('A personal chord book is a useful record of what you’ve learned.', true),
    q.single('A pinky exercise should be done…', ['Slowly and relaxed', 'As fast as possible', 'With high tension', 'Only once'], 0),
    q.order('Put the C major scale in order from C.', ['C', 'D', 'E', 'F', 'G', 'A', 'B']),
    q.single('C, F and G songs are common because…', ['They are the I, IV and V of C, the core chords of the key', 'They are minor', 'They are easy barres', 'They use no open strings'], 0),
    q.single('If the full F is too hard right now, you should…', ['Use an easier version in songs and keep practising the full one', 'Avoid all songs with F', 'Change the song’s key every time', 'Give up guitar'], 0),
  ]),
};
