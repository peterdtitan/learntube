import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Technical SEO and links',
  lessons: {
    oJPGa0J6p5Q: {
      title: 'A basic technical SEO audit',
      try: 'Audit your practice site: check pages are indexable, the site uses HTTPS, works on phones, loads quickly, and has no broken links.',
      minutes: 20,
      questions: [
        q.single('A “noindex” tag tells search engines…', ['Not to show the page in results', 'To rank it first', 'To crawl it faster', 'To delete it'], 0),
        q.multi('Which are technical SEO checks?', ['Indexability', 'Page speed', 'Mobile-friendliness', 'Font colour'], [0, 1, 2]),
      ],
    },
    H2a6H5vOKOk: {
      title: 'Submit your site to search engines',
      try: 'Add your practice site to Google Search Console (free) and submit its sitemap.',
      minutes: 15,
      questions: [
        q.single('A sitemap is…', ['A file listing the pages you want search engines to find', 'A map of your office', 'A list of ads', 'A design file'], 0),
        q.single('Google Search Console lets you…', ['Submit sitemaps and see how your site appears in search', 'Buy ads', 'Edit your website', 'Send emails'], 0),
      ],
    },
    Io4ugroDedo: {
      title: 'Analyse competitors’ backlinks',
      try: 'Look up a competitor’s backlinks with a free tool and list three sites that might link to you too.',
      minutes: 15,
      questions: [
        q.single('A referring domain is…', ['A website that links to you (counted once, however many links)', 'Your own domain', 'An ad network', 'A social profile'], 0),
        q.tf('Competitors’ backlinks show where you might earn links too.', true),
      ],
    },
    'BjT-QOqsjz4': {
      title: 'Link building strategies',
      try: 'Choose one strategy from the video and send three polite, personalised outreach emails.',
      minutes: 30,
      questions: [
        q.multi('Which are legitimate link building tactics?', ['Guest posting on relevant sites', 'Broken link building', 'Creating linkable content', 'Buying thousands of spam links'], [0, 1, 2]),
        q.single('Broken link building means…', ['Finding dead links on other sites and suggesting your page as a replacement', 'Breaking competitors’ sites', 'Deleting your links', 'Linking to 404 pages'], 0),
      ],
    },
    taU9P98zfjk: {
      title: 'The SEO checklist',
      try: 'Run through the whole checklist for your practice site and tick off what’s done. Log your audit and keyword plan as your make.',
      minutes: 30,
      questions: [
        q.single('An SEO checklist mainly helps you…', ['Cover the basics consistently', 'Rank first instantly', 'Avoid content', 'Buy links'], 0),
        q.tf('Fixing the basics often brings more results than advanced tricks.', true),
      ],
    },
    AYlL4ZN1zHA: {
      title: 'Five things in SEO that don’t matter much',
      try: 'Write down one SEO task you’ve been worrying about that the video says matters little, and what you’ll focus on instead.',
      minutes: 10,
      questions: [
        q.single('The meta keywords tag…', ['Is ignored by Google for ranking', 'Is the top ranking factor', 'Is required', 'Replaces content'], 0),
        q.tf('Exact keyword density targets are not something to obsess over.', true),
      ],
    },
  },
  checkpoint: programExam('Technical SEO and links exam', [
    q.single('Technical SEO is about…', ['Making a site easy to crawl, index and use', 'Writing blog posts only', 'Running ads', 'Designing logos'], 0),
    q.single('robots.txt…', ['Tells crawlers which parts of a site they may crawl', 'Speeds up the site', 'Is a sitemap', 'Removes pages from the web'], 0),
    q.single('A noindex tag…', ['Keeps a page out of search results', 'Boosts rankings', 'Adds a backlink', 'Speeds up crawling'], 0),
    q.single('An XML sitemap…', ['Lists the pages you want search engines to find', 'Is a backup', 'Is a design file', 'Blocks bots'], 0),
    q.single('HTTPS…', ['Encrypts the connection and is a light ranking signal', 'Slows the site', 'Is a sitemap', 'Is a type of link'], 0),
    q.single('A 404 error means…', ['The page wasn’t found', 'The page moved permanently', 'The server is fine', 'The page is indexed'], 0),
    q.single('A 301 redirect means…', ['A page has moved permanently to a new URL', 'A temporary error', 'Page not found', 'Server overload'], 0),
    q.tf('Mobile-friendliness matters because Google mainly uses the mobile version for indexing.', true),
    q.single('Backlinks matter because…', ['Links from relevant, trusted sites signal your page is valuable', 'They add ads', 'They speed up your site', 'They replace content'], 0),
    q.single('A referring domain counts…', ['Each linking website once', 'Every single link', 'Only your own site', 'Social shares'], 0),
    q.single('Which link is most valuable?', ['A link from a relevant, respected site in your niche', 'A link from a random spam site', 'A paid link farm', 'A hidden link'], 0),
    q.multi('Which are safe link building methods?', ['Guest posting', 'Broken link building', 'Digital PR with useful content', 'Buying links in bulk'], [0, 1, 2]),
    q.single('Anchor text is…', ['The clickable words of a link', 'The page title', 'The URL', 'An image'], 0),
    q.single('Google Search Console helps you…', ['Find indexing problems and see search performance', 'Buy ads', 'Write content', 'Build links automatically'], 0),
    q.tf('Buying spammy links can get a site penalised.', true),
    q.single('Page speed matters because…', ['Slow pages frustrate visitors and can hurt rankings', 'Fast pages cost more', 'Google ignores it entirely', 'It only affects ads'], 0),
    q.single('Which matters little for rankings today?', ['The meta keywords tag', 'Helpful content', 'Backlinks', 'Search intent'], 0),
    q.order('Put a basic SEO workflow in order.', ['Research keywords', 'Create or optimise content', 'Fix technical issues', 'Build links', 'Measure and improve']),
    q.single('Broken link building works by…', ['Offering your page to replace a dead link', 'Breaking links on purpose', 'Deleting old pages', 'Buying expired domains always'], 0),
    q.tf('A good SEO audit lists problems in order of impact so you fix the biggest first.', true),
  ]),
};
