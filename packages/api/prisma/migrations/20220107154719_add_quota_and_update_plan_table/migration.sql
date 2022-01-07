/*
  Warnings:

  - You are about to drop the column `image_quota` on the `AccountPlan` table. All the data in the column will be lost.
  - You are about to drop the column `used_quota` on the `AccountPlan` table. All the data in the column will be lost.
  - Added the required column `paddle_product_id` to the `AccountPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountPlan" DROP COLUMN "image_quota",
DROP COLUMN "used_quota",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paddle_product_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Quota" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "file_quota" INTEGER NOT NULL DEFAULT 50,
    "used_quota" INTEGER NOT NULL DEFAULT 0,
    "excess_quota" INTEGER NOT NULL DEFAULT 0,
    "storage_usage" INTEGER NOT NULL DEFAULT 0,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quota" ADD FOREIGN KEY ("plan_id") REFERENCES "AccountPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
