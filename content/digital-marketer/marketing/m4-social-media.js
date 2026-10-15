import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Social media marketing',
  lessons: {
    'cl6CrqbGg-g': {
      title: 'Seven social media hacks',
      try: 'Apply two hacks from the video to your (or a practice) business account this week.',
      minutes: 15,
      questions: [
        q.single('Posting consistently on social media mainly helps…', ['Your audience know when to expect you and builds momentum', 'Lower costs to zero', 'Guarantee virality', 'Replace your website'], 0),
        q.tf('Replying to comments and messages builds engagement and trust.', true),
      ],
    },
    '6Qj6MN4ig44': {
      title: 'Build a social media calendar',
      try: 'Fill in a two-week social media calendar with a post idea, format and caption for each day you’ll post.',
      minutes: 30,
      questions: [
        q.single('A social media calendar…', ['Plans what to post, where and when', 'Tracks your followers’ birthdays', 'Is a type of ad', 'Replaces analytics'], 0),
        q.multi('Which belong in a calendar entry?', ['Date and platform', 'Format (reel, carousel, story)', 'Caption and call to action', 'Your password'], [0, 1, 2]),
      ],
    },
    'l_ABb-7MmzU': {
      title: 'Sell products on Instagram',
      try: 'Write three posts that sell one product without feeling pushy: a demo, a customer result, and an offer with a clear CTA.',
      minutes: 20,
      questions: [
        q.single('Short videos (Reels) are useful for selling because…', ['They reach people beyond your followers and show the product in use', 'They are always free ads', 'They replace checkout', 'They can’t be shared'], 0),
        q.tf('Making it easy to buy (clear price, link or DM instructions) increases sales.', true),
      ],
    },
    '3uKGxP1_DUI': {
      title: 'User-generated content',
      try: 'Ask three happy customers (or friends) for a photo or short video using your product, and plan how you’ll reshare it with permission.',
      minutes: 15,
      questions: [
        q.single('User-generated content (UGC) is…', ['Content made by customers about your brand', 'Content made by your staff', 'Paid ads', 'Stock photos'], 0),
        q.single('Before resharing a customer’s post, you should…', ['Ask their permission and credit them', 'Repost it silently', 'Edit out their name', 'Charge them'], 0),
      ],
    },
    ar6aLcEN9JE: {
      title: 'Write a bio that gets attention',
      try: 'Rewrite your social bio: who you help, how, a bit of proof, and a call to action with a link.',
      minutes: 10,
      questions: [
        q.multi('What makes a strong social bio?', ['Who you help and how', 'A call to action', 'A link', 'A long list of hashtags'], [0, 1, 2]),
        q.tf('Your bio should make it obvious within seconds what you offer.', true),
      ],
    },
    yLNSQyExhTU: {
      title: 'Influencer marketing',
      try: 'Find three small creators whose audience matches your “who”. Note their engagement, not just follower count, and draft a short partnership message. Then put your one-page marketing plan, content calendar and sample posts together and log them as your make.',
      minutes: 20,
      questions: [
        q.single('Micro-influencers (smaller creators) are often valuable because…', ['Their audiences are engaged and trust them', 'They have the most followers', 'They are always free', 'They never disclose ads'], 0),
        q.single('Paid partnerships should be…', ['Clearly disclosed, for example with #ad', 'Hidden', 'Secret', 'Unlabelled'], 0),
        q.tf('Engagement rate often matters more than follower count when choosing creators.', true),
      ],
    },
  },
  checkpoint: programExam('Social media exam', [
    q.single('The best social platform for your business is…', ['Where your audience already spends time', 'Whichever is newest', 'All of them equally', 'The one with the most users globally'], 0),
    q.single('Consistency on social media means…', ['Posting on a regular, sustainable schedule', 'Posting ten times a day', 'Posting only when inspired', 'Never changing anything'], 0),
    q.single('A content calendar helps you…', ['Plan ahead and keep a steady mix of posts', 'Buy followers', 'Avoid analytics', 'Post less'], 0),
    q.multi('Which are common post formats?', ['Reels or short videos', 'Carousels', 'Stories', 'Fax'], [0, 1, 2]),
    q.single('UGC means…', ['Content created by customers or users', 'Content from your agency', 'Paid ads', 'Stock images'], 0),
    q.single('UGC builds trust because…', ['People trust other customers more than brands', 'It is professionally shot', 'It is paid', 'It is anonymous'], 0),
    q.single('A strong bio includes…', ['What you offer, who it’s for and a call to action', 'Only your company’s founding year', 'Only emojis', 'Your phone’s model'], 0),
    q.single('Engagement rate is roughly…', ['Interactions divided by reach or followers', 'Total followers', 'Ad spend', 'Posts per week'], 0),
    q.num('A post reached 2,000 people and got 100 interactions. What is the engagement rate (%)?', 5, 0),
    q.single('Micro-influencers usually have…', ['Smaller but highly engaged audiences', 'Millions of followers', 'No audience', 'Only bots'], 0),
    q.single('Paid partnerships must be…', ['Disclosed clearly', 'Hidden', 'Unlabelled', 'Deleted after a day'], 0),
    q.tf('Replying to comments quickly can increase engagement.', true),
    q.single('Social selling works best when posts…', ['Show the product solving a real problem, with an easy way to buy', 'Only show prices', 'Are only text', 'Have no call to action'], 0),
    q.single('A call to action on social might be…', ['“DM ‘CAKE’ to order”', '“Hello”', '“The end”', '“Thanks”'], 0),
    q.single('Before choosing an influencer, you should check…', ['Their audience matches yours and engagement is genuine', 'Only their follower count', 'Their car', 'Nothing'], 0),
    q.order('Put planning social content in order.', ['Know your audience and goal', 'Choose content pillars (themes)', 'Plan posts in a calendar', 'Create and schedule', 'Review the results']),
    q.single('Content pillars are…', ['The few recurring themes you post about', 'Server hardware', 'Ad budgets', 'Hashtags only'], 0),
    q.tf('Buying fake followers harms your reach and credibility.', true),
    q.single('Saves and shares are valuable because…', ['They signal genuinely useful content and spread it', 'They cost money', 'They are invisible', 'They lower reach'], 0),
    q.single('Social media analytics help you…', ['See which posts work and adjust', 'Hide posts', 'Pay less tax', 'Avoid planning'], 0),
  ]),
};
