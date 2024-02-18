/*
  Warnings:

  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `cuisines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `diet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `party` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_cuisines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_diets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_goals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_party` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "party" DROP CONSTRAINT "party_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_partyId_fkey";

-- DropForeignKey
ALTER TABLE "user_cuisines" DROP CONSTRAINT "user_cuisines_cusineId_fkey";

-- DropForeignKey
ALTER TABLE "user_cuisines" DROP CONSTRAINT "user_cuisines_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_diets" DROP CONSTRAINT "user_diets_dietId_fkey";

-- DropForeignKey
ALTER TABLE "user_diets" DROP CONSTRAINT "user_diets_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_goals" DROP CONSTRAINT "user_goals_goalId_fkey";

-- DropForeignKey
ALTER TABLE "user_goals" DROP CONSTRAINT "user_goals_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_party" DROP CONSTRAINT "user_party_partyId_fkey";

-- DropForeignKey
ALTER TABLE "user_party" DROP CONSTRAINT "user_party_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bio",
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "cuisines";

-- DropTable
DROP TABLE "diet";

-- DropTable
DROP TABLE "goal";

-- DropTable
DROP TABLE "party";

-- DropTable
DROP TABLE "reservation";

-- DropTable
DROP TABLE "restaurant";

-- DropTable
DROP TABLE "user_cuisines";

-- DropTable
DROP TABLE "user_diets";

-- DropTable
DROP TABLE "user_goals";

-- DropTable
DROP TABLE "user_party";
