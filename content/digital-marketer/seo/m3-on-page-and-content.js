import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'On-page SEO and content',
  lessons: {
    DvwS7cV9GmQ: {
      title: 'SEO for beginners',
      try: 'Pick one page on your practice site and its target keyword. Check the page matches the search intent of the top results.',
      minutes: 25,
      questions: [
        q.single('Matching search intent means your page…', ['Gives searchers the type of content they expect', 'Repeats the keyword many times', 'Is very long always', 'Has many ads'], 0),
        q.tf('Looking at what already ranks shows you what Google thinks searchers want.', true),
      ],
    },
    gDYjjkvtOVo: {
      title: 'The on-page SEO checklist',
      try: 'Optimise one page with the checklist: title tag, meta description, URL, headings, internal links and image alt text.',
      minutes: 30,
      questions: [
        q.multi('Which are on-page SEO elements?', ['Title tag', 'Meta description', 'Headings', 'Backlinks from other sites'], [0, 1, 2]),
        q.single('A good URL slug is…', ['Short, readable and includes the topic, like /wedding-cakes', 'A long string of numbers', 'Full of symbols', 'Random'], 0),
        q.single('Alt text on images helps…', ['Screen readers and search engines understand the image', 'Make images load faster', 'Hide images', 'Rank ads'], 0),
      ],
    },
    q0Ujy3EN0lk: {
      title: 'SEO copywriting',
      try: 'Rewrite your page’s introduction so it gets to the point fast and covers the main subtopics searchers expect.',
      minutes: 30,
      questions: [
        q.single('SEO copywriting means writing that…', ['Satisfies searchers and is easy for search engines to understand', 'Repeats keywords constantly', 'Is hidden from readers', 'Ignores readers'], 0),
        q.tf('Stuffing a keyword over and over usually hurts readability and rankings.', true),
      ],
    },
    eTF6OBwidhc: {
      title: 'Write a post that attracts links',
      try: 'Plan one “linkable” piece for your niche: original data, a useful tool, a guide or statistics others would cite.',
      minutes: 20,
      questions: [
        q.single('Content tends to attract backlinks when it…', ['Offers something others want to cite, like original data', 'Is short and generic', 'Is behind a paywall', 'Has no sources'], 0),
        q.tf('Statistics and original research are common link magnets.', true),
      ],
    },
  },
  checkpoint: programExam('On-page SEO exam', [
    q.single('The title tag is…', ['The clickable headline shown in search results', 'A hidden comment', 'The URL', 'An image'], 0),
    q.single('The meta description…', ['Is the summary shown under the title in results, influencing clicks', 'Is a ranking factor guaranteed to rank you first', 'Is invisible to users', 'Is the URL'], 0),
    q.single('A page should usually have…', ['One H1 that states its main topic', 'Ten H1s', 'No headings', 'Only H6 headings'], 0),
    q.single('Internal links are…', ['Links between pages on your own site', 'Links from other sites', 'Ads', 'Social shares'], 0),
    q.single('Internal links help by…', ['Helping visitors and Google find and understand related pages', 'Hiding pages', 'Slowing the site', 'Removing content'], 0),
    q.single('Image alt text should…', ['Describe the image accurately', 'Be stuffed with keywords', 'Be left empty always', 'Repeat the page title'], 0),
    q.single('Matching search intent means…', ['Giving the type of content searchers expect', 'Using the keyword 50 times', 'Writing 5,000 words always', 'Adding more images'], 0),
    q.tf('Keyword stuffing can hurt rankings.', true),
    q.single('A good URL for a guide to jollof rice is…', ['/how-to-cook-jollof-rice', '/page?id=81723', '/aaa', '/2026/10/16/post-1'], 0),
    q.single('Answering “People also ask” questions in your content helps…', ['Cover subtopics searchers care about', 'Hide content', 'Rank ads', 'Remove links'], 0),
    q.multi('Which make content easy to read?', ['Short paragraphs', 'Clear subheadings', 'Bullet points where helpful', 'One giant block of text'], [0, 1, 2]),
    q.single('Linkable assets are…', ['Content others want to reference, like data or tools', 'Paid links', 'Thin pages', 'Ads'], 0),
    q.single('Putting the main answer near the top of a page…', ['Helps searchers and often rankings', 'Hurts SEO', 'Is forbidden', 'Hides content'], 0),
    q.tf('Updating old content to keep it accurate can improve its rankings.', true),
    q.order('Put optimising a page in order.', ['Choose the target keyword', 'Check search intent', 'Write or update the content', 'Optimise title, headings and URL', 'Add internal links']),
    q.single('Duplicate content across many pages can…', ['Confuse search engines about which page to rank', 'Always boost rankings', 'Earn backlinks', 'Speed up crawling'], 0),
    q.single('E-E-A-T in Google’s guidelines stands for…', ['Experience, Expertise, Authoritativeness and Trustworthiness', 'Easy, Engaging, Accurate and Timely', 'Email, Engagement, Ads and Traffic', 'Edit, Expand, Add and Test'], 0),
    q.single('A title tag is best kept…', ['Concise, so it isn’t cut off in results', 'As long as possible', 'Blank', 'All capitals'], 0),
    q.single('Which helps a page earn clicks from the results page?', ['A clear, compelling title and description', 'Hidden text', 'A long URL', 'No headings'], 0),
    q.tf('Writing for people first, then optimising, works better than writing for search engines first.', true),
  ]),
};
