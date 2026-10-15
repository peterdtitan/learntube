import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Pro upgrades, jamming and Grade 2 consolidation',
  lessons: {
    t4MTCMslUXQ: {
      title: 'Slash chords',
      try: 'Learn three slash chords from the video, such as D/F♯, C/G and G/B, and use one in a song.',
      minutes: 30,
      questions: [
        q.single('In a slash chord like D/F♯, the note after the slash is…', ['The bass (lowest) note', 'The melody', 'The capo position', 'The key'], 0),
        q.single('Slash chords are often used to…', ['Make smooth, walking bass lines between chords', 'Change key', 'Tune', 'Play louder'], 0),
      ],
    },
    BUWEyXX7OSU: {
      title: 'Ten reasons to play without looking',
      try: 'Play a whole song without looking at the fretboard. Note which change you still need to look for.',
      minutes: 20,
      questions: [
        q.tf('Playing without looking lets you watch other musicians or read music.', true),
        q.single('Playing without looking mainly trains…', ['Muscle memory and feel', 'Your eyesight', 'Tuning', 'Volume'], 0),
      ],
    },
    Wp9X4XFIHR4: {
      title: 'The thumb muting trick',
      try: 'Play D and C while your thumb lightly touches the low E string, so you can strum freely without it ringing.',
      minutes: 15,
      questions: [
        q.single('Wrapping your thumb over the neck can…', ['Mute the low E string', 'Tune the guitar', 'Play a barre', 'Bend strings'], 0),
        q.tf('Good muting lets you strum hard without wrong strings ringing.', true),
      ],
    },
    'QC87K-09Kqk': {
      title: 'How to jam',
      try: 'Jam with a friend or a backing track for ten minutes: take turns playing rhythm and soloing.',
      minutes: 20,
      questions: [
        q.multi('Which are good jamming habits?', ['Listen to the others', 'Agree on the key and form', 'Take turns soloing', 'Play over everyone all the time'], [0, 1, 2]),
        q.single('Before jamming, players usually agree on…', ['The key and the chord progression', 'The brand of strings', 'Their ages', 'Nothing'], 0),
      ],
    },
    MP292DdVOKs: {
      title: 'Percussive strumming',
      try: 'Add a muted “chuck” strum on beats 2 and 4 of a strumming pattern, by landing your strumming hand on the strings.',
      minutes: 20,
      questions: [
        q.single('A percussive “chuck” is made by…', ['Muting the strings with the strumming hand as you strike them', 'Strumming open strings', 'Bending strings', 'Using a capo'], 0),
        q.single('Chucks on beats 2 and 4 imitate…', ['A snare drum backbeat', 'A bass line', 'A melody', 'A metronome on 1'], 0),
      ],
    },
    '0X99ZZhdsQY': {
      title: 'Memorise songs',
      try: 'Memorise one more song using the tips from the video, section by section.',
      minutes: 20,
      questions: [
        q.single('A good way to memorise a song is…', ['Learning it section by section and repeating from memory', 'Reading it once', 'Only listening', 'Playing it fast'], 0),
        q.tf('Testing yourself from memory strengthens recall more than re-reading.', true),
      ],
    },
    'KjuF-sIK248': {
      title: 'Play standing up',
      try: 'Adjust your strap so the guitar sits about where it does when you sit. Play a song standing up.',
      minutes: 15,
      questions: [
        q.single('When standing, the guitar should sit…', ['About the same height as when sitting', 'As low as possible', 'At your chin', 'Behind you'], 0),
        q.tf('Practising standing up before a performance prevents surprises.', true),
      ],
    },
    N6cfhZe5c1U: {
      title: 'Record guitar at home on a budget',
      try: 'Record yourself on your phone or a free app, placing the phone about 30 cm from where the neck meets the body. Listen back.',
      minutes: 20,
      questions: [
        q.single('An audio interface is used to…', ['Connect a guitar or microphone to a computer', 'Tune the guitar', 'Hold the phone', 'Change strings'], 0),
        q.tf('A phone can make decent practice recordings.', true),
      ],
    },
    oubvPZoFYNc: {
      title: 'Module practice schedule',
      try: 'Follow the schedule for a week with slash chords, percussive strumming and memorising songs.',
      minutes: 20,
      questions: [
        q.single('Playing songs from memory in practice mainly builds…', ['Confidence to perform', 'Tuning', 'Theory', 'Strength'], 0),
        q.tf('A schedule helps you balance new skills with review.', true),
      ],
    },
    '79VHas3PFco': {
      title: 'Grade 2 consolidation',
      try: 'Record yourself playing a song from Grade 2 with a barre or power chords and a strumming or fingerstyle part. Log it as your make.',
      minutes: 30,
      questions: [
        q.multi('Which skills did Grade 2 add?', ['The F chord and barres', 'Scales and improvising', 'Power chords and the blues', 'Sweep picking'], [0, 1, 2]),
        q.single('Consolidation means…', ['Reviewing and polishing what you’ve learned', 'Learning brand new things only', 'Tuning', 'Stopping practice'], 0),
      ],
    },
  },
  checkpoint: programExam('Grade 2 consolidation exam', [
    q.single('In G/B, B is…', ['The bass note', 'The melody note', 'The capo fret', 'The key'], 0),
    q.single('D/F♯ means…', ['A D chord with F♯ in the bass', 'D or F♯', 'D minor', 'A capo on F♯'], 0),
    q.single('Slash chords are useful for…', ['Smooth bass lines between chords', 'Tuning', 'Muting', 'Changing time signature'], 0),
    q.single('Thumb muting stops which string ringing on chords like D?', ['The low E', 'The high E', 'The B', 'The G'], 0),
    q.single('A percussive “chuck” sounds like…', ['A snare drum hit', 'A bass note', 'A harmonic', 'A bend'], 0),
    q.multi('Which are good jamming habits?', ['Agree on the key', 'Listen and leave space', 'Take turns', 'Ignore the drummer'], [0, 1, 2]),
    q.tf('Playing without looking lets you focus on the music and other players.', true),
    q.single('When standing, set the strap so the guitar sits…', ['About where it does when sitting', 'Very low', 'Very high', 'It doesn’t matter'], 0),
    q.single('An audio interface connects…', ['Instruments or microphones to a computer', 'Two guitars', 'Strings to the bridge', 'Amps to the wall'], 0),
    q.single('A DAW is…', ['Software for recording and mixing', 'A guitar pedal', 'A string gauge', 'A chord'], 0),
    q.single('The quickest way to memorise a song is…', ['Section by section, testing yourself from memory', 'Reading it many times', 'Listening only', 'Writing it backwards'], 0),
    q.single('The F barre chord is at…', ['The 1st fret', 'The 3rd fret', 'The 5th fret', 'Open position'], 0),
    q.single('A power chord contains…', ['Root and fifth', 'Root and third', 'Third and fifth', 'Root only'], 0),
    q.single('The 12-bar blues uses…', ['I, IV and V', 'ii, iii and vi', 'I and vi only', 'vii only'], 0),
    q.single('Fingerstyle uses the thumb for…', ['The bass strings', 'The high strings', 'Muting only', 'Tuning'], 0),
    q.single('Sus chords replace the third with…', ['The second or fourth', 'The fifth', 'The seventh', 'Nothing'], 0),
    q.single('The C major scale is…', ['C D E F G A B', 'C D E♭ F G A♭ B♭', 'C E G', 'C D E G A'], 0),
    q.single('The E minor pentatonic notes are…', ['E G A B D', 'E F G A B', 'E G♯ B', 'E F♯ G A B C D'], 0),
    q.tf('Recording yourself regularly speeds up improvement.', true),
    q.order('Put these Grade 2 topics in the order they appear.', ['Fancy chords and the pentatonic', 'The F chord and major scale', 'Fingerstyle and songwriting', 'Power chords', 'The blues']),
  ]),
};
