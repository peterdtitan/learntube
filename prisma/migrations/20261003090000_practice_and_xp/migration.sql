-- CreateEnum
CREATE TYPE "SkillTier" AS ENUM ('HAND', 'SCREEN');

-- CreateEnum
CREATE TYPE "XpKind" AS ENUM ('WATCH', 'TRY', 'LOG');

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "SkillTier" NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- The ten shelf skills. Seeded here (not only in seed.js) so the category backfill below has rows to point at.
INSERT INTO "Skill" ("id", "name", "tier", "color", "order") VALUES
    ('cooking', 'Cooking', 'HAND', '#D9573F', 0),
    ('knitting', 'Knitting & Crochet', 'HAND', '#6E9C8E', 1),
    ('sewing', 'Sewing', 'HAND', '#D97894', 2),
    ('drawing', 'Drawing', 'HAND', '#C9961A', 3),
    ('guitar', 'Guitar', 'HAND', '#B8692E', 4),
    ('photography', 'Photography', 'SCREEN', '#3D4752', 5),
    ('software-engineering', 'Software Engineering', 'SCREEN', '#2F6F62', 6),
    ('data', 'Data', 'SCREEN', '#4F7FD9', 7),
    ('digital-marketing', 'Digital Marketing', 'SCREEN', '#2696A8', 8),
    ('music-production', 'Music Production', 'SCREEN', '#7C6CD8', 9);

-- AlterTable
ALTER TABLE "Pathway" ADD COLUMN "makeTitle" TEXT,
ADD COLUMN "skillId" TEXT;

-- Backfill skillId from the old free-text category before dropping it
UPDATE "Pathway" p SET "skillId" = s."id"
FROM "Skill" s
WHERE lower(trim(p."category")) = lower(s."name");

ALTER TABLE "Pathway" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "timeZone" TEXT NOT NULL DEFAULT 'UTC',
ADD COLUMN "weeklyGoal" INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN "tryTask" TEXT;

-- AlterTable
ALTER TABLE "VideoProgress" ADD COLUMN "triedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Make" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT,
    "pathwayId" TEXT,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kudos" (
    "userId" TEXT NOT NULL,
    "makeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kudos_pkey" PRIMARY KEY ("userId","makeId")
);

-- CreateTable
CREATE TABLE "XpEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "XpKind" NOT NULL,
    "amount" INTEGER NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "XpEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Make_userId_createdAt_idx" ON "Make"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Make_createdAt_idx" ON "Make"("createdAt");

-- CreateIndex
CREATE INDEX "XpEvent_userId_createdAt_idx" ON "XpEvent"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "XpEvent_userId_sourceKey_key" ON "XpEvent"("userId", "sourceKey");

-- AddForeignKey
ALTER TABLE "Pathway" ADD CONSTRAINT "Pathway_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Make" ADD CONSTRAINT "Make_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Make" ADD CONSTRAINT "Make_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Make" ADD CONSTRAINT "Make_pathwayId_fkey" FOREIGN KEY ("pathwayId") REFERENCES "Pathway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kudos" ADD CONSTRAINT "Kudos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kudos" ADD CONSTRAINT "Kudos_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpEvent" ADD CONSTRAINT "XpEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
