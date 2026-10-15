import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'How search works',
  lessons: {
    'R-XxAk8-OXY': {
      title: 'What SEO is and how it works',
      try: 'Search Google for a service in your city. Note which results are ads and which are organic, and write down what the top organic pages have in common.',
      minutes: 15,
      questions: [
        q.single('SEO stands for…', ['Search engine optimisation', 'Social engagement outreach', 'Sales and email operations', 'Site editing options'], 0),
        q.order('Put how Google handles a page in order.', ['Crawl it', 'Index it', 'Rank it for searches']),
        q.single('Organic results are…', ['The unpaid results', 'Paid ads', 'Social posts', 'Emails'], 0),
      ],
    },
    btwC4zmewss: {
      title: 'SEO basics and why it matters',
      try: 'Write down the three main areas of SEO from the video and one thing you could improve on a website you know for each.',
      minutes: 10,
      questions: [
        q.multi('Which are main areas of SEO?', ['Keyword research', 'On-page SEO', 'Link building', 'Printing flyers'], [0, 1, 2]),
        q.tf('SEO traffic keeps coming without paying for every click.', true),
      ],
    },
    V2Kdl9Kuhio: {
      title: 'SEO vs SEM',
      try: 'For your chosen business, decide when you’d pay for search ads and when you’d invest in SEO, and why.',
      minutes: 10,
      questions: [
        q.single('SEM usually includes…', ['Paid search ads (and sometimes SEO)', 'Only organic results', 'Only social media', 'Only email'], 0),
        q.single('Paid search stops sending traffic when…', ['You stop paying', 'You publish a blog', 'Google crawls your site', 'Never'], 0),
      ],
    },
    '-XYtBGifGxY': {
      title: 'Is SEO worth it?',
      try: 'Answer the video’s two questions for your business: do people search for what you offer, and can you realistically rank?',
      minutes: 10,
      questions: [
        q.single('SEO is worth it when…', ['People search for what you offer and you can compete to rank', 'Nobody searches for it', 'You need sales by tomorrow', 'You have no website'], 0),
        q.tf('SEO usually takes months, not days, to show results.', true),
      ],
    },
    Q3voFGCpws0: {
      title: 'How to learn SEO fast',
      try: 'Start a practice site (a free blog is fine) where you’ll try what you learn in this course.',
      minutes: 15,
      questions: [
        q.single('The fastest way to learn SEO is…', ['Practising on a real website', 'Only reading theory', 'Watching without doing', 'Buying tools first'], 0),
        q.tf('Experimenting on your own site helps you see what actually works.', true),
      ],
    },
  },
  checkpoint: programExam('How search works exam', [
    q.order('Put Google’s process in order.', ['Crawling', 'Indexing', 'Ranking']),
    q.single('Crawling means…', ['Bots discovering pages by following links', 'Ranking pages', 'Showing ads', 'Deleting pages'], 0),
    q.single('Indexing means…', ['Storing a page in Google’s database so it can appear in results', 'Paying for ads', 'Writing content', 'Building links'], 0),
    q.single('Ranking means…', ['Ordering indexed pages for a search', 'Finding new pages', 'Writing meta tags', 'Buying clicks'], 0),
    q.single('Organic traffic is…', ['Visitors from unpaid search results', 'Visitors from ads', 'Email clicks', 'Direct visits only'], 0),
    q.single('SEO stands for…', ['Search engine optimisation', 'Search engine operations', 'Sales engine output', 'Site engagement optimisation'], 0),
    q.multi('Which are core parts of SEO?', ['Keyword research', 'On-page optimisation', 'Technical SEO', 'Link building'], [0, 1, 2, 3]),
    q.single('Paid search ads appear…', ['Labelled as sponsored, usually above organic results', 'Only on page 10', 'Only in images', 'Never on Google'], 0),
    q.single('A key difference between SEO and paid search is…', ['SEO traffic continues without paying per click', 'SEO is instant', 'Paid search is free', 'There is no difference'], 0),
    q.tf('SEO results usually take time to build.', true),
    q.single('SEO is a good investment when…', ['People search for your topic and you can rank', 'Nobody searches for it', 'You need results in one day', 'You have no content'], 0),
    q.single('Backlinks are…', ['Links from other websites to yours', 'Links inside your own site', 'Ads', 'Social shares'], 0),
    q.single('Google’s goal with rankings is…', ['Showing the most helpful result for each search', 'Showing the oldest pages', 'Showing ads only', 'Showing random pages'], 0),
    q.single('The best way to learn SEO is…', ['Practise on your own site', 'Read without trying', 'Only buy tools', 'Copy competitors'], 0),
    q.single('A search engine results page is often called…', ['A SERP', 'A CTA', 'A CPC', 'A KPI'], 0),
    q.tf('Pages that aren’t indexed can’t appear in Google’s results.', true),
    q.multi('Which help Google find your pages?', ['Links from other pages', 'A sitemap', 'Internal links', 'Hiding pages with noindex'], [0, 1, 2]),
    q.single('SEM most often refers to…', ['Paid search marketing', 'Email marketing', 'Social media', 'Print'], 0),
    q.single('A business needing traffic next week might start with…', ['Paid search, while building SEO for the long term', 'Only SEO', 'Nothing', 'Deleting its site'], 0),
    q.tf('Search intent is the reason behind a search.', true),
  ]),
};
