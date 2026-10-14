import { getShortSkills } from './skills';
import { getProgramCards } from './tracks';

// What the start questions can recommend, trimmed to what the result card shows, since it
// goes to the browser.
export default async function getStartItems(userId = null) {
  const [skills, programs] = await Promise.all([getShortSkills(userId), getProgramCards(userId)]);
  return [
    ...skills.map((s) => ({
      kind: 'skill',
      id: s.id,
      slug: s.slug,
      title: s.title,
      makeTitle: s.makeTitle,
      cover: s.cover,
      skill: s.skill,
      minutes: s.minutes,
      lessons: s.lessonCount,
      learners: s.learners,
      started: s.started,
    })),
    ...programs.map((p) => ({
      kind: 'program',
      id: p.id,
      slug: p.slug,
      title: p.title,
      makeTitle: null,
      cover: p.cover,
      skill: p.skill,
      minutes: p.minutes,
      lessons: p.courses.reduce((n, c) => n + c.lessons, 0),
      courses: p.courses.length,
      learners: p.learners,
      started: p.started,
    })),
  ];
}
