import { execSync } from 'node:child_process';

// A catalogue and community the size we'd expect a few months in: 12 pathways of 12 lessons,
// `users` learners with sessions, and some history (XP, makes, follows) so leaderboards,
// feeds and profiles have real work to do.
export default async function seed({ url, users }) {
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: url, DATABASE_URL_UNPOOLED: url },
    stdio: 'pipe',
  });
  process.env.DATABASE_URL = url;
  const { prisma, resetDb } = await import('../integration/helpers.mjs');
  await resetDb();

  const skills = (await prisma.skill.findMany({ orderBy: { order: 'asc' } })).map((s) => s.id);
  const lessons = [];
  for (let p = 0; p < 12; p += 1) {
    const pathway = await prisma.pathway.create({
      data: {
        title: `Pathway ${p + 1} ${['bread', 'socks', 'python', 'portraits', 'chords', 'sql'][p % 6]}`,
        description: 'Load test pathway',
        makeTitle: 'Something finished',
        skillId: skills[p % skills.length],
        units: {
          create: [0, 1, 2].map((u) => ({
            title: `Unit ${u + 1}`,
            order: u,
            videos: {
              create: [0, 1, 2, 3].map((v) => ({
                title: `Lesson ${u * 4 + v + 1}`,
                url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
                duration: 300 + v * 60,
                order: v,
                tryTask: 'Try it',
              })),
            },
          })),
        },
      },
      include: { units: { include: { videos: true } } },
    });
    pathway.units.forEach((u) => u.videos.forEach((v) => lessons.push({ pathwayId: pathway.id, id: v.id })));
  }

  const expires = new Date(Date.now() + 7 * 86400000);
  const people = Array.from({ length: users }, (_, i) => ({
    id: `load-user-${i}`,
    name: `Learner ${i} Load`,
    email: `load${i}@load.local`,
    timeZone: 'UTC',
  }));
  await prisma.user.createMany({ data: people });
  await prisma.session.createMany({
    data: people.map((u, i) => ({ sessionToken: `load-${i}`, userId: u.id, expires })),
  });

  // History: a third of learners have earned XP this week and logged a make.
  const now = Date.now();
  const xp = [];
  const makes = [];
  people.forEach((u, i) => {
    if (i % 3) return;
    for (let k = 0; k < 6; k += 1) {
      const lesson = lessons[(i + k) % lessons.length];
      xp.push({
        userId: u.id,
        kind: 'TRY',
        amount: 25,
        sourceKey: `try:${lesson.id}`,
        pathwayId: lesson.pathwayId,
        createdAt: new Date(now - k * 3600000),
      });
    }
    makes.push({
      id: `load-make-${i}`, userId: u.id, title: `Make by ${i}`, videoId: lessons[i % lessons.length].id,
    });
  });
  await prisma.xpEvent.createMany({ data: xp });
  await prisma.make.createMany({ data: makes });
  await prisma.follow.createMany({
    data: people.slice(1).map((u, i) => ({ followerId: u.id, followingId: people[i % 10].id })),
    skipDuplicates: true,
  });
  await prisma.$disconnect();
  return { lessons, makes: makes.map((m) => m.id), users: people.map((u) => u.id) };
}
