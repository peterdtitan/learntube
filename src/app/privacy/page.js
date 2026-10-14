/* eslint-disable max-len, react/jsx-one-expression-per-line -- legal prose reads best one paragraph per line. */

import React from 'react';
import Link from 'next/link';
import LegalPage, { Mail, Section } from '../../components/legal/LegalPage';
import { LEGAL } from '../../lib/legal';
import { RETENTION_DAYS } from '../../lib/retention';
import { START_COOKIE } from '../../lib/picks';
import { staticMetadata } from '../../lib/seo';

export const metadata = staticMetadata(
  'Privacy policy',
  'What Skillreps collects, why, who handles it, how long we keep it, and how to download or delete your data.',
  '/privacy',
);

function Table({ caption, head, rows }) {
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full border-collapse text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-sunken">
          <tr>{head.map((h) => <th key={h} scope="col" className="px-3 py-2 font-bold">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest]) => (
            <tr key={first} className="border-t border-line align-top">
              <th scope="row" className="px-3 py-2 font-bold">{first}</th>
              {rest.map((cell) => <td key={cell} className="px-3 py-2">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`What Skillreps collects, why, who else handles it, how long we keep it, and what you can do about it. Skillreps is run by ${LEGAL.company}, ${LEGAL.country}, which is responsible for your data (the “data controller”).`}
      other={{ href: '/terms', label: 'terms of use' }}
    >
      <Section id="collect" title="What we collect">
        <ul>
          <li><strong>From Google when you sign in:</strong> your name, email address and profile picture. We don’t keep Google’s sign-in tokens, and we never see your Google password.</li>
          <li><strong>What you do here:</strong> where you are in each lesson, Try steps and XP, notes, makes (titles, notes and photos), kudos, comment phrases, follows, cheers and reports.</li>
          <li><strong>Quizzes:</strong> your answers and scores. During timed module exams we also record the kind of device (phone, tablet or computer), each time you leave the exam page and for how long, and any text you copy or paste. You are told this before an exam starts.</li>
          <li><strong>Settings and the welcome questions:</strong> display name, interests, what brought you here, weekly goal, time zone (from your device, so practice days match your clock), leaderboard and extra-time choices.</li>
          <li><strong>Technical logs:</strong> our host records requests (IP address, browser and page) for a short time to run and protect the site.</li>
        </ul>
        <p>
          Photos are re-saved when you upload them, which removes their location and other hidden
          details. We don’t ask for your age, address, phone number or payment details.
        </p>
      </Section>

      <Section id="use" title="Why we use it, and on what basis">
        <Table
          caption="What we use data for and the legal basis for each"
          head={['What for', 'Legal basis']}
          rows={[
            ['Your account, lessons, progress, notes, makes and XP', 'Providing the service you signed up for (contract)'],
            ['Showing your makes, milestones and XP to other learners', 'Providing the service; you can hide yourself from leaderboards and delete anything you post'],
            ['Exam integrity logs', 'Our legitimate interest in fair scores, explained before each exam'],
            ['Reports, moderation and rate limits', 'Our legitimate interest in keeping the community safe and the site running'],
            ['Interests picked before signing in', 'Your request: you ticked them and pressed Start'],
          ]}
        />
        <p>
          No ads, no selling or sharing your data with advertisers, and no analytics or tracking
          tools. Quiz scores and penalties are worked out automatically, but they only affect your
          XP and your own learning record; nothing here makes decisions with legal or similar
          effects on you.
        </p>
      </Section>

      <Section id="public" title="What other learners can see">
        <ul>
          <li>Your display name, or your first name and last initial if you haven’t set one. Never your full Google name or email.</li>
          <li>Your makes and their photos, milestones, kudos, comments and follower counts.</li>
          <li>Your XP on leaderboards, unless you turn that off in Settings.</li>
        </ul>
        <p>
          Notes, quiz answers and quiz integrity logs are private. Admins can see quiz results and
          integrity logs. Learner profiles and individual makes are kept out of search engines.
        </p>
      </Section>

      <Section id="others" title="Who else handles it, and where">
        <ul>
          <li><strong>Google</strong> signs you in.</li>
          <li><strong>Vercel</strong> hosts the site and stores make photos.</li>
          <li><strong>Neon</strong> hosts the database.</li>
          <li><strong>YouTube</strong> plays the lessons, in its privacy-enhanced mode. Nothing loads from YouTube until you press play; from then on, YouTube’s own privacy policy applies to the video.</li>
          <li><strong>Anthropic</strong> may receive lesson transcripts when admins draft quiz questions with AI. Never anything about you.</li>
        </ul>
        <p>
          Our servers and database are in the United States, so your data leaves your country when
          you use Skillreps. Vercel and Neon handle it only on our instructions, under data
          processing terms that include standard contractual clauses for international transfers.
        </p>
      </Section>

      <Section id="cookies" title="Cookies and storage">
        <p>
          We only use cookies the site needs to work, so there is nothing to opt into. There are no
          advertising or analytics cookies.
        </p>
        <Table
          caption="Cookies Skillreps sets"
          head={['Cookie', 'What it does', 'How long']}
          rows={[
            ['next-auth.session-token', 'Keeps you signed in', '30 days from your last visit, or until you sign out'],
            ['next-auth.csrf-token', 'Protects signing in from forged requests', 'Until you close your browser'],
            ['next-auth.callback-url', 'Brings you back to the page you signed in from', 'Until you close your browser'],
            ['next-auth.state and next-auth.pkce.code_verifier', 'Prove that the answer coming back from Google is for the sign-in you started', '15 minutes'],
            [START_COOKIE, 'Holds your answers to the start questions while you sign up with Google, so your new account starts with them', 'Up to a day; removed once you’re signed in'],
          ]}
        />
        <p>
          On secure connections the sign-in cookies carry a <code>__Secure-</code> or{' '}
          <code>__Host-</code> prefix. Your browser also remembers, on your device only, your light
          or dark theme, any code you write in the sandbox, that you’ve chosen to play YouTube
          videos, and that you’ve seen the cookie notice. Lessons show a still image until you
          press play; only then does YouTube load, and it may set its own cookies. Clearing this
          site’s data in your browser resets all of this.
        </p>
      </Section>

      <Section id="keep" title="How long we keep it">
        <Table
          caption="How long each kind of data is kept"
          head={['Data', 'Kept for']}
          rows={[
            ['Your account and everything you created', 'Until you delete it, or your whole account'],
            ['Text copied or pasted during an exam', `${RETENTION_DAYS.checkpointCopyText} days; the counts stay with the attempt`],
            ['Notifications', `${RETENTION_DAYS.notifications} days`],
            ['Expired sign-in sessions', 'Removed daily'],
            ['Rate-limit counters', `${RETENTION_DAYS.rateLimits} days`],
            ['Technical logs at our host', 'A short time set by Vercel, measured in days'],
            ['Database backups', 'Overwritten within 30 days, so deleted data leaves backups by then'],
          ]}
        />
      </Section>

      <Section id="rights" title="Your rights and choices">
        <ul>
          <li>
            <strong>Get a copy:</strong>{' '}
            <Link href="/settings" className="font-bold text-accent">Settings</Link>
            {' → Download my data gives you a file of everything we hold about you.'}
          </li>
          <li>
            <strong>Correct it:</strong> change your display name, goal, interests and leaderboard
            choice in Settings or on the <Link href="/welcome" className="font-bold text-accent">welcome questions</Link>.
            Your name, email and picture come from Google.
          </li>
          <li>
            <strong>Delete it:</strong> delete any make, or Settings → Delete account removes your
            account and everything you created, including photos, straight away. Pathways written by
            admins stay.
          </li>
          <li>
            <strong>Object or ask us to limit</strong> how we use your data, or anything else: email{' '}
            <Mail />. We reply within 30 days, and may ask you to write from your account’s email so
            we know it’s you.
          </li>
          <li>
            <strong>Complain:</strong> if you’re unhappy with our answer, you can complain to the{' '}
            <a href="https://ndpc.gov.ng" className="font-bold text-accent" target="_blank" rel="noopener noreferrer">Nigeria Data Protection Commission</a>
            {' '}or the data protection authority where you live.
          </li>
        </ul>
      </Section>

      <Section id="security" title="Keeping it safe">
        <p>
          Everything travels over HTTPS, and our providers encrypt stored data. Only admins can see
          quiz integrity logs and reports, and posting, progress and quiz actions are rate-limited. If a
          breach puts your data at risk, we’ll tell the Nigeria Data Protection Commission within
          72 hours of finding out, and tell you without delay.
        </p>
      </Section>

      <Section id="children" title="Children">
        <p>
          {`Skillreps is for people aged ${LEGAL.minimumAge} and over, or older where local law requires. If you think a child under ${LEGAL.minimumAge} has an account, email us and we will delete it.`}
        </p>
      </Section>

      <Section id="changes" title="Changes">
        <p>If we change what we collect or who handles it, we’ll update this page and the date at the top first.</p>
      </Section>
    </LegalPage>
  );
}
