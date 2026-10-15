import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Customers, funnels and plans',
  lessons: {
    'lBWz-GtziVw': {
      title: 'The buyer’s journey',
      try: 'Map your customer’s journey: what they search or ask at the awareness, consideration and decision stages.',
      minutes: 15,
      questions: [
        q.order('Put the buyer’s journey stages in order.', ['Awareness', 'Consideration', 'Decision']),
        q.single('At the awareness stage, a buyer…', ['Realises they have a problem or need', 'Is ready to buy your product', 'Has already bought', 'Is comparing your prices'], 0),
      ],
    },
    _2H7OlHkv1w: {
      title: 'Build a marketing funnel',
      try: 'Draw a funnel for your business with one piece of content at the top, middle and bottom.',
      minutes: 15,
      questions: [
        q.single('The top of the funnel (TOFU) aims to…', ['Attract a wide audience with awareness content', 'Close sales', 'Ask for reviews', 'Send invoices'], 0),
        q.single('The bottom of the funnel (BOFU) aims to…', ['Turn interested leads into customers', 'Reach strangers', 'Entertain only', 'Grow followers'], 0),
      ],
    },
    Stc0beAxavY: {
      title: 'The jobs to be done theory',
      try: 'Write the “job” your customers hire your product to do, in one sentence, from their point of view.',
      minutes: 15,
      questions: [
        q.single('Jobs to be done says customers…', ['“Hire” products to get a job done in their lives', 'Buy only on price', 'Only care about features', 'Never switch brands'], 0),
        q.tf('Understanding the job helps you see who you really compete with.', true),
      ],
    },
    lDdTW0o7N6Q: {
      title: 'Write a marketing plan in five steps',
      try: 'Write a one-page marketing plan for your business: goal, audience, budget, channels and how you will measure success.',
      minutes: 30,
      questions: [
        q.multi('What belongs in a marketing plan?', ['Goals', 'Target audience', 'Budget and channels', 'Your favourite colour'], [0, 1, 2]),
        q.single('A SMART marketing goal is…', ['Specific, measurable and time-bound, like “50 new email sign-ups by March”', '“Get famous”', '“More sales”', '“Post a lot”'], 0),
      ],
    },
    '3dW5RJxX_gQ': {
      title: 'Create a marketing campaign',
      try: 'Plan a two-week campaign for one offer: goal, audience, message, channels, content list and the KPI you will track.',
      minutes: 30,
      questions: [
        q.single('A campaign is…', ['A coordinated push towards one goal over a set time', 'Any single post', 'Your logo', 'A website'], 0),
        q.single('Every campaign needs…', ['A clear goal and a way to measure it', 'A celebrity', 'A big budget', 'A new logo'], 0),
        q.tf('Using the same core message across all channels in a campaign makes it stronger.', true),
      ],
    },
  },
  checkpoint: programExam('Customers and plans exam', [
    q.order('Put the buyer’s journey in order.', ['Awareness', 'Consideration', 'Decision']),
    q.single('At the consideration stage, buyers…', ['Compare possible solutions', 'Don’t know they have a problem', 'Have already bought', 'Leave reviews'], 0),
    q.single('At the decision stage, buyers…', ['Choose a specific product or provider', 'Discover the problem', 'Ignore offers', 'Only browse'], 0),
    q.single('Which content suits the awareness stage?', ['A blog post explaining a common problem', 'A pricing page', 'A discount code', 'A checkout page'], 0),
    q.single('Which content suits the decision stage?', ['Case studies, demos and pricing', 'A general “what is” article', 'A meme', 'A job advert'], 0),
    q.single('TOFU, MOFU and BOFU stand for…', ['Top, middle and bottom of the funnel', 'Three social networks', 'Three ad formats', 'Three email types'], 0),
    q.single('The funnel narrows because…', ['Fewer people move to each next stage', 'More people join at the bottom', 'It is a shape only', 'Ads stop'], 0),
    q.single('“Jobs to be done” means customers buy products to…', ['Make progress on something in their lives', 'Collect features', 'Spend money', 'Follow trends only'], 0),
    q.tf('A milkshake might compete with a banana, not just other milkshakes, if both do the same “job”.', true),
    q.multi('Which belong in a marketing plan?', ['Goals', 'Audience', 'Budget', 'Measurement'], [0, 1, 2, 3]),
    q.single('Which is a SMART goal?', ['Get 200 newsletter sign-ups by 31 March', 'Be more popular', 'Sell lots', 'Grow somehow'], 0),
    q.single('A buyer persona is…', ['A research-based profile of an ideal customer', 'A real customer’s private data', 'A logo', 'A competitor'], 0),
    q.single('A campaign’s KPI should…', ['Measure progress towards its goal', 'Be chosen after it ends', 'Be the number of posts only', 'Be vague'], 0),
    q.order('Put planning a campaign in order.', ['Set the goal', 'Define the audience', 'Craft the message', 'Choose channels and content', 'Launch and measure']),
    q.single('Conversion rate is…', ['The share of people who take the action you want', 'The number of followers', 'The ad budget', 'The email open time'], 0),
    q.num('100 people visit a page and 4 buy. What is the conversion rate (%)?', 4, 0),
    q.tf('Mapping the journey helps you create the right content for each stage.', true),
    q.single('A lead is…', ['Someone who has shown interest, like giving their email', 'Any website visitor', 'A competitor', 'A product'], 0),
    q.single('Nurturing leads means…', ['Helping interested people towards buying with useful follow-up', 'Spamming them daily', 'Ignoring them', 'Selling their data'], 0),
    q.single('A marketing budget should be tied to…', ['Goals and expected results', 'What competitors post', 'Random amounts', 'Office rent'], 0),
  ]),
};
