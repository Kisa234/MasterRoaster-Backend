/*
  Warnings:

  - You are about to drop the column `fecha_compra` on the `Lote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lote" DROP CONSTRAINT "Lote_analisis_id_fkey";

-- DropForeignKey
ALTER TABLE "Lote" DROP CONSTRAINT "Lote_user_id_fkey";

-- AlterTable
ALTER TABLE "Lote" DROP COLUMN "fecha_compra",
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "analisis_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_analisis_id_fkey" FOREIGN KEY ("analisis_id") REFERENCES "Analisis"("id_analisis") ON DELETE SET NULL ON UPDATE CASCADE;
