/*
  Warnings:

  - Added the required column `id_lote` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Lote_analisis_id_key";

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "id_lote" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;
