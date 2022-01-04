/*
  Warnings:

  - A unique constraint covering the columns `[acc_id]` on the table `AccountPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccountPlan_acc_id_unique" ON "AccountPlan"("acc_id");
