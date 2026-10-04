// Loads the real course content (content/cybersecurity-expert) into the database.
// Run with `npm run db:seed`. Safe to repeat: courses that already exist are left alone.
//   --drafts       import quizzes unpublished, for an admin to review first
//   --remove-demo  also delete the old sample pathways from the previous seed
import { config } from 'dotenv';

config({ path: '.env.local', quiet: true });
config({ quiet: true });

const args = process.argv.slice(2);
const { default: def } = await import('../content/cybersecurity-expert/index.js');
const { planTrack, planSummary } = await import('../src/lib/content/plan.js');
const { importTrack, removeDemoContent } = await import('../src/lib/content/importPathway.js');
const { default: prisma } = await import('../src/lib/prismadb.js');

const plan = planTrack(def);
if (plan.problems.length) {
  console.error(`The content has ${plan.problems.length} problems:\n${plan.problems.join('\n')}`);
  process.exit(1);
}

try {
  if (args.includes('--remove-demo')) {
    const { removed } = await removeDemoContent();
    console.log(`Removed ${removed} sample pathways.`);
  }
  const result = await importTrack(plan, { publishQuizzes: !args.includes('--drafts') });
  result.courses.forEach((course, i) => {
    const { title } = plan.courses[i].pathway;
    console.log(course.status === 'created'
      ? `${title}: imported ${course.lessons} lessons and ${course.questions} questions`
      : `${title}: already there, left as it is`);
  });
  console.log(plan.courses.map((c) => `  ${c.pathway.title}: ${JSON.stringify(planSummary(c))}`).join('\n'));
} finally {
  await prisma.$disconnect();
}
