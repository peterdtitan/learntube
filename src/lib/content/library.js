import cybersecurityExpert from '../../../content/cybersecurity-expert';
import softwareEngineer from '../../../content/software-engineer';
import dataAnalyst from '../../../content/data-analyst';
import digitalMarketer from '../../../content/digital-marketer';
import guitarRockstar from '../../../content/guitar-rockstar';
import shortSkills from '../../../content/skills';
import { planSkill, planTrack } from './plan';

// Content shipped with the app, ready to load into any database from /admin/library.
export const LIBRARY = Object.fromEntries([
  cybersecurityExpert, softwareEngineer, dataAnalyst, digitalMarketer, guitarRockstar,
].map((def) => [def.slug, def]));
export { shortSkills };

// Every course and skill in the library that has module exams, planned and checked.
export function libraryExamPlans() {
  return [
    ...Object.values(LIBRARY).flatMap((def) => planTrack(def).courses),
    ...shortSkills.map(planSkill),
  ];
}
