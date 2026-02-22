/*
  Warnings:

  - You are about to drop the column `categoria` on the `Insumo` table. All the data in the column will be lost.
  - You are about to drop the `Inventario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_categoria` to the `Insumo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventario" DROP CONSTRAINT "Inventario_id_almacen_fkey";

-- DropForeignKey
ALTER TABLE "Inventario" DROP CONSTRAINT "Inventario_id_lote_tostado_fkey";

-- DropForeignKey
ALTER TABLE "Inventario" DROP CONSTRAINT "Inventario_id_producto_fkey";

-- AlterTable
ALTER TABLE "Insumo" DROP COLUMN "categoria",
ADD COLUMN     "id_categoria" TEXT NOT NULL;

-- DropTable
DROP TABLE "Inventario";

-- CreateTable
CREATE TABLE "CategoriaInsumo" (
    "id_categoria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CategoriaInsumo_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "InventarioProducto" (
    "id_inventario" TEXT NOT NULL,
    "id_producto" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "id_lote_tostado" TEXT,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "gramaje" INTEGER,
    "molienda" "Molienda" NOT NULL DEFAULT 'NINGUNO',
    "unidad_medida" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "InventarioProducto_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoriaInsumo_nombre_key" ON "CategoriaInsumo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "InventarioProducto_id_producto_id_almacen_gramaje_molienda_key" ON "InventarioProducto"("id_producto", "id_almacen", "gramaje", "molienda");

-- AddForeignKey
ALTER TABLE "Insumo" ADD CONSTRAINT "Insumo_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "CategoriaInsumo"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioProducto" ADD CONSTRAINT "InventarioProducto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioProducto" ADD CONSTRAINT "InventarioProducto_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioProducto" ADD CONSTRAINT "InventarioProducto_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;
