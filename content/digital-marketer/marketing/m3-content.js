import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Content that attracts and converts',
  lessons: {
    TkskQD1Lt4A: {
      title: 'What content marketing is',
      try: 'List five questions your customers ask most. Each one is a piece of content you could create.',
      minutes: 15,
      questions: [
        q.single('Content marketing means…', ['Creating useful content that attracts and keeps an audience', 'Only posting adverts', 'Buying followers', 'Sending spam'], 0),
        q.tf('Answering customers’ real questions is a reliable source of content ideas.', true),
      ],
    },
    DSOfPEyeMNg: {
      title: 'Create a content marketing strategy',
      try: 'Write a simple content strategy: your goal, audience, three content topics, formats and where you will share them.',
      minutes: 20,
      questions: [
        q.multi('Which belong in a content strategy?', ['Goals', 'Audience', 'Topics and formats', 'Random posting'], [0, 1, 2]),
        q.single('Repurposing content means…', ['Turning one piece into others, like a blog into posts and a video', 'Deleting it', 'Copying a competitor', 'Posting it once'], 0),
      ],
    },
    PfDwKjgL8tY: {
      title: 'Attract and engage with content',
      try: 'Rewrite the first two lines of a post or article so they hook the reader immediately.',
      minutes: 15,
      questions: [
        q.single('The opening of a piece of content should…', ['Hook the reader with why it matters to them', 'Start with company history', 'Be long and slow', 'Avoid the topic'], 0),
        q.tf('Engagement grows when content invites people to respond or take part.', true),
      ],
    },
    'sesFL-PuUHA': {
      title: 'Write a successful blog post',
      try: 'Write a 600-word blog post answering one customer question, with a clear title, subheadings and a call to action.',
      minutes: 90,
      questions: [
        q.order('Put writing a blog post in order.', ['Choose a topic and keyword', 'Outline the post', 'Write a draft', 'Edit and add visuals', 'Publish and promote']),
        q.single('Subheadings in a blog post help readers…', ['Scan and find what they need', 'Read slower', 'Ignore the post', 'Buy instantly'], 0),
        q.single('A call to action (CTA) tells the reader…', ['What to do next', 'Who wrote it', 'The date', 'The word count'], 0),
      ],
    },
    '0RoZHfg7uiE': {
      title: 'Storytelling in marketing',
      try: 'Tell a short customer story (real or invented) with a problem, a turning point and a result, in under 150 words.',
      minutes: 20,
      questions: [
        q.single('In brand storytelling, the hero is usually…', ['The customer', 'The company', 'The CEO', 'The competitor'], 0),
        q.single('A good story has…', ['A character, a problem and a resolution', 'Only facts', 'Only a price', 'No conflict'], 0),
      ],
    },
    UrdfAhiaffY: {
      title: 'The psychology of copywriting',
      try: 'Rewrite a product description using two principles from the video, such as social proof and a clear benefit.',
      minutes: 20,
      questions: [
        q.match('Match each principle to an example.', [['Social proof', '“Join 10,000 happy customers”'], ['Scarcity', '“Only 5 left”'], ['Reciprocity', 'A free guide before asking for anything'], ['Authority', 'An expert’s endorsement']]),
        q.single('Benefits are more persuasive than features because…', ['They describe what the customer gains', 'They are longer', 'They use technical words', 'They are cheaper'], 0),
      ],
    },
  },
  checkpoint: programExam('Content marketing exam', [
    q.single('Content marketing aims to…', ['Attract and keep an audience with valuable content', 'Interrupt people', 'Only sell', 'Buy followers'], 0),
    q.multi('Which are content formats?', ['Blog posts', 'Videos', 'Podcasts', 'Invoices'], [0, 1, 2]),
    q.single('The best content ideas usually come from…', ['Real customer questions and problems', 'What you find interesting only', 'Random trends', 'Competitors’ logos'], 0),
    q.single('A content strategy should start with…', ['Goals and audience', 'Picking fonts', 'Posting daily', 'Buying ads'], 0),
    q.single('Repurposing a webinar could mean…', ['Turning it into a blog post, short clips and an email', 'Deleting it', 'Hiding it', 'Copying another webinar'], 0),
    q.single('A blog headline should…', ['Promise a clear benefit and match what people search', 'Be vague', 'Be very long', 'Hide the topic'], 0),
    q.order('Put the parts of a blog post in order.', ['Headline', 'Introduction with a hook', 'Body with subheadings', 'Conclusion', 'Call to action']),
    q.single('Which is a strong CTA?', ['“Download the free checklist”', '“The end”', '“Thanks”', '“Bye”'], 0),
    q.single('In storytelling for brands, the customer is…', ['The hero; the brand is the guide', 'The villain', 'Not mentioned', 'The narrator only'], 0),
    q.single('Stories are persuasive because…', ['People remember and relate to them', 'They are longer', 'They have numbers', 'They avoid emotion'], 0),
    q.single('“Only 3 seats left” uses…', ['Scarcity', 'Reciprocity', 'Authority', 'Social proof'], 0),
    q.single('“Rated 4.9 by 2,000 customers” uses…', ['Social proof', 'Scarcity', 'Reciprocity', 'Anchoring'], 0),
    q.single('Giving a free, useful guide before asking for anything uses…', ['Reciprocity', 'Scarcity', 'Authority', 'Urgency'], 0),
    q.single('Showing the original price crossed out next to a sale price uses…', ['Anchoring', 'Reciprocity', 'Authority', 'Social proof'], 0),
    q.single('Which is a benefit rather than a feature?', ['“Charge once, use all week”', '“5,000 mAh battery”', '“USB-C port”', '“Aluminium case”'], 0),
    q.tf('Persuasion principles should be used honestly; fake scarcity damages trust.', true),
    q.single('Engagement means…', ['People interacting: comments, shares, saves, replies', 'Follower count only', 'Ad spend', 'Post length'], 0),
    q.single('A content calendar helps you…', ['Plan and publish consistently', 'Avoid planning', 'Delete posts', 'Buy ads'], 0),
    q.tf('Editing and cutting unnecessary words usually improves marketing copy.', true),
    q.single('The first lines of any content matter most because…', ['They decide whether people keep reading', 'Search engines ignore the rest', 'They are the longest', 'They are legally required'], 0),
  ]),
};
