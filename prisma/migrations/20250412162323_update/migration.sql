/*
  Warnings:

  - You are about to drop the column `fecha_compra` on the `Lote` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_compra` on the `Muestra` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lote" DROP COLUMN "fecha_compra";

-- AlterTable
ALTER TABLE "Muestra" DROP COLUMN "fecha_compra";
