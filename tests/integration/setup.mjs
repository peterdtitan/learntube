import { afterAll, beforeEach, vi } from 'vitest';

// The session is whatever the test says it is; see signIn() in helpers.
vi.mock('next-auth/next', () => ({
  getServerSession: vi.fn(async () => globalThis.testSession ?? null),
}));

vi.mock('next/cache', () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn() }));

// Next's own redirect() and notFound() throw special errors; these keep the shape.
vi.mock('next/navigation', () => ({
  redirect: vi.fn((to) => { throw Object.assign(new Error(`NEXT_REDIRECT ${to}`), { redirectTo: to }); }),
  notFound: vi.fn(() => { throw Object.assign(new Error('NEXT_NOT_FOUND'), { notFound: true }); }),
}));

vi.mock('@vercel/blob', () => ({
  put: vi.fn(async (path) => ({ url: `https://test.public.blob.vercel-storage.com/${path}` })),
  del: vi.fn(async () => {}),
}));

beforeEach(async () => {
  globalThis.testSession = null;
  const { resetDb } = await import('./helpers.mjs');
  await resetDb();
});

afterAll(async () => {
  const { default: prisma } = await import('../../src/lib/prismadb.js');
  await prisma.$disconnect();
});
