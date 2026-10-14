import React from 'react';
import Link from 'next/link';
import { emailConfig } from '../../../lib/email/send';
import { RULES, emailLinks, planReminders } from '../../../lib/email/reminders';
import { TEMPLATES } from '../../../lib/email/templates';
import { emailActivity } from '../../../lib/adminData';
import { getAdmin } from '../../../lib/admin';
import { publicName } from '../../../lib/people';
import { SITE_URL } from '../../../lib/seo';
import ActionButton from '../../../components/admin/ActionButton';
import FilterTabs from '../../../components/admin/FilterTabs';
import Button from '../../../components/ui/Button';
import sendTest from './actions';

// Reminder runs go through every active learner, which can take a while.
export const maxDuration = 60;

const KINDS = {
  STREAK_AT_RISK: { label: 'Streak at risk', when: 'When this week’s goal needs every day that’s left. Once a week.' },
  LOG_MAKE: { label: 'Log your make', when: 'A day after a Try step with nothing logged. Once per lesson, at most weekly.' },
  COME_BACK: { label: 'Come back', when: `After ${RULES.comeBackAfterDays} days without practice. At most every ${RULES.comeBackEveryDays} days.` },
  WEEKLY_RECAP: { label: 'Monday recap', when: 'Mondays, after a week with any XP.' },
};

const resume = {
  lessonTitle: 'Your first purl stitch', pathwayTitle: 'Knit a swatch', url: `${SITE_URL}/skills`,
};
const SAMPLES = {
  STREAK_AT_RISK: {
    streakWeeks: 4, done: 1, goal: 3, needed: 2, daysLeft: 2, resume,
  },
  LOG_MAKE: resume,
  COME_BACK: { ...resume, daysAway: 5 },
  WEEKLY_RECAP: {
    xp: 135, days: 3, goal: 3, streakWeeks: 5, makes: 2, kudos: 4, resume,
  },
};

const time = (d) => new Intl.DateTimeFormat('en-GB', {
  day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
}).format(d);

function Panel({ title, children }) {
  return (
    <section className="grid content-start gap-3 rounded-lg border border-line bg-surface p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default async function AdminEmails({ searchParams = {} }) {
  const config = emailConfig();
  const admin = await getAdmin();
  const preview = KINDS[searchParams.show] ? searchParams.show : 'STREAK_AT_RISK';
  const [activity, run] = await Promise.all([
    emailActivity(),
    searchParams.plan ? planReminders() : null,
  ]);
  const links = emailLinks(admin.id, preview);
  const sample = TEMPLATES[preview]({ name: admin.name, ...SAMPLES[preview] }, links);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Emails</h1>
        <p className="max-w-2xl text-[15px] text-muted">
          {`Reminders go out once a day at 16:00 UTC (17:00 in Lagos), to learners who practised in the last ${RULES.inactiveAfterDays} days, between ${RULES.firstHour}:00 and ${RULES.lastHour}:59 their time. Nobody gets two within ${RULES.minGapHours} hours or more than ${RULES.maxPerWeek} a week, and every email has a one-click unsubscribe.`}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Sending">
          {config.configured ? (
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-[15px]">
              <dt className="text-muted">Status</dt>
              <dd className="font-bold text-accent">On</dd>
              <dt className="text-muted">From</dt>
              <dd className="break-words">{config.from}</dd>
              <dt className="text-muted">Replies to</dt>
              <dd className="break-words">{config.replyTo}</dd>
              <dt className="text-muted">Daily limit</dt>
              <dd className="tabular-nums">{config.dailyLimit}</dd>
            </dl>
          ) : (
            <p className="text-[15px]">
              <span className="font-bold text-xp">Off. </span>
              Add RESEND_API_KEY in Vercel’s environment variables to start sending. Until then the
              daily run only works out who would get what.
            </p>
          )}
          {!process.env.CRON_SECRET && (
            <p className="text-sm font-bold text-xp">CRON_SECRET isn’t set, so the daily run can’t start.</p>
          )}
          <ActionButton action={sendTest} pendingText="Sending…" variant="ghost">Send me a test email</ActionButton>
        </Panel>

        <Panel title="Last 7 days">
          <dl className="grid grid-cols-2 gap-2 text-[15px]">
            {Object.entries(KINDS).map(([kind, k]) => (
              <div key={kind} className="rounded-md bg-sunken px-3 py-2">
                <dt className="text-sm text-muted">{k.label}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums">{activity.byKind[kind] || 0}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted">{`${activity.optedOut} of ${activity.total} learners have switched practice reminders off.`}</p>
        </Panel>
      </div>

      <Panel title="Today’s run">
        <p className="text-[15px] text-muted">See who would get a reminder if the run happened now. Nothing is sent.</p>
        {run ? (
          <>
            <p role="status" className="text-[15px] font-bold">{`${run.plan.length} of ${run.considered} active learners would get one.`}</p>
            {run.plan.length > 0 && (
              <ul className="grid gap-1 text-[15px]">
                {run.plan.slice(0, 50).map((p) => (
                  <li key={p.user.id} className="flex flex-wrap justify-between gap-2 rounded-md px-2 py-1 odd:bg-canvas">
                    <span>{publicName(p.user)}</span>
                    <span className="text-muted">{KINDS[p.kind]?.label || p.kind}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Button href="/admin/emails?plan=1" size="sm" variant="ghost" className="justify-self-start">Work it out</Button>
        )}
      </Panel>

      <Panel title="What learners get">
        <FilterTabs
          label="Email"
          items={Object.entries(KINDS).map(([kind, k]) => ({
            label: k.label, href: `/admin/emails?show=${kind}`, active: preview === kind,
          }))}
        />
        <p className="text-[15px] text-muted">{KINDS[preview].when}</p>
        <p className="text-[15px]">
          <span className="text-muted">Subject: </span>
          <span className="font-bold">{sample.subject}</span>
        </p>
        {/* Our own template with sample data: no scripts, and every value escaped. Links open
            in a new tab rather than inside the frame. */}
        <iframe
          title={`Preview of the ${KINDS[preview].label} email`}
          srcDoc={sample.html.replace('<head>', '<head><base target="_blank">')}
          className="h-[34rem] w-full rounded-md border border-line bg-white"
        />
      </Panel>

      <Panel title="Recently sent">
        {activity.recent.length ? (
          <ul className="grid gap-1 text-[15px]">
            {activity.recent.map((e) => (
              <li key={e.id} className="flex flex-wrap justify-between gap-2 rounded-md px-2 py-1 odd:bg-canvas">
                <span>{`${publicName(e.user)} · ${KINDS[e.kind]?.label || 'Test'}`}</span>
                <span className="tabular-nums text-muted">{`${time(e.createdAt)} UTC`}</span>
              </li>
            ))}
          </ul>
        ) : <p className="text-[15px] text-muted">Nothing sent yet.</p>}
        <p className="text-sm text-muted">
          {'Learners choose their emails in '}
          <Link href="/settings#emails" className="font-bold text-accent hover:underline">Settings</Link>
          .
        </p>
      </Panel>
    </div>
  );
}
