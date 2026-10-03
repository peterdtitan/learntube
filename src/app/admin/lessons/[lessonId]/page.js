import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '../../../../lib/prismadb';
import LessonForm from '../../../../components/admin/LessonForm';
import ConfirmButton from '../../../../components/admin/ConfirmButton';
import { deleteLesson, saveLesson } from '../../actions';

export default async function EditLesson({ params }) {
  const lesson = await prisma.video.findUnique({
    where: { id: params.lessonId },
    include: {
      unit: { select: { pathwayId: true } },
      _count: { select: { progress: true, makes: true } },
    },
  });
  if (!lesson?.unit) notFound();
  const units = await prisma.unit.findMany({
    where: { pathwayId: lesson.unit.pathwayId },
    orderBy: { order: 'asc' },
    select: { id: true, title: true },
  });

  return (
    <div className="grid max-w-2xl gap-8">
      <Link href={`/admin/pathways/${lesson.unit.pathwayId}`} className="text-sm text-muted hover:text-ink">← Back to the pathway</Link>
      <section className="grid gap-5">
        <h1 className="text-3xl font-bold">Edit lesson</h1>
        <LessonForm
          action={saveLesson}
          lesson={lesson}
          units={units}
          defaultUnitId={lesson.unitId}
        />
      </section>
      <section className="grid gap-3 border-t border-line pt-6">
        <h2 className="text-xl font-bold">Delete this lesson</h2>
        <p className="text-[15px] text-muted">
          {`${lesson._count.progress} ${lesson._count.progress === 1 ? 'learner has' : 'learners have'} progress or notes here; those are deleted. ${lesson._count.makes} ${lesson._count.makes === 1 ? 'make stays' : 'makes stay'}, unlinked from the lesson.`}
        </p>
        <form action={deleteLesson}>
          <input type="hidden" name="id" value={lesson.id} />
          <ConfirmButton label="Delete lesson" confirmLabel="Click again to delete" />
        </form>
      </section>
    </div>
  );
}
