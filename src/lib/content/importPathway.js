import prisma from '../prismadb';

export const DEMO_OWNER_EMAIL = 'seed@learntube.local';

const contentError = (problems) => new Error(`Content has ${problems.length} problems; first: ${problems[0]}`);

// Runs async steps one after another (each module's rows depend on the one before).
const inSequence = (items, step) => items.reduce(
  async (done, item, i) => [...(await done), await step(item, i)],
  Promise.resolve([]),
);

// One module: its unit, then its lessons, quizzes and questions in a few bulk statements.
async function importModule(pathwayId, mod, order, publishQuizzes) {
  const unit = await prisma.unit.create({ data: { pathwayId, title: mod.title, order } });
  const videos = await prisma.video.createManyAndReturn({
    data: mod.lessons.map((l, i) => ({
      unitId: unit.id,
      order: i,
      title: l.title,
      description: l.description,
      url: l.url,
      duration: l.duration,
      startSec: l.startSec,
      endSec: l.endSec,
      tryTask: l.tryTask,
      practiceMinutes: l.practiceMinutes,
      captionsLang: 'en',
    })),
    select: { id: true, order: true },
  });
  const videoAt = Object.fromEntries(videos.map((v) => [v.order, v.id]));

  const checks = mod.lessons
    .map((l, i) => ({ lesson: l, videoId: videoAt[i] }))
    .filter(({ lesson }) => lesson.check?.length);
  const quizzes = await prisma.quiz.createManyAndReturn({
    data: [
      ...checks.map(({ videoId }) => ({ kind: 'LESSON_CHECK', videoId, published: publishQuizzes })),
      ...(mod.checkpoint ? [{
        kind: 'CHECKPOINT',
        unitId: unit.id,
        title: mod.checkpoint.title,
        timeLimitSec: mod.checkpoint.timeLimitSec,
        published: publishQuizzes,
      }] : []),
      {
        kind: 'MODULE_GAME', unitId: unit.id, title: `${mod.title} games`, published: publishQuizzes,
      },
    ],
    select: { id: true, kind: true, videoId: true },
  });
  const quizFor = (kind, videoId = null) => quizzes
    .find((x) => x.kind === kind && x.videoId === videoId).id;
  const row = (quizId) => (qn, i) => ({
    quizId,
    order: i,
    type: qn.type,
    prompt: qn.prompt,
    data: qn.data,
    explanation: qn.explanation || null,
  });

  const questions = [
    ...checks.flatMap(({ lesson, videoId }) => lesson.check.map(row(quizFor('LESSON_CHECK', videoId)))),
    ...(mod.checkpoint ? mod.checkpoint.questions.map(row(quizFor('CHECKPOINT'))) : []),
  ];
  if (questions.length) await prisma.question.createMany({ data: questions });
  return { lessons: videos.length, questions: questions.length };
}

// Writes a planned pathway (see plan.js). Never overwrites: if a pathway with the same
// slug exists, it's left alone, because replacing it would wipe learners' progress.
// Quizzes are imported as drafts unless publishQuizzes is set, so an admin reviews them.
export async function importPathway(plan, { publishQuizzes = false, track = {} } = {}) {
  if (plan.problems.length) throw contentError(plan.problems);
  const existing = await prisma.pathway.findUnique({ where: { slug: plan.pathway.slug } });
  if (existing) {
    // Re-link to its track even when the content is already there.
    if (track.trackId) await prisma.pathway.update({ where: { id: existing.id }, data: track });
    return { status: 'exists', pathwayId: existing.id };
  }

  const pathway = await prisma.pathway.create({ data: { ...plan.pathway, ...track } });
  const counts = await inSequence(
    plan.modules,
    (mod, order) => importModule(pathway.id, mod, order, publishQuizzes),
  );
  return {
    status: 'created',
    pathwayId: pathway.id,
    lessons: counts.reduce((n, c) => n + c.lessons, 0),
    questions: counts.reduce((n, c) => n + c.questions, 0),
  };
}

// Creates the track if needed, then imports each course in order. Safe to run again:
// existing courses are left as they are.
export async function importTrack(trackPlan, options = {}) {
  if (trackPlan.problems.length) throw contentError(trackPlan.problems);
  const track = await prisma.track.upsert({
    where: { slug: trackPlan.track.slug },
    update: {},
    create: trackPlan.track,
  });
  const courses = await inSequence(
    trackPlan.courses,
    (plan, trackOrder) => importPathway(plan, {
      ...options, track: { trackId: track.id, trackOrder },
    }),
  );
  return { trackId: track.id, courses };
}

// The sample pathways the old seed created (owned by the seed user), and that user.
export async function removeDemoContent() {
  const owner = await prisma.user.findUnique({ where: { email: DEMO_OWNER_EMAIL } });
  if (!owner) return { removed: 0 };
  const pathways = await prisma.pathway.findMany({
    where: { ownerId: owner.id }, select: { id: true },
  });
  const ids = pathways.map((p) => p.id);
  // Lessons first: deleting a unit only nulls Video.unitId, which would orphan them.
  await prisma.$transaction([
    prisma.video.deleteMany({
      where: { OR: [{ unit: { pathwayId: { in: ids } } }, { pathwayId: { in: ids } }] },
    }),
    prisma.pathway.deleteMany({ where: { id: { in: ids } } }),
    prisma.user.delete({ where: { id: owner.id } }),
  ]);
  return { removed: ids.length };
}

export async function demoContentCount() {
  return prisma.pathway.count({ where: { owner: { email: DEMO_OWNER_EMAIL } } });
}

// One switch for a whole pathway's quizzes, so hundreds of reviewed drafts don't need
// publishing one at a time. Empty checkpoints and quick checks stay unpublished; games
// borrow their module's questions, so they can be published empty.
export async function setPathwayQuizzesPublished(pathwayId, published) {
  const emptyQuiz = { kind: { in: ['LESSON_CHECK', 'CHECKPOINT'] }, questions: { none: {} } };
  const { count } = await prisma.quiz.updateMany({
    where: {
      OR: [{ unit: { pathwayId } }, { video: { unit: { pathwayId } } }],
      ...(published ? { NOT: emptyQuiz } : {}),
    },
    data: { published },
  });
  return count;
}
