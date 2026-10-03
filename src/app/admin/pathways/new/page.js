import React from 'react';
import prisma from '../../../../lib/prismadb';
import PathwayForm from '../../../../components/admin/PathwayForm';
import { createPathway } from '../../actions';

export default async function NewPathway() {
  const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' }, select: { id: true, name: true } });
  return (
    <div className="grid max-w-2xl gap-5">
      <h1 className="text-3xl font-bold">New pathway</h1>
      <PathwayForm action={createPathway} skills={skills} submitLabel="Create pathway" />
    </div>
  );
}
