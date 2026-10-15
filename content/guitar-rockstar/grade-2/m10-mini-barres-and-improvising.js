import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Mini barres, hammer-ons and improvising',
  lessons: {
    AWA5C2MCu2Q: {
      title: 'A G chord trick for faster changes',
      try: 'Use the G fingering from the video and time your one-minute changes from G to C and G to D.',
      minutes: 10,
      questions: [
        q.single('Choosing a G fingering that shares fingers with the next chord…', ['Makes the change faster', 'Changes the chord’s name', 'Needs a capo', 'Makes G minor'], 0),
        q.tf('There is often more than one way to finger the same chord.', true),
      ],
    },
    NBWr0BB2Fm8: {
      title: 'The A mini barre',
      try: 'Play A with one finger barring the D, G and B strings at the 2nd fret. Keep the high E ringing if you can.',
      minutes: 15,
      questions: [
        q.single('The A mini barre uses one finger across…', ['The D, G and B strings at the 2nd fret', 'All six strings at the 5th fret', 'The low E only', 'The B and high E strings'], 0),
        q.tf('A mini barre can make some changes much faster.', true),
      ],
    },
    ryTg1nZ8_PQ: {
      title: 'Changes with the F chord',
      try: 'Do one-minute changes between F and C, and F and Am. Write down your scores.',
      minutes: 15,
      questions: [
        q.single('F to C is easier because…', ['Some fingers stay close to where they were', 'No fingers move', 'Both are minor', 'Both are barre chords'], 0),
        q.tf('Changes involving F get easier with daily one-minute practice.', true),
      ],
    },
    '1OR8TEVWjc0': {
      title: 'Play without looking',
      try: 'Play a song you know with your eyes closed or looking away from the fretboard, at a slow tempo.',
      minutes: 10,
      questions: [
        q.single('Playing without looking builds…', ['Muscle memory and the ability to read music or watch others', 'Bad habits', 'Tuning skills', 'Louder strumming'], 0),
        q.tf('Feeling where your fingers are is a skill you can practise.', true),
      ],
    },
    JcFgiS6KmHQ: {
      title: 'Alternate picking the C major scale',
      try: 'Play the C major scale with strict alternate picking to a metronome at 60 BPM, then 70.',
      minutes: 15,
      questions: [
        q.single('Strict alternate picking means…', ['Down and up alternate on every note, even across strings', 'Only down picks', 'Only on one string', 'Strumming chords'], 0),
        q.single('Why use a metronome for scales?', ['To build even timing and track speed', 'To tune', 'To change key', 'To play louder'], 0),
      ],
    },
    '754To3ugAx8': {
      title: 'Improvise with the major scale',
      try: 'Record a C–Am–F–G loop on your phone and improvise over it using the C major scale for three minutes.',
      minutes: 20,
      questions: [
        q.single('Improvising means…', ['Making up music on the spot', 'Reading tab exactly', 'Tuning by ear', 'Playing chords only'], 0),
        q.tf('Ending phrases on a note from the chord being played sounds resolved.', true),
      ],
    },
    'Gv-W4ZIuxe0': {
      title: 'The push strumming pattern',
      try: 'Learn the push (anticipation) pattern: change chord on the “and” just before the beat. Play it over C–G.',
      minutes: 15,
      questions: [
        q.single('A “push” in strumming means…', ['The chord changes slightly early, on the “and” before the beat', 'Strumming harder', 'Muting all strings', 'Changing tempo'], 0),
        q.tf('Pushes give rhythm a lively, forward-moving feel.', true),
      ],
    },
    '7hDdZAjKBjY': {
      title: 'Hammer-ons',
      try: 'Pick an open string, then hammer a finger onto the 2nd fret so it sounds without picking again. Do it on every string.',
      minutes: 15,
      questions: [
        q.single('A hammer-on is…', ['Sounding a higher note by bringing a finger down hard, without picking again', 'Picking very hard', 'Bending a string', 'Muting a note'], 0),
        q.single('A hammer-on goes from…', ['A lower note to a higher note on the same string', 'A higher to a lower note', 'One string to another', 'Chord to chord'], 0),
      ],
    },
    ThwuNjbJB00: {
      title: 'Five chord progressions to know',
      try: 'Play each of the five progressions in the key of C or G, four beats per chord.',
      minutes: 20,
      questions: [
        q.single('I–V–vi–IV in the key of C is…', ['C–G–Am–F', 'C–F–G–C', 'Am–F–C–G', 'C–D–E–F'], 0),
        q.single('I–IV–V in the key of G is…', ['G–C–D', 'G–A–B', 'G–D–Em', 'C–F–G'], 0),
      ],
    },
    OYrICfeRqHc: {
      title: 'Songs for this module',
      try: 'Learn a song from the video using a push or hammer-ons.',
      minutes: 20,
      questions: [
        q.tf('Using new techniques in real songs is how they become natural.', true),
        q.single('A song you can’t play in time yet should be…', ['Slowed down and practised in sections', 'Played at full speed anyway', 'Skipped forever', 'Learned backwards'], 0),
      ],
    },
    yNUnyuSJLCs: {
      title: 'Module practice schedule',
      try: 'Follow the practice schedule from the video for a week and log your one-minute change scores and scale speed.',
      minutes: 20,
      questions: [
        q.single('Tracking scale speed with a metronome helps you…', ['See progress over weeks', 'Tune faster', 'Avoid scales', 'Change strings'], 0),
        q.tf('Improvising a little every day builds confidence.', true),
      ],
    },
  },
  checkpoint: programExam('Mini barres and improvising exam', [
    q.single('The A mini barre covers which strings at the 2nd fret?', ['D, G and B', 'Low E, A and D', 'G, B and high E', 'All six'], 0),
    q.single('A hammer-on moves from…', ['A lower note to a higher one on the same string, without picking again', 'A higher note to a lower one', 'One string to the next', 'A chord to a chord'], 0),
    q.single('A pull-off, the opposite of a hammer-on, goes from…', ['A higher note to a lower one by pulling the finger off', 'A lower note to a higher one', 'Open string to 12th fret', 'One chord to another'], 0),
    q.single('A push (anticipation) means the chord arrives…', ['On the “and” just before the beat', 'Exactly on the beat', 'After the beat', 'Only at the end of the song'], 0),
    q.single('Improvising is…', ['Making up music as you play', 'Playing from tab', 'Tuning', 'Memorising a solo'], 0),
    q.single('Over a C–Am–F–G loop you can improvise with…', ['The C major scale', 'The E major scale', 'Only the note F♯', 'No scale'], 0),
    q.single('I–V–vi–IV in C is…', ['C, G, Am, F', 'C, F, G, Am', 'C, Dm, Em, F', 'G, D, Em, C'], 0),
    q.single('I–V–vi–IV in G is…', ['G, D, Em, C', 'G, C, D, G', 'G, Am, Bm, C', 'C, G, Am, F'], 0),
    q.single('I–IV–V in C is…', ['C, F, G', 'C, G, Am', 'C, D, E', 'F, G, Am'], 0),
    q.tf('Playing without looking at the fretboard is a skill you can build with practice.', true),
    q.single('Strict alternate picking keeps…', ['Down-up alternating even when changing strings', 'Downstrokes only', 'Upstrokes only', 'Strumming steady'], 0),
    q.multi('Which help you improvise?', ['A backing track or loop', 'Knowing a scale', 'Ending phrases on chord tones', 'Playing as many notes as possible'], [0, 1, 2]),
    q.single('Choosing a G fingering that shares fingers with C or D…', ['Speeds up the changes', 'Changes the key', 'Makes G minor', 'Is wrong'], 0),
    q.single('Repeating a short phrase with small changes while improvising…', ['Sounds musical and gives the solo shape', 'Is a mistake', 'Is boring and should be avoided always', 'Needs a capo'], 0),
    q.tf('Recording a chord loop on your phone gives you a backing track to practise with.', true),
    q.order('Put a hammer-on in order.', ['Fret or play the lower note', 'Pick it', 'Bring another finger down firmly on a higher fret', 'Let the new note ring']),
    q.single('Rhythm “pushes” are common in…', ['Pop, rock and reggae', 'Only classical music', 'Only waltzes', 'No music'], 0),
    q.single('F to C changes get faster when you…', ['Notice which fingers can stay close and practise daily', 'Lift every finger high', 'Look away', 'Strum harder'], 0),
    q.single('The vi chord in the key of C is…', ['Am', 'Em', 'Dm', 'G'], 0),
    q.multi('Which techniques did this module add?', ['Mini barre', 'Hammer-ons', 'Push strumming', 'Tapping'], [0, 1, 2]),
  ]),
};
