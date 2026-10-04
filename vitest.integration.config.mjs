import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

config({ path: '.env.local', quiet: true });
config({ quiet: true });

// Integration tests run the real route handlers against a real Postgres. They need their
// own database because every test wipes it: TEST_DATABASE_URL, or the local DATABASE_URL
// with the database renamed to learntube_test.
function testDatabaseUrl() {
  if (process.env.TEST_DATABASE_URL) return process.env.TEST_DATABASE_URL;
  if (!process.env.DATABASE_URL) throw new Error('Set TEST_DATABASE_URL or DATABASE_URL.');
  const url = new URL(process.env.DATABASE_URL);
  url.pathname = '/learntube_test';
  return url.toString();
}

const url = testDatabaseUrl();
if (!new URL(url).pathname.endsWith('_test')) {
  throw new Error(`Refusing to run integration tests against ${new URL(url).pathname}: the name must end in _test.`);
}

// globalSetup runs in this process, so it reads the URL from here.
process.env.INTEGRATION_DATABASE_URL = url;

export default defineConfig({
  test: {
    include: ['tests/integration/**/*.test.js'],
    globalSetup: ['tests/integration/globalSetup.mjs'],
    setupFiles: ['tests/integration/setup.mjs'],
    env: { DATABASE_URL: url, DATABASE_URL_UNPOOLED: url, BLOB_READ_WRITE_TOKEN: 'test-token' },
    // One database, so test files take turns.
    fileParallelism: false,
    testTimeout: 30000,
    hookTimeout: 60000,
  },
});
