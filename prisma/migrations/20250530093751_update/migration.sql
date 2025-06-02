/*
  Warnings:

  - You are about to drop the `_AnalisisLotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnalisisLotes" DROP CONSTRAINT "_AnalisisLotes_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnalisisLotes" DROP CONSTRAINT "_AnalisisLotes_B_fkey";

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "id_analisis" TEXT;

-- DropTable
DROP TABLE "_AnalisisLotes";

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE SET NULL ON UPDATE CASCADE;
