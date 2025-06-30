/*
  Warnings:

  - You are about to drop the column `pocentaje_caramelizcacion` on the `AnalisisFisico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnalisisFisico" DROP COLUMN "pocentaje_caramelizcacion",
ADD COLUMN     "porcentaje_caramelizacion" DOUBLE PRECISION;
