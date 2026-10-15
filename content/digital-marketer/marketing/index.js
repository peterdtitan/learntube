import { course } from '../../course';
import videos from '../videos/marketing.json';
import marketingToday from './m1-marketing-today';
import customers from './m2-customers-and-plans';
import content from './m3-content';
import social from './m4-social-media';

// HubSpot's free marketing lessons (with Seth Godin on what marketing is for), arranged from
// the big picture down to content and social media.
export default course({
  slug: 'digital-marketer-marketing',
  title: 'Marketing Foundations',
  description: 'What marketing is today, who your customers are, funnels and marketing plans, then content that attracts buyers and social media that builds an audience.',
  makeTitle: 'A one-page marketing plan with a month of content and social posts for a real or practice business',
  skillId: 'digital-marketing',
  cover: 'YhK_PGhdPe8',
  by: 'HubSpot Marketing',
  videos,
}, [marketingToday, customers, content, social]);
