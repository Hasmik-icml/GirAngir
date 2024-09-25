/*
  Warnings:

  - You are about to drop the column `text` on the `Entry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[content,languageId,userId]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Entry_text_languageId_userId_key";

-- AlterTable
ALTER TABLE "Entry" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_content_languageId_userId_key" ON "Entry"("content", "languageId", "userId");
