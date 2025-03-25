/*
  Warnings:

  - Added the required column `fecha_compra` to the `Lote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "fecha_compra" TIMESTAMP(3) NOT NULL;
