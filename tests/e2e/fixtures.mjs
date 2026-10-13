import { readFileSync } from 'node:fs';
import { test as base, expect } from '@playwright/test';

export { expect };

export const state = () => JSON.parse(readFileSync(new URL('./.state.json', import.meta.url)));

// The cookie notice sits over the bottom of the page; tests see it only when they ask to.
// signInAs('ada') puts that person's session cookie in the browser.
export const test = base.extend({
  cookieNotice: [false, { option: true }],
  context: async ({ context, cookieNotice }, use) => {
    if (!cookieNotice) await context.addInitScript(() => localStorage.setItem('learntube:cookie-notice', '1'));
    await use(context);
  },
  signInAs: async ({ context, baseURL }, use) => {
    await use(async (key) => {
      const { token } = state().people[key];
      await context.clearCookies();
      await context.addCookies([{ name: 'next-auth.session-token', value: token, url: baseURL }]);
    });
  },
});

export function lessonUrl(pathwayId, lessonId) {
  return `/pathways/${pathwayId}/learn/${lessonId}`;
}
