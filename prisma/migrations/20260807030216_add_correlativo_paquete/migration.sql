/*
  Warnings:

  - A unique constraint covering the columns `[numero_correlativo]` on the table `Paquete` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Paquete" ADD COLUMN     "numero_correlativo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Paquete_numero_correlativo_key" ON "Paquete"("numero_correlativo");
