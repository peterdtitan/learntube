import { course } from '../../course';
import videos from '../videos/grade-1.json';
import beforeYouBegin from './m0-before-you-begin';
import aAndD from './m1-a-and-d';
import eAndRhythm from './m2-e-and-rhythm';
import minorChords from './m3-minor-chords';
import metronomeAndTabs from './m4-metronome-and-tabs';
import cAndStrumming from './m5-c-and-strumming';
import gAndTime from './m6-g-and-time';
import consolidation from './m7-consolidation';

// JustinGuitar's Beginner Course, Grade 1 (modules 0 to 7), without the module welcome clips
// and the videos that advertise his app and songbook.
export default course({
  slug: 'guitar-rockstar-grade-1',
  title: 'Guitar Grade 1: Your first chords and songs',
  description: 'Tune and hold the guitar, learn the eight open chords (A, Am, C, D, Dm, E, Em and G), strum in time with up strums and the most common pattern, read tabs, and play your first riffs and songs.',
  makeTitle: 'A recording of you playing a full song with open chords and a strumming pattern',
  skillId: 'guitar',
  cover: 'QkrIZBLZEXw',
  by: 'JustinGuitar',
  videos,
}, [beforeYouBegin, aAndD, eAndRhythm, minorChords, metronomeAndTabs, cAndStrumming, gAndTime, consolidation]);
