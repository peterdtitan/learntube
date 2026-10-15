import { course } from '../../course';
import videos from '../videos/ads-email-analytics.json';
import googleAds from './m1-google-ads';
import metaAds from './m2-meta-ads';
import email from './m3-email';
import analytics from './m4-google-analytics';

// Paid ads, email and measurement: Aaron Young on Google Ads, Joshspot Media on Facebook and
// Instagram ads, GetResponse on email marketing and Clicks Before Coffee on GA4.
export default course({
  slug: 'digital-marketer-ads',
  title: 'Ads, Email and Analytics',
  description: 'Run Google search ads and Facebook, Instagram and WhatsApp ads, build an email list that gets opened, and measure what works with Google Analytics 4.',
  makeTitle: 'A small ad campaign, an email welcome sequence and a GA4 measurement plan',
  skillId: 'digital-marketing',
  cover: 'gzUy4zv8oqs',
  by: 'Aaron Young, Joshspot Media, GetResponse and Clicks Before Coffee',
  videos,
}, [googleAds, metaAds, email, analytics]);
