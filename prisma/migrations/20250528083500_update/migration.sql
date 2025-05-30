/*
  Warnings:

  - A unique constraint covering the columns `[id_nuevoLote_tostado]` on the table `Pedido` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pedido_id_nuevoLote_tostado_key" ON "Pedido"("id_nuevoLote_tostado");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_nuevoLote_tostado_fkey" FOREIGN KEY ("id_nuevoLote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;
