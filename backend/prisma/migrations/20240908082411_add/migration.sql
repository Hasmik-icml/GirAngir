-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3);

UPDATE "Language" SET "updatedAt" = NOW() WHERE "updatedAt" IS NULL;
