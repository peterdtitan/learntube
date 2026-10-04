import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis;

// Each server instance keeps its own pool (pg's default is 10). On serverless, many instances
// each holding 10 adds up, so PG_POOL_MAX can lower it.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL_MAX) || 10,
});

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prisma;

export default prisma;
