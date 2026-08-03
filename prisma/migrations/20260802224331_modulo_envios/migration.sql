/*
  Warnings:

  - You are about to drop the column `bolsaId_bolsa` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `clasificacion` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `comentario` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `id_cliente` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `id_lote_tostado` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `origen` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the column `entregado` on the `LoteTostado` table. All the data in the column will be lost.
  - You are about to drop the `FichaEnvio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[numero_correlativo]` on the table `Envio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_paquete]` on the table `Envio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_paquete` to the `Envio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_correlativo` to the `Envio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrado_por_id` to the `Envio` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoPaquete" AS ENUM ('EN_PREPARACION', 'LISTO', 'DESPACHADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "EstadoEnvio" AS ENUM ('PENDIENTE', 'PROGRAMADO', 'DESPACHADO', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO', 'DEVUELTO');

-- CreateEnum
CREATE TYPE "QuienPaga" AS ENUM ('CLIENTE', 'EMPRESA');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "HistorialEntidad" ADD VALUE 'PAQUETE';
ALTER TYPE "HistorialEntidad" ADD VALUE 'ENVIO';

-- DropForeignKey
ALTER TABLE "Envio" DROP CONSTRAINT "Envio_bolsaId_bolsa_fkey";

-- DropForeignKey
ALTER TABLE "Envio" DROP CONSTRAINT "Envio_id_cliente_fkey";

-- DropForeignKey
ALTER TABLE "Envio" DROP CONSTRAINT "Envio_id_lote_tostado_fkey";

-- DropForeignKey
ALTER TABLE "FichaEnvio" DROP CONSTRAINT "FichaEnvio_id_envio_fkey";

-- AlterTable
ALTER TABLE "Envio" DROP COLUMN "bolsaId_bolsa",
DROP COLUMN "cantidad",
DROP COLUMN "clasificacion",
DROP COLUMN "comentario",
DROP COLUMN "fecha",
DROP COLUMN "id_cliente",
DROP COLUMN "id_lote_tostado",
DROP COLUMN "origen",
ADD COLUMN     "alto_cm" DOUBLE PRECISION,
ADD COLUMN     "ancho_cm" DOUBLE PRECISION,
ADD COLUMN     "cancelado_por_id" TEXT,
ADD COLUMN     "comentario_cancelacion" TEXT,
ADD COLUMN     "costo_envio" DOUBLE PRECISION,
ADD COLUMN     "despachado_por_id" TEXT,
ADD COLUMN     "entregado_por_id" TEXT,
ADD COLUMN     "estado" "EstadoEnvio" NOT NULL DEFAULT 'PENDIENTE',
ADD COLUMN     "fecha_despacho_real" TIMESTAMP(3),
ADD COLUMN     "fecha_entrega_estimada" TIMESTAMP(3),
ADD COLUMN     "fecha_entrega_real" TIMESTAMP(3),
ADD COLUMN     "fecha_programada" TIMESTAMP(3),
ADD COLUMN     "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_paquete" TEXT NOT NULL,
ADD COLUMN     "id_transportista" TEXT,
ADD COLUMN     "largo_cm" DOUBLE PRECISION,
ADD COLUMN     "numero_correlativo" TEXT NOT NULL,
ADD COLUMN     "numero_tracking" TEXT,
ADD COLUMN     "peso_total_kg" DOUBLE PRECISION,
ADD COLUMN     "quien_paga" "QuienPaga",
ADD COLUMN     "registrado_por_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LoteTostado" DROP COLUMN "entregado";

-- DropTable
DROP TABLE "FichaEnvio";

-- CreateTable
CREATE TABLE "PedidoItem" (
    "id_pedido_item" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "entidad" "EntidadInventario" NOT NULL,
    "id_entidad" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PedidoItem_pkey" PRIMARY KEY ("id_pedido_item")
);

-- CreateTable
CREATE TABLE "Paquete" (
    "id_paquete" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "id_pedido_origen" TEXT,
    "estado" "EstadoPaquete" NOT NULL DEFAULT 'EN_PREPARACION',
    "comentario" TEXT,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),
    "creado_por_id" TEXT NOT NULL,
    "preparado_por_id" TEXT,
    "fecha_preparado" TIMESTAMP(3),

    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("id_paquete")
);

-- CreateTable
CREATE TABLE "PaqueteItem" (
    "id_item" TEXT NOT NULL,
    "id_paquete" TEXT NOT NULL,
    "entidad" "EntidadInventario" NOT NULL,
    "id_entidad" TEXT NOT NULL,
    "id_almacen" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "unidad_medida" TEXT NOT NULL,
    "gramaje" INTEGER,
    "molienda" TEXT,
    "comentario" TEXT,

    CONSTRAINT "PaqueteItem_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "DireccionEnvio" (
    "id_direccion" TEXT NOT NULL,
    "id_envio" TEXT NOT NULL,
    "nombre_destinatario" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "pais" TEXT NOT NULL DEFAULT 'Perú',
    "codigo_postal" TEXT,
    "referencia" TEXT,
    "observaciones" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DireccionEnvio_pkey" PRIMARY KEY ("id_direccion")
);

-- CreateTable
CREATE TABLE "Transportista" (
    "id_transportista" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "contacto" TEXT,
    "telefono" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transportista_pkey" PRIMARY KEY ("id_transportista")
);

-- CreateIndex
CREATE UNIQUE INDEX "DireccionEnvio_id_envio_key" ON "DireccionEnvio"("id_envio");

-- CreateIndex
CREATE UNIQUE INDEX "Transportista_nombre_key" ON "Transportista"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Envio_numero_correlativo_key" ON "Envio"("numero_correlativo");

-- CreateIndex
CREATE UNIQUE INDEX "Envio_id_paquete_key" ON "Envio"("id_paquete");

-- AddForeignKey
ALTER TABLE "PedidoItem" ADD CONSTRAINT "PedidoItem_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_id_pedido_origen_fkey" FOREIGN KEY ("id_pedido_origen") REFERENCES "Pedido"("id_pedido") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_creado_por_id_fkey" FOREIGN KEY ("creado_por_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paquete" ADD CONSTRAINT "Paquete_preparado_por_id_fkey" FOREIGN KEY ("preparado_por_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaqueteItem" ADD CONSTRAINT "PaqueteItem_id_paquete_fkey" FOREIGN KEY ("id_paquete") REFERENCES "Paquete"("id_paquete") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaqueteItem" ADD CONSTRAINT "PaqueteItem_id_almacen_fkey" FOREIGN KEY ("id_almacen") REFERENCES "Almacen"("id_almacen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_id_paquete_fkey" FOREIGN KEY ("id_paquete") REFERENCES "Paquete"("id_paquete") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_id_transportista_fkey" FOREIGN KEY ("id_transportista") REFERENCES "Transportista"("id_transportista") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_registrado_por_id_fkey" FOREIGN KEY ("registrado_por_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_despachado_por_id_fkey" FOREIGN KEY ("despachado_por_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_entregado_por_id_fkey" FOREIGN KEY ("entregado_por_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_cancelado_por_id_fkey" FOREIGN KEY ("cancelado_por_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DireccionEnvio" ADD CONSTRAINT "DireccionEnvio_id_envio_fkey" FOREIGN KEY ("id_envio") REFERENCES "Envio"("id_envio") ON DELETE RESTRICT ON UPDATE CASCADE;
