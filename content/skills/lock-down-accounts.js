import { q } from '../../src/lib/content/plan';

// Everyday account security in short explainers. A first taste of the Cybersecurity
// Expert program.

export default {
  slug: 'skill-lock-down-accounts',
  title: 'Lock down your online accounts',
  description: 'Strong passwords, a password manager, two-factor sign-in and passkeys, spotting phishing, and backing up what matters.',
  makeTitle: 'Your five most important accounts secured, with a written checklist',
  skillId: 'cybersecurity',
  by: 'IBM Technology',
  modules: [
    {
      title: 'Passwords',
      lessons: [
        {
          id: 'xUp5S0nBnfc',
          title: 'What makes a password strong',
          seconds: 176,
          try: 'List your five most important accounts (email first). Note which share a password.',
          minutes: 15,
          questions: [
            q.single('Which matters most for a strong password?', ['Length, and being unique to one account', 'A capital letter at the start', 'Your birthday', 'Changing it weekly'], 0),
            q.tf('Reusing one password on several sites is risky, because one leak exposes all of them.', true),
          ],
        },
        {
          id: 'wcDtLMraTkQ',
          title: 'Use a password manager',
          by: 'All Things Secured',
          seconds: 293,
          try: 'Set up a password manager (Bitwarden is free, or the one built into your phone) and change your email password to a long, generated one.',
          minutes: 30,
          questions: [
            q.tf('With a password manager you only need to remember one strong master password.', true),
          ],
        },
      ],
    },
    {
      title: 'Sign in more safely',
      lessons: [
        {
          id: 'L3alw3iXaio',
          title: 'Multi-factor authentication',
          seconds: 182,
          try: 'Turn on two-step verification for your email account, using an authenticator app if you can.',
          minutes: 20,
          questions: [
            q.match('Match the factor to an example.', [['Something you know', 'A password'], ['Something you have', 'Your phone'], ['Something you are', 'A fingerprint']]),
            q.single('Which second factor is usually the safest of these?', ['An authenticator app or security key', 'A text message code', 'A security question', 'A second password'], 0),
          ],
        },
        {
          id: 'ExAEb1MizVA',
          title: 'Passkeys explained',
          by: 'All Things Secured',
          seconds: 413,
          try: 'Find one account that offers passkeys (Google, Apple, Microsoft or others) and set one up.',
          minutes: 15,
          questions: [
            q.tf('A passkey can’t be typed into a fake website, which protects you from phishing.', true),
          ],
        },
      ],
    },
    {
      title: 'Spot scams, keep backups',
      lessons: [
        {
          id: 'o0btqyGWIQw',
          title: 'Spot phishing emails',
          by: 'GRC Solutions',
          seconds: 138,
          try: 'Look through your spam folder and find two phishing emails. Write down the warning signs in each.',
          minutes: 15,
          questions: [
            q.multi('Which are warning signs of phishing?', ['Urgent pressure to act now', 'A sender address that doesn’t match the company', 'A link to a look-alike website', 'An email from a friend you were expecting'], [0, 1, 2]),
          ],
        },
        {
          id: 'Uw9qcMAqHYM',
          title: 'Ten ways to tell an email is a scam',
          by: 'macmostvideo',
          seconds: 954,
          try: 'Hover over (or long-press) a link in a real email to see where it actually goes, without clicking it.',
          minutes: 15,
          questions: [
            q.tf('If an email says your account is locked, the safest move is to open the site yourself rather than click the link.', true),
          ],
        },
        {
          id: 'rFO6NyLIP7M',
          title: 'Back up with the 3-2-1 rule',
          by: 'ExplainingComputers',
          seconds: 375,
          try: 'Turn on cloud backup for your phone’s photos and contacts, and write your security checklist for the five accounts. Log it as your make.',
          minutes: 30,
          questions: [
            q.single('The 3-2-1 rule means…', ['3 copies, on 2 kinds of storage, 1 kept off-site', '3 passwords, 2 emails, 1 phone', 'Back up every 3 days, 2 times, for 1 year', '3 devices, 2 clouds, 1 USB stick only'], 0),
          ],
        },
      ],
    },
  ],
};
