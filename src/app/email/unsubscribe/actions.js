'use server';

import { redirect } from 'next/navigation';
import prisma from '../../../lib/prismadb';
import { readUnsubscribeToken, unsubscribeData } from '../../../lib/email/unsubscribe';

export default async function unsubscribe(form) {
  const raw = String(form.get('t') || '');
  const token = readUnsubscribeToken(raw);
  if (!token) redirect('/email/unsubscribe');
  await prisma.user.updateMany({ where: { id: token.userId }, data: unsubscribeData(token.scope) });
  redirect(`/email/unsubscribe?t=${encodeURIComponent(raw)}&done=1`);
}
