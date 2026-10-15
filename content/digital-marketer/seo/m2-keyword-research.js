import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Keyword research',
  lessons: {
    '3zLBu_NfOaQ': {
      title: 'Keyword research beyond search volume',
      try: 'For five keywords about your business, note their search intent and business potential, not just volume.',
      minutes: 20,
      questions: [
        q.single('Search intent is…', ['What the searcher actually wants to find or do', 'The number of searches', 'The keyword’s length', 'The ad price'], 0),
        q.single('A keyword with high volume but no connection to what you sell has…', ['Low business potential', 'High business potential', 'No volume', 'No intent'], 0),
        q.tf('Traffic potential can be bigger than one keyword’s volume, because a page ranks for many related searches.', true),
      ],
    },
    WfxOZJ3wrGU: {
      title: 'Find thousands of keyword ideas',
      try: 'Start from three seed keywords and collect 30 ideas using autocomplete, “People also ask” and competitor pages.',
      minutes: 20,
      questions: [
        q.single('A seed keyword is…', ['A broad starting term you expand into ideas', 'A paid keyword', 'A keyword you must avoid', 'A brand name only'], 0),
        q.multi('Which are sources of keyword ideas?', ['Google autocomplete', '“People also ask”', 'Competitors’ top pages', 'Your phone contacts'], [0, 1, 2]),
      ],
    },
    BwD5deAqW3Y: {
      title: 'Free keyword research tools',
      try: 'Use two free tools from the video to check volume and ideas for your top keyword.',
      minutes: 20,
      questions: [
        q.multi('Which are free keyword tools?', ['Google Keyword Planner', 'Google Search Console', 'Google Trends', 'Photoshop'], [0, 1, 2]),
        q.single('Google Trends shows…', ['How interest in a search changes over time', 'Exact keyword difficulty', 'Your backlinks', 'Ad copy'], 0),
      ],
    },
    jSOq3ysvBk8: {
      title: 'Keyword difficulty',
      try: 'Look at the top results for one keyword. How strong do they look (big brands, many links)? Decide if you could compete now.',
      minutes: 15,
      questions: [
        q.single('Keyword difficulty estimates…', ['How hard it is to rank in the top results', 'How many people search', 'The ad cost', 'The page length'], 0),
        q.tf('New sites often start with lower-difficulty, specific (long-tail) keywords.', true),
      ],
    },
  },
  checkpoint: programExam('Keyword research exam', [
    q.single('Keyword research helps you find…', ['What your audience searches for, and how', 'Your competitors’ passwords', 'Ad prices only', 'Social hashtags only'], 0),
    q.match('Match each search to its likely intent.', [['“how to bake bread”', 'Informational'], ['“buy running shoes size 42”', 'Transactional'], ['“best budget phones 2026”', 'Commercial investigation'], ['“instagram login”', 'Navigational']]),
    q.single('A long-tail keyword is…', ['A longer, more specific search with lower volume', 'A very popular one-word search', 'A brand name', 'A misspelling'], 0),
    q.single('Which is a long-tail keyword?', ['“affordable wedding cakes in Ikeja”', '“cake”', '“food”', '“shop”'], 0),
    q.single('Search volume is…', ['How often a keyword is searched per month', 'How hard it is to rank', 'The ad price', 'The number of results'], 0),
    q.single('Keyword difficulty mostly reflects…', ['The strength of pages already ranking, especially their backlinks', 'The keyword’s length', 'Your budget', 'The time of day'], 0),
    q.single('Business potential asks…', ['How well a keyword leads to what you sell', 'How long it is', 'Who wrote it', 'When it trends'], 0),
    q.single('Traffic potential is…', ['The total traffic the top page gets across all its keywords', 'One keyword’s volume', 'Your ad budget', 'Your follower count'], 0),
    q.multi('Which are good keyword idea sources?', ['Autocomplete', 'People also ask', 'Competitor analysis', 'Guessing alone'], [0, 1, 2]),
    q.single('Google Keyword Planner is part of…', ['Google Ads', 'Google Docs', 'YouTube', 'Gmail'], 0),
    q.single('Google Search Console shows…', ['Searches your site already appears for', 'Competitors’ sales', 'Social media stats', 'Email open rates'], 0),
    q.tf('Matching your page to search intent is essential to rank.', true),
    q.single('If the top results for a keyword are all videos, Google thinks the searcher wants…', ['A video', 'A product page', 'An image only', 'A PDF'], 0),
    q.single('A seed keyword is…', ['A starting point for finding more ideas', 'A paid term', 'A forbidden word', 'A domain name'], 0),
    q.order('Put keyword research in order.', ['Brainstorm seed keywords', 'Expand into ideas with tools', 'Check intent and difficulty', 'Prioritise by business potential', 'Map keywords to pages']),
    q.single('Keyword cannibalisation is…', ['Several of your pages competing for the same keyword', 'Using too few keywords', 'A Google penalty for ads', 'Buying keywords'], 0),
    q.tf('One page can rank for hundreds of related keywords.', true),
    q.single('For a brand-new site, the smartest first targets are…', ['Specific, lower-difficulty keywords', 'The hardest one-word keywords', 'Random keywords', 'Competitors’ brand names'], 0),
    q.single('Seasonality in search means…', ['Interest rises and falls at certain times of year', 'Keywords expire', 'Google changes rules each season', 'Search volume never changes'], 0),
    q.single('Grouping related keywords lets you…', ['Cover them in one strong page', 'Create a page for every word', 'Avoid writing', 'Ignore intent'], 0),
  ]),
};
