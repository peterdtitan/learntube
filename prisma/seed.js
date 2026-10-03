(async () => {
  const { PrismaClient } = await import('@prisma/client');
  const { PrismaPg } = await import('@prisma/adapter-pg');
  const { config } = await import('dotenv');
  config({ path: '.env.local', quiet: true });
  config({ quiet: true });
  const connectionString = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

  // By default the seed only fills an empty database. --reset replaces the sample pathways,
  // which deletes learners' progress, notes and makes on them, so it refuses to touch
  // anything but a local database unless --allow-remote is also given.
  const args = process.argv.slice(2);
  const reset = args.includes('--reset');
  const host = new URL(connectionString).hostname;
  if (reset && !['localhost', '127.0.0.1', '::1'].includes(host) && !args.includes('--allow-remote')) {
    console.error(`Refusing to --reset a remote database (${host}). Add --allow-remote if you really mean it.`);
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  // NOTE: these YouTube IDs are placeholders that are known-public and
  // embeddable, reused across lessons just so the player/progress/notes UI
  // has something real to load locally. Swap in real curated lesson videos
  // before shipping actual course content.
  const SAMPLE_VIDEO_A = 'aqz-KE-bpKQ'; // Big Buck Bunny (Blender Foundation, CC)
  const SAMPLE_VIDEO_B = 'dQw4w9WgXcQ'; // widely embeddable sample video

  try {
    console.log('Seeding database...');

    const owner = await prisma.user.upsert({
      where: { email: 'seed@learntube.local' },
      update: {},
      create: {
        name: 'Seed Owner',
        email: 'seed@learntube.local',
        image: null,
      },
    });

    const existing = await prisma.pathway.count({ where: { ownerId: owner.id } });
    if (existing && !reset) {
      console.log(`Sample pathways already exist (${existing}); nothing to do. Use --reset to replace them.`);
      return;
    }
    if (reset) {
      // Lessons go first: deleting a unit only nulls Video.unitId, which would orphan them.
      await prisma.video.deleteMany({ where: { unit: { pathway: { ownerId: owner.id } } } });
      await prisma.pathway.deleteMany({ where: { ownerId: owner.id } });
    }

    const pathway1 = await prisma.pathway.create({
      data: {
        title: 'Frontend Fundamentals',
        description: 'Bite-sized units covering HTML, CSS and React patterns.',
        skillId: 'software-engineering',
        makeTitle: 'A sign-up page in HTML, CSS and React',
        ownerId: owner.id,
        units: {
          create: [
            {
              title: 'Getting Started with HTML',
              order: 0,
              videos: {
                create: [
                  {
                    title: 'HTML Basics',
                    tryTask: 'Write a page skeleton with a header, main and footer.',
                    description: 'Structure a page with semantic HTML elements.',
                    url: SAMPLE_VIDEO_A,
                    duration: 300,
                    order: 0,
                    captionsLang: 'en',
                    transcript: 'In this lesson we cover the building blocks of HTML: elements, attributes, and how the DOM represents your page. We start with the doctype and html/head/body skeleton, then move to semantic tags like header, main, and footer.',
                  },
                  {
                    title: 'Forms and Inputs',
                    tryTask: 'Build a form with name, email and a submit button.',
                    description: 'Collect user input with forms, labels, and validation.',
                    url: SAMPLE_VIDEO_A,
                    duration: 360,
                    order: 1,
                    captionsLang: 'en',
                    transcript: 'Forms are how users send data back to your app. We look at input types, labels for accessibility, and the required/pattern attributes for built-in validation.',
                  },
                ],
              },
            },
            {
              title: 'Styling with CSS',
              order: 1,
              videos: {
                create: [
                  {
                    title: 'CSS Layouts',
                    tryTask: 'Lay out three cards in a row with grid, then stack them on a narrow screen.',
                    description: 'Flexbox and grid for real-world layouts.',
                    url: SAMPLE_VIDEO_A,
                    duration: 420,
                    order: 0,
                    captionsLang: 'en',
                    transcript: 'Flexbox is one-dimensional; grid is two-dimensional. We build a responsive card layout with grid and a navbar with flexbox to see when to reach for each.',
                  },
                ],
              },
            },
            {
              title: 'React Fundamentals',
              order: 2,
              videos: {
                create: [
                  {
                    title: 'Intro to React',
                    tryTask: 'Make a counter button that adds one on each click.',
                    description: 'Components, props, and state.',
                    url: SAMPLE_VIDEO_B,
                    duration: 600,
                    order: 0,
                    captionsLang: 'en',
                    transcript: 'React lets you build UIs from components. We cover JSX, props flowing down, and useState for local component state, then build a small counter.',
                  },
                ],
              },
            },
          ],
        },
      },
      include: { units: { include: { videos: true } } },
    });

    const pathway2 = await prisma.pathway.create({
      data: {
        title: 'Data Basics',
        description: 'Introductory data skills and SQL fundamentals.',
        skillId: 'data',
        makeTitle: 'Answers from a real dataset, with SQL',
        ownerId: owner.id,
        units: {
          create: [
            {
              title: 'Thinking in Data',
              order: 0,
              videos: {
                create: [
                  {
                    title: 'Data Modeling',
                    tryTask: 'Sketch the tables for a recipe app: recipes, ingredients, and how they link.',
                    description: 'Entities, relationships, and normalization.',
                    url: SAMPLE_VIDEO_A,
                    duration: 480,
                    order: 0,
                    captionsLang: 'en',
                    transcript: 'Good data models start with identifying entities and their relationships. We walk through normalizing a flat spreadsheet into related tables.',
                  },
                ],
              },
            },
            {
              title: 'SQL Essentials',
              order: 1,
              videos: {
                create: [
                  {
                    title: 'SQL Basics',
                    tryTask: 'Write a query that lists every recipe with fewer than five ingredients.',
                    description: 'SELECT, WHERE, JOIN — the 80% you use daily.',
                    url: SAMPLE_VIDEO_B,
                    duration: 540,
                    order: 0,
                    captionsLang: 'en',
                    transcript: 'We write a handful of SELECT statements, filter with WHERE, and join two tables together to answer a real question about the data.',
                  },
                ],
              },
            },
          ],
        },
      },
      include: { units: { include: { videos: true } } },
    });

    console.log('Seeded pathways:', pathway1.title, pathway2.title);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
})();
