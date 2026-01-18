/*
  Warnings:

  - You are about to drop the column `content` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `kind` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Experience` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Experience_kind_idx";

-- DropIndex
DROP INDEX "Experience_title_idx";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "content",
DROP COLUMN "end",
DROP COLUMN "kind",
DROP COLUMN "start",
DROP COLUMN "summary",
DROP COLUMN "title",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bioLong" TEXT,
ADD COLUMN     "bioShort" TEXT,
ADD COLUMN     "currentlyLearning" TEXT[],
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "philosophy" TEXT,
ADD COLUMN     "tagline" TEXT;

-- CreateTable
CREATE TABLE "Narrative" (
    "id" UUID NOT NULL,
    "experienceId" UUID NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'comprehensive',
    "roleTitle" TEXT NOT NULL,
    "shortSummary" TEXT,
    "problemStatement" TEXT,
    "solutionDetails" TEXT,
    "impactBullets" TEXT[],
    "techStack" TEXT[],

    CONSTRAINT "Narrative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Narrative_experienceId_idx" ON "Narrative"("experienceId");

-- CreateIndex
CREATE INDEX "Narrative_kind_idx" ON "Narrative"("kind");

-- AddForeignKey
ALTER TABLE "Narrative" ADD CONSTRAINT "Narrative_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
