/*
  Warnings:

  - You are about to drop the column `id_analisis_rapido` on the `Tueste` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_analisis_rapido]` on the table `LoteTostado` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Tueste" DROP CONSTRAINT "Tueste_id_analisis_rapido_fkey";

-- DropIndex
DROP INDEX "Tueste_id_analisis_rapido_key";

-- AlterTable
ALTER TABLE "LoteTostado" ADD COLUMN     "id_analisis_rapido" TEXT;

-- AlterTable
ALTER TABLE "Tueste" DROP COLUMN "id_analisis_rapido";

-- CreateTable
CREATE TABLE "Muestra_Analisis" (
    "id" TEXT NOT NULL,
    "id_muestra" TEXT NOT NULL,
    "id_analisis" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Muestra_Analisis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Muestra_Analisis_id_muestra_id_analisis_key" ON "Muestra_Analisis"("id_muestra", "id_analisis");

-- CreateIndex
CREATE UNIQUE INDEX "LoteTostado_id_analisis_rapido_key" ON "LoteTostado"("id_analisis_rapido");

-- AddForeignKey
ALTER TABLE "LoteTostado" ADD CONSTRAINT "LoteTostado_id_analisis_rapido_fkey" FOREIGN KEY ("id_analisis_rapido") REFERENCES "AnalisisRapido"("id_analisis_rapido") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muestra_Analisis" ADD CONSTRAINT "Muestra_Analisis_id_muestra_fkey" FOREIGN KEY ("id_muestra") REFERENCES "Muestra"("id_muestra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muestra_Analisis" ADD CONSTRAINT "Muestra_Analisis_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;
