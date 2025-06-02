-- CreateTable
CREATE TABLE "HistorialLoteAnalisis" (
    "id" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "id_analisis" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistorialLoteAnalisis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HistorialLoteAnalisis_id_lote_id_analisis_key" ON "HistorialLoteAnalisis"("id_lote", "id_analisis");

-- AddForeignKey
ALTER TABLE "HistorialLoteAnalisis" ADD CONSTRAINT "HistorialLoteAnalisis_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialLoteAnalisis" ADD CONSTRAINT "HistorialLoteAnalisis_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;
