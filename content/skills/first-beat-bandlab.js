import { q } from '../../src/lib/content/plan';

// BandLab's own free tutorials for BandLab Studio, a free music studio that runs in the
// browser (and on phones), so there's nothing to buy or install.

export default {
  slug: 'skill-first-beat-bandlab',
  title: 'Start music production: make your first beat',
  description: 'Use BandLab’s free browser studio to program drums, write chords and a bass line, and mix a finished beat.',
  makeTitle: 'A one-minute beat, mixed and shared',
  skillId: 'music-production',
  by: 'BandLab',
  modules: [
    {
      title: 'Find your way around the studio',
      lessons: [
        {
          id: 'NmUaIoydldg',
          title: 'A tour of BandLab Studio',
          seconds: 966,
          try: 'Make a free BandLab account at bandlab.com, open Studio and create an empty project. Add one instrument track and one drum track.',
          minutes: 20,
          questions: [
            q.single('A DAW (digital audio workstation) is…', ['Software for recording, arranging and mixing music', 'A type of microphone', 'A drum machine only', 'A music streaming service'], 0),
            q.tf('BandLab Studio runs in a web browser.', true),
          ],
        },
        {
          id: 'S96P06ml8Cg',
          title: 'Make your first beat',
          seconds: 643,
          try: 'Program a four-bar drum loop: kick on beats 1 and 3, snare on 2 and 4, hi-hats on every eighth note.',
          minutes: 30,
          questions: [
            q.single('In most pop and hip-hop beats, the snare lands on…', ['Beats 2 and 4', 'Beat 1 only', 'Every beat', 'Beats 1 and 3'], 0),
            q.single('BPM measures…', ['The tempo, in beats per minute', 'How loud the track is', 'The key of the song', 'The number of tracks'], 0),
          ],
        },
      ],
    },
    {
      title: 'Write the music',
      lessons: [
        {
          id: 'DJy2Ba9t1ns',
          title: 'Compose your own music',
          seconds: 611,
          try: 'Add a keys or synth track and write a four-chord progression over your drum loop.',
          minutes: 40,
          questions: [
            q.tf('A loop of four chords is enough for a whole beat.', true),
          ],
        },
        {
          id: 'MSAT4WD8_Fc',
          title: 'Make a bass line from your chords',
          seconds: 418,
          try: 'Write a bass line that plays the root note of each chord, then try one of the other two ways from the video.',
          minutes: 30,
          questions: [
            q.single('The simplest bass line plays…', ['The root note of each chord', 'Random notes', 'Only the highest note', 'Nothing on beat 1'], 0),
          ],
        },
        {
          id: '2T__j7Ypefo',
          title: 'Create 808 beats',
          seconds: 502,
          try: 'Swap your bass for an 808 and line its notes up with the kick drum.',
          minutes: 30,
          questions: [
            q.tf('An 808 is a deep, booming bass drum sound named after a classic drum machine.', true),
          ],
        },
        {
          id: '9D1HkCTVriA',
          title: 'Add swing',
          seconds: 421,
          try: 'Add swing to your hi-hats and listen to how the groove changes. Keep the amount you like.',
          minutes: 15,
          questions: [
            q.single('Swing makes a beat feel…', ['Less robotic, more human', 'Faster', 'Louder', 'Out of tune'], 0),
          ],
        },
        {
          id: 'GzfjsmoDdTY',
          title: 'Create fills',
          seconds: 332,
          try: 'Add a short drum fill at the end of every fourth bar.',
          minutes: 20,
          questions: [
            q.tf('A fill at the end of a section tells the listener something new is coming.', true),
          ],
        },
      ],
    },
    {
      title: 'Mix and finish',
      lessons: [
        {
          id: 'YtSWnYw-VEU',
          title: 'Set your levels',
          seconds: 540,
          try: 'Balance your track volumes so the kick and snare are clear and nothing goes into the red.',
          minutes: 20,
          questions: [
            q.tf('If a track’s meter hits the red, it may be clipping (distorting).', true),
          ],
        },
        {
          id: 'XeEXPSYlIEQ',
          title: 'Use effects to improve your mix',
          seconds: 653,
          try: 'Add reverb to one instrument and compression to the drums. Compare with the effects on and off.',
          minutes: 25,
          questions: [
            q.match('Match the effect to what it does.', [['Reverb', 'Adds a sense of space'], ['Compressor', 'Evens out loud and quiet parts'], ['EQ', 'Boosts or cuts frequencies']]),
          ],
        },
        {
          id: 'fea3mmvaecY',
          title: 'Mix for clarity',
          seconds: 711,
          try: 'Finish a one-minute beat, export or publish it, and log the link as your make.',
          minutes: 45,
          questions: [
            q.single('If the bass and kick sound muddy together, a common fix is to…', ['Use EQ so each has its own space', 'Turn everything up', 'Add more reverb to both', 'Delete the drums'], 0),
          ],
        },
      ],
    },
  ],
};
