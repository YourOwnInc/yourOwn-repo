/*
  Warnings:

  - The `kind` column on the `Experience` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "kind",
ADD COLUMN     "kind" TEXT NOT NULL DEFAULT 'other';

-- DropEnum
DROP TYPE "ExperienceKind";

-- CreateIndex
CREATE INDEX "Experience_kind_idx" ON "Experience"("kind");
