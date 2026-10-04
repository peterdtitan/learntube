import { execSync } from 'node:child_process';

// Bring the test database up to the latest migration once per run.
export default function setup() {
  const url = process.env.INTEGRATION_DATABASE_URL;
  execSync('npx prisma migrate deploy', {
    env: { ...process.env, DATABASE_URL: url, DATABASE_URL_UNPOOLED: url },
    stdio: 'pipe',
  });
}
