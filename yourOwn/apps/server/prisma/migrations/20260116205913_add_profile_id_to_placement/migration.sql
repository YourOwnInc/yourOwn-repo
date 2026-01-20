-- AlterTable
ALTER TABLE "Placement" ADD COLUMN     "profileId" UUID,
ALTER COLUMN "experienceId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Placement_profileId_idx" ON "Placement"("profileId");

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
