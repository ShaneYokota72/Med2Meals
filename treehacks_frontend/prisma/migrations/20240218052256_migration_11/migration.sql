-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_serverId_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "serverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
