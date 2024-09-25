/*
  Warnings:

  - You are about to drop the column `wordFromId` on the `Translation` table. All the data in the column will be lost.
  - Added the required column `contentFromId` to the `Translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_wordFromId_fkey";

-- AlterTable
ALTER TABLE "Translation" DROP COLUMN "wordFromId",
ADD COLUMN     "contentFromId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_contentFromId_fkey" FOREIGN KEY ("contentFromId") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
