-- DropForeignKey
ALTER TABLE "Tueste" DROP CONSTRAINT "Tueste_id_analisis_rapido_fkey";

-- AlterTable
ALTER TABLE "Tueste" ADD COLUMN     "estado_tueste" TEXT NOT NULL DEFAULT 'Pendiente',
ADD COLUMN     "id_lote_tostado" TEXT,
ALTER COLUMN "temperatura_entrada" DROP NOT NULL,
ALTER COLUMN "llama_inicial" DROP NOT NULL,
ALTER COLUMN "aire_inicial" DROP NOT NULL,
ALTER COLUMN "punto_no_retorno" DROP NOT NULL,
ALTER COLUMN "tiempo_despues_crack" DROP NOT NULL,
ALTER COLUMN "temperatura_crack" DROP NOT NULL,
ALTER COLUMN "temperatura_salida" DROP NOT NULL,
ALTER COLUMN "tiempo_total" DROP NOT NULL,
ALTER COLUMN "porcentaje_caramelizacion" DROP NOT NULL,
ALTER COLUMN "desarrollo" DROP NOT NULL,
ALTER COLUMN "grados_desarrollo" DROP NOT NULL,
ALTER COLUMN "peso_salida" DROP NOT NULL,
ALTER COLUMN "merma" DROP NOT NULL,
ALTER COLUMN "agtrom_comercial" DROP NOT NULL,
ALTER COLUMN "agtrom_gourmet" DROP NOT NULL,
ALTER COLUMN "id_analisis_rapido" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_analisis_rapido_fkey" FOREIGN KEY ("id_analisis_rapido") REFERENCES "AnalisisRapido"("id_analisis_rapido") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;
