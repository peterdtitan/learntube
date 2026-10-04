-- CreateEnum
CREATE TYPE "QuizKind" AS ENUM ('LESSON_CHECK', 'CHECKPOINT', 'MODULE_GAME');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE', 'MULTI', 'TRUE_FALSE', 'ORDER', 'MATCH', 'TEXT', 'NUMBER');

-- AlterEnum
ALTER TYPE "XpKind" ADD VALUE 'QUIZ';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "extraQuizTime" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "practiceMinutes" INTEGER;

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "kind" "QuizKind" NOT NULL,
    "title" TEXT,
    "videoId" TEXT,
    "unitId" TEXT,
    "afterVideoId" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "timeLimitSec" INTEGER,
    "passPercent" INTEGER NOT NULL DEFAULT 70,
    "leavePenalty" INTEGER NOT NULL DEFAULT 3,
    "awayPenalty" INTEGER NOT NULL DEFAULT 1,
    "copyPenalty" INTEGER NOT NULL DEFAULT 2,
    "maxPenalty" INTEGER NOT NULL DEFAULT 50,
    "timePenalty" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "type" "QuestionType" NOT NULL,
    "prompt" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "explanation" TEXT,
    "aiDrafted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadlineAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "answers" JSONB,
    "score" DOUBLE PRECISION,
    "penalty" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "finalScore" DOUBLE PRECISION,
    "passed" BOOLEAN,
    "leaveCount" INTEGER NOT NULL DEFAULT 0,
    "awaySeconds" INTEGER NOT NULL DEFAULT 0,
    "copyCount" INTEGER NOT NULL DEFAULT 0,
    "pasteCount" INTEGER NOT NULL DEFAULT 0,
    "events" JSONB,
    "results" JSONB,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_videoId_kind_key" ON "Quiz"("videoId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_unitId_kind_key" ON "Quiz"("unitId", "kind");

-- CreateIndex
CREATE INDEX "Question_quizId_order_idx" ON "Question"("quizId", "order");

-- CreateIndex
CREATE INDEX "QuizAttempt_quizId_userId_startedAt_idx" ON "QuizAttempt"("quizId", "userId", "startedAt");

-- CreateIndex
CREATE INDEX "QuizAttempt_userId_submittedAt_idx" ON "QuizAttempt"("userId", "submittedAt");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
