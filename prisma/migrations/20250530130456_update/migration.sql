/*
  Warnings:

  - You are about to drop the `HistorialLoteAnalisis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistorialLoteAnalisis" DROP CONSTRAINT "HistorialLoteAnalisis_id_analisis_fkey";

-- DropForeignKey
ALTER TABLE "HistorialLoteAnalisis" DROP CONSTRAINT "HistorialLoteAnalisis_id_lote_fkey";

-- DropTable
DROP TABLE "HistorialLoteAnalisis";

-- CreateTable
CREATE TABLE "Lote_Analisis" (
    "id" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "id_analisis" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lote_Analisis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lote_Analisis_id_lote_id_analisis_key" ON "Lote_Analisis"("id_lote", "id_analisis");

-- AddForeignKey
ALTER TABLE "Lote_Analisis" ADD CONSTRAINT "Lote_Analisis_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote_Analisis" ADD CONSTRAINT "Lote_Analisis_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;
