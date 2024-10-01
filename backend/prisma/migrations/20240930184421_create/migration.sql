/*
  Warnings:

  - A unique constraint covering the columns `[contentFromId,contentToId,userId,deletedAt]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Translation_contentFromId_contentToId_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Translation_contentFromId_contentToId_userId_deletedAt_key" ON "Translation"("contentFromId", "contentToId", "userId", "deletedAt");
