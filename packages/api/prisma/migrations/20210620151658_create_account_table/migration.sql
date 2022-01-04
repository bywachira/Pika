-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL,
    "avatar" TEXT NOT NULL,
    "third_party_auth" TEXT[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountPlan" (
    "id" TEXT NOT NULL,
    "current_plan" TEXT NOT NULL,
    "acc_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "image_quota" INTEGER NOT NULL DEFAULT 150,
    "used_quota" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account.uid_unique" ON "Account"("uid");

-- AddForeignKey
ALTER TABLE "AccountPlan" ADD FOREIGN KEY ("acc_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
