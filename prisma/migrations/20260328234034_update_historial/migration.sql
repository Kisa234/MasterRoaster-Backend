/*
  Warnings:

  - Changed the type of `entidad` on the `Historial` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `accion` on the `Historial` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HistorialEntidad" AS ENUM ('PEDIDO', 'LOTE', 'LOTE_TOSTADO', 'MUESTRA', 'INSUMO', 'PRODUCTO', 'INVENTARIO');

-- CreateEnum
CREATE TYPE "HistorialAccion" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'COMPLETE', 'CANCEL', 'AJUSTE', 'INGRESO', 'SALIDA', 'TRASLADO');

-- AlterTable
ALTER TABLE "Historial" DROP COLUMN "entidad",
ADD COLUMN     "entidad" "HistorialEntidad" NOT NULL,
DROP COLUMN "accion",
ADD COLUMN     "accion" "HistorialAccion" NOT NULL;
