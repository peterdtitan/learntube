import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Dm, the metronome, tabs and the most common strumming pattern',
  lessons: {
    qYx8r0EtGsE: {
      title: 'Stretching exercises for short fingers',
      try: 'Do the stretching exercises from the video gently for five minutes as a warm-up. Stop if anything hurts.',
      minutes: 10,
      questions: [
        q.single('Finger stretches should be done…', ['Gently, stopping if anything hurts', 'As hard as possible', 'Only after long sessions', 'With a heavy weight'], 0),
        q.tf('Short fingers can still play guitar well with good technique and practice.', true),
      ],
    },
    '8mFF8NYVdtI': {
      title: 'The Dm chord',
      try: 'Place Dm and play from the D string. Then change between D and Dm, and Am and Dm.',
      minutes: 15,
      questions: [
        q.single('Which is the lowest string you strum for Dm?', ['The D string', 'The A string', 'The low E', 'The G string'], 0),
        q.single('D, Dm, A and Am all avoid which string?', ['The low E', 'The high E', 'The B string', 'The G string'], 0),
      ],
    },
    sNa44EmrsDc: {
      title: 'How and why to use a metronome',
      try: 'Set a metronome to 60 BPM and strum four down strums per chord in time, then try 70 BPM.',
      minutes: 10,
      questions: [
        q.single('A metronome…', ['Clicks a steady beat so you can practise in time', 'Tunes the guitar', 'Records you', 'Counts chords'], 0),
        q.single('When a metronome is too fast for clean playing, you should…', ['Slow it down', 'Turn it off', 'Speed it up', 'Play louder'], 0),
      ],
    },
    '6LmQCdt_ZhQ': {
      title: 'The most common strumming pattern',
      try: 'Learn the pattern “down, down-up, up-down-up” on one chord, then use it over a two-chord change.',
      minutes: 20,
      questions: [
        q.single('The pattern shown as D DU UDU has how many down strums?', ['3', '2', '4', '6'], 0),
        q.single('In D DU UDU, which beat is “missed” (no strum on the way down)?', ['Beat 3', 'Beat 1', 'Beat 2', 'Beat 4'], 0),
        q.tf('Even when you miss a strum, your hand keeps moving down and up in time.', true),
      ],
    },
    '9xsG7n4Jalo': {
      title: 'How to read tabs',
      try: 'Read a short tab from the video and play it slowly. Say the string and fret of each note as you go.',
      minutes: 15,
      questions: [
        q.single('In guitar tab, each line is…', ['A string', 'A fret', 'A beat', 'A finger'], 0),
        q.single('In tab, the bottom line is…', ['The low (thick) E string', 'The high E string', 'The A string', 'The G string'], 0),
        q.single('A 0 on a tab line means…', ['Play that string open', 'Don’t play it', 'Mute it', 'Use finger 0'], 0),
      ],
    },
    Li4urYsFbHQ: {
      title: 'Sunshine of Your Love riff',
      try: 'Learn the Sunshine of Your Love riff from tab, slowly, then with a metronome.',
      minutes: 20,
      questions: [
        q.tf('Practising riffs with a metronome improves timing.', true),
        q.single('When a riff gets tangled, you should…', ['Slow down and practise the hard part alone', 'Play faster', 'Give up', 'Change strings'], 0),
      ],
    },
    CWL_O9kR_b0: {
      title: 'Easy minor chord songs',
      try: 'Play a song from the video using Am, Dm and Em.',
      minutes: 20,
      questions: [
        q.multi('Which minor chords do you know now?', ['Am', 'Dm', 'Em', 'Bm'], [0, 1, 2]),
        q.tf('Am, Dm and Em together can make a whole song.', true),
      ],
    },
    wZ15h9ryY5E: {
      title: 'Module practice routine',
      try: 'Follow the routine for a week, using a metronome for your strumming practice.',
      minutes: 20,
      questions: [
        q.single('A metronome in your routine helps…', ['Build steady timing', 'Learn chord names', 'Tune strings', 'Avoid finger pain'], 0),
        q.tf('Writing down the metronome speed you reached helps track progress.', true),
      ],
    },
  },
  checkpoint: programExam('Dm, metronome and tabs exam', [
    q.single('Dm is played from which string?', ['D', 'A', 'Low E', 'B'], 0),
    q.single('Which chord does NOT avoid the low E string?', ['E', 'D', 'A', 'Dm'], 0),
    q.single('BPM on a metronome means…', ['Beats per minute', 'Bars per measure', 'Basic picking motion', 'Bass per minute'], 0),
    q.single('A metronome at 60 BPM clicks…', ['Once a second', 'Twice a second', 'Once a minute', '60 times a second'], 0),
    q.tf('Speed up the metronome only when you can play cleanly at the current speed.', true),
    q.single('The “most common” strumming pattern is often written…', ['D DU UDU', 'D D D D', 'U U U U', 'DU DU DU DU'], 0),
    q.single('In D DU UDU, which strum lands on beat 1?', ['The first down', 'An up', 'None', 'The last up'], 0),
    q.single('Missing a strum on beat 3 means your hand…', ['Still moves down, just above the strings', 'Stops', 'Moves up instead', 'Pauses for a beat'], 0),
    q.single('In tab, numbers on the lines tell you…', ['Which fret to play on that string', 'Which finger to use', 'How many times to strum', 'The beat'], 0),
    q.single('In tab, the top line is…', ['The high (thin) E string', 'The low E string', 'The A string', 'The D string'], 0),
    q.single('A 3 on the A-string line means…', ['Play the 3rd fret on the A string', 'Play the A string three times', 'Use finger 3 anywhere', 'Skip three beats'], 0),
    q.single('Two numbers stacked vertically in tab mean…', ['Play those notes together', 'Play them one after the other', 'Repeat twice', 'Mute them'], 0),
    q.tf('Tab shows you where to play but often not exactly how long each note lasts.', true),
    q.multi('Which help you learn a riff?', ['Reading the tab slowly', 'Using a metronome', 'Practising the hard part alone', 'Always playing at full speed'], [0, 1, 2]),
    q.single('Stretching exercises are best done…', ['Gently, as a warm-up', 'Until it hurts', 'Only once a month', 'After you’ve finished for the day only'], 0),
    q.single('Am, Dm and Em are all…', ['Minor chords', 'Major chords', 'Power chords', 'Barre chords'], 0),
    q.order('Put using a metronome in order.', ['Pick a slow tempo you can play cleanly', 'Play along for a few minutes', 'Raise the tempo a little', 'Repeat while it stays clean']),
    q.single('Old Faithful (D DU UDU) suits…', ['Many pop and rock songs in 4/4', 'Only waltzes', 'Only blues', 'Nothing'], 0),
    q.tf('A metronome reveals rushing and dragging you may not notice on your own.', true),
    q.single('Changing D to Dm involves…', ['Moving fingers on the top strings while keeping the D-string root', 'Moving to the low E', 'A capo', 'A barre'], 0),
  ]),
};
