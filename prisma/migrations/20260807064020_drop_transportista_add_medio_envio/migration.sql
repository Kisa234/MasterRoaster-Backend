/*
  Warnings:

  - You are about to drop the column `id_transportista` on the `Envio` table. All the data in the column will be lost.
  - You are about to drop the `Transportista` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Envio" DROP CONSTRAINT "Envio_id_transportista_fkey";

-- AlterTable
ALTER TABLE "Envio" DROP COLUMN "id_transportista",
ADD COLUMN     "medio_envio" TEXT;

-- DropTable
DROP TABLE "Transportista";
