// Vercel build: apply pending migrations on production deploys, then build.
// Preview deploys never migrate, so they can't change the live schema.
// If a migration fails the build fails, and the current deployment keeps serving.
import { execSync } from 'node:child_process';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

if (process.env.VERCEL_ENV === 'production') {
  run('npx prisma migrate deploy');
} else {
  console.log(`Skipping migrations (VERCEL_ENV=${process.env.VERCEL_ENV || 'not set'})`);
}
run('npx next build');
