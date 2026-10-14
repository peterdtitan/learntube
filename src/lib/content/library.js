import cybersecurityExpert from '../../../content/cybersecurity-expert';
import shortSkills from '../../../content/skills';
import { planSkill, planTrack } from './plan';

// Content shipped with the app, ready to load into any database from /admin/library.
export const LIBRARY = { 'cybersecurity-expert': cybersecurityExpert };
export { shortSkills };

// Every course and skill in the library that has module exams, planned and checked.
export function libraryExamPlans() {
  return [
    ...Object.values(LIBRARY).flatMap((def) => planTrack(def).courses),
    ...shortSkills.map(planSkill),
  ];
}
