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

// Cookies live in a Map per test; tests can read globalThis.testCookies.
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: (name) => (globalThis.testCookies.has(name) ? { name, value: globalThis.testCookies.get(name) } : undefined),
    set: (name, value) => globalThis.testCookies.set(name, value),
    delete: (name) => globalThis.testCookies.delete(name),
  }),
}));

vi.mock('@vercel/blob', () => ({
  put: vi.fn(async (path) => ({ url: `https://test.public.blob.vercel-storage.com/${path}` })),
  del: vi.fn(async () => {}),
}));

beforeEach(async () => {
  globalThis.testSession = null;
  globalThis.testCookies = new Map();
  const { resetDb } = await import('./helpers.mjs');
  await resetDb();
});

afterAll(async () => {
  const { default: prisma } = await import('../../src/lib/prismadb.js');
  await prisma.$disconnect();
});
