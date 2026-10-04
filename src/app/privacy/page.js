/* eslint-disable max-len, react/jsx-one-expression-per-line -- legal prose reads best one paragraph per line. */

import React from 'react';
import Link from 'next/link';
import LegalPage, { Mail, Section } from '../../components/legal/LegalPage';
import { LEGAL } from '../../lib/legal';

export const metadata = { title: 'Privacy policy · LearnTube' };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`What LearnTube collects, why, who else handles it, and how to delete it. LearnTube is run by ${LEGAL.company}, ${LEGAL.country}.`}
      other={{ href: '/terms', label: 'terms of use' }}
    >
      <Section id="collect" title="What we collect">
        <ul>
          <li><strong>From Google when you sign in:</strong> your name, email address and profile picture.</li>
          <li><strong>What you do here:</strong> where you are in each lesson, Try steps and XP, notes, makes (titles, notes and photos), kudos, comment phrases, follows, cheers and reports.</li>
          <li><strong>Quizzes:</strong> your answers and scores. During timed checkpoints we also record each time you leave the quiz page and for how long, and any text you copy or paste. You are told this before a checkpoint starts.</li>
          <li><strong>Settings:</strong> display name, weekly goal, time zone (from your device, so practice days match your clock), leaderboard and extra-time choices.</li>
        </ul>
        <p>
          Photos are re-saved when you upload them, which removes their location and other hidden
          details. We don’t ask for your age, address, phone number or payment details.
        </p>
      </Section>

      <Section id="public" title="What other learners can see">
        <ul>
          <li>Your display name, or your first name and last initial if you haven’t set one. Never your full Google name or email.</li>
          <li>Your makes and their photos, milestones, kudos, comments and follower counts.</li>
          <li>Your XP on leaderboards, unless you turn that off in Settings.</li>
        </ul>
        <p>Notes, quiz answers and quiz integrity logs are private. Admins can see quiz results and integrity logs.</p>
      </Section>

      <Section id="use" title="What we use it for">
        <p>
          Only to run LearnTube: saving your progress, showing your makes and notifications, ranking
          leaderboards, grading quizzes and keeping the community safe. No ads, no selling or
          sharing your data with advertisers, and no analytics or tracking tools.
        </p>
      </Section>

      <Section id="others" title="Who else handles it">
        <ul>
          <li><strong>Google</strong> signs you in.</li>
          <li><strong>Vercel</strong> hosts the site and stores make photos.</li>
          <li><strong>Neon</strong> hosts the database.</li>
          <li><strong>YouTube</strong> plays the lessons, in its privacy-enhanced mode. Nothing loads from YouTube until you press play; from then on, YouTube’s own privacy policy applies to the video.</li>
          <li><strong>Anthropic</strong> may receive lesson transcripts when admins draft quiz questions with AI. Never anything about you.</li>
        </ul>
      </Section>

      <Section id="cookies" title="Cookies and storage">
        <p>
          We set one cookie, to keep you signed in; the site can’t work without it. Your browser also
          remembers your light or dark theme, any code you write in the sandbox, and that you’ve
          chosen to play YouTube videos. Lessons show a still image until you press play; only then
          does YouTube load, and it may set its own cookies. After your first press, later lessons
          load the player straight away. Clearing this site’s data in your browser resets that.
        </p>
      </Section>

      <Section id="keep" title="How long we keep it, and your choices">
        <ul>
          <li>We keep your data while you have an account.</li>
          <li>
            <Link href="/settings" className="font-bold text-accent">Settings</Link>
            {' → Delete account removes your account and everything you created, including photos, straight away. Pathways written by admins stay.'}
          </li>
          <li>You can change your display name and leaderboard choice in Settings at any time.</li>
          <li>
            {'For a copy of your data, or any other privacy request, email '}
            <Mail />
            . We reply within 30 days.
          </li>
        </ul>
      </Section>

      <Section id="children" title="Children">
        <p>
          {`LearnTube is for people aged ${LEGAL.minimumAge} and over, or older where local law requires. If you think a child under ${LEGAL.minimumAge} has an account, email us and we will delete it.`}
        </p>
      </Section>

      <Section id="changes" title="Changes">
        <p>If we change what we collect or who handles it, we’ll update this page and the date at the top first.</p>
      </Section>
    </LegalPage>
  );
}
