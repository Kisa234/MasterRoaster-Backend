/*
  Warnings:

  - You are about to drop the column `Aroma` on the `AnalisisRapido` table. All the data in the column will be lost.
  - Added the required column `aroma` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalisisRapido" DROP COLUMN "Aroma",
ADD COLUMN     "aroma" TEXT NOT NULL;
