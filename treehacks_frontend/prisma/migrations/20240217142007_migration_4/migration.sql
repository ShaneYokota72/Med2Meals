/*
  Warnings:

  - You are about to drop the `cusines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "cusines";

-- CreateTable
CREATE TABLE "cusine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cusine_pkey" PRIMARY KEY ("id")
);
