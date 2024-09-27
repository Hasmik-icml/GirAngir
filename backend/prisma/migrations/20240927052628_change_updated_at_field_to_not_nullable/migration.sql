/*
  Warnings:

  - Made the column `updatedAt` on table `Translation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Vocabulary` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Translation" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vocabulary" ALTER COLUMN "updatedAt" SET NOT NULL;
