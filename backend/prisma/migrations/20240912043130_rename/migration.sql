/*
  Warnings:

  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_wordFromId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_wordToId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_languageId_fkey";

-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_userId_fkey";

-- DropTable
DROP TABLE "Word";

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_text_languageId_userId_key" ON "Entry"("text", "languageId", "userId");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_wordFromId_fkey" FOREIGN KEY ("wordFromId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_wordToId_fkey" FOREIGN KEY ("wordToId") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
