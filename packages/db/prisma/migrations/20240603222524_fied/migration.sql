/*
  Warnings:

  - You are about to drop the column `StartTime` on the `OnRampTransaction` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `amount` on the `OnRampTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "StartTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
