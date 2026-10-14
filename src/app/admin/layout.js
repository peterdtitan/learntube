import React from 'react';
import { notFound } from 'next/navigation';
import { getAdmin } from '../../lib/admin';
import prisma from '../../lib/prismadb';
import AdminNav from '../../components/admin/AdminNav';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin · Skillreps', robots: { index: false } };

export default async function AdminLayout({ children }) {
  if (!(await getAdmin())) notFound();
  const reports = await prisma.report.count({ where: { resolvedAt: null } });
  return (
    <div className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
      <AdminNav badges={{ reports }} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
