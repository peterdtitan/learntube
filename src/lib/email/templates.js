import { XP } from '../xpValues';
import { LEGAL } from '../legal';

// The reminder emails, as plain functions of their data so they're easy to test and preview.
// Each returns { subject, preheader, text, html }. Email clients ignore stylesheets, so the
// HTML is tables with inline styles, in the site's colours.

const C = {
  canvas: '#F3F5F7', surface: '#FFFFFF', ink: '#17212B', muted: '#55616C', line: '#DDE3E8', accent: '#2F6F62', xp: '#9A5A00',
};
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

const plural = (n, word, many = `${word}s`) => `${n} ${n === 1 ? word : many}`;
const firstName = (name) => (name || '').trim().split(/\s+/)[0] || 'there';

function statsTable(stats) {
  const cells = stats.map(([label, value]) => `
    <td style="padding:12px 8px;text-align:center;border:1px solid ${C.line};border-radius:8px;">
      <div style="font-size:22px;font-weight:800;color:${C.ink};">${escapeHtml(value)}</div>
      <div style="font-size:12px;color:${C.muted};margin-top:2px;">${escapeHtml(label)}</div>
    </td>`).join('<td style="width:8px;"></td>');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 4px;border-collapse:separate;"><tr>${cells}</tr></table>`;
}

function layout({
  preheader, heading, paragraphs, stats, cta, links,
}) {
  const body = paragraphs.map((p) => `<p style="margin:0 0 14px;font-size:16px;line-height:1.55;color:${C.ink};">${p}</p>`).join('');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${escapeHtml(heading)}</title></head>
<body style="margin:0;padding:0;background:${C.canvas};font-family:${FONT};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};"><tr><td align="center" style="padding:24px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
    <tr><td style="padding:0 4px 16px;font-size:22px;font-weight:800;color:${C.ink};letter-spacing:-0.02em;">
      <span style="display:inline-block;width:26px;height:26px;border-radius:7px;background:${C.accent};vertical-align:-6px;margin-right:8px;"></span>Skill<span style="color:${C.accent};">reps</span>
    </td></tr>
    <tr><td style="background:${C.surface};border:1px solid ${C.line};border-radius:14px;padding:28px 24px;">
      <h1 style="margin:0 0 14px;font-size:24px;line-height:1.25;color:${C.ink};letter-spacing:-0.02em;">${escapeHtml(heading)}</h1>
      ${body}
      ${stats ? statsTable(stats) : ''}
      ${cta ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:18px;"><tr><td style="border-radius:999px;background:${C.accent};">
        <a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:13px 24px;font-size:16px;font-weight:700;color:#FFFFFF;text-decoration:none;border-radius:999px;">${escapeHtml(cta.label)} &rarr;</a>
      </td></tr></table>` : ''}
    </td></tr>
    <tr><td style="padding:18px 8px 0;font-size:12px;line-height:1.6;color:${C.muted};">
      You’re getting this because you have a Skillreps account.
      <a href="${escapeHtml(links.unsubscribe)}" style="color:${C.muted};">Unsubscribe from ${escapeHtml(links.scopeLabel)}</a>
      &middot; <a href="${escapeHtml(links.settings)}" style="color:${C.muted};">Email settings</a><br>
      ${escapeHtml(LEGAL.company)} &middot; ${escapeHtml(LEGAL.contactEmail)}
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

function textVersion({
  heading, paragraphs, stats, cta, links,
}) {
  const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&rarr;/g, '→').replace(/&amp;/g, '&').replace(/&#39;/g, '’');
  return [
    heading,
    '',
    ...paragraphs.map(strip).flatMap((p) => [p, '']),
    ...(stats ? [stats.map(([label, value]) => `${label}: ${value}`).join(' · '), ''] : []),
    ...(cta ? [`${cta.label}: ${cta.href}`, ''] : []),
    '--',
    `You’re getting this because you have a Skillreps account. Unsubscribe from ${links.scopeLabel}: ${links.unsubscribe}`,
    `Email settings: ${links.settings}`,
  ].join('\n');
}

function render(parts) {
  return {
    subject: parts.subject,
    preheader: parts.preheader,
    html: layout(parts),
    text: textVersion(parts),
  };
}

const lessonLine = (resume) => `<b>${escapeHtml(resume.lessonTitle)}</b> in ${escapeHtml(resume.pathwayTitle)}`;

export function weeklyRecap(d, links) {
  const met = d.days >= d.goal;
  const paragraphs = [
    met
      ? `Hey ${escapeHtml(firstName(d.name))}, you hit your goal of ${plural(d.goal, 'practice day')} last week.${d.streakWeeks > 1 ? ` That’s a ${d.streakWeeks}-week streak.` : ''}`
      : `Hey ${escapeHtml(firstName(d.name))}, here’s how last week went. A new week starts today: ${plural(d.goal, 'practice day')} keeps your streak going.`,
  ];
  if (d.kudos > 0) paragraphs.push(`Other learners gave your makes ${plural(d.kudos, 'kudos', 'kudos')}.`);
  if (d.resume) paragraphs.push(`Next up: ${lessonLine(d.resume)}.`);
  return render({
    subject: met ? `Goal met: ${d.xp} XP and ${plural(d.days, 'practice day')} last week` : `Your week: ${d.xp} XP and ${d.days} of ${d.goal} practice days`,
    preheader: met ? 'Your streak is safe. Here’s your week in numbers.' : 'A fresh week starts today.',
    heading: 'Your week on Skillreps',
    paragraphs,
    stats: [['XP', d.xp], ['Practice days', `${d.days}/${d.goal}`], ['Week streak', d.streakWeeks], ['Makes', d.makes]],
    cta: d.resume ? { label: 'Start this week’s first rep', href: d.resume.url } : { label: 'Open Skillreps', href: links.home },
    links,
  });
}

export function streakAtRisk(d, links) {
  const days = plural(d.needed, 'more day');
  return render({
    subject: d.streakWeeks > 0 ? `Your ${d.streakWeeks}-week streak needs ${days} this week` : `${days} of practice hits your goal this week`,
    preheader: 'One Try or one Log counts. Ten minutes is enough.',
    heading: d.streakWeeks > 0 ? `Keep your ${d.streakWeeks}-week streak` : 'You’re close to this week’s goal',
    paragraphs: [
      `Hey ${escapeHtml(firstName(d.name))}, you’ve practised ${d.done} of ${plural(d.goal, 'day')} this week, with ${plural(d.daysLeft, 'day')} left, today included.`,
      'Trying a step or logging a make counts as a practice day. Ten minutes is enough.',
      ...(d.resume ? [`Your next step: ${lessonLine(d.resume)}.`] : []),
    ],
    cta: { label: d.resume ? 'Do today’s rep' : 'Practise now', href: d.resume?.url || links.home },
    links,
  });
}

export function logMake(d, links) {
  return render({
    subject: `You tried “${d.lessonTitle}”. Log what you made for +${XP.LOG} XP`,
    preheader: 'A photo and a note is all it takes.',
    heading: 'Show what you made',
    paragraphs: [
      `Hey ${escapeHtml(firstName(d.name))}, you did the Try step in ${lessonLine(d)}. Add a photo and a note to your makes for <b>+${XP.LOG} XP</b>.`,
      'It counts as a practice day, and other learners can cheer you on with kudos. Rough first attempts are welcome: that’s what reps are for.',
    ],
    cta: { label: 'Log what you made', href: d.url },
    links,
  });
}

export function comeBack(d, links) {
  return render({
    subject: `Pick up where you left off: ${d.lessonTitle}`,
    preheader: 'The next step takes about ten minutes.',
    heading: 'Your next rep is waiting',
    paragraphs: [
      `Hey ${escapeHtml(firstName(d.name))}, it’s been ${plural(d.daysAway, 'day')} since your last rep in ${escapeHtml(d.pathwayTitle)}.`,
      `You stopped at ${lessonLine(d)}. Watch one short step and try it with your hands: that’s a practice day done.`,
    ],
    cta: { label: 'Continue the lesson', href: d.url },
    links,
  });
}

export function testEmail(d, links) {
  return render({
    subject: 'Test email from Skillreps',
    preheader: 'If you can read this, sending works.',
    heading: 'Sending works',
    paragraphs: [
      `Hey ${escapeHtml(firstName(d.name))}, this is a test sent from the admin Emails page.`,
      `It came from ${escapeHtml(d.from)}, and replies go to ${escapeHtml(d.replyTo)}.`,
    ],
    cta: { label: 'Open the Emails page', href: links.admin || links.home },
    links,
  });
}

export const TEMPLATES = {
  WEEKLY_RECAP: weeklyRecap,
  STREAK_AT_RISK: streakAtRisk,
  LOG_MAKE: logMake,
  COME_BACK: comeBack,
  TEST: testEmail,
};

// Which preference each kind of email answers to.
export const SCOPE_OF = {
  WEEKLY_RECAP: 'weekly', STREAK_AT_RISK: 'reminders', LOG_MAKE: 'reminders', COME_BACK: 'reminders', TEST: 'all',
};
