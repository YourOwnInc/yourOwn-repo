/*
  Warnings:

  - You are about to drop the column `userId` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `placements` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the column `slots` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `Layout` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Layout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Layout` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sessionId` on table `Experience` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sessionId` on table `Layout` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "Layout" DROP CONSTRAINT "Layout_userId_fkey";

-- DropIndex
DROP INDEX "Experience_userId_idx";

-- DropIndex
DROP INDEX "Layout_sessionId_idx";

-- DropIndex
DROP INDEX "Layout_userId_idx";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "userId",
ALTER COLUMN "sessionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Layout" DROP COLUMN "placements",
DROP COLUMN "slots",
DROP COLUMN "theme",
DROP COLUMN "userId",
ALTER COLUMN "sessionId" SET NOT NULL,
ALTER COLUMN "templateId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "LayoutItem" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "layoutId" UUID NOT NULL,
    "experienceId" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "patternId" TEXT,
    "patternProps" JSONB,

    CONSTRAINT "LayoutItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LayoutItem_layoutId_position_idx" ON "LayoutItem"("layoutId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "LayoutItem_layoutId_experienceId_key" ON "LayoutItem"("layoutId", "experienceId");

-- CreateIndex
CREATE UNIQUE INDEX "Layout_sessionId_key" ON "Layout"("sessionId");

-- AddForeignKey
ALTER TABLE "LayoutItem" ADD CONSTRAINT "LayoutItem_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "Layout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayoutItem" ADD CONSTRAINT "LayoutItem_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
