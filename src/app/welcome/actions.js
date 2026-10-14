'use server';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { authOptions } from '../../lib/auth';
import prisma from '../../lib/prismadb';
import { saveStartAnswers, safeNextPath } from '../../lib/onboarding';

async function signedInUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/auth/signin?callbackUrl=/welcome');
  return session.user.id;
}

// Saves the answers and goes straight to the skill the learner chose to start with.
export async function saveWelcome(form) {
  const userId = await signedInUserId();
  await saveStartAnswers(userId, {
    interests: form.getAll('interest').map(String),
    goal: String(form.get('goal') || ''),
    weeklyGoal: Number(form.get('weeklyGoal')),
  });
  revalidatePath('/', 'layout');
  redirect(safeNextPath(form.get('next')) || '/?welcome=1');
}

// "Skip for now": don't ask again on sign-in. The survey stays at /welcome to fill in later.
export async function skipWelcome() {
  const userId = await signedInUserId();
  await prisma.user.update({ where: { id: userId }, data: { onboardedAt: new Date() } });
  revalidatePath('/', 'layout');
  redirect('/');
}
