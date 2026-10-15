import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'What marketing is today',
  lessons: {
    YhK_PGhdPe8: {
      title: 'What digital marketing is',
      try: 'Pick a small business you like (or your own). List every way it reaches people online: website, social, search, email, ads, WhatsApp.',
      minutes: 15,
      questions: [
        q.multi('Which are digital marketing channels?', ['Search engines', 'Social media', 'Email', 'Billboards'], [0, 1, 2]),
        q.tf('Digital marketing can be measured more precisely than most traditional marketing.', true),
      ],
    },
    vrJY85dBJLc: {
      title: 'What marketing is today, with Seth Godin',
      try: 'Write one sentence describing the change your business (or a business you like) makes in its customers’ lives.',
      minutes: 10,
      questions: [
        q.single('Seth Godin describes marketing as…', ['Making change happen for the people you serve', 'Shouting the loudest', 'Only running ads', 'Selling to everyone'], 0),
        q.tf('Good marketing starts with the customer, not the product.', true),
      ],
    },
    dLrw4cr5FZA: {
      title: 'How inbound marketing grows a business',
      try: 'Write down three helpful things your business could share that would attract the right customers without an ad.',
      minutes: 10,
      questions: [
        q.single('Inbound marketing…', ['Attracts people with helpful content and experiences', 'Interrupts people with cold calls', 'Only uses billboards', 'Avoids the internet'], 0),
        q.single('Which is an example of outbound marketing?', ['A cold call or an interrupting TV ad', 'A helpful blog post found on Google', 'A useful YouTube tutorial', 'A free guide people sign up for'], 0),
      ],
    },
    H1UTA5ckoJ0: {
      title: 'What inbound means as a strategy',
      try: 'Sketch the flywheel for your chosen business: how it attracts, engages and delights customers.',
      minutes: 10,
      questions: [
        q.order('Put HubSpot’s inbound stages in order.', ['Attract', 'Engage', 'Delight']),
        q.single('“Delighting” customers matters because…', ['Happy customers bring in new customers through word of mouth', 'It ends the relationship', 'It replaces selling', 'It costs nothing'], 0),
      ],
    },
    UC4A2aimQaE: {
      title: 'Find your “who”',
      try: 'Describe your smallest viable audience in three sentences: who they are, what they want, and what they believe.',
      minutes: 15,
      questions: [
        q.single('Godin’s “smallest viable audience” means…', ['The smallest group you can truly serve and delight', 'Everyone', 'Only rich customers', 'Your family'], 0),
        q.tf('Trying to market to everyone usually means reaching no one well.', true),
      ],
    },
    VScS36if7YQ: {
      title: 'How to reach your audience',
      try: 'List the three places (online or off) where your “who” already spends time and pays attention.',
      minutes: 10,
      questions: [
        q.single('The best place to reach an audience is…', ['Where they already spend time and attention', 'Wherever ads are cheapest', 'Everywhere at once', 'Only TV'], 0),
        q.tf('Trust is built over time by keeping promises to your audience.', true),
      ],
    },
  },
  checkpoint: programExam('Marketing today exam', [
    q.single('Digital marketing is…', ['Marketing through online channels like search, social and email', 'Only TV ads', 'Only printing flyers', 'Selling door to door'], 0),
    q.multi('Which are digital marketing channels?', ['SEO', 'Email', 'Social media', 'Radio jingles only'], [0, 1, 2]),
    q.single('Inbound marketing works by…', ['Attracting people with useful content', 'Interrupting people', 'Cold calling', 'Buying lists of emails'], 0),
    q.single('Outbound marketing is…', ['Pushing messages to people who didn’t ask, like cold calls', 'Writing helpful blog posts', 'Answering questions on YouTube', 'SEO'], 0),
    q.order('Put the inbound flywheel stages in order.', ['Attract', 'Engage', 'Delight']),
    q.single('The flywheel idea says delighted customers…', ['Help attract new customers', 'Leave', 'Cost more', 'Don’t matter'], 0),
    q.single('Seth Godin’s view of marketing focuses on…', ['Serving a specific group and making change for them', 'Reaching the biggest crowd', 'Being the cheapest', 'Spamming'], 0),
    q.single('A “smallest viable audience” is…', ['The smallest group you can serve well enough to matter to them', 'The whole country', 'A random sample', 'Your followers count'], 0),
    q.tf('A clear “who” makes every other marketing decision easier.', true),
    q.single('Which is the best audience description?', ['“Busy Lagos mums who want quick, healthy lunches for school kids”', '“Everyone who eats”', '“People”', '“Customers”'], 0),
    q.single('Marketing should start from…', ['The customer’s needs', 'The product’s features only', 'The competitor’s price', 'The logo'], 0),
    q.single('Reaching your audience works best…', ['Where they already pay attention', 'Where you like to be', 'On every platform equally', 'Only through ads'], 0),
    q.single('Trust is built by…', ['Keeping promises and being consistent', 'Posting more ads', 'Lowering prices only', 'Avoiding customers'], 0),
    q.tf('Digital channels make it easier to measure what works.', true),
    q.multi('Which are inbound tactics?', ['Blog posts', 'Helpful videos', 'Free guides', 'Cold calling'], [0, 1, 2]),
    q.single('A brand is…', ['What people expect and feel about you', 'Just the logo', 'Only the name', 'The price'], 0),
    q.single('Word of mouth is strongest when…', ['Customers are genuinely delighted', 'Ads are loud', 'Prices are high', 'You post daily'], 0),
    q.single('Which question should a marketer ask first?', ['Who is this for, and what change do they want?', 'Which colour logo?', 'How many posts a day?', 'What’s the cheapest ad?'], 0),
    q.tf('Inbound and outbound can be used together, but inbound builds lasting attention.', true),
    q.single('“People like us do things like this” describes…', ['How culture and belonging drive choices', 'A discount code', 'A search ranking factor', 'An email rule'], 0),
  ]),
};
