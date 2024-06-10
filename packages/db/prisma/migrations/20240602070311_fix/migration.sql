/*
  Warnings:

  - You are about to drop the column `auth_type` on the `Merchant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "auth_type",
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropEnum
DROP TYPE "AuthType";

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_number_key" ON "Merchant"("number");
