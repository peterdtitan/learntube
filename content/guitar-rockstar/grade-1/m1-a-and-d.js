import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'A and D chords and your first song',
  lessons: {
    QkrIZBLZEXw: {
      title: 'The D chord',
      try: 'Place D one finger at a time. Play each string from the D string down and fix any buzzing or muted string, then strum it four times.',
      minutes: 15,
      questions: [
        q.single('Which is the lowest string you strum for D?', ['The D string (4th)', 'The low E string', 'The A string', 'The high E string'], 0),
        q.single('A string that sounds dead under a chord usually means…', ['Another finger is touching it', 'The guitar is out of tune', 'You need a capo', 'You strummed too softly'], 0),
        q.tf('Playing a chord one string at a time is a good way to check every note rings.', true),
      ],
    },
    '1X2rW5ATdLQ': {
      title: 'The A chord',
      try: 'Place A and play from the A string, one string at a time. Strum four times, keeping the low E string silent.',
      minutes: 15,
      questions: [
        q.single('Which is the lowest string you strum for A?', ['The A string (5th)', 'The low E', 'The D string', 'The G string'], 0),
        q.single('In the A chord, the fingers are on…', ['The same fret (2nd) on three neighbouring strings', 'Three different frets on one string', 'The 5th fret', 'The open strings only'], 0),
      ],
    },
    'Se__aa_k-ms': {
      title: 'The secret to fast chord changes',
      try: 'Do a one-minute change between A and D: no strumming, just change shapes as many times as you can. Write down your score.',
      minutes: 10,
      questions: [
        q.single('In a one-minute change you…', ['Swap between two chords as many times as you can in a minute, without strumming', 'Strum one chord for a minute', 'Tune for a minute', 'Play a song once'], 0),
        q.tf('Writing down your one-minute change scores shows your progress over time.', true),
      ],
    },
    mAgc7hr44WM: {
      title: 'Get faster chord changes',
      try: 'Do another one-minute change between A and D and try to beat yesterday’s score. Move all fingers together as one shape.',
      minutes: 10,
      questions: [
        q.single('Faster changes come from…', ['Moving all fingers together as one shape', 'Placing one finger at a time, slowly, always', 'Looking away from the neck', 'Strumming harder'], 0),
        q.single('If a chord change keeps failing, practise…', ['Just that change, on its own, daily', 'A different song', 'Only the first chord', 'Faster strumming'], 0),
      ],
    },
    n45PDizCRLw: {
      title: 'Your first strumming pattern',
      try: 'Strum four down strums on A, then four on D, counting “1 2 3 4” out loud, for two minutes without stopping.',
      minutes: 10,
      questions: [
        q.single('The first strumming pattern is…', ['Four down strums per bar, one on each beat', 'Eight up strums', 'One strum per chord', 'Random strums'], 0),
        q.tf('Counting the beats out loud helps you keep steady time.', true),
      ],
    },
    '72MEHvT9JV4': {
      title: 'Strum only the right strings',
      try: 'Strum D ten times hitting only the top four strings, then A ten times from the A string.',
      minutes: 10,
      questions: [
        q.single('When playing D, you should avoid strumming…', ['The low E and A strings', 'The B string', 'The high E string', 'The G string'], 0),
        q.single('Aiming your strum to start on the right string mainly improves…', ['How clean the chord sounds', 'How loud it is', 'Your tuning', 'Your finger pain'], 0),
      ],
    },
    V0Q0buwLvVA: {
      title: 'Three tips for finger pain',
      try: 'Use one tip from the video today and notice if your fingertips feel better after practice.',
      minutes: 5,
      questions: [
        q.tf('Using lighter pressure (just enough for a clean note) reduces finger pain.', true),
        q.single('Lighter-gauge strings are…', ['Easier on the fingers', 'Harder to press', 'Only for bass', 'Louder always'], 0),
      ],
    },
    E5do76H_mi0: {
      title: 'Easy two-chord songs',
      try: 'Play one of the two-chord songs from the video along with the recording, using A and D and four down strums.',
      minutes: 20,
      questions: [
        q.single('When playing along with a song, the most important thing is…', ['Keeping in time, even if a chord isn’t perfect', 'Every chord being perfect', 'Playing loudly', 'Stopping when you miss'], 0),
        q.tf('You can play real songs with just two chords.', true),
      ],
    },
    uBZsLmmOz9I: {
      title: 'Your first practice routine',
      try: 'Follow the routine from the video today: chord practice, one-minute changes, strumming, and a song.',
      minutes: 20,
      questions: [
        q.multi('Which are in a good beginner practice routine?', ['Chord practice', 'One-minute changes', 'Strumming', 'Only learning new chords'], [0, 1, 2]),
        q.single('Practising a little every day is…', ['Better than one long session a week', 'Worse than a long weekly session', 'Not needed', 'Only for experts'], 0),
      ],
    },
    '-SAo7bvQzmA': {
      title: 'Ready to move on?',
      try: 'Check yourself: can you change A to D smoothly about 30 times a minute and play a song along with the recording? If not, keep practising this module.',
      minutes: 5,
      questions: [
        q.tf('It’s fine to keep practising a module before moving on; there’s no rush.', true),
        q.single('A good sign you’re ready to move on is…', ['Your changes are smooth enough to play a song in time', 'You’ve watched every video once', 'Your fingers hurt', 'You bought a new guitar'], 0),
      ],
    },
  },
  checkpoint: programExam('A and D exam', [
    q.single('Which chord starts from the 4th string?', ['D', 'A', 'E', 'Em'], 0),
    q.single('Which chord starts from the 5th string?', ['A', 'D', 'E', 'G'], 0),
    q.single('In the A chord, all three fingers sit on the…', ['2nd fret', '1st fret', '3rd fret', 'Open strings'], 0),
    q.single('The D chord’s fingers are on the G, B and high E strings at…', ['Frets 2, 3 and 2', 'Frets 1, 1 and 1', 'Frets 5, 5 and 5', 'Open strings'], 0),
    q.single('A one-minute change is practised…', ['Without strumming, as many changes as possible in a minute', 'With a metronome at 200 BPM', 'Only once a week', 'While singing'], 0),
    q.tf('Moving fingers together as a shape is faster than one finger at a time.', true),
    q.single('A string buzzes in a chord. The most likely cause is…', ['A finger too far from the fret or not pressing enough', 'The pick is too thin', 'Your foot isn’t tapping', 'The strap is too long'], 0),
    q.single('A muted (dead) string in a chord is usually caused by…', ['Another finger touching it', 'Strumming too slowly', 'A new pick', 'Tuning sharp'], 0),
    q.single('Four down strums per bar means one strum on…', ['Each beat', 'Every other beat', 'Each chord change only', 'Beat 1 only'], 0),
    q.single('Counting “1 2 3 4” while you strum helps you…', ['Keep a steady rhythm', 'Tune the guitar', 'Press harder', 'Learn new chords'], 0),
    q.multi('Which help clean chords?', ['Fingertips, not pads', 'Close to the fret', 'Fingers arched over other strings', 'Thumb pressing the strings'], [0, 1, 2]),
    q.single('When playing D, you avoid hitting…', ['The two thickest strings', 'The two thinnest strings', 'The G string', 'Every string'], 0),
    q.tf('Lifting your fingers a long way off the strings slows down chord changes.', true),
    q.single('Your one-minute change score is low. What helps most?', ['Practise the change daily and track the score', 'Skip to a new chord', 'Practise only songs', 'Use a capo'], 0),
    q.single('A two-chord song is played by…', ['Changing between the two chords in time with the song', 'Holding one chord', 'Playing single notes', 'Strumming as fast as you can'], 0),
    q.single('If you can’t change chords in time, you should…', ['Keep strumming and catch up, rather than stop', 'Stop the song', 'Strum faster', 'Play louder'], 0),
    q.order('Put the steps for learning a new chord in order.', ['Look at the chord chart', 'Place each finger', 'Play each string to check it', 'Strum the chord', 'Practise changing to it']),
    q.single('Lighter pressure on the strings helps…', ['Reduce finger pain and tension', 'Make the notes buzz', 'Tune the guitar', 'Make chords louder'], 0),
    q.tf('Daily short practice beats occasional long practice for building skill.', true),
    q.single('Before moving on to the next module, you should be able to…', ['Change between A and D smoothly enough to play a song', 'Play every chord on the guitar', 'Play a solo', 'Read sheet music'], 0),
  ]),
};
