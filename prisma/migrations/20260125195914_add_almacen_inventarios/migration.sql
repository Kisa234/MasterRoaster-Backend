/*
  Warnings:

  - A unique constraint covering the columns `[id_producto,id_almacen,gramaje,molienda]` on the table `Inventario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_almacen` to the `Inventario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoMovimiento" AS ENUM ('INGRESO', 'SALIDA', 'TRASLADO', 'AJUSTE');

-- CreateEnum
CREATE TYPE "EntidadInventario" AS ENUM ('LOTE', 'LOTE_TOSTADO', 'PRODUCTO', 'MUESTRA', 'INSUMO');

-- AlterTable
ALTER TABLE "Inventario" ADD COLUMN     "id_almacen" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "alias" TEXT;

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "alto_cm" DOUBLE PRECISION,
ADD COLUMN     "ancho_cm" DOUBLE PRECISION,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "fragil" BOOLEAN,
ADD COLUMN     "largo_cm" DOUBLE PRECISION,
ADD COLUMN     "marca" TEXT,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "modelo" TEXT,
ADD COLUMN     "peso_kg" DOUBLE PRECISION,
ADD COLUMN     "volumen_cm3" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Almacen" (
    "id_almacen" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Almacen_pkey" PRIMARY KEY ("id_almacen")
);

-- CreateTable
CREATE TABLE "MovimientoAlmacen" (
    "id_movimiento" TEXT NOT NULL,
    "tipo" "TipoMovimiento" NOT NULL,
    "entidad" "EntidadInventario" NOT NULL,
    "id_entidad" TEXT NOT NULL,
    "id_almacen_origen" TEXT,
    "id_almacen_destino" TEXT,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT,
    "id_user" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovimientoAlmacen_pkey" PRIMARY KEY ("id_movimiento")
);

-- CreateTable
CREATE TABLE "InventarioMuestra" (
    "id_inventario" TEXT NOT NULL,
    "id_muestra" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "InventarioMuestra_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "InventarioLote" (
    "id_inventario" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "cantidad_kg" DOUBLE PRECISION NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "InventarioLote_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "InventarioLoteTostado" (
    "id_inventario" TEXT NOT NULL,
    "id_lote_tostado" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "cantidad_kg" DOUBLE PRECISION NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "InventarioLoteTostado_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "Insumo" (
    "id_insumo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "descripcion" TEXT,
    "unidad_medida" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Insumo_pkey" PRIMARY KEY ("id_insumo")
);

-- CreateTable
CREATE TABLE "InventarioInsumo" (
    "id_inventario" TEXT NOT NULL,
    "id_insumo" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "InventarioInsumo_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "IngresoProducto" (
    "id_ingreso" TEXT NOT NULL,
    "id_producto" TEXT NOT NULL,
    "id_variante" TEXT,
    "id_almacen" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_compra" DOUBLE PRECISION NOT NULL,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IngresoProducto_pkey" PRIMARY KEY ("id_ingreso")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventarioMuestra_id_muestra_id_almacen_key" ON "InventarioMuestra"("id_muestra", "id_almacen");

-- CreateIndex
CREATE UNIQUE INDEX "InventarioLote_id_lote_id_almacen_key" ON "InventarioLote"("id_lote", "id_almacen");

-- CreateIndex
CREATE UNIQUE INDEX "InventarioLoteTostado_id_lote_tostado_id_almacen_key" ON "InventarioLoteTostado"("id_lote_tostado", "id_almacen");

-- CreateIndex
CREATE UNIQUE INDEX "InventarioInsumo_id_insumo_id_almacen_key" ON "InventarioInsumo"("id_insumo", "id_almacen");

-- CreateIndex
CREATE UNIQUE INDEX "Inventario_id_producto_id_almacen_gramaje_molienda_key" ON "Inventario"("id_producto", "id_almacen", "gramaje", "molienda");

-- AddForeignKey
ALTER TABLE "MovimientoAlmacen" ADD CONSTRAINT "MovimientoAlmacen_id_almacen_origen_fkey" FOREIGN KEY ("id_almacen_origen") REFERENCES "Almacen"("id_almacen") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoAlmacen" ADD CONSTRAINT "MovimientoAlmacen_id_almacen_destino_fkey" FOREIGN KEY ("id_almacen_destino") REFERENCES "Almacen"("id_almacen") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimientoAlmacen" ADD CONSTRAINT "MovimientoAlmacen_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioMuestra" ADD CONSTRAINT "InventarioMuestra_id_muestra_fkey" FOREIGN KEY ("id_muestra") REFERENCES "Muestra"("id_muestra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioMuestra" ADD CONSTRAINT "InventarioMuestra_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioLote" ADD CONSTRAINT "InventarioLote_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioLote" ADD CONSTRAINT "InventarioLote_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioLoteTostado" ADD CONSTRAINT "InventarioLoteTostado_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioLoteTostado" ADD CONSTRAINT "InventarioLoteTostado_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioInsumo" ADD CONSTRAINT "InventarioInsumo_id_insumo_fkey" FOREIGN KEY ("id_insumo") REFERENCES "Insumo"("id_insumo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventarioInsumo" ADD CONSTRAINT "InventarioInsumo_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngresoProducto" ADD CONSTRAINT "IngresoProducto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngresoProducto" ADD CONSTRAINT "IngresoProducto_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;
