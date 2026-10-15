import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Google Ads',
  lessons: {
    'U-MUmnyvkRY': {
      title: 'How Google Ads works',
      try: 'Search for three services in your city and study the ads at the top: their headlines, offers and calls to action.',
      minutes: 15,
      questions: [
        q.single('In Google search ads, you usually pay…', ['When someone clicks your ad (pay per click)', 'For every person who sees the page', 'A fixed monthly fee only', 'Nothing'], 0),
        q.single('Which ad wins the auction depends on…', ['Your bid and the ad’s quality and relevance', 'Only the highest bid', 'Who signed up first', 'Random chance'], 0),
      ],
    },
    DsE0cosomrY: {
      title: 'Google Keyword Planner',
      try: 'Use Keyword Planner (free with a Google Ads account) to find ten keywords for one service, with their search volumes and bid ranges.',
      minutes: 20,
      questions: [
        q.single('Keyword Planner shows…', ['Search volumes and estimated bid costs', 'Your website traffic', 'Your competitors’ budgets exactly', 'Email open rates'], 0),
        q.single('A negative keyword…', ['Stops your ad showing for searches containing it', 'Lowers your bid', 'Is a bad review', 'Is a typo'], 0),
      ],
    },
    jWnwfDcSELA: {
      title: 'Write ad copy for Google Ads',
      try: 'Write five headlines and two descriptions for one ad, including the keyword, a benefit, proof and a call to action.',
      minutes: 20,
      questions: [
        q.multi('What makes strong search ad copy?', ['The keyword the person searched', 'A clear benefit', 'A call to action', 'Your company’s founding date only'], [0, 1, 2]),
        q.tf('Matching the ad to the search makes people more likely to click.', true),
      ],
    },
    gzUy4zv8oqs: {
      title: 'Launch your first campaign',
      try: 'Set up (but don’t have to launch) a search campaign: goal, budget, location, keywords, one ad and conversion tracking.',
      minutes: 40,
      questions: [
        q.order('Put setting up a search campaign in order.', ['Choose the goal and campaign type', 'Set budget and bidding', 'Choose locations and keywords', 'Write the ads', 'Set up conversion tracking and launch']),
        q.single('Conversion tracking tells you…', ['Which clicks led to actions like sales or sign-ups', 'How many people saw your logo', 'Your bank balance', 'Your SEO ranking'], 0),
      ],
    },
    WfOiMZPp4sw: {
      title: 'Optimise your Google Ads',
      try: 'Imagine your campaign ran for a week. List what you’d check in the search terms report and which negative keywords you’d add.',
      minutes: 15,
      questions: [
        q.single('The search terms report shows…', ['The actual searches that triggered your ads', 'Your SEO rankings', 'Email lists', 'Competitors’ ads'], 0),
        q.tf('A relevant landing page improves ad quality and conversions.', true),
      ],
    },
  },
  checkpoint: programExam('Google Ads exam', [
    q.single('PPC stands for…', ['Pay per click', 'Pay per call', 'Price per customer', 'Post per channel'], 0),
    q.single('CPC stands for…', ['Cost per click', 'Clicks per campaign', 'Cost per customer', 'Click-path conversion'], 0),
    q.single('CTR stands for…', ['Click-through rate', 'Cost to run', 'Customer total revenue', 'Campaign tracking report'], 0),
    q.num('An ad got 50 clicks from 1,000 impressions. What is its CTR (%)?', 5, 0),
    q.single('Ad Rank depends on…', ['Bid, ad quality and expected impact of extensions', 'Bid only', 'Account age', 'Website colour'], 0),
    q.single('Quality Score reflects…', ['Expected CTR, ad relevance and landing page experience', 'Your bid only', 'Your SEO', 'Your logo'], 0),
    q.match('Match each keyword match type to what it reaches.', [['Broad match', 'Related searches, most widely'], ['Phrase match', 'Searches that include the meaning of the phrase'], ['Exact match', 'Searches with the same meaning as the keyword']]),
    q.single('Adding “free” as a negative keyword for a paid service…', ['Stops ads showing to people searching for free options', 'Makes ads free', 'Raises bids', 'Improves SEO'], 0),
    q.single('A responsive search ad…', ['Mixes your headlines and descriptions to find the best combinations', 'Changes colour', 'Is a video', 'Is free'], 0),
    q.single('Conversion tracking measures…', ['Actions like purchases or sign-ups after a click', 'Impressions only', 'Your followers', 'Page speed'], 0),
    q.single('A landing page should…', ['Match the ad’s promise and make the next step easy', 'Be your home page always', 'Have no call to action', 'Be unrelated'], 0),
    q.single('The search terms report helps you…', ['Find irrelevant searches to block and good ones to add', 'Write blog posts', 'Build backlinks', 'Change your logo'], 0),
    q.tf('Starting with a small budget and specific keywords limits risk while you learn.', true),
    q.single('Location targeting lets you…', ['Show ads only to people in chosen areas', 'Change your address', 'Improve SEO', 'Target by age only'], 0),
    q.single('Cost per acquisition (CPA) is…', ['Ad spend divided by the number of conversions', 'Clicks divided by impressions', 'Revenue divided by clicks', 'Budget per day'], 0),
    q.num('You spent 50,000 naira and got 10 sales. What is the cost per sale in naira?', 5000, 0),
    q.single('ROAS means…', ['Return on ad spend: revenue divided by ad spend', 'Rate of ad sharing', 'Reach of all searches', 'Ranking of ad slots'], 0),
    q.order('Put optimising a campaign in order.', ['Check conversion data', 'Review the search terms report', 'Add negative keywords', 'Improve ads and landing pages', 'Adjust bids and budget']),
    q.tf('Ads that match the searcher’s words usually get higher click-through rates.', true),
    q.single('Google Keyword Planner is found in…', ['Google Ads', 'Google Analytics only', 'YouTube Studio', 'Gmail'], 0),
  ]),
};
