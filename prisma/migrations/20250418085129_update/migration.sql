-- AlterTable
ALTER TABLE "Tueste" ADD COLUMN     "id_pedido" TEXT;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE SET NULL ON UPDATE CASCADE;
