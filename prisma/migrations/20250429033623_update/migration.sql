/*
  Warnings:

  - The `variedades` column on the `Lote` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Lote" DROP COLUMN "variedades",
ADD COLUMN     "variedades" TEXT[];
