/*
  Warnings:

  - Added the required column `peso` to the `LoteTostado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoteTostado" ADD COLUMN     "peso" DOUBLE PRECISION NOT NULL;
