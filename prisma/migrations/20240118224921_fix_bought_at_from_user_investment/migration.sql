/*
  Warnings:

  - Changed the type of `bought_at` on the `user_investment_tb` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_investment_tb" DROP COLUMN "bought_at",
ADD COLUMN     "bought_at" TIMESTAMP(3) NOT NULL;
