-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "drawCount" INTEGER;

-- AlterTable
ALTER TABLE "QuizAttempt" ADD COLUMN     "questionIds" TEXT[] DEFAULT ARRAY[]::TEXT[];

