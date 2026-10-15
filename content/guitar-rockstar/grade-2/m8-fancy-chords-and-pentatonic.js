import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Fancy chords, your first scale and muting',
  lessons: {
    p5lJTSCUclo: {
      title: 'Nine fancy chords every beginner should know',
      try: 'Learn three of the fancy chords from the video and use one in place of a plain chord in a song you know.',
      minutes: 30,
      questions: [
        q.single('A “sus” chord replaces the chord’s third with…', ['The second or the fourth', 'The fifth', 'The octave', 'Nothing'], 0),
        q.single('Swapping a plain chord for a fancier version of it mainly changes…', ['Its colour and mood', 'The song’s key', 'The tempo', 'The tuning'], 0),
        q.tf('Many “fancy” chords are open chords with one finger moved or added.', true),
      ],
    },
    xSFHgeJUuIs: {
      title: 'Fast, clean chord changes',
      try: 'Pick your two slowest changes and do one-minute changes on each, recording the scores.',
      minutes: 10,
      questions: [
        q.single('Clean changes come from…', ['Placing all fingers together accurately', 'Sliding every finger', 'Pressing harder', 'Strumming faster'], 0),
        q.tf('Slow, accurate practice builds fast changes.', true),
      ],
    },
    eEJpypexUDg: {
      title: 'The E minor pentatonic scale',
      try: 'Play the E minor pentatonic scale in open position up and down with alternate picking, slowly, to a metronome.',
      minutes: 20,
      questions: [
        q.single('“Pentatonic” means the scale has…', ['Five notes', 'Seven notes', 'Eight notes', 'Twelve notes'], 0),
        q.single('Which notes make the E minor pentatonic scale?', ['E, G, A, B, D', 'E, F, G, A, B', 'C, D, E, G, A', 'E, G♯, B, D'], 0),
        q.tf('The minor pentatonic is the most used scale for rock and blues soloing.', true),
      ],
    },
    '4SPgTAAiPw4': {
      title: 'Mute unwanted notes',
      try: 'Play the pentatonic scale again and stop strings ringing on by resting a finger lightly on them as you move on.',
      minutes: 15,
      questions: [
        q.single('Lightly resting a finger on a string without pressing it down…', ['Mutes it', 'Plays a harmonic always', 'Tunes it', 'Makes it louder'], 0),
        q.tf('Both hands can help mute strings you don’t want to sound.', true),
      ],
    },
    ImPcqr6w6zM: {
      title: 'A groovy strumming pattern',
      try: 'Learn the groovy pattern in the three steps from the video, then play it over a two-chord change.',
      minutes: 15,
      questions: [
        q.single('Breaking a strumming pattern into steps helps because…', ['You master each part before combining them', 'It is faster to skip parts', 'It changes the key', 'It needs no practice'], 0),
        q.tf('A pattern sounds “groovy” mostly because of where the accents and gaps fall.', true),
      ],
    },
    XsLrZpdQHlw: {
      title: 'Using a pick when strumming',
      try: 'Experiment with how tightly you hold the pick and how much tip shows. Find the grip that strums smoothly without dropping it.',
      minutes: 10,
      questions: [
        q.single('Holding the pick too tightly while strumming usually sounds…', ['Harsh and stiff', 'Smooth', 'Quiet', 'In tune'], 0),
        q.single('A slightly loose grip with a little tip showing gives…', ['Smoother strumming', 'A dropped pick every time', 'Louder buzz', 'Tuning problems'], 0),
      ],
    },
    WMPpiwWq3Yg: {
      title: 'Songs for advancing beginners',
      try: 'Pick a song from the video and learn it all the way through, using one fancy chord.',
      minutes: 20,
      questions: [
        q.tf('Learning complete songs is the best test of your skills.', true),
        q.single('When learning a new song, start with…', ['The chords and changes slowly', 'Full speed straight away', 'Only the ending', 'The solo'], 0),
      ],
    },
    Abrd0c92xRE: {
      title: 'Open notes on the guitar',
      try: 'Name every note on the first three frets of the low E and A strings out loud.',
      minutes: 15,
      questions: [
        q.single('The 3rd fret on the low E string is…', ['G', 'F', 'A', 'E'], 0),
        q.single('The 2nd fret on the A string is…', ['B', 'C', 'A♯', 'D'], 0),
      ],
    },
    YnHo_L5d9YQ: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week: fancy chords, the pentatonic scale, muting and your groovy strumming pattern.',
      minutes: 20,
      questions: [
        q.single('Adding scales to your routine mainly builds…', ['Single-note skill for riffs and solos', 'Chord changes', 'Tuning', 'Strumming dynamics'], 0),
        q.tf('A routine that mixes chords, scales and songs builds all-round skill.', true),
      ],
    },
  },
  checkpoint: programExam('Fancy chords and pentatonic exam', [
    q.single('A sus2 chord replaces the third with…', ['The second', 'The fourth', 'The fifth', 'The seventh'], 0),
    q.single('A sus4 chord replaces the third with…', ['The fourth', 'The second', 'The sixth', 'The octave'], 0),
    q.single('Sus chords sound…', ['Open and unresolved, neither major nor minor', 'Clearly minor', 'Clearly major', 'Out of tune'], 0),
    q.single('“Pentatonic” scales have…', ['Five notes', 'Six notes', 'Seven notes', 'Eight notes'], 0),
    q.single('The E minor pentatonic scale is…', ['E G A B D', 'E F♯ G A B C D', 'E G♯ B', 'A C D E G'], 0),
    q.single('In open position, E minor pentatonic uses…', ['Open strings and the 2nd and 3rd frets', 'Only the 12th fret', 'Barre chords', 'Only open strings'], 0),
    q.tf('The minor pentatonic is widely used in rock and blues solos.', true),
    q.single('Muting a string means…', ['Stopping it ringing, by lightly touching it', 'Tuning it lower', 'Removing it', 'Hitting it harder'], 0),
    q.multi('Which can mute unwanted strings?', ['The fretting hand lightly touching them', 'The picking hand’s palm', 'Accurate strumming', 'A tighter capo'], [0, 1, 2]),
    q.single('Holding the pick too tightly makes strumming…', ['Stiff and harsh', 'Smoother', 'Quieter', 'Faster'], 0),
    q.single('The 1st fret on the B string is…', ['C', 'B♯ only', 'C♯', 'A'], 0),
    q.single('The 1st fret on the high E string is…', ['F', 'E♯ only', 'F♯', 'G'], 0),
    q.single('The 2nd fret on the D string is…', ['E', 'D♯', 'F', 'C'], 0),
    q.single('The 2nd fret on the G string is…', ['A', 'G♯', 'B', 'F'], 0),
    q.order('Put the notes of E minor pentatonic in order from E.', ['E', 'G', 'A', 'B', 'D']),
    q.tf('Learning the note names on the first frets helps you understand chords and scales.', true),
    q.single('Using a fancier version of a chord (like Cadd9 for C) changes…', ['The colour, not the basic function', 'The key of the song', 'The tempo', 'The time signature'], 0),
    q.single('Alternate picking a scale means…', ['Down, up, down, up on each note', 'Down on every note', 'Strumming chords', 'Using your thumb only'], 0),
    q.single('The best way to learn a new strumming pattern is…', ['In small steps, slowly, then combined', 'At full speed immediately', 'Only by reading it', 'Without counting'], 0),
    q.multi('Which belong in this module’s practice?', ['Fancy chords', 'The pentatonic scale', 'Muting', 'Barre chords up the neck'], [0, 1, 2]),
  ]),
};
