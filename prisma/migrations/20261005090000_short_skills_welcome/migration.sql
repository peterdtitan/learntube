-- CreateEnum
CREATE TYPE "PathwayKind" AS ENUM ('COURSE', 'SKILL');

-- AlterTable
ALTER TABLE "Pathway" ADD COLUMN     "kind" "PathwayKind" NOT NULL DEFAULT 'COURSE';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "learningGoal" TEXT,
ADD COLUMN     "onboardedAt" TIMESTAMP(3);

