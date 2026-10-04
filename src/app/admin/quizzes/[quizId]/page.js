import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowDown, ArrowUp } from 'lucide-react';
import prisma from '../../../../lib/prismadb';
import { correctAnswerText } from '../../../../lib/quizGrade';
import { DRAFT_COUNTS } from '../../../../lib/quizDraft';
import { QUIZ_XP } from '../../../../lib/xpValues';
import QuestionEditor from '../../../../components/admin/QuestionEditor';
import ConfirmButton from '../../../../components/admin/ConfirmButton';
import { DraftForm, QuizSettingsForm } from '../../../../components/admin/QuizForms';
import {
  deleteQuestion, deleteQuiz, draftWithAi, moveQuestion, saveQuestion, saveQuizSettings,
} from '../actions';

// AI drafts can take a while on long transcripts.
export const maxDuration = 120;

const KIND_LABEL = {
  LESSON_CHECK: 'Lesson quick check',
  CHECKPOINT: 'Halfway checkpoint (timed)',
  MODULE_GAME: 'End-of-module games',
};
const TYPE_LABEL = {
  SINGLE: 'One answer', MULTI: 'Several answers', TRUE_FALSE: 'True/false', ORDER: 'Order', MATCH: 'Match', TEXT: 'Type text', NUMBER: 'Number',
};

function Move({ id, direction, label }) {
  const Icon = direction < 0 ? ArrowUp : ArrowDown;
  return (
    <form action={moveQuestion}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="direction" value={direction} />
      <button type="submit" aria-label={label} className="grid h-8 w-8 place-items-center rounded-pill text-muted hover:bg-sunken hover:text-ink">
        <Icon size={15} />
      </button>
    </form>
  );
}

export default async function EditQuiz({ params }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.quizId },
    include: {
      questions: { orderBy: { order: 'asc' } },
      video: { include: { unit: { select: { pathwayId: true, title: true } } } },
      unit: { include: { videos: { orderBy: { order: 'asc' }, select: { id: true, title: true, transcript: true } } } },
      _count: { select: { attempts: { where: { submittedAt: { not: null } } } } },
    },
  });
  if (!quiz) notFound();

  const pathwayId = quiz.unit?.pathwayId || quiz.video?.unit?.pathwayId;
  const where = quiz.video ? `after “${quiz.video.title}”` : `in module “${quiz.unit?.title}”`;
  const sourceLessons = quiz.video ? [quiz.video] : quiz.unit?.videos || [];
  let disabledReason = null;
  if (!process.env.ANTHROPIC_API_KEY) disabledReason = 'Set ANTHROPIC_API_KEY to draft questions with AI.';
  else if (!sourceLessons.some((l) => l.transcript?.trim())) disabledReason = 'Add a transcript to the lesson first; drafts are written only from what it says.';
  const gameNote = quiz.kind === 'MODULE_GAME'
    ? 'Games also use every published quick-check question from this module’s lessons, so this list can stay short.'
    : null;

  return (
    <div className="grid max-w-3xl gap-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={pathwayId ? `/admin/pathways/${pathwayId}` : '/admin'} className="text-sm text-muted hover:text-ink">← Back to the pathway</Link>
        <Link href={`/admin/quizzes/${quiz.id}/attempts`} className="text-sm font-bold text-accent">
          {`Results and integrity log (${quiz._count.attempts})`}
        </Link>
      </div>

      <header className="grid gap-1">
        <p className="text-sm font-bold uppercase tracking-widest text-muted">{KIND_LABEL[quiz.kind]}</p>
        <h1 className="text-3xl font-bold">{quiz.title || KIND_LABEL[quiz.kind]}</h1>
        <p className="text-[15px] text-muted">
          {`Sits ${where}. Pays +${QUIZ_XP[quiz.kind]} XP on the first pass. `}
          <span className={quiz.published ? 'font-bold text-accent' : 'font-bold text-xp'}>{quiz.published ? 'Published.' : 'Draft: learners can’t see it.'}</span>
        </p>
      </header>

      <section className="grid gap-4">
        <h2 className="text-xl font-bold">Settings</h2>
        <QuizSettingsForm action={saveQuizSettings} quiz={quiz} lessons={quiz.unit?.videos || []} />
      </section>

      <section className="grid gap-4">
        <h2 className="text-xl font-bold">{`Questions (${quiz.questions.length})`}</h2>
        {gameNote && <p className="text-[15px] text-muted">{gameNote}</p>}
        <DraftForm
          action={draftWithAi}
          quizId={quiz.id}
          defaultCount={DRAFT_COUNTS[quiz.kind]}
          disabledReason={disabledReason}
        />
        <ol className="grid gap-3">
          {quiz.questions.map((q, i) => (
            <li key={q.id} className="grid gap-2 rounded-lg border border-line bg-surface p-4">
              <div className="flex flex-wrap items-start gap-2">
                <span className="font-bold tabular-nums text-muted">{`${i + 1}.`}</span>
                <div className="grid min-w-0 flex-1 gap-1">
                  <p className="font-bold">{q.prompt}</p>
                  <p className="text-sm text-muted">{`${TYPE_LABEL[q.type]} · Answer: ${correctAnswerText(q)}`}</p>
                </div>
                {q.aiDrafted && <span className="rounded-pill bg-xp-soft px-2 py-0.5 text-xs font-bold text-xp">AI draft: check it</span>}
                <span className="flex">
                  <Move id={q.id} direction={-1} label={`Move question ${i + 1} up`} />
                  <Move id={q.id} direction={1} label={`Move question ${i + 1} down`} />
                </span>
              </div>
              <details className="rounded-md bg-canvas px-3 py-2">
                <summary className="cursor-pointer text-sm font-bold text-accent">Edit</summary>
                <div className="pt-3">
                  <QuestionEditor
                    action={saveQuestion}
                    quizId={quiz.id}
                    question={{
                      id: q.id,
                      type: q.type,
                      prompt: q.prompt,
                      data: q.data,
                      explanation: q.explanation,
                    }}
                  />
                </div>
              </details>
              <form action={deleteQuestion} className="justify-self-end">
                <input type="hidden" name="id" value={q.id} />
                <ConfirmButton label="Delete" confirmLabel="Click again to delete" />
              </form>
            </li>
          ))}
        </ol>
        <div className="grid gap-3 rounded-lg border border-dashed border-line p-4">
          <h3 className="font-bold">Add a question</h3>
          <QuestionEditor action={saveQuestion} quizId={quiz.id} />
        </div>
      </section>

      <section className="grid gap-3 border-t border-line pt-6">
        <h2 className="text-xl font-bold">Delete this quiz</h2>
        <p className="text-[15px] text-muted">Removes its questions and every learner’s attempts. XP already earned stays.</p>
        <form action={deleteQuiz}>
          <input type="hidden" name="id" value={quiz.id} />
          <ConfirmButton label="Delete quiz" confirmLabel="Click again to delete it" />
        </form>
      </section>
    </div>
  );
}
