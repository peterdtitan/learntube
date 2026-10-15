import { course } from '../../course';
import videos from '../videos/grade-3.json';
import musicianship from './m15-practice-and-musicianship';
import upTheNeck from './m16-up-the-neck';
import goalsAndTriads from './m17-goals-triads-and-strumming';
import tuningsAndSinging from './m18-tunings-licks-and-singing';
import transcribing from './m19-transcribing-and-keys';
import barreChords from './m20-barre-chords-and-next-steps';

// JustinGuitar's Beginner Course, Grade 3 (modules 15 to 19), without the welcome clips. Its
// last module is long, so it is split in two here.
export default course({
  slug: 'guitar-rockstar-grade-3',
  title: 'Guitar Grade 3: Sound like a musician',
  description: 'Practise smarter, learn the fretboard up the neck, triads, alternate tunings, barre chords and vibrato, work songs out by ear, sing while you play, and record yourself, on the way from beginner to intermediate.',
  makeTitle: 'A recorded performance of a song, singing or with a melody, using barre chords and your own touches',
  skillId: 'guitar',
  cover: 'ZYbxYoG6Mo0',
  by: 'JustinGuitar',
  videos,
}, [musicianship, upTheNeck, goalsAndTriads, tuningsAndSinging, transcribing, barreChords]);
