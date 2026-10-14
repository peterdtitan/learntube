import { LEGAL } from '../legal';

// Emails go out through Resend (resend.com). Without RESEND_API_KEY nothing is sent: callers
// get a dry run back, so local development and tests never email anyone.
const API = 'https://api.resend.com';
const BATCH_SIZE = 100;

export function emailConfig(env = process.env) {
  return {
    configured: Boolean(env.RESEND_API_KEY),
    from: env.EMAIL_FROM || 'Skillreps <reminders@skillreps.app>',
    replyTo: env.EMAIL_REPLY_TO || LEGAL.contactEmail,
    dailyLimit: Number(env.EMAIL_DAILY_LIMIT) || 100,
  };
}

function toResend(message, config) {
  return {
    from: config.from,
    to: [message.to],
    reply_to: config.replyTo,
    subject: message.subject,
    html: message.html,
    text: message.text,
    headers: message.headers,
    tags: message.kind ? [{ name: 'kind', value: message.kind }] : undefined,
  };
}

// Sends up to any number of messages, 100 to a request. Returns one result per message, in
// order: { id } when sent, { error } when not, { dryRun: true } without an API key.
export async function sendEmails(messages, { fetchImpl = fetch, env = process.env } = {}) {
  const config = emailConfig(env);
  if (!config.configured) return messages.map(() => ({ dryRun: true }));
  const results = [];
  for (let i = 0; i < messages.length; i += BATCH_SIZE) {
    const chunk = messages.slice(i, i + BATCH_SIZE);
    try {
      // Sequential on purpose: Resend allows a couple of requests a second.
      // eslint-disable-next-line no-await-in-loop
      const res = await fetchImpl(`${API}/emails/batch`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk.map((m) => toResend(m, config))),
      });
      // eslint-disable-next-line no-await-in-loop
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body?.message || `Resend answered ${res.status}`);
      chunk.forEach((_, j) => results.push({ id: body.data?.[j]?.id || null }));
    } catch (err) {
      chunk.forEach(() => results.push({ error: err.message }));
    }
  }
  return results;
}
