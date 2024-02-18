/*
  Warnings:

  - You are about to drop the column `eventTime` on the `user_party` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_party" DROP COLUMN "eventTime";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT;
