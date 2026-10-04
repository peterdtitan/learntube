import { readFileSync } from 'node:fs';
import { test as base, expect } from '@playwright/test';

export { expect };

export const state = () => JSON.parse(readFileSync(new URL('./.state.json', import.meta.url)));

// signInAs('ada') puts that person's session cookie in the browser.
export const test = base.extend({
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
