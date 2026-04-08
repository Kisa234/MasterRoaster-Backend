/*
  Warnings:

  - You are about to drop the column `id_entidad` on the `MovimientoAlmacen` table. All the data in the column will be lost.
  - Added the required column `id_entidad_primario` to the `MovimientoAlmacen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Historial" ADD COLUMN     "id_pedido" TEXT;

-- AlterTable
ALTER TABLE "MovimientoAlmacen" DROP COLUMN "id_entidad",
ADD COLUMN     "id_entidad_primario" TEXT NOT NULL,
ADD COLUMN     "id_entidad_secundario" TEXT,
ADD COLUMN     "id_pedido" TEXT;

-- AddForeignKey
ALTER TABLE "MovimientoAlmacen" ADD CONSTRAINT "MovimientoAlmacen_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE SET NULL ON UPDATE CASCADE;
