-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_id_lote_fkey";

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "completado_por_id" TEXT,
ADD COLUMN     "creado_por_id" TEXT,
ADD COLUMN     "fecha_completado" TIMESTAMP(3),
ADD COLUMN     "gramaje" INTEGER,
ADD COLUMN     "id_lote_tostado" TEXT,
ADD COLUMN     "id_producto" TEXT,
ADD COLUMN     "molienda" TEXT,
ALTER COLUMN "id_lote" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_creado_por_id_fkey" FOREIGN KEY ("creado_por_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_completado_por_id_fkey" FOREIGN KEY ("completado_por_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
