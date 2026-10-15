import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Dynamics and putting Grade 1 together',
  lessons: {
    lRJ_d3PqPIQ: {
      title: 'The eight open chords',
      try: 'Play all eight open chords (A, Am, C, D, Dm, E, Em, G) one after another, checking each one rings cleanly.',
      minutes: 15,
      questions: [
        q.multi('Which are among the eight Grade 1 open chords?', ['A', 'Dm', 'G', 'F'], [0, 1, 2]),
        q.single('An “open chord” uses…', ['Some open strings along with fretted notes', 'No open strings', 'A capo always', 'Only one string'], 0),
      ],
    },
    SNYMRZqopi8: {
      title: 'Practise the common chord changes',
      try: 'Do one-minute changes on the three changes you find hardest, and write down your scores.',
      minutes: 10,
      questions: [
        q.single('Which changes deserve the most practice?', ['The ones you find hardest', 'The ones you already play well', 'Random ones', 'None'], 0),
        q.tf('Some chord changes come up far more often in songs than others.', true),
      ],
    },
    '9CsY2PRzt94': {
      title: 'Fast chord changes',
      try: 'Practise visualising the next shape before you move, then move all fingers together. Beat your best one-minute score.',
      minutes: 10,
      questions: [
        q.single('Seeing the next chord shape in your head before moving…', ['Speeds up changes', 'Slows them down', 'Has no effect', 'Causes buzzing'], 0),
        q.tf('Fast changes come from economy of movement, not rushing.', true),
      ],
    },
    'p-Rj4svEyrA': {
      title: 'Strings ringing out between chords',
      try: 'Play a progression and listen between changes: stop unwanted strings ringing by keeping your strumming accurate and lifting fingers cleanly.',
      minutes: 10,
      questions: [
        q.single('Unwanted strings ringing out between changes usually come from…', ['Strumming strings that aren’t in the chord', 'A capo', 'Tuning', 'Thin strings'], 0),
        q.tf('Accurate strumming is as important as accurate fretting.', true),
      ],
    },
    mP4knhljqj0: {
      title: 'Strumming dynamics',
      try: 'Play a song twice: once all at the same volume, once with a quiet verse and a loud chorus. Compare how they feel.',
      minutes: 15,
      questions: [
        q.single('Dynamics in music means…', ['Changes in loudness', 'Changes in tuning', 'Changes in key', 'Changes in chords'], 0),
        q.single('A common dynamic choice is…', ['A softer verse and a louder chorus', 'Everything at maximum volume', 'Getting quieter in every bar', 'No change ever'], 0),
        q.tf('Strumming fewer strings, with a lighter touch, makes a part quieter.', true),
      ],
    },
    Rkke83Gvndk: {
      title: 'Memorise your songs',
      try: 'Memorise the chords of one song you can play, then play it without looking at the chord sheet.',
      minutes: 15,
      questions: [
        q.single('Memorising a song lets you…', ['Focus on rhythm and feel instead of reading', 'Play out of tune', 'Skip practice', 'Avoid chords'], 0),
        q.tf('Learning a song in sections (verse, chorus) makes it easier to memorise.', true),
      ],
    },
    bqUdZdhHGVI: {
      title: 'Start ear training',
      try: 'Play a chord and try to hear whether it’s major or minor without looking. Have a friend test you, or test yourself with recordings.',
      minutes: 10,
      questions: [
        q.single('Ear training helps you…', ['Recognise sounds, chords and notes by listening', 'Tune faster only', 'Strum harder', 'Read tabs'], 0),
        q.single('A simple first ear-training exercise is…', ['Telling major chords from minor chords', 'Naming every note in a symphony', 'Reading sheet music', 'Tuning without a tuner'], 0),
      ],
    },
    'mB54nIZ-CVs': {
      title: 'Why music theory matters',
      try: 'Write down the notes in a C major chord (C, E, G) and find each one in the chord shape on your guitar.',
      minutes: 10,
      questions: [
        q.single('A major chord is made of…', ['The root, the third and the fifth', 'Any three notes', 'Only the root', 'Two notes'], 0),
        q.tf('A little theory helps you understand why chords and songs work.', true),
      ],
    },
    BI3S9xSK8Iw: {
      title: 'How to pass Grade 1',
      try: 'Check yourself against the Grade 1 skills from the video. Note anything you need to practise before moving on.',
      minutes: 15,
      questions: [
        q.single('A key test of finishing Grade 1 is…', ['Changing between the open chords smoothly while strumming in time', 'Playing a fast solo', 'Knowing every scale', 'Playing barre chords'], 0),
        q.tf('Honest self-assessment helps you spot what still needs work.', true),
      ],
    },
    'n-NeP6CTHTc': {
      title: 'Grade 1 practice routine',
      try: 'Record yourself playing a full song with open chords and a strumming pattern, and log it as your make.',
      minutes: 30,
      questions: [
        q.order('Put a balanced practice session in order.', ['Warm up', 'Chord changes', 'Strumming or picking', 'Songs']),
        q.single('Recording a full song mainly shows…', ['How your chords, rhythm and dynamics sound together', 'How tuned the guitar is', 'Your posture only', 'Nothing useful'], 0),
      ],
    },
  },
  checkpoint: programExam('Grade 1 consolidation exam', [
    q.multi('Which are open chords from Grade 1?', ['C', 'Em', 'G', 'F'], [0, 1, 2]),
    q.single('Which Grade 1 chord is minor?', ['Dm', 'D', 'E', 'G'], 0),
    q.single('Which chord is played from the D string?', ['D', 'C', 'A', 'E'], 0),
    q.single('Which chord is played from the low E string?', ['E', 'C', 'Am', 'Dm'], 0),
    q.single('Dynamics are…', ['Changes in volume', 'Changes in speed', 'Changes in key', 'Changes in strings'], 0),
    q.single('A song often builds energy by…', ['Getting louder into the chorus', 'Getting quieter every bar', 'Never changing volume', 'Changing tuning'], 0),
    q.tf('Memorising songs lets you focus on feel and timing.', true),
    q.single('Ear training is…', ['Learning to recognise musical sounds by listening', 'Cleaning your ears', 'Tuning only', 'Reading music'], 0),
    q.single('A major chord’s three notes are called…', ['Root, third and fifth', 'First, second and third', 'Bass, middle and top', 'Low, mid and high'], 0),
    q.single('The notes of a C major chord are…', ['C, E and G', 'C, D and E', 'C, F and A', 'C, E♭ and G'], 0),
    q.single('Unwanted strings ringing between changes usually mean…', ['Strumming isn’t accurate enough', 'The guitar is broken', 'The capo is wrong', 'The strings are new'], 0),
    q.single('The quickest way to improve a weak chord change is…', ['Daily one-minute changes on it', 'Avoiding songs that use it', 'Learning a new chord', 'Strumming harder'], 0),
    q.tf('Thinking of the next shape before moving speeds up changes.', true),
    q.multi('Which belong in a Grade 1 practice routine?', ['Chord changes', 'Strumming patterns', 'Songs', 'Sweep picking'], [0, 1, 2]),
    q.single('You can play all eight chords but your rhythm keeps stopping. Focus on…', ['Keeping the strumming hand moving through changes', 'Learning more chords', 'Faster tempos', 'Barre chords'], 0),
    q.single('The pattern D DU UDU is commonly called…', ['Old Faithful', 'The waltz', 'The shuffle', 'The flamenco'], 0),
    q.single('6/8 accents fall on…', ['1 and 4', '2 and 4', '1 and 3', 'Every beat'], 0),
    q.single('A capo on the 3rd fret raises everything by…', ['Three half steps', 'Three whole steps', 'One octave', 'Nothing'], 0),
    q.order('Put these Grade 1 skills in the order you learned them.', ['Tuning and holding the guitar', 'A and D chords', 'Minor chords and up strums', 'G chord and 6/8 time', 'Dynamics']),
    q.single('Before moving on to Grade 2 you should be able to…', ['Play full songs with open chords and steady strumming', 'Play barre chords', 'Improvise solos', 'Read standard notation'], 0),
  ]),
};
