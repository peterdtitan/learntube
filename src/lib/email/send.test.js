import { describe, expect, it } from 'vitest';
import { emailConfig, sendEmails } from './send';

const message = (n) => ({
  to: `l${n}@example.com`, subject: 's', html: '<p>h</p>', text: 't', kind: 'LOG_MAKE',
});

describe('sendEmails', () => {
  it('sends nothing without an API key', async () => {
    let called = false;
    const fetchImpl = () => { called = true; };
    const results = await sendEmails([message(1)], { env: {}, fetchImpl });
    expect(results).toEqual([{ dryRun: true }]);
    expect(called).toBe(false);
  });

  it('sends in batches of 100 and keeps Resend’s ids in order', async () => {
    const bodies = [];
    const fetchImpl = async (url, init) => {
      const body = JSON.parse(init.body);
      bodies.push({ url, body, auth: init.headers.Authorization });
      return { ok: true, json: async () => ({ data: body.map((m) => ({ id: `id-${m.to}` })) }) };
    };
    const results = await sendEmails(Array.from({ length: 150 }, (_, i) => message(i)), {
      env: { RESEND_API_KEY: 're_test', EMAIL_FROM: 'Skillreps <r@skillreps.app>' }, fetchImpl,
    });
    expect(bodies.map((b) => b.body.length)).toEqual([100, 50]);
    expect(bodies[0]).toMatchObject({ url: 'https://api.resend.com/emails/batch', auth: 'Bearer re_test' });
    expect(bodies[0].body[0]).toMatchObject({ from: 'Skillreps <r@skillreps.app>', to: ['l0@example.com'], reply_to: 'hello@elev8rstudio.com' });
    expect(results[149]).toEqual({ id: 'id-l149@example.com' });
  });

  it('reports a failed batch against each of its emails', async () => {
    const fetchImpl = async () => ({ ok: false, status: 422, json: async () => ({ message: 'Domain not verified' }) });
    expect(await sendEmails([message(1), message(2)], { env: { RESEND_API_KEY: 'k' }, fetchImpl }))
      .toEqual([{ error: 'Domain not verified' }, { error: 'Domain not verified' }]);
  });

  it('reads its settings from the environment', () => {
    expect(emailConfig({})).toMatchObject({ configured: false, from: 'Skillreps <reminders@skillreps.app>', dailyLimit: 100 });
    expect(emailConfig({ RESEND_API_KEY: 'k', EMAIL_DAILY_LIMIT: '500' })).toMatchObject({ configured: true, dailyLimit: 500 });
  });
});
