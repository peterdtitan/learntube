import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../../../../../lib/prismadb';
import LessonForm from '../../../../../../components/admin/LessonForm';
import { saveLesson } from '../../../../actions';

export default async function NewLesson({ params, searchParams }) {
  const units = await prisma.unit.findMany({
    where: { pathwayId: params.pathwayId },
    orderBy: { order: 'asc' },
    select: { id: true, title: true },
  });
  if (!units.length) notFound();
  const requested = searchParams?.unitId;
  const unitId = units.some((u) => u.id === requested) ? requested : units[0].id;
  return (
    <div className="grid max-w-2xl gap-5">
      <Link href={`/admin/pathways/${params.pathwayId}`} className="text-sm text-muted hover:text-ink">← Back to the pathway</Link>
      <h1 className="text-3xl font-bold">New lesson</h1>
      <LessonForm action={saveLesson} units={units} defaultUnitId={unitId} />
    </div>
  );
}
