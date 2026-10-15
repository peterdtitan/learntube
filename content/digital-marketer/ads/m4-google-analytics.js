import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Measure with Google Analytics',
  lessons: {
    BY3Q6HCV3L0: {
      title: 'What Google Analytics is',
      try: 'Write three questions about your website’s visitors you’d like Google Analytics to answer.',
      minutes: 10,
      questions: [
        q.single('Google Analytics measures…', ['How people find and use your website or app', 'Your social followers', 'Your bank balance', 'Your email list'], 0),
        q.tf('Google Analytics 4 (GA4) is the current version of Google Analytics.', true),
      ],
    },
    qEsqYiYOMDs: {
      title: 'How GA4 works',
      try: 'Open the free GA4 demo account and find the realtime report.',
      minutes: 15,
      questions: [
        q.single('GA4’s data model is built on…', ['Events: every interaction is recorded as an event', 'Page views only', 'Sessions only', 'Emails'], 0),
        q.single('A GA4 property collects data from…', ['Data streams, like a website or app', 'Google Docs', 'Your phone contacts', 'Printers'], 0),
      ],
    },
    wmPMeWQgmUU: {
      title: 'Set up Google Analytics 4',
      try: 'Create a GA4 property and web data stream for your practice site, add the tag, and confirm visits show in realtime.',
      minutes: 40,
      questions: [
        q.order('Put setting up GA4 in order.', ['Create a GA4 account and property', 'Add a web data stream', 'Install the tag on your site', 'Check data arrives in the realtime report']),
        q.single('The Google tag (gtag.js) is…', ['Code on your site that sends data to GA4', 'A hashtag', 'An ad', 'A report'], 0),
      ],
    },
    r07TUtk4Jdo: {
      title: 'Events, dimensions and metrics',
      try: 'Pick one report and label each column as a dimension or a metric.',
      minutes: 10,
      questions: [
        q.single('A dimension is…', ['An attribute that describes data, like country or page', 'A number you measure', 'A goal', 'An ad'], 0),
        q.single('A metric is…', ['A number, like users or sessions', 'A description, like city', 'A tag', 'A data stream'], 0),
      ],
    },
    _f7gTo31RvU: {
      title: 'Track key events (conversions)',
      try: 'Mark one important event (like a form submission or purchase) as a key event in GA4.',
      minutes: 15,
      questions: [
        q.single('A key event (formerly a conversion) is…', ['An event that matters most to your business, like a purchase', 'Any page view', 'A bounce', 'A dimension'], 0),
        q.tf('Tracking key events shows which channels bring valuable visitors.', true),
      ],
    },
    cmC9LzGVDRA: {
      title: 'Read GA4 reports',
      try: 'In the demo account, find which channels bring the most users and which pages get the most engagement. Write two findings.',
      minutes: 30,
      questions: [
        q.single('The acquisition reports show…', ['Where visitors came from', 'How fast your site is', 'Your SEO keywords exactly', 'Your ad copy'], 0),
        q.single('The engagement reports show…', ['What visitors do on your site, like pages and events', 'Where they came from', 'Your server costs', 'Your email list'], 0),
      ],
    },
    aEkHL0QFgw4: {
      title: 'Link GA4 to Google Ads',
      try: 'Write a one-page plan for measuring a campaign: its goal, the key events, the reports you’d check and the targets. Log your ad campaign set-up, welcome email and measurement plan as your make.',
      minutes: 30,
      questions: [
        q.single('Linking GA4 and Google Ads lets you…', ['Use GA4 key events and audiences in your ads', 'Run SEO', 'Send emails', 'Remove tracking'], 0),
        q.tf('Measuring results is what turns marketing into something you can improve.', true),
      ],
    },
  },
  checkpoint: programExam('Analytics exam', [
    q.single('GA4 records every interaction as…', ['An event', 'A session only', 'A page view only', 'An email'], 0),
    q.single('A data stream is…', ['A source of data, like your website or app, sending to a property', 'A report', 'A dashboard', 'A metric'], 0),
    q.single('Which is a dimension?', ['Country', 'Users', 'Sessions', 'Event count'], 0),
    q.single('Which is a metric?', ['Users', 'Page title', 'Device category', 'City'], 0),
    q.single('A key event is…', ['An important action you mark for measurement, like a purchase', 'Any event', 'A dimension', 'A data stream'], 0),
    q.single('Realtime reports show…', ['Activity on your site right now', 'Last year’s data only', 'Ad budgets', 'Email opens'], 0),
    q.single('“Traffic acquisition” tells you…', ['Which channels brought visitors', 'How long pages take to load', 'Your conversion copy', 'Your server location'], 0),
    q.single('“Organic Search” in acquisition means…', ['Visitors from unpaid search results', 'Visitors from ads', 'Visitors from email', 'Direct visitors'], 0),
    q.single('“Direct” traffic usually means…', ['Visitors who typed your address or whose source is unknown', 'Visitors from ads', 'Visitors from SEO', 'Bots only'], 0),
    q.single('Engagement rate in GA4 is…', ['The share of sessions that were engaged (for example longer than 10 seconds or with a key event)', 'Follower growth', 'Ad CTR', 'Email open rate'], 0),
    q.single('UTM parameters on a link…', ['Tag the source, medium and campaign so GA4 can attribute visits', 'Speed up pages', 'Hide links', 'Block bots'], 0),
    q.single('Which UTM tag would describe an email newsletter link?', ['utm_medium=email', 'utm_medium=cpc', 'utm_medium=organic', 'utm_medium=print'], 0),
    q.tf('GA4 explorations let you build custom analyses like funnels.', true),
    q.single('A funnel exploration shows…', ['Where users drop off between steps', 'Your ad budget', 'Page titles only', 'Weather'], 0),
    q.single('Linking GA4 to Google Ads helps…', ['Measure and optimise ads with GA4 data', 'Improve SEO directly', 'Send emails', 'Remove cookies'], 0),
    q.multi('Which can GA4 help you answer?', ['Which channel brings the most sales?', 'Which pages keep people engaged?', 'Where do users drop off?', 'What is my competitor’s revenue?'], [0, 1, 2]),
    q.order('Put measuring a campaign in order.', ['Set the goal', 'Define key events', 'Tag links with UTMs', 'Check acquisition and key event reports', 'Improve and repeat']),
    q.tf('Respecting user privacy and cookie consent rules is part of running analytics.', true),
    q.single('A rising number of users but no rise in key events suggests…', ['Traffic is growing but not converting; check the offer and landing pages', 'Everything is perfect', 'Tracking is impossible', 'You should stop marketing'], 0),
    q.single('The main point of analytics is…', ['Making better decisions with evidence', 'Collecting as much data as possible', 'Making reports pretty', 'Replacing marketing'], 0),
  ]),
};
