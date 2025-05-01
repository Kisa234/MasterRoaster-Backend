/*
  Warnings:

  - Added the required column `id_cliente` to the `Tueste` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_lote` to the `Tueste` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tueste" ADD COLUMN     "id_cliente" TEXT NOT NULL,
ADD COLUMN     "id_lote" TEXT NOT NULL;
