/*
  Warnings:

  - You are about to drop the column `id_lote` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the `ProductoSKU` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_id_lote_fkey";

-- DropForeignKey
ALTER TABLE "ProductoSKU" DROP CONSTRAINT "ProductoSKU_id_lote_tostado_fkey";

-- DropForeignKey
ALTER TABLE "ProductoSKU" DROP CONSTRAINT "ProductoSKU_id_producto_fkey";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "id_lote",
ADD COLUMN     "categoria" TEXT,
ADD COLUMN     "es_combo" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ProductoSKU";

-- CreateTable
CREATE TABLE "Inventario" (
    "id_inventario" TEXT NOT NULL,
    "id_producto" TEXT NOT NULL,
    "id_lote_tostado" TEXT,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "gramaje" INTEGER,
    "molienda" "Molienda" NOT NULL DEFAULT 'NINGUNO',
    "unidad_medida" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "ProductoComponente" (
    "id_combo" TEXT NOT NULL,
    "id_producto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ProductoComponente_pkey" PRIMARY KEY ("id_combo","id_producto")
);

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoComponente" ADD CONSTRAINT "ProductoComponente_id_combo_fkey" FOREIGN KEY ("id_combo") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoComponente" ADD CONSTRAINT "ProductoComponente_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
