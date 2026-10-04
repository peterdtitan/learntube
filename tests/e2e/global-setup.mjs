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

  const people = {};
  const expires = new Date(Date.now() + 7 * 86400000);
  for (const [key, name, role] of [
    ['ada', 'Ada Lovelace', 'LEARNER'],
    ['bola', 'Bola Ade', 'LEARNER'],
    ['admin', 'Admin Person', 'ADMIN'],
  ]) {
    const user = await prisma.user.create({
      data: {
        name, email: `${key}@e2e.local`, role, timeZone: 'UTC',
      },
    });
    await prisma.session.create({ data: { sessionToken: `e2e-${key}`, userId: user.id, expires } });
    people[key] = { id: user.id, name, token: `e2e-${key}` };
  }

  writeFileSync(STATE_FILE, JSON.stringify({
    people,
    bread: { id: course.bread.id, lessons: course.lessons.map((l) => l.id) },
    code: { id: course.code.id, lesson: course.codeLesson.id },
  }, null, 2));
  await prisma.$disconnect();
}
