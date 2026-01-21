/*
  Warnings:

  - You are about to drop the column `location` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `organization` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `impactBullets` on the `Narrative` table. All the data in the column will be lost.
  - You are about to drop the column `problemStatement` on the `Narrative` table. All the data in the column will be lost.
  - You are about to drop the column `roleTitle` on the `Narrative` table. All the data in the column will be lost.
  - You are about to drop the column `shortSummary` on the `Narrative` table. All the data in the column will be lost.
  - You are about to drop the column `solutionDetails` on the `Narrative` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `Narrative` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('WORK', 'PROJECT', 'EVENT', 'ORGANIZATION', 'COLLECTION', 'VOLUNTEER');

-- DropIndex
DROP INDEX "Narrative_kind_idx";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "location",
DROP COLUMN "organization",
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'experience',
ADD COLUMN     "type" "ExperienceType" NOT NULL DEFAULT 'WORK';

-- AlterTable
ALTER TABLE "Narrative" DROP COLUMN "impactBullets",
DROP COLUMN "problemStatement",
DROP COLUMN "roleTitle",
DROP COLUMN "shortSummary",
DROP COLUMN "solutionDetails",
DROP COLUMN "techStack",
ADD COLUMN     "bodyContent" TEXT,
ADD COLUMN     "bulletPoints" TEXT[],
ADD COLUMN     "headline" TEXT,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "kind" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Experience_type_idx" ON "Experience"("type");
