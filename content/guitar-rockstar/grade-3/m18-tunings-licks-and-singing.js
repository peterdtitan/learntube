import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Alternate tunings, blues licks and singing',
  lessons: {
    ixeFsasPjcI: {
      title: 'Drop D, double drop D, open G and open D',
      try: 'Tune to drop D (lower the low E string to D, matching the open D string an octave lower). Play a power chord with one finger across the bottom three strings.',
      minutes: 30,
      questions: [
        q.single('In drop D tuning you…', ['Lower the low E string to D', 'Raise every string', 'Lower all strings a whole step', 'Use a capo'], 0),
        q.single('Drop D lets you play a low power chord with…', ['One finger across the bottom three strings', 'Four fingers on four frets', 'Only open high strings', 'A slide'], 0),
        q.tf('Open tunings make the guitar sound a full chord when you strum the open strings.', true),
      ],
    },
    I8_XDGnUCHw: {
      title: 'Mix licks with rhythm',
      try: 'Over a 12-bar blues, play rhythm for two bars, then a short lick in the space, then back to rhythm.',
      minutes: 30,
      questions: [
        q.single('Mixing licks with rhythm means…', ['Adding short melodic phrases between chord parts', 'Only soloing', 'Only strumming', 'Changing tuning'], 0),
        q.tf('Leaving gaps in a rhythm part creates room for fills and licks.', true),
      ],
    },
    MhIZ5IxaUhA: {
      title: 'Triad chips',
      try: 'Play short, chopped triad stabs (“chips”) on the off-beats over a blues or soul groove.',
      minutes: 20,
      questions: [
        q.single('“Chips” are…', ['Short, chopped chord stabs', 'Long ringing chords', 'Open strings', 'Harmonics'], 0),
        q.tf('Short, muted triad stabs are common in soul, funk and pop rhythm guitar.', true),
      ],
    },
    '1xY1VS5-rqQ': {
      title: 'Learning as an older player',
      try: 'Choose one tip from the video that suits your life and add it to your practice plan.',
      minutes: 15,
      questions: [
        q.tf('Adults of any age can learn to play guitar well.', true),
        q.single('A big advantage adult learners often have is…', ['Focus and the ability to plan practice', 'Unlimited free time', 'Perfect hands', 'No need to practise'], 0),
      ],
    },
    hGQ8QvEknhE: {
      title: 'Work out songs with open chords',
      try: 'Work out the chords of a song that uses only open chords by ear, then play along.',
      minutes: 30,
      questions: [
        q.single('When working out chords by ear, listen first for…', ['The bass note of each chord', 'The drums', 'The lyrics only', 'The guitar brand'], 0),
        q.tf('Knowing which chords usually go together in a key speeds up working songs out.', true),
      ],
    },
    k4w3tvNrvuA: {
      title: 'How not to suck at singing',
      try: 'Warm up your voice with the exercises from the video, then sing one verse of a song you like, in a comfortable key.',
      minutes: 30,
      questions: [
        q.single('Choosing a comfortable key for your voice…', ['Makes singing much easier', 'Doesn’t matter', 'Means always singing high', 'Is cheating'], 0),
        q.multi('Which help you sing better?', ['Warming up', 'Good posture and breathing', 'Recording and listening back', 'Shouting'], [0, 1, 2]),
      ],
    },
    jF0RduFSyHg: {
      title: 'Five fingerstyle patterns',
      try: 'Learn two of the five patterns on one chord, then use one over a whole song.',
      minutes: 30,
      questions: [
        q.single('Most fingerstyle patterns keep the thumb on…', ['The bass notes', 'The top string', 'The fretboard', 'Nothing'], 0),
        q.tf('Practising a pattern on one chord first makes it easier to use in songs.', true),
      ],
    },
    '2lc-Ohp9T0A': {
      title: 'Become a power chord detective',
      try: 'Work out the power chords of a rock song by ear, finding the root note of each on the low E or A string.',
      minutes: 20,
      questions: [
        q.single('To work out a power chord riff, find…', ['The root note of each chord', 'The singer’s name', 'The drum pattern', 'The capo'], 0),
        q.tf('Power chords are movable, so once you find the root you know the shape.', true),
      ],
    },
    UdHG6Jl8qIk: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week, including two minutes of singing with your playing each day.',
      minutes: 15,
      questions: [
        q.tf('Short daily singing practice improves your voice over time.', true),
        q.single('Which belongs in this module’s practice?', ['Drop D riffs and blues licks', 'Only tuning', 'Only scales', 'Nothing new'], 0),
      ],
    },
  },
  checkpoint: programExam('Tunings, licks and singing exam', [
    q.single('Drop D lowers which string?', ['The low E to D', 'The high E to D', 'The A to G', 'The G to F'], 0),
    q.single('In double drop D, which strings are lowered to D?', ['Both E strings', 'The A and D strings', 'Only the B string', 'All strings'], 0),
    q.single('Open G tuning (low to high) is…', ['D G D G B D', 'E A D G B E', 'D A D F♯ A D', 'C G C G C E'], 0),
    q.single('Open D tuning (low to high) is…', ['D A D F♯ A D', 'D G D G B D', 'E A D G B E', 'D A D G A D'], 0),
    q.tf('In an open tuning, strumming the open strings plays a major chord.', true),
    q.single('In drop D, a power chord can be played…', ['With one finger across the bottom three strings', 'Only with four fingers', 'Only open', 'With a capo'], 0),
    q.single('Mixing licks with rhythm means…', ['Fitting short phrases into gaps in your chord part', 'Soloing all the time', 'Strumming all the time', 'Using two guitars'], 0),
    q.single('Triad chips are…', ['Short chopped chord stabs', 'Sustained power chords', 'Arpeggios', 'Harmonics'], 0),
    q.multi('Which help singing?', ['A comfortable key', 'Warm-ups', 'Breath support', 'Singing as loud as possible'], [0, 1, 2]),
    q.single('A capo can help singing by…', ['Moving the song to a key that suits your voice', 'Tuning the guitar', 'Making chords minor', 'Muting strings'], 0),
    q.single('When working out a power chord riff, start with…', ['The root notes', 'The drum part', 'The vocals', 'The amp settings'], 0),
    q.single('Fingerstyle patterns usually keep the thumb on…', ['Bass notes', 'Top notes', 'The fretboard', 'Nothing'], 0),
    q.tf('Adults can learn guitar effectively with focused, regular practice.', true),
    q.single('To return from drop D to standard tuning, you…', ['Raise the low string back up to E', 'Lower it further', 'Raise all strings', 'Remove the capo'], 0),
    q.order('Put tuning to drop D in order.', ['Play the open D string', 'Play the low E string', 'Lower the low E until it matches D, an octave lower', 'Check with a tuner']),
    q.single('Leaving space in a rhythm part creates room for…', ['Fills and licks', 'Tuning', 'Silence only', 'Distortion'], 0),
    q.single('Listening for the bass note of each chord helps you…', ['Work out the chords', 'Tune', 'Change strings', 'Sing higher'], 0),
    q.tf('Recording your singing helps you hear pitch problems.', true),
    q.single('Open tunings are popular for…', ['Slide guitar and ringing, drone-like sounds', 'Only metal', 'Only jazz', 'Nothing'], 0),
    q.single('This module mainly adds…', ['Alternate tunings, licks, singing and fingerstyle patterns', 'The F chord', 'Basic strumming', 'Holding the pick'], 0),
  ]),
};
