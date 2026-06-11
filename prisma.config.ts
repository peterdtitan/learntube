import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // Use DATABASE_URL env var if present, otherwise fall back to local sqlite file
  datasource: { url: process.env.DATABASE_URL ?? 'file:./dev.db' },
});
