/*
  Warnings:

  - Added the required column `tipo_lote` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_lote` to the `Muestra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "peso_tostado" DOUBLE PRECISION,
ADD COLUMN     "tipo_lote" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Muestra" ADD COLUMN     "tipo_lote" TEXT NOT NULL;
