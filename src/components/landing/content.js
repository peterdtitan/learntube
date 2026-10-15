import { QUIZ_XP, XP } from '../../lib/xpValues';

// The landing page's words. Numbers that change with the catalogue come from the database.
export const STEPS = [
  {
    title: 'Watch the step',
    xp: XP.WATCH,
    body: 'A short, captioned clip, never longer than 10 minutes. Slow it down, go back 10 seconds, or loop the tricky part.',
  },
  {
    title: 'Try it yourself',
    xp: XP.TRY,
    body: 'Every lesson ends with a task for your hands: cast on 20 stitches, dice an onion, write a form.',
  },
  {
    title: 'Log what you made',
    xp: XP.LOG,
    body: 'Add a photo and a note to your makes. Other learners can give kudos and cheer you on.',
  },
];

export const XP_TABLE = [
  { what: 'Watch a step', detail: 'To the end', xp: XP.WATCH },
  { what: 'Try it yourself', detail: 'The hands-on task', xp: XP.TRY },
  { what: 'Log what you made', detail: 'A photo and a note', xp: XP.LOG },
  { what: 'Pass a quick check', detail: 'After a lesson, no timer', xp: QUIZ_XP.LESSON_CHECK },
  { what: 'Pass the module games', detail: 'Tower or Speed round', xp: QUIZ_XP.MODULE_GAME },
  { what: 'Pass a module exam', detail: 'Timed, at the end of a module', xp: QUIZ_XP.CHECKPOINT },
];

export const GAMES = [
  ['Quick checks', `A few questions after a lesson, no timer. +${QUIZ_XP.LESSON_CHECK} XP the first time you pass.`],
  ['Tower', 'Every right answer stacks a 3D block. How tall can you build it?'],
  ['Speed round', '20 seconds a question. Faster answers and streaks score more.'],
  ['Match-up', 'Flip cards to find the pairs. A memory game for the module.'],
  ['Module exams', 'Timed, at the end of each module, drawn fresh for every attempt. Fair-play rules up front and extra time if you need it.'],
];

export const TOOLS = [
  { name: 'YouTube', body: 'The lessons. Picked from teachers like Professor Messer, Kevin Powell and BandLab, and credited to them.' },
  { name: 'BandLab', body: 'A free music studio in your browser, for making your first beat.' },
  { name: 'Google Sheets', body: 'Formulas, charts and pivot tables, free with a Google account.' },
  { name: 'Your phone', body: 'The camera you already carry, plus free editing apps.' },
  { name: 'Your browser', body: 'A code sandbox built into every coding lesson. Nothing to install.' },
];

export const FAQ = [
  { q: 'Is it really free?', a: 'Yes. No subscription, no paywall and no card. The lessons are already free on YouTube; Skillreps puts them in order and adds the practice, quizzes and XP.' },
  { q: 'Who makes the videos?', a: 'YouTube creators. Every lesson plays from YouTube and belongs to the person who made it. If you made a video and want it removed, tell us and we’ll take it down.' },
  { q: 'Do I need an account?', a: 'Yes, a free one. Sign up with Google in a few seconds: it saves your place, your XP and streak, and what you make. No card, no subscription.' },
  { q: 'How long does a skill take?', a: 'Every short skill takes under 15 hours, in steps of 10 minutes or less. Most people do a few steps a week; you choose 2 to 5 practice days.' },
  { q: 'Is the cybersecurity program official CompTIA training?', a: 'No. It’s built on Professor Messer’s free videos and prepares you for the A+, Network+ and Security+ exams, but Skillreps isn’t affiliated with CompTIA. Exams are booked and paid for through CompTIA.' },
  { q: 'Who’s behind Skillreps?', a: 'Elev8r Software, a product studio in Nigeria. We design, build and run Skillreps ourselves.' },
];
