import { defineConfig, devices } from '@playwright/test';

const PORT = 3200;
const url = process.env.E2E_DATABASE_URL || 'postgresql://learntube:learntube@localhost:5433/learntube_e2e';

// The globalSetup runs in this process; it seeds the same database the server uses.
process.env.E2E_DATABASE_URL = url;

// Browser tests against a production build with its own database (wiped on every run)
// and its own build folder, so a running `next dev` is never touched.
export default defineConfig({
  testDir: 'tests/e2e',
  globalSetup: './tests/e2e/global-setup.mjs',
  workers: 1,
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    // Locally, use the installed Chrome instead of downloading Playwright's.
    ...(process.env.CI ? {} : { channel: 'chrome' }),
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mobile/ },
    { name: 'phone', use: { ...devices['Pixel 7'] }, testMatch: /mobile/ },
  ],
  webServer: {
    command: `npx next build && npx next start -p ${PORT}`,
    // A static file: the database isn't migrated until globalSetup runs, after the server starts.
    url: `http://localhost:${PORT}/icon.svg`,
    timeout: 300000,
    reuseExistingServer: !process.env.CI,
    env: {
      DATABASE_URL: url,
      NEXT_DIST_DIR: '.next-e2e',
      NEXTAUTH_URL: `http://localhost:${PORT}`,
      NEXTAUTH_SECRET: 'e2e-only-not-secret',
      GOOGLE_CLIENT_ID: 'e2e',
      GOOGLE_CLIENT_SECRET: 'e2e',
      ADMIN_EMAILS: '',
      BLOB_READ_WRITE_TOKEN: '',
    },
  },
});
