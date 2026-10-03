-- CreateEnum
CREATE TYPE "MilestoneKind" AS ENUM ('XP', 'STREAK', 'FIRST_MAKE', 'PATHWAY_DONE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "showOnLeaderboard" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "XpEvent" ADD COLUMN     "pathwayId" TEXT,
ADD COLUMN     "skillId" TEXT;

-- CreateTable
CREATE TABLE "MakeComment" (
    "id" TEXT NOT NULL,
    "makeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preset" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MakeComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "MilestoneKind" NOT NULL,
    "key" TEXT NOT NULL,
    "value" INTEGER,
    "pathwayId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cheer" (
    "userId" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cheer_pkey" PRIMARY KEY ("userId","milestoneId")
);

-- CreateIndex
CREATE INDEX "MakeComment_makeId_createdAt_idx" ON "MakeComment"("makeId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "MakeComment_makeId_userId_preset_key" ON "MakeComment"("makeId", "userId", "preset");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE INDEX "Milestone_userId_createdAt_idx" ON "Milestone"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Milestone_userId_key_key" ON "Milestone"("userId", "key");

-- CreateIndex
CREATE INDEX "XpEvent_pathwayId_createdAt_idx" ON "XpEvent"("pathwayId", "createdAt");

-- CreateIndex
CREATE INDEX "XpEvent_skillId_createdAt_idx" ON "XpEvent"("skillId", "createdAt");

-- CreateIndex
CREATE INDEX "XpEvent_createdAt_idx" ON "XpEvent"("createdAt");

-- AddForeignKey
ALTER TABLE "XpEvent" ADD CONSTRAINT "XpEvent_pathwayId_fkey" FOREIGN KEY ("pathwayId") REFERENCES "Pathway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpEvent" ADD CONSTRAINT "XpEvent_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MakeComment" ADD CONSTRAINT "MakeComment_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MakeComment" ADD CONSTRAINT "MakeComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_pathwayId_fkey" FOREIGN KEY ("pathwayId") REFERENCES "Pathway"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cheer" ADD CONSTRAINT "Cheer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cheer" ADD CONSTRAINT "Cheer_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Backfill: link XP already earned to its pathway and skill, so it counts on leaderboards.
-- sourceKey formats: watch:<videoId>, try:<videoId>, log:video:<videoId>, log:pathway:<pathwayId>.
UPDATE "XpEvent" e
SET "pathwayId" = COALESCE(u."pathwayId", v."pathwayId")
FROM "Video" v
LEFT JOIN "Unit" u ON u."id" = v."unitId"
WHERE e."sourceKey" ~ '^(watch|try|log:video):'
  AND v."id" = regexp_replace(e."sourceKey", '^(watch|try|log:video):', '');

UPDATE "XpEvent" e
SET "pathwayId" = p."id"
FROM "Pathway" p
WHERE e."sourceKey" LIKE 'log:pathway:%'
  AND p."id" = substring(e."sourceKey" FROM 13);

UPDATE "XpEvent" e
SET "skillId" = p."skillId"
FROM "Pathway" p
WHERE p."id" = e."pathwayId";
