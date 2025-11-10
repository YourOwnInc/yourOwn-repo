/*
  Warnings:

  - The values [WORK,EDUCATION,AWARD] on the enum `ExperienceKind` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExperienceKind_new" AS ENUM ('INTERNSHIP', 'PROJECT', 'JOB', 'VOLUNTEERING', 'OTHER');
ALTER TABLE "public"."Experience" ALTER COLUMN "kind" DROP DEFAULT;
ALTER TABLE "Experience" ALTER COLUMN "kind" TYPE "ExperienceKind_new" USING ("kind"::text::"ExperienceKind_new");
ALTER TYPE "ExperienceKind" RENAME TO "ExperienceKind_old";
ALTER TYPE "ExperienceKind_new" RENAME TO "ExperienceKind";
DROP TYPE "public"."ExperienceKind_old";
ALTER TABLE "Experience" ALTER COLUMN "kind" SET DEFAULT 'OTHER';
COMMIT;
