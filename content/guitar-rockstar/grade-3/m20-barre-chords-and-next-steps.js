import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Barre chords, vibrato and becoming intermediate',
  lessons: {
    JfwKPb1zusw: {
      title: 'Double strumming',
      try: 'Learn the double strumming mechanics from the video slowly on one chord, then try it in a song.',
      minutes: 15,
      questions: [
        q.single('New strumming techniques should be learned…', ['Slowly on one chord first', 'At full speed in a song', 'Without listening', 'Only with distortion'], 0),
        q.tf('Strumming techniques add texture and energy to simple chord parts.', true),
      ],
    },
    sQBTFxIPeSc: {
      title: 'Songwriting tips',
      try: 'Use two tips from the video to finish (or start) a song with a verse and chorus.',
      minutes: 30,
      questions: [
        q.single('A chorus usually…', ['Repeats and carries the song’s main idea', 'Appears once', 'Has no lyrics', 'Is always instrumental'], 0),
        q.tf('Finishing songs, even imperfect ones, makes you a better songwriter.', true),
      ],
    },
    vu40aw1CwBQ: {
      title: 'Use Guitar Pro like a pro',
      try: 'Open a tab in Guitar Pro or a free tab player, loop a hard section and slow it down to practise it.',
      minutes: 20,
      questions: [
        q.single('Tab software lets you…', ['Hear the tab, slow it down and loop sections', 'Tune the guitar', 'Record vocals only', 'Change strings'], 0),
        q.tf('Looping a short hard section at a slower speed is an efficient way to practise.', true),
      ],
    },
    NumkX1hVXZU: {
      title: 'Stuck with your practice?',
      try: 'Write down one thing that feels stuck and try one fix from the video for a week.',
      minutes: 15,
      questions: [
        q.single('When you feel stuck, a good move is…', ['Change your routine or set a new, specific goal', 'Stop playing', 'Only play what you know', 'Practise faster'], 0),
        q.tf('Plateaus are a normal part of learning an instrument.', true),
      ],
    },
    i9yDenSMpJk: {
      title: 'Vibrato',
      try: 'Hold a note on the G string and add vibrato by bending it slightly up and back in a steady rhythm.',
      minutes: 20,
      questions: [
        q.single('Vibrato is…', ['A repeated small change in pitch that makes a note sing', 'A type of chord', 'A tuning', 'A strumming pattern'], 0),
        q.single('Good vibrato is usually…', ['Even and controlled', 'Random and wild', 'Silent', 'Only on open strings'], 0),
      ],
    },
    ZYbxYoG6Mo0: {
      title: 'Easy barre chords',
      try: 'Play an E-shape barre chord at the 3rd fret (G) and an A-shape barre at the 3rd fret (C). Move each one up and name the new chords.',
      minutes: 30,
      questions: [
        q.single('An E-shape barre chord has its root on…', ['The low E string', 'The A string', 'The D string', 'The G string'], 0),
        q.single('An A-shape barre chord has its root on…', ['The A string', 'The low E string', 'The B string', 'The high E string'], 0),
        q.tf('Barre chords are movable, so one shape gives you every major chord.', true),
      ],
    },
    tV9lLqj84PE: {
      title: 'Record yourself playing',
      try: 'Record a full performance of a song from Grade 3 on your phone or computer, and listen back for one thing to improve.',
      minutes: 30,
      questions: [
        q.single('Listening back to recordings helps you…', ['Hear timing, tone and mistakes you miss while playing', 'Tune faster', 'Skip practice', 'Change key'], 0),
        q.tf('Even a phone recording is useful for checking your playing.', true),
      ],
    },
    'u-MVl9uNFrE': {
      title: 'Beat practice anxiety',
      try: 'Set a small, realistic goal for today’s practice and notice how you feel when you meet it.',
      minutes: 10,
      questions: [
        q.single('Small, achievable practice goals help because…', ['Wins build confidence and reduce anxiety', 'They are boring', 'They take longer', 'They avoid progress'], 0),
        q.tf('Comparing yourself to professionals often makes practice feel worse.', true),
      ],
    },
    TWbJMW0L_GA: {
      title: 'From beginner to intermediate',
      try: 'Record your best performance from this program (a song with barre or power chords and some lead or fingerstyle) and log it as your make.',
      minutes: 30,
      questions: [
        q.multi('Which help bridge the gap to intermediate?', ['Clear goals', 'Regular focused practice', 'Learning complete songs', 'Avoiding new techniques'], [0, 1, 2]),
        q.single('An intermediate player can usually…', ['Play many songs, barre chords and simple lead parts confidently', 'Only strum D and A', 'Play every style perfectly', 'Not read tab'], 0),
      ],
    },
  },
  checkpoint: programExam('Barre chords and next steps exam', [
    q.single('An E-shape barre chord at the 5th fret is…', ['A major', 'E major', 'C major', 'D major'], 0),
    q.single('An E-shape barre chord at the 3rd fret is…', ['G major', 'F major', 'A major', 'C major'], 0),
    q.single('An A-shape barre chord at the 3rd fret is…', ['C major', 'A major', 'D major', 'B♭ major'], 0),
    q.single('An A-shape barre chord at the 5th fret is…', ['D major', 'E major', 'A major', 'C major'], 0),
    q.single('To make an E-shape barre chord minor, you…', ['Use the Em shape behind the barre', 'Move it up a fret', 'Add a pinky', 'Remove the barre'], 0),
    q.tf('Barre chords let you play any major or minor chord with a few movable shapes.', true),
    q.single('Vibrato is…', ['A controlled, repeated small pitch change', 'A strumming style', 'A tuning', 'A chord type'], 0),
    q.single('Good vibrato is…', ['Even and in control', 'Random', 'Only very wide', 'Not used in music'], 0),
    q.single('Tab software is useful for…', ['Looping and slowing hard sections', 'Changing strings', 'Tuning', 'Singing'], 0),
    q.multi('Which help when you feel stuck?', ['A new specific goal', 'Changing your routine', 'Learning a new song', 'Quitting for a year'], [0, 1, 2]),
    q.single('Recording yourself mainly helps you…', ['Hear what to improve', 'Get louder', 'Avoid practice', 'Change key'], 0),
    q.tf('A practice plateau is a normal part of learning.', true),
    q.single('A song’s chorus usually…', ['Repeats and carries the main idea', 'Happens once', 'Is the intro', 'Is silent'], 0),
    q.single('Small, achievable practice goals help reduce…', ['Anxiety and frustration', 'Progress', 'Fun', 'Skill'], 0),
    q.order('Put the steps for finding a barre chord in order.', ['Choose the chord you need', 'Find its root on the low E or A string', 'Use the matching E-shape or A-shape', 'Barre and play it']),
    q.single('To find B♭ with an A-shape barre, you play it at the…', ['1st fret', '3rd fret', '5th fret', '7th fret'], 0),
    q.single('To find F♯ minor with an E-shape barre, you play it at the…', ['2nd fret', '4th fret', '1st fret', '6th fret'], 0),
    q.tf('Finishing whole songs is one of the best signs of progress.', true),
    q.multi('Which have you learned across the Guitar Rockstar program?', ['Open chords and strumming', 'Barre and power chords', 'Scales, improvising and the blues', 'Classical sight-reading'], [0, 1, 2]),
    q.single('After this program, a good next step is…', ['Set new goals, learn more songs and keep a regular routine', 'Stop practising', 'Only play Grade 1 songs', 'Sell the guitar'], 0),
  ]),
};
