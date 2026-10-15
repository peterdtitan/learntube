import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Minor chords, the capo and up strums',
  lessons: {
    pbIqk8tTdbw: {
      title: 'What minor chords are',
      try: 'Play E, then Em (lift the finger on the G string). Describe in one word how each one feels.',
      minutes: 10,
      questions: [
        q.single('Minor chords usually sound…', ['Sadder or darker than major chords', 'Happier', 'Louder', 'The same'], 0),
        q.single('Em is a minor version of…', ['E', 'A', 'D', 'C'], 0),
      ],
    },
    '1Y2veGF9s44': {
      title: 'The Am chord',
      try: 'Place Am and play from the A string. Then change between E and Am, keeping the shape and moving it across one string.',
      minutes: 15,
      questions: [
        q.single('Which is the lowest string you strum for Am?', ['The A string', 'The low E', 'The D string', 'The G string'], 0),
        q.tf('The Am shape looks like the E shape moved across by one string.', true),
      ],
    },
    'C-mt8td1teU': {
      title: 'Your fretting hand position',
      try: 'Check your thumb: behind the neck, roughly opposite your middle finger, with your wrist relaxed. Play Am and D for two minutes this way.',
      minutes: 10,
      questions: [
        q.single('For most chords, the fretting thumb sits…', ['Behind the neck, roughly opposite the fingers', 'Over the top, pressing strings', 'Under the body', 'On the headstock'], 0),
        q.tf('Squeezing the neck hard with your thumb makes playing tiring.', true),
      ],
    },
    U1TMGzcbbLE: {
      title: 'Count the beats',
      try: 'Count “1 and 2 and 3 and 4 and” out loud while strumming down on the numbers, for two minutes.',
      minutes: 10,
      questions: [
        q.single('In “1 and 2 and 3 and 4 and”, the numbers are…', ['The beats', 'The up strums', 'The chord changes', 'The rests'], 0),
        q.single('Counting out loud helps you…', ['Keep track of where you are in the bar', 'Tune', 'Play louder', 'Change strings'], 0),
      ],
    },
    JrIxNphnhrM: {
      title: 'Up strums',
      try: 'Strum down on the numbers and up on the “ands” over Em for two minutes, keeping the hand moving all the time.',
      minutes: 15,
      questions: [
        q.single('Up strums usually land on…', ['The “ands” between the beats', 'The beats', 'Only beat 1', 'Nothing'], 0),
        q.single('Up strums usually hit…', ['Mostly the higher (thinner) strings, lightly', 'All six strings hard', 'Only the low E', 'No strings'], 0),
        q.tf('Your strumming hand moves down and up constantly, even when it misses the strings.', true),
      ],
    },
    'A4mEBSFn-7w': {
      title: 'All about the capo',
      try: 'Put a capo on the 2nd fret and play A, D and E. Notice the shapes stay the same but the sound is higher.',
      minutes: 10,
      questions: [
        q.single('A capo…', ['Raises the pitch of every open string, so the same shapes sound higher', 'Lowers the pitch', 'Changes the chord shapes', 'Tunes the guitar'], 0),
        q.single('A capo should be placed…', ['Just behind a fret, straight across', 'On top of the fret wire', 'In the middle between frets, at an angle', 'On the headstock'], 0),
      ],
    },
    '2LEO5xc9rEA': {
      title: 'Seven Nation Army riff',
      try: 'Learn the Seven Nation Army riff slowly with a steady beat, then play it ten times without a mistake.',
      minutes: 15,
      questions: [
        q.single('Learning a riff slowly first helps you…', ['Play it accurately before speeding up', 'Forget it', 'Play it out of time', 'Avoid practising'], 0),
        q.tf('Single-note riffs build accuracy in your picking hand.', true),
      ],
    },
    'XxICTF-NIZ8': {
      title: 'Easy songs with Em and Am',
      try: 'Play a song from the video using Em and Am, with down and up strums.',
      minutes: 20,
      questions: [
        q.single('Em to Am is an easy change because…', ['The shape moves across one string', 'Both are open strings', 'No fingers move', 'They use different hands'], 0),
        q.tf('Minor chords appear in lots of popular songs.', true),
      ],
    },
    qckkf38Xk2Y: {
      title: 'Module practice routine',
      try: 'Follow the practice routine for a week, adding Am and Em to your one-minute changes.',
      minutes: 20,
      questions: [
        q.single('Which new changes join your practice now?', ['E to Am and Em to Am', 'F to C', 'B to F#', 'None'], 0),
        q.tf('Practice routines should change as you learn new chords.', true),
      ],
    },
  },
  checkpoint: programExam('Minor chords and capo exam', [
    q.single('Compared with major chords, minor chords sound…', ['Darker or sadder', 'Brighter', 'Louder', 'Higher'], 0),
    q.single('Em is made from E by…', ['Lifting the finger on the G string', 'Adding a finger', 'Moving up five frets', 'Using a capo'], 0),
    q.single('Am is played from which string?', ['A', 'Low E', 'D', 'G'], 0),
    q.single('The Am shape is the E shape…', ['Moved across by one string', 'Played upside down', 'Moved up the neck', 'With all fingers lifted'], 0),
    q.multi('Which are minor chords?', ['Em', 'Am', 'E', 'A'], [0, 1]),
    q.single('Your fretting thumb usually sits…', ['Behind the neck', 'Over the fretboard', 'On the body', 'Under the strings'], 0),
    q.single('In “1 and 2 and 3 and 4 and”, up strums go on…', ['The “and”s', 'The numbers', 'Beat 1 only', 'Beat 4 only'], 0),
    q.single('In “1 and 2 and 3 and 4 and”, down strums go on…', ['The numbers', 'The “and”s', 'Nothing', 'Beat 2 only'], 0),
    q.tf('Keeping the strumming hand moving down and up all the time makes rhythms steadier.', true),
    q.single('Up strums are usually…', ['Lighter and catch the higher strings', 'Louder than down strums', 'Only on the bass strings', 'Not used in songs'], 0),
    q.single('A capo on the 2nd fret makes an open A shape sound like…', ['B', 'A', 'G', 'C'], 0),
    q.single('Why use a capo?', ['To play songs in a higher key with easy shapes', 'To tune the guitar', 'To mute strings', 'To hold the pick'], 0),
    q.single('A capo placed in the middle of the fret space tends to…', ['Cause buzzing or tuning problems', 'Sound better', 'Change nothing', 'Lower the pitch'], 0),
    q.tf('With a capo, chord shapes are named as if the capo were the nut.', true),
    q.single('Counting out loud while strumming helps you…', ['Stay in time and know where you are in the bar', 'Avoid finger pain', 'Change strings', 'Tune'], 0),
    q.single('Seven Nation Army is mainly…', ['A single-note riff', 'A three-chord strummed song', 'A fingerpicked ballad', 'A tuning exercise'], 0),
    q.order('Put up-strum practice in order.', ['Count the beats out loud', 'Strum down on the numbers', 'Add up strums on the “and”s', 'Play the pattern over a chord change']),
    q.multi('Which help a relaxed fretting hand?', ['Thumb behind the neck', 'Wrist not bent sharply', 'Squeezing the neck as hard as possible', 'Shoulders loose'], [0, 1, 3]),
    q.single('Changing E to Am is easier if you…', ['Move the whole shape across one string together', 'Lift all fingers very high', 'Look away', 'Strum harder'], 0),
    q.single('After this module, your one-minute changes should include…', ['Changes with Am and Em', 'Only A to D', 'Barre chords', 'Power chords'], 0),
  ]),
};
