import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import {
  Check, Clock, Gamepad2, Sparkles, Timer,
} from 'lucide-react';
import { authOptions } from '../../../lib/auth';
import { getPathwayOutline } from '../../../lib/outline';
import { formatMinutes } from '../../../lib/estimate';
import { formatDuration } from '../../../lib/youtube';
import Button from '../../../components/ui/Button';
import ProgressBar from '../../../components/ui/ProgressBar';
import cn from '../../../lib/cn';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const outline = await getPathwayOutline(params.pathwayId, null);
  return { title: outline ? `${outline.pathway.title} · LearnTube` : 'LearnTube' };
}

function QuizRow({
  href, icon: Icon, title, detail, quiz,
}) {
  return (
    <li>
      <Link href={href} className="flex items-center gap-3 rounded-md border border-dashed border-line px-3 py-2.5 text-[15px] hover:border-accent hover:bg-accent-soft">
        <Icon size={18} className="shrink-0 text-xp" aria-hidden="true" />
        <span className="flex-1 font-bold">{title}</span>
        <span className="text-sm text-muted">
          {quiz.best != null ? `Best ${Math.round(quiz.best)}%${quiz.passed ? ' ✓' : ''}` : detail}
        </span>
      </Link>
    </li>
  );
}

export default async function PathwayPage({ params }) {
  const session = await getServerSession(authOptions);
  const outline = await getPathwayOutline(params.pathwayId, session?.user?.id || null);
  if (!outline || !outline.lessonCount) notFound();
  const {
    pathway, estimate, modules, lessonCount, doneCount, nextLessonId,
  } = outline;
  const started = doneCount > 0;
  const lessonHref = (id) => `/pathways/${pathway.id}/learn/${id}`;

  return (
    <div className="mx-auto grid max-w-4xl gap-8">
      <Link href="/pathways" className="text-sm text-muted hover:text-ink">← All pathways</Link>

      <header className="grid gap-4">
        {pathway.skill && (
          <span className="inline-flex items-center gap-2 justify-self-start rounded-pill border border-line px-3 py-1 text-sm text-muted">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: pathway.skill.color }} />
            {pathway.skill.name}
          </span>
        )}
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-tight">{pathway.title}</h1>
        {pathway.description && <p className="max-w-[60ch] text-lg text-muted">{pathway.description}</p>}
        {pathway.makeTitle && (
          <p className="text-[17px]">
            <span className="text-muted">By the end you’ll have made: </span>
            <strong>{pathway.makeTitle}</strong>
          </p>
        )}
      </header>

      <section aria-labelledby="time-heading" className="grid gap-4 rounded-lg border border-line bg-surface p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="grid gap-1">
          <h2 id="time-heading" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted">
            <Clock size={15} aria-hidden="true" />
            Time to learn
          </h2>
          <p className="font-display text-4xl font-bold">{`≈ ${formatMinutes(estimate.total)}`}</p>
          {estimate.fun && <p className="text-lg text-xp">{`That’s about ${estimate.fun.label}.`}</p>}
          <p className="text-sm text-muted">
            {`${formatMinutes(estimate.video)} watching · ${formatMinutes(estimate.practice)} practising`}
            {estimate.quizzes > 0 && ` · ${formatMinutes(estimate.quizzes)} on quizzes and games`}
          </p>
        </div>
        <div className="grid gap-2 sm:min-w-[220px]">
          {started && <ProgressBar value={doneCount / lessonCount} label="Pathway progress" />}
          <p className="text-sm text-muted">{started ? `${doneCount} of ${lessonCount} lessons done` : `${modules.length} ${modules.length === 1 ? 'module' : 'modules'} · ${lessonCount} lessons`}</p>
          {nextLessonId && <Button href={lessonHref(nextLessonId)}>{started ? 'Continue' : 'Start lesson one'}</Button>}
        </div>
      </section>

      <section aria-labelledby="modules-heading" className="grid gap-4">
        <h2 id="modules-heading" className="text-2xl font-bold">Modules</h2>
        <ol className="grid gap-4">
          {modules.map((m) => (
            <li key={m.id} className="grid gap-3 rounded-lg border border-line bg-surface p-5">
              <header className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold">
                  <span className="mr-2 text-sm font-bold uppercase tracking-widest text-muted">{`Week ${m.number}`}</span>
                  {m.title}
                </h3>
                <span className="text-sm text-muted">
                  {`≈ ${formatMinutes(m.minutes)}`}
                  {m.fun && <span className="text-xp">{` · ${m.fun.label}`}</span>}
                </span>
              </header>
              <ol className="grid gap-1.5">
                {m.lessons.map((l, i) => (
                  <React.Fragment key={l.id}>
                    <li>
                      <Link href={lessonHref(l.id)} className="flex items-center gap-3 rounded-md px-3 py-2 text-[15px] hover:bg-sunken">
                        <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full border-[1.5px]', l.done ? 'border-accent bg-accent text-on-accent' : 'border-line')}>
                          {l.done && <Check size={12} strokeWidth={3} />}
                          {l.done && <span className="sr-only">Done:</span>}
                        </span>
                        <span className="flex-1">{l.title}</span>
                        {l.check && <Sparkles size={14} className="text-xp" aria-label="Has a quick check" />}
                        <span className="text-xs tabular-nums text-muted">{formatDuration(l.duration)}</span>
                      </Link>
                    </li>
                    {m.checkpoint && i === m.checkpointAfter && (
                      <QuizRow
                        href={`/pathways/${pathway.id}/checkpoint/${m.checkpoint.id}`}
                        icon={Timer}
                        title={m.checkpoint.title || 'Halfway checkpoint'}
                        detail={`Timed · ${Math.round((m.checkpoint.timeLimitSec || 600) / 60)} min`}
                        quiz={m.checkpoint}
                      />
                    )}
                  </React.Fragment>
                ))}
                {m.game && (
                  <QuizRow
                    href={`/pathways/${pathway.id}/modules/${m.id}/game`}
                    icon={Gamepad2}
                    title={m.game.title || 'Module games'}
                    detail="Tower · Speed round · Match-up"
                    quiz={m.game}
                  />
                )}
              </ol>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
