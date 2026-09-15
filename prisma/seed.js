(async () => {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  try {
    console.log('Seeding database...');

    // Create a seed owner
    const owner = await prisma.user.upsert({
      where: { email: 'seed@learntube.local' },
      update: {},
      create: {
        name: 'Seed Owner',
        email: 'seed@learntube.local',
        image: null,
      },
    });

    // Create pathways and videos
    const pathway1 = await prisma.pathway.create({
      data: {
        title: 'Frontend Fundamentals',
        description: 'Short units to learn HTML, CSS and React patterns.',
        ownerId: owner.id,
        videos: {
          create: [
            { title: 'HTML Basics', url: 'https://storage.example/html-basics.mp4', duration: 300 },
            { title: 'CSS Layouts', url: 'https://storage.example/css-layouts.mp4', duration: 420 },
            { title: 'Intro to React', url: 'https://storage.example/react-intro.mp4', duration: 600 },
          ],
        },
      },
      include: { videos: true },
    });

    const pathway2 = await prisma.pathway.create({
      data: {
        title: 'Data Basics',
        description: 'Introductory data skills and SQL fundamentals.',
        ownerId: owner.id,
        videos: {
          create: [
            { title: 'Data Modeling', url: 'https://storage.example/data-modeling.mp4', duration: 480 },
            { title: 'SQL Basics', url: 'https://storage.example/sql-basics.mp4', duration: 540 },
          ],
        },
      },
      include: { videos: true },
    });

    console.log('Seeded pathways:', pathway1.title, pathway2.title);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
})();
