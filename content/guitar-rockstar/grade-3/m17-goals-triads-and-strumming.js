import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Goals, triads and strumming control',
  lessons: {
    'Tx_O4M-h9j8': {
      title: 'SMART guitar goals',
      try: 'Write one SMART guitar goal for the next month (for example, “play song X at full speed with no stops by the 30th”).',
      minutes: 20,
      questions: [
        q.single('SMART goals are…', ['Specific, Measurable, Achievable, Relevant and Time-bound', 'Short, Musical, Artistic, Real and Tough', 'Only about speed', 'Secret'], 0),
        q.single('Which is a SMART guitar goal?', ['Play “Wonderwall” cleanly at full tempo by the end of next month', 'Get better at guitar', 'Practise sometimes', 'Be amazing'], 0),
      ],
    },
    im38gJcca70: {
      title: 'C chord shape variations',
      try: 'Play the C shape variations from the video and use two of them to make a short progression.',
      minutes: 20,
      questions: [
        q.single('Moving or adding one finger on a C shape mainly changes…', ['The chord’s colour', 'The key of every song', 'The tempo', 'The tuning'], 0),
        q.tf('Open chord shapes can be decorated with extra notes on the top strings.', true),
      ],
    },
    '2hXBMXrdX0k': {
      title: 'Target each string while strumming',
      try: 'Do the exercises from the video: aim strums at just the bass strings, then just the top strings, keeping the down-up motion.',
      minutes: 20,
      questions: [
        q.single('Targeting strings while strumming lets you…', ['Choose which part of a chord sounds', 'Tune strings', 'Play louder only', 'Avoid chords'], 0),
        q.tf('Hitting the bass note first and then the rest of the chord gives a fuller rhythm part.', true),
      ],
    },
    'nUnQgMs4k-0': {
      title: 'Thumb and finger strums',
      try: 'Strum down with your thumb and up with your index finger over a chord progression for three minutes.',
      minutes: 15,
      questions: [
        q.single('Strumming with the thumb usually sounds…', ['Softer and warmer than a pick', 'Brighter than a pick', 'Distorted', 'Silent'], 0),
        q.tf('Fingers and thumb can replace a pick for gentle strumming.', true),
      ],
    },
    U9UKn6ycg4s: {
      title: 'Easy triads',
      try: 'Play C, F and G triads on the top three strings and use them over a strummed progression.',
      minutes: 20,
      questions: [
        q.single('A triad is…', ['A three-note chord: root, third and fifth', 'Any chord with four notes', 'A scale', 'A tuning'], 0),
        q.single('Playing triads on the top strings is useful because…', ['They cut through without clashing with bass or other guitars', 'They are louder', 'They need a capo', 'They avoid notes'], 0),
      ],
    },
    slGPJSlzHmg: {
      title: 'Put feeling into your playing',
      try: 'Play a song twice: once just “getting through it”, once thinking about the emotion of the lyrics. Record both and compare.',
      minutes: 15,
      questions: [
        q.single('Playing with feeling mostly comes from…', ['Connecting to the emotion of the music', 'Playing faster', 'Using more effects', 'Playing more notes'], 0),
        q.tf('Technique serves expression, not the other way round.', true),
      ],
    },
    Gt7jdWnvc9I: {
      title: 'How to use reverb',
      try: 'Using an amp, pedal or app, compare little, medium and lots of reverb on the same riff.',
      minutes: 20,
      questions: [
        q.single('Reverb makes a sound seem…', ['Like it is in a bigger space', 'Out of tune', 'Shorter', 'Distorted'], 0),
        q.single('Too much reverb usually makes playing sound…', ['Washed out and unclear', 'Tighter', 'Louder', 'Drier'], 0),
      ],
    },
    aTDzh6ZyZbU: {
      title: 'Learn riffs by ear, not tab',
      try: 'Work out a short, simple riff by ear before looking at any tab.',
      minutes: 20,
      questions: [
        q.single('Working out riffs by ear improves…', ['Your ear and musical memory', 'Only reading', 'Tuning', 'Strumming'], 0),
        q.tf('Starting with the first note and finding it by trial is a good way to begin.', true),
      ],
    },
    wUYn9BJ3RVU: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week, working towards your SMART goal.',
      minutes: 20,
      questions: [
        q.tf('Linking daily practice to a clear goal keeps you motivated.', true),
        q.single('Which belongs in this module’s practice?', ['Triads and targeted strumming', 'Only tuning', 'Only theory', 'Nothing'], 0),
      ],
    },
  },
  checkpoint: programExam('Goals, triads and strumming exam', [
    q.single('The M in SMART goals stands for…', ['Measurable', 'Musical', 'Major', 'Minor'], 0),
    q.single('The T in SMART goals stands for…', ['Time-bound', 'Technical', 'Tuned', 'Triad'], 0),
    q.single('“Get better at guitar” is a weak goal because…', ['It isn’t specific or measurable', 'It is too short', 'It is about guitar', 'It has a deadline'], 0),
    q.single('A triad has…', ['Three notes', 'Two notes', 'Four notes', 'Six notes'], 0),
    q.single('A major triad is…', ['Root, major third and fifth', 'Root, fourth and fifth', 'Root and fifth only', 'Root, second and sixth'], 0),
    q.single('The notes of a G major triad are…', ['G, B and D', 'G, A and B', 'G, C and E', 'G, B♭ and D'], 0),
    q.single('The notes of an F major triad are…', ['F, A and C', 'F, G and A', 'F, A♭ and C', 'F, B and D'], 0),
    q.tf('Triads on the top strings are useful when playing with another guitarist.', true),
    q.single('Strumming just the bass strings, then the rest, creates…', ['A bass-strum pattern', 'A tuning', 'A barre', 'A bend'], 0),
    q.single('Thumb strums usually sound…', ['Warm and soft', 'Bright and sharp', 'Distorted', 'Muted'], 0),
    q.single('Reverb simulates…', ['The sound of a room or space', 'Distortion', 'A second guitar', 'A tuner'], 0),
    q.single('Too much reverb makes a part…', ['Muddy and washed out', 'Clearer', 'Drier', 'Faster'], 0),
    q.multi('Which help you play with more feeling?', ['Connecting to the lyrics and emotion', 'Dynamics', 'Listening back to recordings', 'Ignoring the song’s mood'], [0, 1, 2]),
    q.single('Learning riffs by ear trains…', ['Your ear and memory', 'Your reading only', 'Your strap', 'Your tuning'], 0),
    q.order('Put setting a SMART goal in order.', ['Choose a specific skill or song', 'Decide how you will measure success', 'Check it is achievable', 'Set a deadline', 'Plan your practice towards it']),
    q.tf('Decorating open chord shapes with extra notes adds colour.', true),
    q.single('A C triad on the top three strings in open position includes…', ['C, E and G', 'C, D and E', 'C, F and A', 'C, E♭ and G'], 0),
    q.single('Targeted strumming means…', ['Hitting only the strings you choose', 'Strumming as hard as possible', 'Strumming upwards only', 'Muting all strings'], 0),
    q.single('A minor triad differs from a major triad by…', ['A flattened (minor) third', 'A missing root', 'An added seventh', 'A sharpened fifth'], 0),
    q.single('This module mainly builds…', ['Goal-setting, triads and strumming control', 'Barre chords', 'Songwriting only', 'Slide guitar'], 0),
  ]),
};
