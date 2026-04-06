-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "id_lote_destino" TEXT;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_lote_destino_fkey" FOREIGN KEY ("id_lote_destino") REFERENCES "Lote"("id_lote") ON DELETE SET NULL ON UPDATE CASCADE;
