import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'The E chord, rhythm and your first riff',
  lessons: {
    '9NSoRXC9PJI': {
      title: 'The E chord',
      try: 'Place E and play every string from the low E up, fixing any buzz. Then strum all six strings four times.',
      minutes: 15,
      questions: [
        q.single('How many strings do you strum for E?', ['All six', 'Four', 'Five', 'Three'], 0),
        q.single('E uses fingers on…', ['The A, D and G strings', 'The B and high E strings only', 'Every string', 'No strings: it is all open'], 0),
      ],
    },
    McSfLPmXcLw: {
      title: 'Anchor fingers between A, D and E',
      try: 'Change between A, D and E slowly, finding any finger that can stay in place or slide along its string.',
      minutes: 10,
      questions: [
        q.single('An anchor finger is…', ['A finger that stays on (or slides along) its string between two chords', 'The thumb behind the neck', 'Your strumming finger', 'A finger you lift first'], 0),
        q.tf('Anchor fingers make chord changes faster and smoother.', true),
      ],
    },
    RPBtKqD6ddQ: {
      title: 'Tap your foot while you play',
      try: 'Tap your foot on every beat while strumming four down strums per chord for two minutes.',
      minutes: 10,
      questions: [
        q.single('Tapping your foot helps you…', ['Feel the beat and keep steady time', 'Tune the guitar', 'Strum louder', 'Change chords'], 0),
        q.tf('Your strum should land at the same time as your foot taps.', true),
      ],
    },
    'c5pipuvb-EM': {
      title: 'Pick angle and strumming mechanics',
      try: 'Strum with a relaxed wrist and the pick angled slightly, so it glides across the strings. Compare it with a stiff, flat pick.',
      minutes: 15,
      questions: [
        q.single('A slight angle on the pick helps it…', ['Glide over the strings instead of catching', 'Break strings', 'Tune itself', 'Stay silent'], 0),
        q.single('Strumming should mostly come from…', ['A relaxed wrist and forearm', 'Your shoulder alone', 'Your fingers only', 'Your fretting hand'], 0),
      ],
    },
    'JRhwvxl46-8': {
      title: 'Strum on the beat',
      try: 'Play along with a metronome or a song, making sure each down strum lands exactly on the beat.',
      minutes: 15,
      questions: [
        q.single('Strumming on the beat means…', ['Each strum lines up with the pulse of the music', 'Strumming as fast as possible', 'Strumming whenever you change', 'Only strumming on beat 1'], 0),
        q.tf('Rushing ahead of the beat is a common beginner habit.', true),
      ],
    },
    '7VzPzBsm4sU': {
      title: 'Get strumming and chord changes right',
      try: 'Loop A, D and E four beats each for two minutes without stopping your strumming hand.',
      minutes: 10,
      questions: [
        q.single('When a change isn’t ready in time, you should…', ['Keep the strumming hand moving', 'Stop strumming until it’s ready', 'Strum faster', 'Skip the chord'], 0),
        q.tf('Strumming the open strings on the last beat before a change can give your fretting hand time to move.', true),
      ],
    },
    mGv1uwm9ygo: {
      title: 'Picking notes and the Peter Gunn riff',
      try: 'Learn the Peter Gunn riff slowly, picking each note cleanly, then play it four times in a row.',
      minutes: 15,
      questions: [
        q.single('A riff is…', ['A short, repeated musical phrase', 'A chord', 'A strumming pattern', 'A tuning method'], 0),
        q.single('When picking single notes, aim to hit…', ['Only the string you want', 'All the strings', 'The strings near the bridge only', 'Two strings at once'], 0),
      ],
    },
    p5Ln39q8cj4: {
      title: 'Easy three-chord songs with A, D and E',
      try: 'Play a whole song using A, D and E along with the recording.',
      minutes: 20,
      questions: [
        q.tf('Many songs use only three chords.', true),
        q.single('If a song is too fast, you can…', ['Practise the changes slowly first, then play along', 'Never play it', 'Only play the first chord', 'Strum without changing'], 0),
      ],
    },
    gI8iH5Mg7LQ: {
      title: 'Module practice routine',
      try: 'Do the practice routine from the video for a week, logging your one-minute change scores.',
      minutes: 20,
      questions: [
        q.single('Which changes should you practise in this module?', ['A to D, D to E and A to E', 'Only C to G', 'F to B', 'None'], 0),
        q.tf('Recording your one-minute change scores helps you see progress.', true),
      ],
    },
  },
  checkpoint: programExam('E chord and rhythm exam', [
    q.single('Which chord uses all six strings?', ['E', 'D', 'A', 'Dm'], 0),
    q.single('Which strings have fingers on them in E?', ['A, D and G', 'G, B and high E', 'Low E, A and D', 'B and high E'], 0),
    q.single('An anchor finger helps by…', ['Staying in place or sliding between chords', 'Holding the pick', 'Muting all strings', 'Tuning'], 0),
    q.single('Tapping your foot while playing helps with…', ['Timing', 'Tuning', 'Finger strength', 'Volume'], 0),
    q.single('A pick held too stiffly and flat against the strings tends to…', ['Catch and sound harsh', 'Glide smoothly', 'Make no sound', 'Tune the strings'], 0),
    q.tf('A relaxed strumming arm sounds better and tires less than a tense one.', true),
    q.single('Strumming should keep going during a chord change because…', ['Rhythm matters more than every chord being perfect', 'It is louder', 'Chords don’t matter', 'It tunes the strings'], 0),
    q.single('Strumming the open strings just before a change…', ['Buys your fretting hand a moment to move', 'Is always a mistake', 'Changes the key', 'Breaks a string'], 0),
    q.single('A riff is…', ['A short repeated phrase of single notes or chords', 'A chord chart', 'A tuning', 'A strap'], 0),
    q.single('Playing single notes needs your picking hand to…', ['Hit just one string accurately', 'Strum all strings', 'Stay still', 'Mute everything'], 0),
    q.multi('Which chords have you learned so far in Grade 1?', ['A', 'D', 'E', 'F'], [0, 1, 2]),
    q.single('In a three-chord song with A, D and E, A is often…', ['The home chord the song resolves to', 'Never used', 'Only at the end', 'A minor chord'], 0),
    q.tf('Rushing (speeding up) is a common timing problem when chords change.', true),
    q.single('“On the beat” means your strum and…', ['The pulse of the music happen together', 'The chord change happen together', 'Your breath happen together', 'The tuner happen together'], 0),
    q.order('Put the chord change practice in order, from first to last.', ['Change slowly without strumming', 'One-minute changes', 'Change while strumming slowly', 'Change while playing a song']),
    q.single('Which change uses an anchor or guide finger well?', ['A to E (the first finger can stay close on the G string)', 'Any change using the thumb', 'Changes with open strings only', 'None'], 0),
    q.single('You can’t strum and change at the same time yet. Practise…', ['Each separately, then together slowly', 'Only songs at full speed', 'Only strumming', 'Only changes, never strumming'], 0),
    q.tf('A practice routine that repeats the same exercises daily builds skill fastest.', true),
    q.single('Peter Gunn is a classic riff played on…', ['The low strings', 'The high E string only', 'Chords only', 'Harmonics'], 0),
    q.single('You hear a buzz only on the E chord’s G string. Check…', ['That your first finger is close to the fret and pressing enough', 'The tuning of the high E', 'Your strap', 'Your pick colour'], 0),
  ]),
};
