import { q } from '../../src/lib/content/plan';

// The first three modules of JustinGuitar's free Beginner Course (Grade 1), trimmed to
// the four chords: D, A, E and Em.

export default {
  slug: 'skill-guitar-four-chords',
  title: 'Play your first four chords on guitar',
  description: 'Tune up, hold the guitar, and learn D, A, E and E minor well enough to strum real songs.',
  makeTitle: 'A two-minute recording of you strumming a song with all four chords',
  skillId: 'guitar',
  by: 'JustinGuitar',
  modules: [
    {
      title: 'Get set up',
      lessons: [
        {
          id: 'X2EmpWr9vUc',
          title: 'Tune your guitar',
          seconds: 426,
          try: 'Tune all six strings with a free tuner app or a clip-on tuner. Pluck each string and say its name: E A D G B E.',
          minutes: 10,
          questions: [
            q.order('Put the open strings in order from the thickest to the thinnest.', ['E', 'A', 'D', 'G', 'B', 'E (high)'], 'Thickest to thinnest: E A D G B E.'),
            q.tf('You should tune your guitar every time you pick it up.', true, 'Strings drift, so check before every practice.'),
          ],
        },
        {
          id: 'MlV6WhM9YhE',
          title: 'Hold the guitar properly',
          seconds: 255,
          try: 'Sit with the guitar for five minutes. Check that it stays put without your fretting hand holding it up.',
          minutes: 10,
          questions: [
            q.tf('Your fretting hand should hold up the weight of the guitar neck.', false, 'The body and strumming arm hold the guitar, so the fretting hand is free to move.'),
          ],
        },
        {
          id: 'VB0vWNqNMbA',
          title: 'Avoid finger pain',
          seconds: 215,
          try: 'Press one string behind a fret with each finger in turn, using just enough pressure for a clean note. Stop when your fingertips feel sore.',
          minutes: 10,
          questions: [
            q.single('Where should a fingertip press, for a clean note with the least effort?', ['Right on top of the fret', 'Just behind the fret', 'In the middle between two frets', 'Anywhere'], 1, 'Just behind the fret needs the least pressure.'),
          ],
        },
        {
          id: 'LlN2yrFQKzY',
          title: 'Read a chord chart',
          seconds: 193,
          try: 'Find the chart for D. Point to which string and fret each finger goes on, and which strings are marked X (not played).',
          minutes: 10,
          questions: [
            q.single('On a chord chart, what does an X above a string mean?', ['Play it open', "Don't play that string", 'Use your thumb', 'Mute it with the pick'], 1),
            q.single('On a chord chart, what does an O above a string mean?', ['Play it open, with no finger on it', "Don't play it", 'Press it at the first fret', 'Strum it twice'], 0),
          ],
        },
        {
          id: '-04Et5qIoa4',
          title: 'Hold a pick',
          seconds: 338,
          try: 'Hold a pick between your thumb and the side of your index finger and strum the open strings slowly for two minutes.',
          minutes: 10,
          questions: [
            q.tf('A thinner pick is usually easier for strumming chords when you start.', true, 'Thin and medium picks flex, which makes strumming smoother.'),
          ],
        },
      ],
    },
    {
      title: 'D and A',
      lessons: [
        {
          id: 'QkrIZBLZEXw',
          title: 'The D chord',
          seconds: 512,
          try: 'Play D one string at a time from the open D string. Fix any string that buzzes or is muted, then strum it four times.',
          minutes: 30,
          questions: [
            q.single('How many strings do you strum for an open D chord?', ['Six', 'Five', 'Four', 'Three'], 2, 'D is played on the top four strings, from the open D string.'),
          ],
        },
        {
          id: '1X2rW5ATdLQ',
          title: 'The A chord',
          seconds: 381,
          try: 'Play A one string at a time from the open A string, then strum it four times. Check the low E string stays quiet.',
          minutes: 30,
          questions: [
            q.single('Which string do you leave out when you strum A?', ['The low E string', 'The A string', 'The high E string', 'The G string'], 0),
          ],
        },
        {
          id: 'Se__aa_k-ms',
          title: 'The secret to fast chord changes',
          seconds: 181,
          try: 'Without strumming, change from D to A and back for one minute. Count how many changes you make and write it down.',
          minutes: 15,
          questions: [
            q.tf('One-minute changes are about counting how many times you can switch between two chords.', true, 'Write your score down each day to see yourself improve.'),
          ],
        },
        {
          id: 'mAgc7hr44WM',
          title: 'Faster chord changes',
          seconds: 321,
          try: 'Do another one-minute change between D and A. Try to beat your first score.',
          minutes: 15,
          questions: [
            q.single('When changing chords, it helps most to…', ['Move all fingers together as one shape', 'Put fingers down one at a time from the thickest string', 'Look away from the neck', 'Strum harder'], 0),
          ],
        },
        {
          id: 'n45PDizCRLw',
          title: 'Your first strumming pattern',
          seconds: 287,
          try: 'Strum four down strums per chord, D then A, counting "1 2 3 4" out loud. Keep going for two minutes without stopping.',
          minutes: 25,
          questions: [
            q.tf('Keeping your strumming arm moving steadily matters more than perfect chords at first.', true),
          ],
        },
        {
          id: '72MEHvT9JV4',
          title: 'Strum only the right strings',
          seconds: 134,
          try: 'Strum D and A ten times each, aiming to hit only the strings each chord uses.',
          minutes: 15,
          questions: [
            q.single('Strumming the low E string on a D chord makes it sound…', ['Brighter', 'Muddy and wrong', 'Exactly the same', 'Quieter'], 1),
          ],
        },
        {
          id: 'E5do76H_mi0',
          title: 'Easy two-chord songs',
          seconds: 347,
          try: 'Play one of the two-chord songs from the video all the way through with D and A.',
          minutes: 30,
          questions: [
            q.tf('You can play real songs with just two chords.', true),
          ],
        },
      ],
    },
    {
      title: 'Add E',
      lessons: [
        {
          id: '9NSoRXC9PJI',
          title: 'The E chord',
          seconds: 395,
          try: 'Play E one string at a time from the low E, then strum all six strings four times.',
          minutes: 30,
          questions: [
            q.single('How many strings do you strum for an open E chord?', ['Four', 'Five', 'Six', 'Three'], 2, 'E uses all six strings.'),
          ],
        },
        {
          id: 'McSfLPmXcLw',
          title: 'Anchor fingers between A, D and E',
          seconds: 143,
          try: 'Change A to E and E to D slowly, keeping any finger that can stay on the string in place.',
          minutes: 15,
          questions: [
            q.tf('An anchor finger stays on the string while you change chords, to guide the others.', true),
          ],
        },
        {
          id: 'JRhwvxl46-8',
          title: 'Strum on the beat',
          seconds: 398,
          try: 'Tap your foot and strum D on every beat for one minute, then do the same with E.',
          minutes: 20,
          questions: [
            q.single('Tapping your foot while you strum helps you…', ['Keep steady time', 'Tune the guitar', 'Hold the pick', 'Press the strings harder'], 0),
          ],
        },
        {
          id: '7VzPzBsm4sU',
          title: 'Strumming and changing together',
          seconds: 219,
          try: 'Strum four beats each of A, D and E in a loop for two minutes without stopping the strumming arm.',
          minutes: 20,
          questions: [
            q.tf('If a change is late, keep strumming in time rather than stopping.', true, 'Keeping the rhythm going is what makes it sound like music.'),
          ],
        },
        {
          id: 'p5Ln39q8cj4',
          title: 'Easy three-chord songs with A, D and E',
          seconds: 256,
          try: 'Play one of the A, D and E songs from start to finish, slowly if you need to.',
          minutes: 30,
          questions: [
            q.multi('Which chords have you learned so far?', ['A', 'D', 'E', 'F'], [0, 1, 2]),
          ],
        },
      ],
    },
    {
      title: 'E minor and your first songs',
      lessons: [
        {
          id: 'pbIqk8tTdbw',
          title: 'What minor chords are',
          seconds: 262,
          try: 'Strum E then Em (when you have it) and describe the difference in mood in one word each.',
          minutes: 10,
          questions: [
            q.single('Minor chords usually sound…', ['Happier than major chords', 'Sadder or darker than major chords', 'Exactly like major chords', 'Out of tune'], 1),
          ],
        },
        {
          id: 'lqcd3jVysXY',
          title: 'The E minor chord',
          seconds: 113,
          try: 'Play Em one string at a time, then strum it. Change between E and Em: only one finger moves.',
          minutes: 20,
          questions: [
            q.single('How do you get from E to E minor?', ['Lift your first finger off', 'Add your pinky', 'Move every finger up a fret', 'Mute the low E'], 0, 'Em is E without the first finger on the G string.'),
          ],
        },
        {
          id: 'U1TMGzcbbLE',
          title: 'Count the beats',
          seconds: 205,
          try: 'Count "1 and 2 and 3 and 4 and" out loud while strumming down on the numbers, for two minutes.',
          minutes: 15,
          questions: [
            q.tf('In "1 and 2 and…", down strums land on the numbers.', true),
          ],
        },
        {
          id: 'JrIxNphnhrM',
          title: 'Up strums',
          seconds: 382,
          try: 'Strum down on the numbers and up on the "ands" over an Em chord for two minutes.',
          minutes: 20,
          questions: [
            q.single('Up strums usually fall on…', ['The numbers', 'The "ands" between beats', 'Only beat 1', 'Nowhere, they are optional'], 1),
          ],
        },
        {
          id: 'IXL1bG_ao3c',
          title: 'Easy strumming patterns with up strums',
          seconds: 467,
          try: 'Pick one pattern from the video and play it over D, A, E and Em, two bars each.',
          minutes: 30,
          questions: [
            q.tf('Your strumming arm should keep moving down and up even when you skip a strum.', true, 'That keeps you in time.'),
          ],
        },
        {
          id: 'XxICTF-NIZ8',
          title: 'Songs with E minor',
          seconds: 126,
          try: 'Record yourself playing a song with all four chords for two minutes and log it as your make.',
          minutes: 45,
          questions: [
            q.multi('Which are your four chords?', ['D', 'A', 'E', 'Em', 'C'], [0, 1, 2, 3]),
          ],
        },
      ],
    },
  ],
};
