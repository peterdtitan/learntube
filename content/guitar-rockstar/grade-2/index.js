import { course } from '../../course';
import videos from '../videos/grade-2.json';
import fancyChords from './m8-fancy-chords-and-pentatonic';
import fChord from './m9-f-chord-and-major-scale';
import miniBarres from './m10-mini-barres-and-improvising';
import fingerstyle from './m11-fingerstyle-and-songwriting';
import powerChords from './m12-power-chords-and-rock';
import blues from './m13-blues';
import proUpgrade from './m14-pro-upgrade';

// JustinGuitar's Beginner Course, Grade 2 (modules 8 to 14), without the welcome clips.
export default course({
  slug: 'guitar-rockstar-grade-2',
  title: 'Guitar Grade 2: Barres, scales, blues and rock',
  description: 'Add fancy and sus chords, the F chord and mini barres, the pentatonic and major scales, hammer-ons, fingerstyle, power chords and the 12-bar blues, then start improvising, jamming and writing songs.',
  makeTitle: 'A recording of you playing a song with a barre or power chords, plus a short improvised solo',
  skillId: 'guitar',
  cover: 'ZBYoI7e3v5Y',
  by: 'JustinGuitar',
  videos,
}, [fancyChords, fChord, miniBarres, fingerstyle, powerChords, blues, proUpgrade]);
