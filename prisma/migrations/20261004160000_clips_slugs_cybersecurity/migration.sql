-- AlterTable
ALTER TABLE "Pathway" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "endSec" INTEGER,
ADD COLUMN     "startSec" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Pathway_slug_key" ON "Pathway"("slug");


-- The first real pathway is Cybersecurity Expert, so add its skill.
INSERT INTO "Skill" ("id", "name", "tier", "color", "order")
VALUES ('cybersecurity', 'Cybersecurity', 'SCREEN', '#4338CA', 10)
ON CONFLICT ("id") DO NOTHING;
