import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Facebook and Instagram ads',
  lessons: {
    '83CNpJT8eCk': {
      title: 'Introduction to Meta ads',
      try: 'Write down the product you’ll practise advertising and the one action you want people to take.',
      minutes: 10,
      questions: [
        q.single('Meta Ads Manager runs ads on…', ['Facebook, Instagram, Messenger and WhatsApp placements', 'Google Search', 'YouTube', 'TikTok'], 0),
        q.tf('Every ad should have one clear action you want people to take.', true),
      ],
    },
    's4PnmvC-hmw': {
      title: 'Create a landing page for your ads',
      try: 'Build a simple landing page (any free builder) with a headline, the offer, proof and one button.',
      minutes: 30,
      questions: [
        q.single('A landing page for an ad should…', ['Focus on one offer and one action', 'Link to everything on your site', 'Have no button', 'Be unrelated to the ad'], 0),
        q.multi('What belongs on a landing page?', ['A clear headline', 'The offer and its benefits', 'A call-to-action button', 'Ten unrelated links'], [0, 1, 2]),
      ],
    },
    Kep48ocli60: {
      title: 'Set up a business account and ad account',
      try: 'Create (or check) your Meta business account and ad account, following the video’s steps.',
      minutes: 20,
      questions: [
        q.single('A Meta business account (Business Manager) lets you…', ['Manage pages, ad accounts and people in one place', 'Post personal photos', 'Run Google Ads', 'Host a website'], 0),
        q.tf('Running ads through a business account keeps business and personal profiles separate.', true),
      ],
    },
    '8fAHojZNGI4': {
      title: 'Connect your Facebook page, Instagram and WhatsApp',
      try: 'Connect your Facebook page, Instagram account and WhatsApp Business number to your business account.',
      minutes: 20,
      questions: [
        q.single('Connecting WhatsApp lets you run ads that…', ['Open a WhatsApp chat with your business', 'Send spam messages', 'Read customers’ chats', 'Replace Instagram'], 0),
        q.tf('Click-to-WhatsApp ads are popular with businesses that sell through chat.', true),
      ],
    },
    '5Q4mOdvwbyc': {
      title: 'Connect the Meta Pixel',
      try: 'Install the Meta Pixel on your landing page and check it fires when you visit the page.',
      minutes: 30,
      questions: [
        q.single('The Meta Pixel…', ['Tracks visitors’ actions on your site so Meta can measure and optimise ads', 'Is an image', 'Blocks visitors', 'Speeds up your site'], 0),
        q.single('Pixel data helps you…', ['Measure conversions and build audiences of past visitors', 'Write posts', 'Choose fonts', 'Pay less tax'], 0),
      ],
    },
    eFviuyCMrlM: {
      title: 'Run ads that convert',
      try: 'Set up a campaign with one objective, one ad set (audience, budget, placements) and two ad versions to compare.',
      minutes: 45,
      questions: [
        q.order('Put Meta’s campaign structure in order, from top to bottom.', ['Campaign (objective)', 'Ad set (audience, budget, placement)', 'Ad (the creative)']),
        q.single('The campaign objective tells Meta…', ['What result you want, like sales, leads or messages', 'Your logo', 'Your page name', 'The ad’s colour'], 0),
        q.tf('Testing two versions of an ad shows which one works better.', true),
      ],
    },
    'KX4RH-qDwpE': {
      title: 'Monitor your ad results',
      try: 'Write down the five numbers you’d check daily for a running ad and what each would tell you.',
      minutes: 10,
      questions: [
        q.single('Cost per result is…', ['Ad spend divided by the number of results', 'Total budget', 'Number of impressions', 'Click-through rate'], 0),
        q.single('Frequency tells you…', ['How many times on average each person saw your ad', 'How often you post', 'Your budget', 'Your CTR'], 0),
      ],
    },
  },
  checkpoint: programExam('Meta ads exam', [
    q.order('Put the Meta campaign levels in order, from top to bottom.', ['Campaign', 'Ad set', 'Ad']),
    q.single('The objective is chosen at the…', ['Campaign level', 'Ad set level', 'Ad level', 'Page level'], 0),
    q.single('Audience, budget, schedule and placements are set at the…', ['Ad set level', 'Campaign level only', 'Ad level', 'Pixel level'], 0),
    q.single('The image or video and text are set at the…', ['Ad level', 'Campaign level', 'Ad set level', 'Business level'], 0),
    q.multi('Which are Meta ad objectives?', ['Awareness', 'Traffic', 'Leads', 'Sales'], [0, 1, 2, 3]),
    q.single('The Meta Pixel is…', ['Code on your site that reports visitors’ actions to Meta', 'A profile picture', 'An ad format', 'A WhatsApp feature'], 0),
    q.single('A retargeting audience is…', ['People who already visited your site or engaged with you', 'Everyone in Nigeria', 'People who blocked you', 'Your staff'], 0),
    q.single('A lookalike audience is…', ['New people similar to your existing customers', 'Your current customers', 'Your competitors', 'Random users'], 0),
    q.single('CPM means…', ['Cost per 1,000 impressions', 'Clicks per minute', 'Cost per message', 'Conversions per month'], 0),
    q.num('You spent 10,000 naira for 20 WhatsApp conversations. What is the cost per conversation in naira?', 500, 0),
    q.single('High frequency with falling results usually means…', ['Ad fatigue: refresh the creative', 'Increase the budget', 'Ads are perfect', 'Turn off the Pixel'], 0),
    q.single('Click-to-WhatsApp ads are good for…', ['Businesses that close sales through chat', 'Selling only online with no chat', 'SEO', 'Email lists'], 0),
    q.tf('A landing page that matches the ad improves conversions.', true),
    q.single('Testing two ads that differ in one thing is called…', ['A/B testing', 'Retargeting', 'Frequency capping', 'Boosting'], 0),
    q.single('“Boosting” a post from the page is…', ['A quick, simpler ad with fewer options than Ads Manager', 'Free', 'The same as SEO', 'Illegal'], 0),
    q.single('A Business Manager (business account) lets several people…', ['Work on ads without sharing personal logins', 'Share one password', 'See your personal messages', 'Post as you'], 0),
    q.multi('Which numbers should you watch on a running campaign?', ['Cost per result', 'Click-through rate', 'Frequency', 'Your follower’s birthdays'], [0, 1, 2]),
    q.single('ROAS of 3 means…', ['Every 1 naira spent returned 3 naira in revenue', 'You lost money', 'You got 3 clicks', 'You spent 3 times your budget'], 0),
    q.tf('Starting with a small daily budget and learning from results is sensible.', true),
    q.single('Before scaling up a budget, make sure…', ['The ad is profitable and tracking works', 'You have the most likes', 'The ad is a week old', 'Your logo changed'], 0),
  ]),
};
