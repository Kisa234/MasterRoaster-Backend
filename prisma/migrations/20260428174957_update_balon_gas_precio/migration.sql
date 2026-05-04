/*
  Warnings:

  - You are about to drop the column `codigo` on the `BalonGas` table. All the data in the column will be lost.
  - You are about to drop the column `comentario` on the `BalonGas` table. All the data in the column will be lost.
  - You are about to drop the column `peso_kg` on the `BalonGas` table. All the data in the column will be lost.
  - Added the required column `precio` to the `BalonGas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BalonGas_codigo_key";

-- AlterTable
ALTER TABLE "BalonGas" DROP COLUMN "codigo",
DROP COLUMN "comentario",
DROP COLUMN "peso_kg",
ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL;
