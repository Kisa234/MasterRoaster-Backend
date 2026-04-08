-- AlterTable
ALTER TABLE "IngresoProducto" ADD COLUMN     "id_user" TEXT;

-- CreateTable
CREATE TABLE "IngresoInsumo" (
    "id_ingreso" TEXT NOT NULL,
    "id_insumo" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_compra" DOUBLE PRECISION,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" TEXT,

    CONSTRAINT "IngresoInsumo_pkey" PRIMARY KEY ("id_ingreso")
);

-- AddForeignKey
ALTER TABLE "IngresoInsumo" ADD CONSTRAINT "IngresoInsumo_id_insumo_fkey" FOREIGN KEY ("id_insumo") REFERENCES "Insumo"("id_insumo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngresoInsumo" ADD CONSTRAINT "IngresoInsumo_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngresoInsumo" ADD CONSTRAINT "IngresoInsumo_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngresoProducto" ADD CONSTRAINT "IngresoProducto_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
