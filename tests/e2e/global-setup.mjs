import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

export const STATE_FILE = new URL('./.state.json', import.meta.url);

// Fresh database for every run: migrate, wipe, then seed the course and three people
// with ready-made sessions, so tests can skip Google sign-in.
export default async function globalSetup() {
  const url = process.env.E2E_DATABASE_URL;
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: url, DATABASE_URL_UNPOOLED: url },
    stdio: 'pipe',
  });

  process.env.DATABASE_URL = url;
  const { prisma, resetDb, makeCourse } = await import('../integration/helpers.mjs');
  await resetDb();
  const course = await makeCourse();
  // A short skill, for the Skills page and the welcome survey's picks.
  await prisma.pathway.create({
    data: {
      title: 'Knit a swatch',
      kind: 'SKILL',
      skillId: 'knitting',
      makeTitle: 'A garter-stitch swatch',
      units: {
        create: [{
          title: 'Cast on',
          videos: {
            create: [{
              title: 'Cast on', url: 'https://www.youtube.com/watch?v=eeeeeeeeeee', duration: 300, tryTask: 'Cast on 20 stitches',
            }],
          },
        }],
      },
    },
  });

  const people = {};
  const expires = new Date(Date.now() + 7 * 86400000);
  // Everyone but Nia has done the welcome survey; Nia signs in for the first time.
  for (const [key, name, role, onboarded = true] of [
    ['ada', 'Ada Lovelace', 'LEARNER'],
    ['bola', 'Bola Ade', 'LEARNER'],
    ['admin', 'Admin Person', 'ADMIN'],
    ['nia', 'Nia Okafor', 'LEARNER', false],
  ]) {
    const user = await prisma.user.create({
      data: {
        name, email: `${key}@e2e.local`, role, timeZone: 'UTC', onboardedAt: onboarded ? new Date() : null,
      },
    });
    await prisma.session.create({ data: { sessionToken: `e2e-${key}`, userId: user.id, expires } });
    people[key] = { id: user.id, name, token: `e2e-${key}` };
  }

  // Quizzes on the bread pathway's first module: a quick check after lesson one, a timed
  // checkpoint and the module games.
  const unit = course.bread.units[0];
  const tf = (prompt, answer, order) => ({
    type: 'TRUE_FALSE', prompt, data: { answer }, order,
  });
  const check = await prisma.quiz.create({
    data: {
      kind: 'LESSON_CHECK',
      videoId: course.lessons[0].id,
      published: true,
      questions: { create: [tf('A starter needs regular feeding', true, 0), tf('Starters live in the freezer', false, 1)] },
    },
  });
  const checkpoint = await prisma.quiz.create({
    data: {
      kind: 'CHECKPOINT',
      unitId: unit.id,
      title: 'Starter checkpoint',
      published: true,
      timeLimitSec: 300,
      questions: {
        create: [
          tf('Flour and water make a starter', true, 0),
          {
            type: 'SINGLE', prompt: 'What does autolyse mean?', data: { options: ['Resting flour and water', 'Adding salt first'], answer: 0 }, order: 1,
          },
        ],
      },
    },
  });
  const gameQuiz = await prisma.quiz.create({
    data: {
      kind: 'MODULE_GAME',
      unitId: unit.id,
      published: true,
      questions: { create: [tf('Bread needs time to rise', true, 0)] },
    },
  });

  writeFileSync(STATE_FILE, JSON.stringify({
    quizzes: {
      check: check.id, checkpoint: checkpoint.id, game: gameQuiz.id, unit: unit.id,
    },
    people,
    bread: { id: course.bread.id, lessons: course.lessons.map((l) => l.id) },
    code: { id: course.code.id, lesson: course.codeLesson.id },
  }, null, 2));
  await prisma.$disconnect();
}
