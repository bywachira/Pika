-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "acc_id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD FOREIGN KEY ("acc_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "AccountPlan_acc_id_unique" RENAME TO "AccountPlan.acc_id_unique";
