-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "id_almacen" TEXT;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE SET NULL ON UPDATE CASCADE;
