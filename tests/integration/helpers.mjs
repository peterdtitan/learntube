import prismaModule from '../../src/lib/prismadb.js';

// Playwright loads src/ as CommonJS, which wraps the default export once more.
const prisma = prismaModule.default ?? prismaModule;

export { prisma };

// Everything except the migration history and the 10 skills the migrations seed.
const KEEP = new Set(['_prisma_migrations', 'Skill']);

export async function resetDb() {
  const tables = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;
  const names = tables.map((t) => t.tablename).filter((t) => !KEEP.has(t));
  if (names.length) {
    await prisma.$executeRawUnsafe(`TRUNCATE ${names.map((n) => `"${n}"`).join(', ')} CASCADE`);
  }
}

let seq = 0;

export async function makeUser({ name, admin = false, ...data } = {}) {
  seq += 1;
  return prisma.user.create({
    data: {
      name: name || `Learner ${seq} Test`,
      email: `learner${seq}-${Date.now()}@test.local`,
      role: admin ? 'ADMIN' : 'LEARNER',
      ...data,
    },
  });
}

// Pretend this user is signed in for the next requests (null signs out).
export function signIn(user) {
  globalThis.testSession = user
    ? { user: { id: user.id, name: user.name, isAdmin: user.role === 'ADMIN' } }
    : null;
}

// Calls a route handler the way Next does and returns { status, data, headers }.
export async function call(handler, {
  body, params = {}, form, query = '',
} = {}) {
  const init = { method: handler.name, headers: {} };
  if (form) init.body = form;
  else if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
    init.headers['Content-Type'] = 'application/json';
  }
  const res = await handler(new Request(`http://test.local/api${query}`, init), { params });
  const text = await res.text();
  let data = text;
  try { data = JSON.parse(text); } catch { /* plain text body */ }
  return { status: res.status, data, headers: res.headers };
}

// A cooking pathway with two units and three lessons, and a one-lesson coding pathway.
export async function makeCourse() {
  const bread = await prisma.pathway.create({
    data: {
      title: 'Bake Your First Loaf',
      description: 'From flour to a crusty loaf.',
      makeTitle: 'A sourdough loaf',
      skillId: 'cooking',
      units: {
        create: [
          {
            title: 'Starter',
            order: 0,
            videos: {
              create: [
                {
                  title: 'Feeding a starter', url: 'https://www.youtube.com/watch?v=aaaaaaaaaaa', duration: 300, order: 0, tryTask: 'Feed your starter',
                },
                {
                  title: 'Autolyse', url: 'https://www.youtube.com/watch?v=bbbbbbbbbbb', duration: 240, order: 1, tryTask: 'Mix flour and water',
                },
              ],
            },
          },
          {
            title: 'Shaping',
            order: 1,
            videos: {
              create: [{
                title: 'Shaping a boule', url: 'https://www.youtube.com/watch?v=ccccccccccc', duration: 420, order: 0, tryTask: 'Shape one loaf',
              }],
            },
          },
        ],
      },
    },
    include: { units: { include: { videos: { orderBy: { order: 'asc' } } }, orderBy: { order: 'asc' } } },
  });
  const code = await prisma.pathway.create({
    data: {
      title: 'Your First Web Page',
      skillId: 'software-engineering',
      units: {
        create: [{
          title: 'HTML',
          videos: {
            create: [{
              title: 'Tags and elements', url: 'https://www.youtube.com/watch?v=ddddddddddd', duration: 600, tryTask: 'Write a heading',
            }],
          },
        }],
      },
    },
    include: { units: { include: { videos: true } } },
  });
  const lessons = bread.units.flatMap((u) => u.videos);
  return {
    bread, code, lessons, codeLesson: code.units[0].videos[0],
  };
}

export function formData(fields) {
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => form.append(k, v));
  return form;
}
