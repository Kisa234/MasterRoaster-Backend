-- AlterEnum
ALTER TYPE "EntidadInventario" ADD VALUE 'BOLSA';

-- AlterEnum
ALTER TYPE "HistorialEntidad" ADD VALUE 'BOLSA';

-- AlterTable
ALTER TABLE "Envio" ADD COLUMN     "bolsaId_bolsa" TEXT;

-- CreateTable
CREATE TABLE "Bolsa" (
    "id_bolsa" TEXT NOT NULL,
    "id_lote_tostado" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "gramaje" INTEGER NOT NULL,
    "molienda" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_embolsado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT,
    "comentario" TEXT,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Bolsa_pkey" PRIMARY KEY ("id_bolsa")
);

-- CreateTable
CREATE TABLE "InventarioBolsa" (
    "id_inventario" TEXT NOT NULL,
    "id_bolsa" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "InventarioBolsa_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventarioBolsa_id_bolsa_id_almacen_key" ON "InventarioBolsa"("id_bolsa", "id_almacen");

-- AddForeignKey
ALTER TABLE "Bolsa" ADD CONSTRAINT "Bolsa_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bolsa" ADD CONSTRAINT "Bolsa_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bolsa" ADD CONSTRAINT "Bolsa_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioBolsa" ADD CONSTRAINT "InventarioBolsa_id_bolsa_fkey" FOREIGN KEY ("id_bolsa") REFERENCES "Bolsa"("id_bolsa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioBolsa" ADD CONSTRAINT "InventarioBolsa_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_bolsaId_bolsa_fkey" FOREIGN KEY ("bolsaId_bolsa") REFERENCES "Bolsa"("id_bolsa") ON DELETE SET NULL ON UPDATE CASCADE;
