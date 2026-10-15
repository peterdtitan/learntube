import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Transcribing, keys and singing while you play',
  lessons: {
    rm3Vp2GHDZ4: {
      title: 'Lifted barre chords',
      try: 'Play a barre shape, then lift parts of the barre so some open strings ring, making a lush open-sounding chord.',
      minutes: 20,
      questions: [
        q.single('“Lifting” part of a barre lets…', ['Some open strings ring, for a lusher sound', 'The chord turn minor', 'The guitar retune', 'The volume drop'], 0),
        q.tf('Mixing fretted notes with open strings gives chords a ringing, open sound.', true),
      ],
    },
    TbscFMtw5wg: {
      title: 'Transcribing riffs',
      try: 'Transcribe a short riff by ear and write it down as tab.',
      minutes: 15,
      questions: [
        q.single('Transcribing means…', ['Working out music by ear and writing it down', 'Reading tab', 'Tuning', 'Copying chords from a book'], 0),
        q.tf('Slowing a recording down can make transcribing easier.', true),
      ],
    },
    UMxbaKNzPtM: {
      title: 'Find the chords and capo for real songs',
      try: 'Pick a famous song and work out its chords and capo position by ear, then check online.',
      minutes: 20,
      questions: [
        q.single('If a song sounds higher than the open shapes you hear, the guitarist may be using…', ['A capo', 'Thicker strings', 'Drop D', 'A slide'], 0),
        q.tf('Many famous songs use simple open shapes with a capo.', true),
      ],
    },
    '-N5SpjdRGKM': {
      title: 'Make your A chord sound hot',
      try: 'Explore the A chord variations from the video, adding and lifting fingers on the top strings, and make a short riff from them.',
      minutes: 15,
      questions: [
        q.single('Adding and lifting fingers on top of a held chord creates…', ['Little melodies and movement inside the chord', 'A new key', 'A tuning change', 'Feedback'], 0),
        q.tf('A single chord can sound exciting with small variations.', true),
      ],
    },
    R21FuxLS7cI: {
      title: 'Transcribe more riffs',
      try: 'Transcribe one of the riffs from the video challenge, then compare it with the answer.',
      minutes: 15,
      questions: [
        q.single('When transcribing, a good first step is…', ['Find the first note, then the next, one at a time', 'Guess the whole riff at once', 'Read a book', 'Tune down'], 0),
        q.tf('Your ear improves the more you transcribe.', true),
      ],
    },
    '2gQyogNiQSE': {
      title: 'Memorisation techniques that work',
      try: 'Use one memorisation technique from the video to learn a new song’s structure this week.',
      minutes: 15,
      questions: [
        q.single('Which helps memorise a song?', ['Learning its structure (verse, chorus, bridge) and testing yourself', 'Reading it once', 'Only listening', 'Playing it fast'], 0),
        q.tf('Recalling from memory strengthens it more than re-reading.', true),
      ],
    },
    RLYJW6B53wc: {
      title: 'Ten steps to singing and playing',
      try: 'Follow the steps on one song: get the strumming automatic, speak the lyrics in rhythm, then sing and play together slowly.',
      minutes: 30,
      questions: [
        q.single('Before singing and playing together, your strumming should be…', ['Automatic, so you don’t have to think about it', 'Brand new', 'Very complex', 'Optional'], 0),
        q.tf('Speaking the lyrics in rhythm while playing is a useful step before singing them.', true),
      ],
    },
    'XSHk-xMd8wE': {
      title: 'Jam the blues on the E chord',
      try: 'Play the blues jam ideas from the video over an E chord, mixing the chord with licks.',
      minutes: 15,
      questions: [
        q.single('Jamming on one chord is good practice for…', ['Combining rhythm and licks freely', 'Tuning', 'Strap height', 'Reading notation'], 0),
        q.tf('The open E chord is a great home for blues in E.', true),
      ],
    },
    '6ojIRwpz1Rw': {
      title: 'Chords in keys, the easy way',
      try: 'Write the chords in the keys of G and D. Play each set and notice which chords sound like “home”.',
      minutes: 20,
      questions: [
        q.single('In the key of G, the chords are…', ['G, Am, Bm, C, D, Em (and F♯ diminished)', 'G, A, B, C, D, E all major', 'G, B♭, D only', 'Only G and C'], 0),
        q.single('In the key of D, the three major chords are…', ['D, G and A', 'D, E and F♯', 'D, F and G', 'D, A and B'], 0),
      ],
    },
  },
  checkpoint: programExam('Transcribing and keys exam', [
    q.single('Transcribing means…', ['Working out music by ear and writing it down', 'Copying tab', 'Tuning', 'Practising scales'], 0),
    q.single('A good first step for transcribing is…', ['Finding the first note', 'Guessing the whole riff', 'Changing tuning', 'Reading the lyrics'], 0),
    q.single('Slowing a recording down helps you…', ['Hear notes more clearly to transcribe them', 'Tune', 'Play louder', 'Change key'], 0),
    q.single('A capo on the 2nd fret with G shapes sounds in…', ['A', 'G', 'F', 'B♭'], 0),
    q.single('A capo on the 2nd fret with D shapes sounds in…', ['E', 'D', 'C', 'F♯'], 0),
    q.single('In the key of G, the IV and V chords are…', ['C and D', 'D and E', 'A and B', 'F and G'], 0),
    q.single('In the key of D, the IV and V chords are…', ['G and A', 'E and F♯', 'C and G', 'A and B'], 0),
    q.single('In the key of A, the I, IV and V chords are…', ['A, D and E', 'A, B and C♯', 'A, C and G', 'A, E and F♯'], 0),
    q.single('The vi chord in the key of G is…', ['Em', 'Am', 'Bm', 'D'], 0),
    q.single('In any major key, the ii, iii and vi chords are…', ['Minor', 'Major', 'Diminished', 'Power chords'], 0),
    q.tf('Lifting part of a barre to let open strings ring creates a lush sound.', true),
    q.single('Before singing and playing together, practise until the strumming is…', ['Automatic', 'New', 'Fast', 'Complicated'], 0),
    q.order('Put learning to sing and play in order.', ['Learn the chords and changes', 'Make the strumming automatic', 'Speak the lyrics in rhythm while playing', 'Sing and play slowly', 'Bring it up to speed']),
    q.multi('Which help you memorise songs?', ['Learning the structure', 'Testing yourself from memory', 'Practising in sections', 'Only re-reading'], [0, 1, 2]),
    q.tf('Many famous songs use simple open chords with a capo.', true),
    q.single('Adding and lifting fingers on a held chord creates…', ['Movement and little melodies', 'A key change', 'Detuning', 'Silence'], 0),
    q.single('Jamming on one chord helps you…', ['Mix rhythm and lead freely', 'Avoid listening', 'Learn barre chords', 'Tune'], 0),
    q.single('The chord built on the 7th note of a major key is…', ['Diminished', 'Major', 'Minor', 'Augmented'], 0),
    q.single('Knowing the chords in a key helps you…', ['Guess and work out songs faster', 'Tune', 'Hold the pick', 'Avoid practice'], 0),
    q.single('This module mainly develops…', ['Your ear, theory of keys, and singing while playing', 'Power chords', 'Holding the guitar', 'Basic strumming'], 0),
  ]),
};
