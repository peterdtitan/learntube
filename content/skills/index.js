import guitar from './guitar-four-chords';
import knitting from './knit-a-scarf';
import crochet from './crochet-granny-square';
import sewing from './hand-sewing-repairs';
import knives from './knife-skills';
import drawing from './draw-with-shapes';
import beat from './first-beat-bandlab';
import photos from './phone-photography';
import webPage from './first-web-page';
import sheets from './google-sheets-basics';
import accounts from './lock-down-accounts';
import piano from './piano-first-songs';
import capcut from './capcut-video-editing';
import canva from './canva-design';
import python from './python-first-programs';
import chatgpt from './chatgpt-work';
import makeup from './everyday-makeup';
import braids from './braid-your-hair';
import nigerian from './nigerian-party-classics';
import cake from './bake-a-birthday-cake';
import skirt from './sew-a-skirt';
import anime from './draw-anime';
import chess from './play-chess';
import { withExams } from './exams/exam';
import guitarExams from './exams/guitar-four-chords';
import knittingExams from './exams/knit-a-scarf';
import crochetExams from './exams/crochet-granny-square';
import sewingExams from './exams/hand-sewing-repairs';
import knivesExams from './exams/knife-skills';
import drawingExams from './exams/draw-with-shapes';
import beatExams from './exams/first-beat-bandlab';
import photosExams from './exams/phone-photography';
import sheetsExams from './exams/google-sheets-basics';
import accountsExams from './exams/lock-down-accounts';

// Short skills: each one a functional skill in 20 hours or less (most well under 15).
// Planned and validated by planSkill in src/lib/content/plan.js. Every module ends in an
// exam; those for the first skills live in ./exams and are matched by module title.
export default [
  withExams(guitar, guitarExams),
  withExams(knitting, knittingExams),
  withExams(crochet, crochetExams),
  withExams(sewing, sewingExams),
  withExams(knives, knivesExams),
  withExams(drawing, drawingExams),
  withExams(beat, beatExams),
  withExams(photos, photosExams),
  webPage,
  withExams(sheets, sheetsExams),
  withExams(accounts, accountsExams),
  // Added for the most-searched skills on YouTube (US and Nigeria), each with its own exams.
  piano,
  capcut,
  canva,
  python,
  chatgpt,
  makeup,
  braids,
  nigerian,
  cake,
  skirt,
  anime,
  chess,
];
