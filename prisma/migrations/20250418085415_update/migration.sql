/*
  Warnings:

  - Made the column `id_pedido` on table `Tueste` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tueste" DROP CONSTRAINT "Tueste_id_pedido_fkey";

-- AlterTable
ALTER TABLE "Tueste" ALTER COLUMN "id_pedido" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;
