/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Language` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Language"
ADD COLUMN     "isNative" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_userId_key" ON "Language"("name", "userId");

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
