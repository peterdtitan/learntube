import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

config({ path: '.env.local', quiet: true });
config({ quiet: true });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations', seed: 'node prisma/seed.js' },
  // Migrations need a direct connection; Neon's pooled URL (DATABASE_URL on Vercel) can't run them.
  datasource: { url: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL },
});
