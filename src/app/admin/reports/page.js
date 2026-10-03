import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '../../../lib/prismadb';
import { reasonText } from '../../../lib/moderation';
import { publicName } from '../../../lib/people';
import ConfirmButton from '../../../components/admin/ConfirmButton';
import { deleteMake, hideMake, keepVisible } from './actions';

function Action({ action, makeId, children }) {
  return (
    <form action={action}>
      <input type="hidden" name="makeId" value={makeId} />
      {children}
    </form>
  );
}

const BUTTON = 'inline-flex h-9 items-center rounded-pill border border-line px-4 text-sm font-bold hover:bg-sunken';

export default async function ReportsPage() {
  const makes = await prisma.make.findMany({
    where: { OR: [{ reports: { some: { resolvedAt: null } } }, { hiddenAt: { not: null } }] },
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { id: true, name: true, displayName: true } },
      reports: { where: { resolvedAt: null }, select: { reason: true } },
    },
  });

  return (
    <div className="grid gap-5">
      <div className="grid gap-1">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted">Makes with open reports, and makes that are currently hidden.</p>
      </div>
      {!makes.length && <p className="rounded-lg border border-dashed border-line px-5 py-10 text-center text-muted">Nothing to review.</p>}
      <ul className="grid gap-3">
        {makes.map((m) => {
          const counts = {};
          m.reports.forEach((r) => { counts[r.reason] = (counts[r.reason] || 0) + 1; });
          return (
            <li key={m.id} className="grid gap-4 rounded-lg border border-line bg-surface p-4 sm:grid-cols-[120px_minmax(0,1fr)]">
              <div className="relative aspect-square max-w-[120px] overflow-hidden rounded-md bg-sunken">
                {m.imageUrl && <Image src={m.imageUrl} alt="" fill sizes="120px" className="object-cover" />}
              </div>
              <div className="grid min-w-0 gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/makes/${m.id}`} className="font-bold hover:text-accent">{m.title}</Link>
                  <span className="text-sm text-muted">{`by ${publicName(m.user)}`}</span>
                  {m.hiddenAt
                    ? <span className="rounded-pill bg-xp-soft px-2.5 py-0.5 text-xs font-bold text-xp">Hidden</span>
                    : <span className="rounded-pill bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent">Visible</span>}
                </div>
                {m.note && <p className="line-clamp-3 text-[15px]">{m.note}</p>}
                <ul className="flex flex-wrap gap-2 text-sm">
                  {Object.entries(counts).map(([reason, n]) => (
                    <li key={reason} className="rounded-pill border border-line px-2.5 py-0.5">{`${reasonText(reason) || reason} × ${n}`}</li>
                  ))}
                  {!m.reports.length && <li className="text-muted">No open reports</li>}
                </ul>
                <div className="flex flex-wrap gap-2">
                  <Action action={keepVisible} makeId={m.id}><button type="submit" className={BUTTON}>Keep visible</button></Action>
                  {!m.hiddenAt && <Action action={hideMake} makeId={m.id}><button type="submit" className={BUTTON}>Hide</button></Action>}
                  <Action action={deleteMake} makeId={m.id}><ConfirmButton label="Delete make" confirmLabel="Click again to delete" /></Action>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
