-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "id_nuevoLote" TEXT;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_nuevoLote_fkey" FOREIGN KEY ("id_nuevoLote") REFERENCES "Lote"("id_lote") ON DELETE SET NULL ON UPDATE CASCADE;
