/*
  Warnings:

  - The `variedades` column on the `Muestra` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Muestra" DROP COLUMN "variedades",
ADD COLUMN     "variedades" TEXT[];
