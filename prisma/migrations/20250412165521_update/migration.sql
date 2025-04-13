/*
  Warnings:

  - You are about to drop the column `asignado_a_id` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad_tostado` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_asignacion` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_pedido` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_tueste` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `cantidad` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_registro` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_pedido` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_asignado_a_id_fkey";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "asignado_a_id",
DROP COLUMN "cantidad_tostado",
DROP COLUMN "fecha_asignacion",
DROP COLUMN "fecha_pedido",
DROP COLUMN "tipo_tueste",
ADD COLUMN     "cantidad" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fecha_registro" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tipo_pedido" TEXT NOT NULL;
