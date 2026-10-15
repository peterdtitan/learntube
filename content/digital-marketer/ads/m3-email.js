import { q } from '../../../src/lib/content/plan';
import { programExam } from '../../course';

export default {
  title: 'Email marketing',
  lessons: {
    VEbxXPHs7DM: {
      title: 'Get started with email marketing',
      try: 'Sign up for a free email marketing tool (GetResponse, Mailchimp, Brevo or similar) and set up your sender name and address.',
      minutes: 20,
      questions: [
        q.single('Email marketing works well because…', ['You own the list and reach people directly', 'It is the same as social media', 'It needs no permission', 'It is only for big companies'], 0),
        q.tf('You should only email people who have agreed to hear from you.', true),
      ],
    },
    GVBvQ_umCWU: {
      title: 'Build an email list from scratch',
      try: 'Create a signup form with a lead magnet (a free checklist, guide or discount) and add it to your landing page.',
      minutes: 30,
      questions: [
        q.single('A lead magnet is…', ['Something valuable offered in exchange for an email address', 'A bought email list', 'A spam filter', 'A magnet'], 0),
        q.single('Buying email lists is a bad idea because…', ['People didn’t opt in, so it hurts deliverability and breaks laws', 'It is too cheap', 'It works too well', 'Lists are always empty'], 0),
      ],
    },
    T0etC0_kbIk: {
      title: 'Manage your email lists',
      try: 'Plan two segments for your list (for example new subscribers and customers) and what you’d send each.',
      minutes: 15,
      questions: [
        q.single('Segmenting a list means…', ['Splitting subscribers into groups to send more relevant emails', 'Deleting everyone', 'Buying more contacts', 'Sending the same email to all'], 0),
        q.tf('Removing contacts who never open emails helps deliverability.', true),
      ],
    },
    hsVRv1Yd87w: {
      title: 'Welcome emails',
      try: 'Write a welcome email: thank the subscriber, deliver the lead magnet, say what to expect, and give one next step.',
      minutes: 20,
      questions: [
        q.single('Welcome emails usually have…', ['Some of the highest open rates of any email', 'The lowest open rates', 'No purpose', 'Only adverts'], 0),
        q.single('A welcome email should…', ['Deliver what was promised and set expectations', 'Ask for money immediately only', 'Be blank', 'Wait a month'], 0),
      ],
    },
    bm4tTVxeTvc: {
      title: 'Why emails go to spam',
      try: 'Check your sending domain has SPF, DKIM and DMARC records set up, using your email tool’s guide.',
      minutes: 15,
      questions: [
        q.multi('Which help emails avoid spam folders?', ['Sending only to people who opted in', 'Setting up SPF, DKIM and DMARC', 'An easy unsubscribe link', 'ALL CAPS subject lines'], [0, 1, 2]),
        q.tf('An easy unsubscribe link reduces spam complaints.', true),
      ],
    },
    '3JyfOzhFMnw': {
      title: 'Subject lines that get opened',
      try: 'Write five subject lines for your next email using different tactics from the video, and pick the best two to A/B test.',
      minutes: 15,
      questions: [
        q.single('A good subject line is…', ['Clear, specific and makes people want to open', 'Misleading', 'Very long', 'Always in capitals'], 0),
        q.single('A/B testing subject lines means…', ['Sending two versions to small groups and using the winner', 'Sending one at random', 'Writing two emails to one person', 'Deleting the worst list'], 0),
      ],
    },
  },
  checkpoint: programExam('Email marketing exam', [
    q.single('Opt-in means…', ['The person chose to subscribe', 'You added them yourself', 'You bought their email', 'They unsubscribed'], 0),
    q.single('Double opt-in means…', ['Subscribers confirm by clicking a link in an email', 'They subscribe twice', 'You email twice a day', 'Two lists'], 0),
    q.single('A lead magnet is…', ['A free, valuable offer in exchange for an email', 'A spam trick', 'A paid list', 'A pop-up only'], 0),
    q.single('Segmentation means…', ['Grouping subscribers to send more relevant emails', 'Sending to everyone', 'Deleting the list', 'Buying contacts'], 0),
    q.single('Open rate is…', ['The share of delivered emails that were opened', 'The share that bounced', 'Total subscribers', 'Revenue per email'], 0),
    q.single('Click rate is…', ['The share of recipients who clicked a link', 'The share who opened', 'The unsubscribe rate', 'The send time'], 0),
    q.num('An email was delivered to 2,000 people and 500 opened it. What is the open rate (%)?', 25, 0),
    q.multi('Which hurt deliverability?', ['Bought lists', 'High spam complaints', 'Missing SPF/DKIM', 'Clear unsubscribe links'], [0, 1, 2]),
    q.single('SPF, DKIM and DMARC are…', ['Email authentication records that prove you’re a legitimate sender', 'Subject line formulas', 'Lead magnets', 'Social networks'], 0),
    q.single('A welcome email should be sent…', ['Right after someone subscribes', 'A month later', 'Never', 'Only on holidays'], 0),
    q.single('An automation (email sequence) is…', ['A series of emails sent automatically based on triggers or timing', 'One email', 'A newsletter only', 'A spam filter'], 0),
    q.tf('Every marketing email should include an unsubscribe link.', true),
    q.single('A strong subject line…', ['Is clear and gives a reason to open', 'Tricks people', 'Is very long', 'Is in all capitals'], 0),
    q.single('Preview text is…', ['The short line shown after the subject in the inbox', 'The email footer', 'The sender name', 'An attachment'], 0),
    q.single('A bounce is…', ['An email that couldn’t be delivered', 'An opened email', 'A click', 'A reply'], 0),
    q.single('Cleaning your list of long-inactive subscribers…', ['Improves deliverability and engagement', 'Breaks your account', 'Is illegal', 'Lowers open rates'], 0),
    q.order('Put building an email programme in order.', ['Choose a tool and set up your sender', 'Create a lead magnet and signup form', 'Write a welcome email', 'Segment and send regular emails', 'Measure and improve']),
    q.single('Personalisation like using the subscriber’s first name…', ['Can increase engagement when used naturally', 'Is spam', 'Is not possible', 'Always lowers opens'], 0),
    q.tf('Data protection laws (like the NDPA in Nigeria or GDPR in Europe) require consent for marketing emails.', true),
    q.single('The main advantage of an email list over social followers is…', ['You own it and aren’t at the mercy of an algorithm', 'It is bigger', 'It is free forever', 'It needs no consent'], 0),
  ]),
};
