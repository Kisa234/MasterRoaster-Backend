-- CreateEnum
CREATE TYPE "Molienda" AS ENUM ('ENTERO', 'MOLIDO');

-- CreateTable
CREATE TABLE "Producto" (
    "id_producto" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "id_lote" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "ProductoSKU" (
    "id_sku" TEXT NOT NULL,
    "sku_code" TEXT,
    "id_producto" TEXT NOT NULL,
    "id_lote_tostado" TEXT NOT NULL,
    "gramaje" INTEGER NOT NULL,
    "molienda" "Molienda" NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "ProductoSKU_pkey" PRIMARY KEY ("id_sku")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductoSKU_sku_code_key" ON "ProductoSKU"("sku_code");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoSKU" ADD CONSTRAINT "ProductoSKU_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoSKU" ADD CONSTRAINT "ProductoSKU_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "Producto"("id_producto") ON DELETE RESTRICT ON UPDATE CASCADE;
