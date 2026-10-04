-- AlterTable
ALTER TABLE "Pathway" ADD COLUMN     "certification" TEXT,
ADD COLUMN     "trackId" TEXT,
ADD COLUMN     "trackOrder" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "makeTitle" TEXT,
    "skillId" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_slug_key" ON "Track"("slug");

-- AddForeignKey
ALTER TABLE "Pathway" ADD CONSTRAINT "Pathway_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;

