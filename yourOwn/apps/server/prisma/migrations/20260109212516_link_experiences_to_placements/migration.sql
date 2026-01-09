/*
  Warnings:

  - You are about to drop the column `templateId` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the `LayoutItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sessionId,LayoutId]` on the table `Layout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "LayoutItem" DROP CONSTRAINT "LayoutItem_experienceId_fkey";

-- DropForeignKey
ALTER TABLE "LayoutItem" DROP CONSTRAINT "LayoutItem_layoutId_fkey";

-- DropIndex
DROP INDEX "Layout_sessionId_key";

-- DropIndex
DROP INDEX "Layout_templateId_idx";

-- AlterTable
ALTER TABLE "Layout" DROP COLUMN "templateId",
ADD COLUMN     "LayoutId" TEXT NOT NULL DEFAULT 'home';

-- DropTable
DROP TABLE "LayoutItem";

-- CreateTable
CREATE TABLE "Placement" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "layoutId" UUID NOT NULL,
    "experienceId" UUID NOT NULL,
    "slotId" TEXT NOT NULL,
    "patternId" TEXT NOT NULL,

    CONSTRAINT "Placement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slot" (
    "id" UUID NOT NULL,
    "layoutId" UUID NOT NULL,
    "clientSlotId" TEXT NOT NULL,
    "area" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Placement_layoutId_idx" ON "Placement"("layoutId");

-- CreateIndex
CREATE INDEX "Slot_layoutId_idx" ON "Slot"("layoutId");

-- CreateIndex
CREATE INDEX "Layout_LayoutId_idx" ON "Layout"("LayoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Layout_sessionId_LayoutId_key" ON "Layout"("sessionId", "LayoutId");

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "Layout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slot" ADD CONSTRAINT "Slot_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "Layout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
