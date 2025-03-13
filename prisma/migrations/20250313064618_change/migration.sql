/*
  Warnings:

  - You are about to drop the column `lote_id` on the `Analisis` table. All the data in the column will be lost.
  - You are about to drop the column `muestra_id` on the `Analisis` table. All the data in the column will be lost.
  - You are about to drop the column `analisis_id` on the `AnalisisFisico` table. All the data in the column will be lost.
  - You are about to drop the column `tueste_id` on the `AnalisisRapido` table. All the data in the column will be lost.
  - You are about to drop the column `analisis_id` on the `AnalisisSensorial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[analisisFisico_id]` on the table `Analisis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[analisisSensorial_id]` on the table `Analisis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[analisis_id]` on the table `Lote` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[analisis_id]` on the table `Muestra` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_analisis_rapido]` on the table `Tueste` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `analisis_id` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `analisis_id` to the `Muestra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_analisis_rapido` to the `Tueste` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Analisis" DROP CONSTRAINT "Analisis_lote_id_fkey";

-- DropForeignKey
ALTER TABLE "Analisis" DROP CONSTRAINT "Analisis_muestra_id_fkey";

-- DropForeignKey
ALTER TABLE "AnalisisFisico" DROP CONSTRAINT "AnalisisFisico_analisis_id_fkey";

-- DropForeignKey
ALTER TABLE "AnalisisRapido" DROP CONSTRAINT "AnalisisRapido_tueste_id_fkey";

-- DropForeignKey
ALTER TABLE "AnalisisSensorial" DROP CONSTRAINT "AnalisisSensorial_analisis_id_fkey";

-- DropIndex
DROP INDEX "Analisis_lote_id_key";

-- DropIndex
DROP INDEX "Analisis_muestra_id_key";

-- DropIndex
DROP INDEX "AnalisisFisico_analisis_id_key";

-- DropIndex
DROP INDEX "AnalisisRapido_tueste_id_key";

-- DropIndex
DROP INDEX "AnalisisSensorial_analisis_id_key";

-- AlterTable
ALTER TABLE "Analisis" DROP COLUMN "lote_id",
DROP COLUMN "muestra_id",
ADD COLUMN     "analisisFisico_id" TEXT,
ADD COLUMN     "analisisSensorial_id" TEXT;

-- AlterTable
ALTER TABLE "AnalisisFisico" DROP COLUMN "analisis_id";

-- AlterTable
ALTER TABLE "AnalisisRapido" DROP COLUMN "tueste_id";

-- AlterTable
ALTER TABLE "AnalisisSensorial" DROP COLUMN "analisis_id";

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "analisis_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Muestra" ADD COLUMN     "analisis_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tueste" ADD COLUMN     "id_analisis_rapido" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisFisico_id_key" ON "Analisis"("analisisFisico_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisSensorial_id_key" ON "Analisis"("analisisSensorial_id");

-- CreateIndex
CREATE UNIQUE INDEX "Lote_analisis_id_key" ON "Lote"("analisis_id");

-- CreateIndex
CREATE UNIQUE INDEX "Muestra_analisis_id_key" ON "Muestra"("analisis_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tueste_id_analisis_rapido_key" ON "Tueste"("id_analisis_rapido");

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_analisis_id_fkey" FOREIGN KEY ("analisis_id") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_analisis_id_fkey" FOREIGN KEY ("analisis_id") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_analisis_rapido_fkey" FOREIGN KEY ("id_analisis_rapido") REFERENCES "AnalisisRapido"("id_analisis_rapido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisFisico_id_fkey" FOREIGN KEY ("analisisFisico_id") REFERENCES "AnalisisFisico"("id_analisis_fisico") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisSensorial_id_fkey" FOREIGN KEY ("analisisSensorial_id") REFERENCES "AnalisisSensorial"("id_analisis_sensorial") ON DELETE SET NULL ON UPDATE CASCADE;
