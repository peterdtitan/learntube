-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LEARNER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Pathway" DROP CONSTRAINT "Pathway_ownerId_fkey";

-- AlterTable
ALTER TABLE "Make" ADD COLUMN     "hiddenAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Pathway" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'LEARNER';

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "makeId" TEXT NOT NULL,
    "reporterId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Report_resolvedAt_createdAt_idx" ON "Report"("resolvedAt", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Report_makeId_reporterId_key" ON "Report"("makeId", "reporterId");

-- AddForeignKey
ALTER TABLE "Pathway" ADD CONSTRAINT "Pathway_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

