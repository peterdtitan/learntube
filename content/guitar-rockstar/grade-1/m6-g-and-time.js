import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'The G chord, 6/8 time and alternate picking',
  lessons: {
    'q8SHmo1-dac': {
      title: 'Alternate picking',
      try: 'Pick the open low E string down-up-down-up with a metronome at 60 BPM, two notes per click, keeping the motion small.',
      minutes: 15,
      questions: [
        q.single('Alternate picking means…', ['Alternating down and up picks', 'Only down picks', 'Only up picks', 'Picking two strings at once'], 0),
        q.tf('Small, efficient picking movements are faster and cleaner than big ones.', true),
      ],
    },
    i0G69vCTv4s: {
      title: 'The G chord, made easy',
      try: 'Play the easy version of G from the video, then the full version. Change between G and C, and G and D.',
      minutes: 15,
      questions: [
        q.single('The full G chord uses notes on…', ['All six strings', 'Only the top three strings', 'Only the A string', 'Four strings'], 0),
        q.tf('Starting with a simpler version of a hard chord is a smart way to learn it.', true),
      ],
    },
    FDPWwviOYno: {
      title: 'Time signatures',
      try: 'Listen to two songs and count along: one in 4/4 (count to 4) and one in 3/4 or 6/8.',
      minutes: 15,
      questions: [
        q.single('4/4 time has…', ['Four beats in each bar', 'Three beats', 'Six beats', 'One beat'], 0),
        q.single('3/4 time, like a waltz, has…', ['Three beats in each bar', 'Four beats', 'Six beats', 'Two beats'], 0),
        q.single('6/8 time is usually felt as…', ['Two groups of three', 'Six equal accents', 'Three groups of two', 'Four beats'], 0),
      ],
    },
    bKOmcPTHYpA: {
      title: 'The 6/8 strumming pattern',
      try: 'Count “1 2 3 4 5 6” with accents on 1 and 4, and strum the 6/8 pattern over Am for two minutes.',
      minutes: 15,
      questions: [
        q.single('In 6/8, the strong accents usually fall on…', ['1 and 4', '1 and 2', '3 and 6', 'Every beat'], 0),
        q.tf('6/8 has a rolling, swaying feel.', true),
      ],
    },
    fYrneoR453c: {
      title: 'Open string note names',
      try: 'Say the open string names out loud from low to high, then high to low, without looking, five times.',
      minutes: 5,
      questions: [
        q.single('The open strings from low to high are…', ['E A D G B E', 'E B G D A E', 'A D G C E A', 'E A D G C F'], 0),
        q.single('Which open string is the 3rd string?', ['G', 'D', 'B', 'A'], 0),
      ],
    },
    d9YRzCF5A9M: {
      title: 'Stop stopping between chord changes',
      try: 'Play a chord progression without ever stopping your strumming hand, even if the next chord isn’t ready.',
      minutes: 10,
      questions: [
        q.single('The fix for stopping between changes is…', ['Keep strumming and let the chord catch up', 'Stop until the chord is perfect', 'Strum slower and stop', 'Look at your hand'], 0),
        q.tf('Listeners notice a stopped rhythm more than one slightly messy chord.', true),
      ],
    },
    MLlWCygtVEc: {
      title: 'Songs with the G chord',
      try: 'Play a song from the video that uses G, keeping your strumming steady through every change.',
      minutes: 20,
      questions: [
        q.single('G, C and D together are…', ['A very common three-chord set in the key of G', 'All minor chords', 'Barre chords', 'Power chords'], 0),
        q.tf('Learning one new chord opens up many new songs.', true),
      ],
    },
    yBxyxZx9oiQ: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week, adding G changes and alternate picking.',
      minutes: 20,
      questions: [
        q.single('Which skill is new to your routine?', ['Alternate picking', 'Tuning', 'Holding the guitar', 'Reading chord charts'], 0),
        q.tf('Practising the hardest change first, while you’re fresh, is efficient.', true),
      ],
    },
  },
  checkpoint: programExam('G chord and time exam', [
    q.single('Alternate picking is…', ['Down, up, down, up', 'Down, down, down', 'Up, up, up', 'Two strings at once'], 0),
    q.single('Full G uses…', ['All six strings', 'Four strings', 'Only bass strings', 'Only the B string'], 0),
    q.single('G, C and D are the I, IV and V chords in the key of…', ['G', 'C', 'D', 'A'], 0),
    q.single('A time signature tells you…', ['How many beats are in a bar and what kind of note gets a beat', 'The key', 'The tempo in BPM', 'The chords'], 0),
    q.single('A bar of 4/4 contains…', ['Four quarter-note beats', 'Three beats', 'Six eighth notes', 'Eight quarter notes'], 0),
    q.single('A waltz is usually in…', ['3/4', '4/4', '6/8', '2/4'], 0),
    q.single('6/8 is counted…', ['1 2 3 4 5 6 with accents on 1 and 4', '1 2 3 4', '1 2 3', '1 and 2 and'], 0),
    q.tf('6/8 often feels like two big beats, each split into three.', true),
    q.single('The open B string is the…', ['2nd string', '5th string', '3rd string', '1st string'], 0),
    q.single('The open D string is the…', ['4th string', '2nd string', '6th string', '3rd string'], 0),
    q.single('Stopping your strumming hand during a chord change…', ['Breaks the rhythm; keep it moving instead', 'Is the right technique', 'Makes changes easier long term', 'Keeps time'], 0),
    q.multi('Which help you stop stopping?', ['Keep the strumming arm moving', 'Lift your fingers a little early', 'Strum open strings on the last up-strum before the change', 'Freeze until the chord is ready'], [0, 1, 2]),
    q.single('In alternate picking at 60 BPM with two notes per click, you play…', ['A down on the click and an up between clicks', 'Two downs per click', 'One up per click', 'Nothing between clicks'], 0),
    q.tf('Learning an easier version of G first is a good path to the full chord.', true),
    q.single('Which chord uses the low E string for its root?', ['G', 'C', 'D', 'Am'], 0),
    q.order('Put the open strings in order from high (1st) to low (6th).', ['High E', 'B', 'G', 'D', 'A', 'Low E']),
    q.single('A strong accent in music means…', ['That beat is played more strongly', 'That beat is silent', 'A chord change', 'A key change'], 0),
    q.multi('Which time signatures have three beats or groups of three?', ['3/4', '6/8', '4/4', '2/4'], [0, 1]),
    q.single('G to C is a change where…', ['Your fingers move across strings to a new shape', 'Nothing moves', 'Only the thumb moves', 'You need a capo'], 0),
    q.single('The best way to practise a new change like G to C is…', ['One-minute changes, daily', 'Only in songs at full speed', 'Once a week', 'Never; avoid it'], 0),
  ]),
};
