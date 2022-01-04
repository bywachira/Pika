/*
  Warnings:

  - Added the required column `bucket` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etag` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "bucket" TEXT NOT NULL,
ADD COLUMN     "etag" TEXT NOT NULL,
ADD COLUMN     "key" TEXT NOT NULL,
ALTER COLUMN "size" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Credentials" (
    "id" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "api_uuid" TEXT NOT NULL,
    "acc_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Credentials" ADD FOREIGN KEY ("acc_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
