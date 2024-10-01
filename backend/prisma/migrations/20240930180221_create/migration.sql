/*
  Warnings:

  - A unique constraint covering the columns `[contentFromId,contentToId,userId]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Translation_contentFromId_contentToId_userId_key" ON "Translation"("contentFromId", "contentToId", "userId");
