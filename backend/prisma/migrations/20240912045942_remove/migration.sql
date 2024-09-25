/*
  Warnings:

  - You are about to drop the column `wordToId` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `contentToId` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_wordToId_fkey";

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "wordToId",
ADD COLUMN     "contentToId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_contentToId_fkey" FOREIGN KEY ("contentToId") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
