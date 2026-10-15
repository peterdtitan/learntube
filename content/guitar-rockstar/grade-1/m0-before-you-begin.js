import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Before you begin',
  lessons: {
    X2EmpWr9vUc: {
      title: 'Tune your guitar',
      try: 'Tune all six strings with a clip-on tuner or a free tuner app. Pluck each string and say its name: E A D G B E.',
      minutes: 10,
      questions: [
        q.order('Put the open strings in order, from the thickest to the thinnest.', ['E (low)', 'A', 'D', 'G', 'B', 'E (high)']),
        q.single('Your tuner says the string is sharp. You should…', ['Loosen it a little', 'Tighten it a little', 'Press harder', 'Change the string'], 0),
        q.tf('It’s best to tune up to a note: if you go too high, drop below it and come back up.', true),
      ],
    },
    MlV6WhM9YhE: {
      title: 'Hold the guitar properly',
      try: 'Sit with the guitar for five minutes and check it stays balanced without your fretting hand holding it up.',
      minutes: 10,
      questions: [
        q.single('When you sit to play, the guitar’s body should…', ['Rest on your leg and stay balanced without your fretting hand', 'Be held up by your fretting hand', 'Lie flat on your lap facing up', 'Lean on a table'], 0),
        q.tf('Your fretting hand should be free to move, not supporting the guitar’s weight.', true),
      ],
    },
    VB0vWNqNMbA: {
      title: 'Avoid finger pain',
      try: 'Play for short sessions today: ten minutes, a break, then ten more. Stop when your fingertips feel sore.',
      minutes: 10,
      questions: [
        q.single('The best way to build calluses without injury is…', ['Short, regular practice sessions', 'One very long session a week', 'Pressing as hard as you can', 'Soaking your fingers'], 0),
        q.single('Pressing just behind the fret means…', ['You need less pressure for a clean note', 'The note buzzes more', 'You must press harder', 'The string goes out of tune'], 0),
      ],
    },
    LlN2yrFQKzY: {
      title: 'Read chord charts',
      try: 'Find chord charts for D, A and E. For each, point to the string and fret of every finger, and say which strings are not played.',
      minutes: 10,
      questions: [
        q.single('On a standard chord chart, the vertical lines are…', ['The strings, with the low E on the left', 'The frets', 'The fingers', 'The beats'], 0),
        q.single('An X above a string means…', ['Don’t play it', 'Play it open', 'Use your thumb', 'Play it twice'], 0),
        q.single('An O above a string means…', ['Play it open', 'Don’t play it', 'Use finger 0', 'Mute it'], 0),
      ],
    },
    '-04Et5qIoa4': {
      title: 'Hold a pick',
      try: 'Hold a medium pick between your thumb and the side of your index finger, with just the tip showing, and strum the open strings slowly.',
      minutes: 10,
      questions: [
        q.single('How much of the pick should stick out?', ['Just the tip', 'Most of it', 'None', 'Half of it'], 0),
        q.single('For strumming, a beginner usually does well with…', ['A thin to medium pick', 'A very thick pick only', 'A coin', 'No pick ever'], 0),
      ],
    },
    'j-ljksb6oIY': {
      title: 'Strum without a pick',
      try: 'Strum the open strings with your index finger (nail down, pad up) for two minutes, then try the thumb. Choose what feels best for now.',
      minutes: 10,
      questions: [
        q.tf('You can strum with your fingers instead of a pick.', true),
        q.single('When strumming down with your index finger, the string is mostly hit by…', ['The nail', 'The palm', 'The wrist', 'The knuckle'], 0),
      ],
    },
  },
  checkpoint: programExam('Before you begin exam', [
    q.order('Put the open strings in order, from the thickest (lowest) to the thinnest (highest).', ['Low E', 'A', 'D', 'G', 'B', 'High E']),
    q.single('Which string is the 6th string?', ['The thick low E', 'The thin high E', 'The G string', 'The A string'], 0),
    q.single('Which string is the 1st string?', ['The thin high E', 'The thick low E', 'The D string', 'The B string'], 0),
    q.single('Your tuner shows the note is flat. You…', ['Tighten the string slightly', 'Loosen it', 'Press harder', 'Strum softer'], 0),
    q.single('A clip-on tuner works by…', ['Sensing the vibration through the headstock', 'Listening to the room only', 'Counting frets', 'Changing the strings'], 0),
    q.tf('Guitars go out of tune often, so tune every time you pick yours up.', true),
    q.single('On a chord chart, the thick line at the top is…', ['The nut', 'The bridge', 'The 12th fret', 'The low E string'], 0),
    q.single('On a chord chart, the dots show…', ['Where to put your fingers', 'Where to strum', 'How loud to play', 'Which pick to use'], 0),
    q.single('Finger 1 on a chord chart is your…', ['Index finger', 'Thumb', 'Pinky', 'Middle finger'], 0),
    q.single('Finger 4 on a chord chart is your…', ['Pinky', 'Ring finger', 'Index finger', 'Thumb'], 0),
    q.single('Fingertip soreness at first is…', ['Normal, and it passes as calluses form', 'A sign to quit', 'Caused by tuning', 'Fixed by pressing harder'], 0),
    q.multi('Which reduce finger pain?', ['Pressing close behind the fret', 'Short sessions with breaks', 'Using only as much pressure as needed', 'Squeezing with all your strength'], [0, 1, 2]),
    q.single('Holding a pick, you grip it between…', ['The thumb and the side of the index finger', 'Two fingertips', 'Your whole fist', 'The index and middle fingers'], 0),
    q.single('A guitar that slides off your leg while you play means…', ['Your posture needs adjusting so it stays balanced', 'The guitar is broken', 'You need a capo', 'You need a thicker pick'], 0),
    q.tf('Your fretting hand should hold up the neck of the guitar.', false, 'The guitar should balance on its own so the fretting hand is free.'),
    q.multi('Which can you use to strum?', ['A pick', 'Your index finger', 'Your thumb', 'A capo'], [0, 1, 2]),
    q.single('A mnemonic for the open strings is…', ['Eddie Ate Dynamite, Good Bye Eddie', 'Every Good Boy Does Fine', 'FACE', 'Do Re Mi'], 0),
    q.single('Tuning “up to” the note means…', ['Approaching the right pitch from below', 'Tuning from above only', 'Tuning the high string first always', 'Using a capo'], 0),
    q.single('Long fingernails on the fretting hand usually…', ['Stop your fingertips pressing the strings cleanly', 'Help you play faster', 'Make no difference', 'Help with tuning'], 0),
    q.order('Put the start of a practice session in order.', ['Sit comfortably with the guitar balanced', 'Tune every string', 'Warm up your fingers', 'Start the lesson task']),
  ]),
};
