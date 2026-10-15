import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Up the neck, melody and your amp',
  lessons: {
    _0ICSMeRq_E: {
      title: 'Timeboxing your practice',
      try: 'Plan tomorrow’s practice as boxes of time (for example 5 minutes warm-up, 10 chords, 10 songs) and stick to the timer.',
      minutes: 15,
      questions: [
        q.single('Timeboxing means…', ['Giving each practice item a fixed amount of time', 'Practising until you’re tired', 'Practising once a week', 'Using a metronome'], 0),
        q.tf('A timer stops you spending the whole session on one favourite thing.', true),
      ],
    },
    x55gAAdqOLk: {
      title: 'Stop using only the first frets',
      try: 'Find the same note in three different places on the neck, then play a short melody higher up the neck.',
      minutes: 30,
      questions: [
        q.single('The same note on the guitar can be found…', ['In several places on the neck', 'In only one place', 'Only on open strings', 'Only on the low E'], 0),
        q.single('The 12th fret of a string plays…', ['The open note one octave higher', 'A different note', 'The next string’s note', 'Silence'], 0),
        q.tf('The 5th fret of the low E string is the same pitch as the open A string.', true),
      ],
    },
    hjX8PAtnEkU: {
      title: 'Melodic fingerstyle',
      try: 'Play a chord fingerstyle and bring out the top (melody) note slightly louder than the rest.',
      minutes: 20,
      questions: [
        q.single('In melodic fingerstyle, the melody is usually…', ['On the higher strings, played slightly louder', 'Only on the bass string', 'Strummed', 'Not played'], 0),
        q.tf('Fingerstyle can combine bass, chords and melody at once.', true),
      ],
    },
    'x-6YrPi6oKg': {
      title: 'Greensleeves',
      try: 'Learn the first section of Greensleeves from the video, slowly, with its waltz-like feel.',
      minutes: 30,
      questions: [
        q.single('Greensleeves is in a time with…', ['Three beats per bar (or 6/8)', 'Four even beats', 'Five beats', 'No beat'], 0),
        q.tf('Greensleeves is a traditional English folk song.', true),
      ],
    },
    dvhwxqDM_70: {
      title: 'A melody duet',
      try: 'Record yourself playing the chords, then play the melody along with your recording.',
      minutes: 30,
      questions: [
        q.single('Playing a melody over your own recorded chords helps you…', ['Hear how melody and harmony fit', 'Tune', 'Change strings', 'Practise barre chords'], 0),
        q.tf('A melody can replace a singer when there is no vocalist.', true),
      ],
    },
    EQp5hluqF7I: {
      title: 'Play like a falling leaf: flexible timing',
      try: 'Play a slow piece twice: once strictly in time, once with gentle slowing and speeding (rubato). Decide where flexibility sounds best.',
      minutes: 15,
      questions: [
        q.single('Rubato means…', ['Flexing the tempo expressively, slowing and speeding slightly', 'Playing exactly with a metronome', 'Playing very loudly', 'Changing key'], 0),
        q.tf('Flexible timing suits slow, expressive solo pieces more than dance music.', true),
      ],
    },
    MbKqz7oCDYU: {
      title: 'Learn your guitar amp',
      try: 'On an amp or an amp app, set the EQ flat (all at noon), then change bass, middle and treble one at a time and listen.',
      minutes: 20,
      questions: [
        q.single('An amp’s EQ controls (bass, middle, treble)…', ['Shape the tone by boosting or cutting frequency ranges', 'Change the tuning', 'Set the tempo', 'Add effects only'], 0),
        q.single('Setting the EQ knobs to the middle (noon) is a good…', ['Starting point', 'Final setting always', 'Mistake', 'Way to mute'], 0),
      ],
    },
    U9Ujg5J7ypQ: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week with timeboxes for notes up the neck, fingerstyle and a duet.',
      minutes: 20,
      questions: [
        q.tf('Practising notes up the neck a little every day builds fretboard knowledge.', true),
        q.single('Which belongs in this module’s practice?', ['Notes up the neck', 'Only open chords', 'Only tuning', 'Nothing new'], 0),
      ],
    },
  },
  checkpoint: programExam('Up the neck and melody exam', [
    q.single('Timeboxing practice means…', ['A set time for each practice item', 'Practising without a plan', 'Only practising songs', 'Practising at night'], 0),
    q.single('The 12th fret plays…', ['The open string note an octave higher', 'A random note', 'A half step higher', 'Silence'], 0),
    q.single('The 5th fret of the low E string matches the pitch of…', ['The open A string', 'The open D string', 'The open G string', 'The open B string'], 0),
    q.single('The 4th fret of the G string matches the pitch of…', ['The open B string', 'The open E string', 'The open D string', 'The open A string'], 0),
    q.single('The 7th fret of the low E string is…', ['B', 'A', 'C', 'G'], 0),
    q.tf('The same note can be played in several places on the guitar neck.', true),
    q.single('In melodic fingerstyle, the melody note should be…', ['Slightly louder than the accompaniment', 'Quieter than the bass', 'Muted', 'Strummed'], 0),
    q.single('Rubato is…', ['Expressive, flexible timing', 'Strict metronome timing', 'Fast tremolo picking', 'A tuning'], 0),
    q.single('Greensleeves has…', ['A triple, waltz-like feel', 'A rock backbeat', 'A reggae skank', 'No rhythm'], 0),
    q.single('An amp’s treble control mainly affects…', ['The bright, high frequencies', 'The low bass', 'Volume only', 'Gain only'], 0),
    q.single('An amp’s bass control mainly affects…', ['The low frequencies', 'The highs', 'Reverb', 'Tuning'], 0),
    q.single('A good starting point for amp EQ is…', ['All knobs at noon', 'All at zero', 'All at maximum', 'Random'], 0),
    q.multi('Which build fretboard knowledge?', ['Finding the same note in several places', 'Learning notes on the low E and A strings', 'Playing melodies higher up', 'Only using open chords'], [0, 1, 2]),
    q.tf('Recording yourself and playing along is a way to practise duets alone.', true),
    q.single('A melody duet can stand in for…', ['A singer', 'A tuner', 'A metronome', 'A capo'], 0),
    q.order('Put the notes on the low E string from open to the 5th fret in order (naturals only).', ['E', 'F', 'G', 'A']),
    q.single('Flexible timing works best in…', ['Slow, expressive solo pieces', 'Dance music with a drummer', 'Metronome practice', 'Strumming along to a band'], 0),
    q.single('Playing higher up the neck lets you…', ['Find new voicings and play melodies in one position', 'Avoid all open strings forever', 'Tune the guitar', 'Play louder'], 0),
    q.tf('Bringing out the top note of a chord can make a melody sing.', true),
    q.single('This module mainly develops…', ['Fretboard knowledge, melody and tone', 'Power chords', 'Blues shuffles', 'Strap height'], 0),
  ]),
};
