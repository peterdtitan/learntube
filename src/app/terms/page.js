/* eslint-disable max-len, react/jsx-one-expression-per-line -- legal prose reads best one paragraph per line. */

import React from 'react';
import Link from 'next/link';
import LegalPage, { Mail, Section } from '../../components/legal/LegalPage';
import { LEGAL } from '../../lib/legal';

export const metadata = { title: 'Terms of use · LearnTube' };

export default function Terms() {
  return (
    <LegalPage
      title="Terms of use"
      intro={`The rules for using LearnTube, run by ${LEGAL.company}, ${LEGAL.country}. By signing in you agree to them.`}
      other={{ href: '/privacy', label: 'privacy policy' }}
    >
      <Section id="who" title="Who can use LearnTube">
        <p>
          {`You need to be ${LEGAL.minimumAge} or older, or older where local law requires, and to sign in with a Google account that is yours. Keep that account secure; what happens under it is your responsibility.`}
        </p>
      </Section>

      <Section id="lessons" title="The lessons">
        <p>
          Every video belongs to its YouTube creator and plays through YouTube’s own player, so
          YouTube’s terms apply to it. We choose and order lessons; we don’t copy or change them.
          If you made a video and want it removed from LearnTube, email
          {' '}
          <Mail />
          {' '}
          and we’ll take it down.
        </p>
        <p>
          Lessons, quizzes and estimates are for learning. They are not professional advice or a
          qualification, and time-to-learn estimates are a guide only.
        </p>
      </Section>

      <Section id="safety" title="Practise safely">
        <p>
          Many skills here involve knives, heat, needles, tools or electricity. Follow the creator’s
          safety advice, use proper equipment, and stop if something feels unsafe. You practise at
          your own risk.
        </p>
      </Section>

      <Section id="content" title="What you post">
        <ul>
          <li>You keep ownership of your makes, photos and notes.</li>
          <li>You allow us to store them and show the public parts (makes, photos, milestones) on LearnTube, for as long as you keep them here.</li>
          <li>Only post photos you took or have permission to share, and nothing showing other people without their consent.</li>
          <li>Nothing illegal, sexual, violent, hateful, or that shares anyone’s personal information.</li>
        </ul>
      </Section>

      <Section id="fair" title="Playing fair">
        <ul>
          <li>Don’t use scripts, bots or anything else to earn XP, flood the site, or get around limits.</li>
          <li>
            During timed checkpoints we record leaving the quiz, copying and pasting, and deduct points
            for them, as explained before each one starts. Scores are for your learning.
          </li>
          <li>Report makes that break these rules. Makes with several reports are hidden until an admin reviews them.</li>
        </ul>
      </Section>

      <Section id="ending" title="Ending your account">
        <p>
          You can delete your account at any time in
          {' '}
          <Link href="/settings" className="font-bold text-accent">Settings</Link>
          . We may remove content or suspend accounts that break these terms, and will tell you why
          where we can.
        </p>
      </Section>

      <Section id="liability" title="Our responsibility">
        <p>
          {`LearnTube is free and provided as it is. We work to keep it running and accurate but can’t promise it will always be available or error-free. As far as the law allows, ${LEGAL.company} isn’t liable for indirect losses or for injuries from practising a skill. Nothing here limits rights you have under consumer law.`}
        </p>
      </Section>

      <Section id="law" title="Changes and governing law">
        <p>
          {`We’ll update this page and its date before changing these terms. They are governed by the laws of ${LEGAL.country}.`}
        </p>
      </Section>
    </LegalPage>
  );
}
