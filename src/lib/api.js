import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth';

export function json(body, status = 200) {
  return Response.json(body, { status });
}

export function error(status, message) {
  return Response.json({ error: message }, { status });
}

export async function requireUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}

export async function readJson(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}
