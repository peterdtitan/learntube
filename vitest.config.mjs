import { defineConfig } from 'vitest/config';

// Unit tests: pure functions next to the code they test. No database.
export default defineConfig({
  test: {
    include: ['src/**/*.test.js'],
  },
});
