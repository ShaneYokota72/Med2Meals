-- AlterTable
ALTER TABLE "order" ADD COLUMN     "reciepe" TEXT,
ALTER COLUMN "isDelivered" SET DEFAULT false,
ALTER COLUMN "compensation" SET DEFAULT 0;
