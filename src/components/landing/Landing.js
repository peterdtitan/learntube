import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SkillCard from '../skills/SkillCard';
import MakeCard from '../makes/MakeCard';
import Reveal from './Reveal';
import InterestPicker from './InterestPicker';
import StartButton from './StartButton';
import {
  Eyebrow, Laptop, Phone, Wrap, XpPill,
} from './Devices';
import {
  FAQ, GAMES, STEPS, TOOLS, XP_TABLE,
} from './content';
import { formatMinutes } from '../../lib/estimate';

const S = (name) => `/screens/${name}.webp`;
const H2 = 'text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.02]';
// The night band matches the dark-theme canvas, so it gets an edge there.
const NIGHT = 'border-y border-transparent bg-night text-white dark:border-night-line';

function Hero({ categories }) {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,rgb(var(--lt-accent-soft))_0%,transparent_70%)]" />
      <Wrap className="relative grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1fr_1.1fr] lg:pb-24 lg:pt-16">
        <div className="grid gap-6">
          <Eyebrow>Free, forever · An Elev8r product</Eyebrow>
          <h1 id="hero-heading" className="text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[0.98]">
            {'Learn a skill by '}
            <span className="text-accent">making something.</span>
          </h1>
          <p className="max-w-[34rem] text-lg leading-relaxed text-muted">
            Skillreps puts the best free YouTube lessons in order. Watch a short step, try it with
            your own hands, and log what you made. Every rep earns XP.
          </p>
          <InterestPicker categories={categories} />
        </div>
        <div className="relative mx-auto w-full max-w-[640px] pb-10">
          <Laptop src={S('home')} alt="The Skillreps home page with its 3D skill shelf" priority />
          <Phone
            src={S('phone-lesson-xp')}
            alt="A Skillreps lesson on a phone, with the Try step done and +25 XP"
            priority
            className="absolute -bottom-2 right-[-2%] w-[34%] rotate-[4deg]"
          />
          <XpPill tilt="-4deg" className="absolute left-[-2%] top-[18%]">{`+${STEPS[0].xp} XP`}</XpPill>
          <XpPill tilt="3deg" delay="1.2s" className="absolute left-[8%] top-[58%]">{`+${STEPS[1].xp} XP`}</XpPill>
          <XpPill tilt="-2deg" delay="2.4s" className="absolute right-[30%] top-[-4%]">{`+${STEPS[2].xp} XP`}</XpPill>
        </div>
      </Wrap>
    </section>
  );
}

function Facts({ skillCount, program }) {
  const facts = [
    [String(skillCount), 'short skills, from cooking to code'],
    program && [program.lessons.toLocaleString('en'), `lessons in the ${program.title} program`],
    ['10 min', 'or less, every lesson'],
    ['₦0', 'forever. No card, ever.'],
  ].filter(Boolean);
  return (
    <section aria-label="Skillreps in numbers" className="border-y border-line bg-surface">
      <Wrap>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {facts.map(([n, label]) => (
            <div key={label} className="grid gap-1 py-7 pr-4">
              <dt className="font-display text-4xl font-extrabold tabular-nums tracking-[-0.04em]">{n}</dt>
              <dd className="text-[15px] text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </Wrap>
    </section>
  );
}

function How() {
  return (
    <section id="how" aria-labelledby="how-heading" className="scroll-mt-16 py-24">
      <Wrap className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-center">
        <div className="grid gap-8">
          <div className="grid gap-4">
            <Eyebrow>How a lesson works</Eyebrow>
            <h2 id="how-heading" className={H2}>
              {'Every step ends '}
              <span className="text-accent">with your hands.</span>
            </h2>
            <p className="max-w-[36rem] text-lg text-muted">
              The same three steps whether you’re learning to knit or to code. Most XP comes from
              doing, not watching.
            </p>
          </div>
          <ol className="grid gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.08} className="flex items-start gap-5 rounded-lg border border-line bg-surface p-5 sm:p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-lg font-extrabold text-accent">{i + 1}</span>
                  <div className="grid min-w-0 flex-1 gap-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-2xl font-bold">{s.title}</h3>
                      <span className="rounded-pill bg-xp-soft px-3 py-1 font-display text-[15px] font-extrabold text-xp">{`+${s.xp} XP`}</span>
                    </div>
                    <p className="text-muted">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="mx-auto w-full max-w-[330px]">
          <Phone src={S('phone-lesson')} alt="A Skillreps lesson: a BandLab video with Watch, Try and Log steps" />
        </Reveal>
      </Wrap>
    </section>
  );
}

function Skills({ skills }) {
  // Whole rows of three; the rest are a click away.
  const shown = skills.slice(0, Math.max(3, skills.length - (skills.length % 3)));
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-16 bg-surface py-24">
      <Wrap className="grid gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="grid max-w-3xl gap-4">
            <Eyebrow>What you can learn</Eyebrow>
            <h2 id="skills-heading" className={H2}>
              {`${skills.length} short skills. `}
              <span className="text-accent">All free.</span>
            </h2>
            <p className="text-lg text-muted">
              Each one takes under 15 hours and ends with something you made. Open any of them and
              start watching, no account needed.
            </p>
          </div>
          {shown.length < skills.length && (
            <Link href="/skills" className="inline-flex items-center gap-1.5 font-bold text-accent hover:underline">
              {`See all ${skills.length} skills`}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => <SkillCard key={s.id} skill={s} signedIn={false} />)}
        </div>
      </Wrap>
    </section>
  );
}

function Program({ program }) {
  return (
    <section id="program" aria-labelledby="program-heading" className={`scroll-mt-16 py-24 ${NIGHT}`}>
      <Wrap className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="grid gap-6">
          <Eyebrow dark>The program</Eyebrow>
          <h2 id="program-heading" className={H2}>
            {'Cybersecurity, from zero to '}
            <span className="text-mint">Security+.</span>
          </h2>
          <p className="text-lg text-haze">
            {`${program.courses.length} courses, taken in order: from how computers work to defending networks. Built on Professor Messer’s free videos, split into steps, with hands-on tasks and timed checkpoints.`}
          </p>
          <ol className="grid gap-3">
            {program.courses.map((c, i) => (
              <li key={c.id}>
                <Link href={`/pathways/${c.id}`} className="block rounded-lg border border-night-line bg-night2 p-5 transition-colors hover:border-mint">
                  <span className="block text-sm text-haze">{`Course ${i + 1} · ≈ ${formatMinutes(c.minutes)} · ${c.lessons} lessons`}</span>
                  <span className="mt-1 block font-display text-xl font-bold">{c.title}</span>
                  {c.certification && <span className="mt-1 block text-[15px] text-gold">{`Prepares you for ${c.certification}`}</span>}
                </Link>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={`/tracks/${program.slug}`} className="inline-flex items-center gap-1.5 font-bold text-mint hover:underline">
              See the whole program
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="text-sm text-haze">Skillreps isn’t affiliated with CompTIA.</p>
          </div>
        </div>
        <Reveal><Laptop src={S('track')} alt="The Cybersecurity Expert program page in Skillreps" /></Reveal>
      </Wrap>
    </section>
  );
}

function Xp() {
  return (
    <section id="xp" aria-labelledby="xp-heading" className="scroll-mt-16 py-24">
      <Wrap className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="grid gap-6">
          <Eyebrow>XP, streaks and the leaderboard</Eyebrow>
          <h2 id="xp-heading" className={H2}>
            {'Reps add up. '}
            <span className="text-accent">So does XP.</span>
          </h2>
          <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg border border-line bg-surface">
            <caption className="sr-only">XP for each kind of practice</caption>
            <tbody>
              {XP_TABLE.map((r, i) => {
                const edge = i < XP_TABLE.length - 1 ? 'border-b border-line' : '';
                return (
                  <tr key={r.what}>
                    <th scope="row" className={`px-5 py-4 text-left align-top ${edge}`}>
                      <span className="block font-display text-lg font-bold">{r.what}</span>
                      <span className="block text-sm font-normal text-muted">{r.detail}</span>
                    </th>
                    <td className={`px-5 py-4 text-right align-middle ${edge}`}>
                      <span className="rounded-pill bg-xp-soft px-3 py-1 font-display font-extrabold tabular-nums text-xp">{`+${r.xp}`}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3 rounded-lg border border-line bg-surface p-6">
            <h3 className="text-2xl font-bold">Weekly streaks, at your pace</h3>
            <p className="text-muted">
              Choose 2 to 5 practice days a week. A practice day is any day you try a step or log a
              make, and days off never reset your streak.
            </p>
          </div>
          <div className="grid gap-3 rounded-lg border border-line bg-surface p-6">
            <h3 className="text-2xl font-bold">A leaderboard that resets every Monday</h3>
            <p className="text-muted">
              Rank across everything or one skill, against everyone or just people you follow.
              Nobody falls permanently behind, and you can switch it off.
            </p>
          </div>
          <div className="grid grid-cols-[0.8fr_1.2fr] items-end gap-4">
            <Phone src={S('phone-dashboard')} alt="A learner’s workbench with a 4-week practice streak" />
            <Laptop src={S('leaderboard')} alt="The weekly XP leaderboard" />
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function Games() {
  return (
    <section aria-labelledby="games-heading" className="bg-moss py-24 text-white">
      <Wrap className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal className="relative order-2 lg:order-1">
          <Laptop src={S('tower')} alt="The 3D Tower game: each right answer stacks a block" />
          <Phone src={S('phone-speed')} alt="A speed round with points and a streak multiplier" className="absolute -bottom-6 right-[-3%] w-[30%] rotate-[4deg]" />
        </Reveal>
        <div className="order-1 grid gap-6 lg:order-2">
          <Eyebrow dark>Quizzes and 3D games</Eyebrow>
          <h2 id="games-heading" className={H2}>
            {'Know it. '}
            <span className="text-mint">Don’t just watch it.</span>
          </h2>
          <ul className="grid gap-4">
            {GAMES.map(([title, body]) => (
              <li key={title} className="grid gap-1 border-b border-white/10 pb-4 last:border-0">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-haze">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

function Community({ makes }) {
  // Real makes once there are enough to fill a row; a screenshot until then.
  const live = makes.length >= 4;
  return (
    <section aria-labelledby="community-heading" className="py-24">
      <Wrap className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="grid gap-6">
          <Eyebrow>The community</Eyebrow>
          <h2 id="community-heading" className={H2}>
            {'Show what you made. '}
            <span className="text-accent">Get cheered on.</span>
          </h2>
          <p className="text-lg text-muted">
            Log a photo of your granny square, your first web page or your diced onions. Other
            learners give kudos, leave a kind word and cheer your milestones.
          </p>
          <ul className="grid list-disc gap-2 pl-5 text-muted marker:text-accent">
            <li>Comments are picked from a short list of kind phrases, so it stays friendly.</li>
            <li>Photo location and other hidden details are removed when you upload.</li>
            <li>YouTube only loads when you press play.</li>
          </ul>
          <Link href="/makes" className="inline-flex w-fit items-center gap-1.5 font-bold text-accent hover:underline">
            See what people made
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        {live ? (
          <div className="grid grid-cols-2 gap-4">
            {makes.slice(0, 4).map((m) => <MakeCard key={m.id} make={m} />)}
          </div>
        ) : (
          <Reveal><Laptop src={S('makes')} alt="The makes feed: things learners made, with kudos and comments" /></Reveal>
        )}
      </Wrap>
    </section>
  );
}

function FreeTools() {
  return (
    <section id="free" aria-labelledby="free-heading" className="scroll-mt-16 bg-surface py-24">
      <Wrap className="grid gap-12">
        <div className="grid max-w-3xl gap-4">
          <Eyebrow>Free tools that already exist</Eyebrow>
          <h2 id="free-heading" className={H2}>
            {'You don’t need to buy anything '}
            <span className="text-accent">to start.</span>
          </h2>
          <p className="text-lg text-muted">
            The lessons are free. The tools are free. Skillreps is free, forever: no subscription,
            no paywall, no card. We put it all in order and give you a reason to keep going.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TOOLS.map((t) => (
            <li key={t.name} className="grid content-start gap-2 rounded-lg border border-line bg-canvas p-5">
              <h3 className="text-xl font-bold">{t.name}</h3>
              <p className="text-[15px] text-muted">{t.body}</p>
            </li>
          ))}
        </ul>
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal><Laptop src={S('sandbox')} alt="A coding lesson with the built-in HTML, CSS and JavaScript sandbox" /></Reveal>
          <div className="grid gap-3">
            <h3 className="text-2xl font-bold">Code without installing anything</h3>
            <p className="text-muted">
              Every coding lesson has a sandbox for HTML, CSS and JavaScript. Write it, press Run,
              and see your page next to the lesson.
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 py-24">
      <Wrap className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid content-start gap-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq-heading" className={H2}>Good to know</h2>
        </div>
        <div className="grid gap-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-lg border border-line bg-surface p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-2xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-pine py-20 text-white">
      <Wrap className="grid justify-items-start gap-6">
        <h2 id="cta-heading" className="max-w-3xl text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-none">
          Start your first rep today.
        </h2>
        <p className="max-w-xl text-lg text-white/85">
          Pick a skill, watch one short step, and try it with your own hands. It takes ten minutes
          and costs nothing.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <StartButton light />
          <Link href="/skills" className="inline-flex h-12 items-center rounded-pill border-2 border-white/40 px-6 font-bold hover:border-white">
            Browse the skills
          </Link>
        </div>
      </Wrap>
    </section>
  );
}

// What a visitor who isn't signed in sees at "/". Signed-in learners get their own home.
export default function Landing({
  categories, skills, program, makes,
}) {
  return (
    <div className="bleed">
      <Hero categories={categories} />
      <Facts skillCount={skills.length} program={program} />
      <How />
      <Skills skills={skills} />
      {program && <Program program={program} />}
      <Xp />
      <Games />
      <Community makes={makes} />
      <FreeTools />
      <Faq />
      <Cta />
    </div>
  );
}
