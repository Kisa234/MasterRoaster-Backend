/*
  Warnings:

  - You are about to drop the column `gramaje` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `molienda` on the `Pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "gramaje",
DROP COLUMN "molienda";
