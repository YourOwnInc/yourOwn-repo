-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "impactBullets" TEXT[],
ADD COLUMN     "location" TEXT,
ADD COLUMN     "organization" TEXT,
ADD COLUMN     "problemStatement" TEXT,
ADD COLUMN     "roleTitle" TEXT,
ADD COLUMN     "solutionDetails" TEXT,
ADD COLUMN     "summaryLong" TEXT,
ADD COLUMN     "summaryShort" TEXT,
ADD COLUMN     "techStack" TEXT[];
