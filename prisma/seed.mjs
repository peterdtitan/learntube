// Loads the real content (every program in src/lib/content/library.js, and content/skills)
// into the database. Run with `npm run db:seed`. Safe to repeat: courses that already exist
// are left alone.
//   --drafts       import quizzes unpublished, for an admin to review first
//   --remove-demo  also delete the old sample pathways from the previous seed
import { config } from 'dotenv';

config({ path: '.env.local', quiet: true });
config({ quiet: true });

const args = process.argv.slice(2);
const { LIBRARY, shortSkills } = await import('../src/lib/content/library.js');
const { planSkill, planTrack, planSummary } = await import('../src/lib/content/plan.js');
const { importSkills, importTrack, removeDemoContent } = await import('../src/lib/content/importPathway.js');
const { default: prisma } = await import('../src/lib/prismadb.js');

const plans = Object.values(LIBRARY).map(planTrack);
const skillPlans = shortSkills.map(planSkill);
const problems = [...plans.flatMap((p) => p.problems), ...skillPlans.flatMap((p) => p.problems)];
if (problems.length) {
  console.error(`The content has ${problems.length} problems:\n${problems.join('\n')}`);
  process.exit(1);
}

try {
  if (args.includes('--remove-demo')) {
    const { removed } = await removeDemoContent();
    console.log(`Removed ${removed} sample pathways.`);
  }
  // One program at a time: each import is a long run of writes.
  await plans.reduce((previous, plan) => previous.then(async () => {
    const result = await importTrack(plan, { publishQuizzes: !args.includes('--drafts') });
    console.log(plan.track.title);
    result.courses.forEach((course, i) => {
      const { title } = plan.courses[i].pathway;
      console.log(course.status === 'created'
        ? `  ${title}: imported ${course.lessons} lessons and ${course.questions} questions`
        : `  ${title}: already there, left as it is`);
    });
    console.log(plan.courses.map((c) => `    ${JSON.stringify(planSummary(c))}`).join('\n'));
  }), Promise.resolve());
  const skills = await importSkills(skillPlans, { publishQuizzes: !args.includes('--drafts') });
  skills.forEach((skill, i) => {
    const { title } = skillPlans[i].pathway;
    console.log(skill.status === 'created' ? `${title}: imported ${skill.lessons} lessons` : `${title}: already there`);
  });
} finally {
  await prisma.$disconnect();
}
