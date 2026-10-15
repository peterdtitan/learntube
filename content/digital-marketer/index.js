import marketing from './marketing';
import seo from './seo';
import ads from './ads';

// "Digital Marketer": free courses from HubSpot, Ahrefs and working ad and email specialists,
// covering the skills entry-level marketing roles ask for.
export default {
  slug: 'digital-marketer',
  cover: 'YhK_PGhdPe8',
  title: 'Digital Marketer',
  description: 'Learn the skills behind entry-level digital marketing jobs: marketing plans, content and social media, SEO, Google and Meta ads, email marketing and Google Analytics. Finish with a portfolio of real campaigns.',
  makeTitle: 'A marketing portfolio: a plan, content samples, an SEO audit, an ad campaign, an email sequence and a measurement plan',
  skillId: 'digital-marketing',
  courses: [marketing, seo, ads],
};
