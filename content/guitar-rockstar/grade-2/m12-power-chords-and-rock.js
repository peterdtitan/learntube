import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Power chords and rock',
  lessons: {
    ZBYoI7e3v5Y: {
      title: 'The ultimate power chords guide',
      try: 'Play power chords with the root on the low E string at frets 3, 5 and 7, then on the A string. Mute the strings you aren’t playing.',
      minutes: 30,
      questions: [
        q.single('A power chord is made of…', ['The root and the fifth (often with the octave)', 'Root, third and fifth', 'Only the third', 'Any two notes'], 0),
        q.single('Power chords are written with a…', ['5, like E5 or A5', 'm, like Em', '7, like E7', 'sus, like Esus'], 0),
        q.tf('Because they have no third, power chords are neither major nor minor.', true),
      ],
    },
    EILFkSGNkdA: {
      title: 'The first blues scale to learn',
      try: 'Play the minor pentatonic scale shape from the video at the 5th fret (A minor pentatonic) with a metronome.',
      minutes: 20,
      questions: [
        q.single('The A minor pentatonic box shape starts at the…', ['5th fret of the low E string', '1st fret', '12th fret', 'Open strings'], 0),
        q.single('A movable scale shape can be…', ['Moved up and down the neck to play in other keys', 'Played only in one key', 'Played only open', 'Used only for chords'], 0),
      ],
    },
    '5H7Q6dSxuQc': {
      title: 'Palm muting',
      try: 'Rest the side of your picking hand lightly on the strings near the bridge and play power chords with down picks. Find the spot that gives a chunky, muted sound.',
      minutes: 15,
      questions: [
        q.single('Palm muting is done with…', ['The side of the picking hand resting near the bridge', 'The fretting hand’s thumb', 'A capo', 'The volume knob'], 0),
        q.single('Moving your palm too far from the bridge makes the notes…', ['Too muffled', 'Brighter', 'Louder', 'Out of tune'], 0),
      ],
    },
    _ZxZfbkW86M: {
      title: 'Gain, overdrive, distortion and fuzz',
      try: 'If you have an amp or an amp app, try clean, overdrive and distortion sounds with the same power chord riff.',
      minutes: 15,
      questions: [
        q.order('Put these sounds from least to most distorted.', ['Clean', 'Overdrive', 'Distortion', 'Fuzz']),
        q.single('Gain mainly controls…', ['How much the signal is driven into distortion', 'The tuning', 'The key', 'The tempo'], 0),
      ],
    },
    r7EZXSUQTsw: {
      title: 'What a riff is, and how to make one',
      try: 'Write your own two-bar riff using power chords or the pentatonic scale, and repeat it until it is tight.',
      minutes: 20,
      questions: [
        q.single('A riff is…', ['A short, catchy, repeated musical phrase', 'A chord chart', 'A tuning', 'An amp setting'], 0),
        q.tf('Repetition is what makes a riff memorable.', true),
      ],
    },
    Nddo7t8TOO0: {
      title: 'Power chord songs',
      try: 'Play a power chord song from the video along with the recording.',
      minutes: 20,
      questions: [
        q.single('Power chords suit distortion because…', ['Two-note chords stay clear when distorted', 'They are minor', 'They have no root', 'They are quiet'], 0),
        q.tf('Many classic rock songs are built on power chords.', true),
      ],
    },
    lyVkToSxXyI: {
      title: 'Module practice schedule',
      try: 'Follow the schedule for a week: power chord shifts, palm muting and the A minor pentatonic.',
      minutes: 20,
      questions: [
        q.single('Practising power chord shifts improves…', ['Moving accurately along the neck', 'Tuning', 'Strumming dynamics only', 'Open chords only'], 0),
        q.tf('Muting is as important as fretting when playing distorted guitar.', true),
      ],
    },
  },
  checkpoint: programExam('Power chords and rock exam', [
    q.single('A power chord contains…', ['The root and fifth', 'Root, third and fifth', 'Third and seventh', 'Only the root'], 0),
    q.single('E5 is…', ['A power chord on E', 'E minor', 'E seventh', 'E major only'], 0),
    q.single('A power chord with its root on the 5th fret of the low E string is…', ['A5', 'G5', 'E5', 'C5'], 0),
    q.single('A power chord with its root on the 3rd fret of the A string is…', ['C5', 'D5', 'B5', 'G5'], 0),
    q.tf('Power chords are movable: the same shape works anywhere on the neck.', true),
    q.single('Why are power chords common with distortion?', ['They stay clear when distorted', 'They are louder clean', 'They are minor', 'They need no muting'], 0),
    q.single('Palm muting uses…', ['The side of the picking hand on the strings near the bridge', 'The fretting fingers on the 12th fret', 'A capo', 'The tone knob'], 0),
    q.single('Palm-muted notes sound…', ['Chunky and percussive', 'Bright and ringing', 'Out of tune', 'Silent'], 0),
    q.order('Put these from least to most distorted.', ['Clean', 'Overdrive', 'Distortion', 'Fuzz']),
    q.single('“Gain” on an amp controls…', ['How hard the signal is driven, so how much distortion', 'Tuning', 'Tempo', 'Reverb only'], 0),
    q.single('The A minor pentatonic box shape starts at the…', ['5th fret', '1st fret', '7th fret', '12th fret'], 0),
    q.single('Moving the minor pentatonic shape to start at the 3rd fret of the low E gives…', ['G minor pentatonic', 'A minor pentatonic', 'E minor pentatonic', 'C major'], 0),
    q.single('A riff becomes memorable mainly through…', ['Repetition and a strong rhythm', 'Using every note', 'High volume', 'Fast tempo'], 0),
    q.multi('Which help a clean power chord sound?', ['Muting unused strings', 'Accurate picking on just the chord’s strings', 'Pressing firmly near the frets', 'Strumming all six strings openly'], [0, 1, 2]),
    q.tf('Power chords have no third, so they fit both major and minor songs.', true),
    q.single('With distortion, which is more important than with a clean sound?', ['Muting unwanted strings', 'Open strings ringing', 'Light picking', 'Capo use'], 0),
    q.single('Down picks on every note give rock rhythm parts…', ['A heavier, driving feel', 'A lighter feel', 'A swing feel', 'A waltz feel'], 0),
    q.single('A movable scale shape lets you…', ['Play the same pattern in any key', 'Only play in E', 'Avoid learning notes', 'Play chords'], 0),
    q.tf('Writing your own riff is a good way to practise power chords and scales together.', true),
    q.single('Fuzz is…', ['A very heavily distorted, saturated sound', 'A clean sound', 'A reverb', 'A tuning'], 0),
  ]),
};
