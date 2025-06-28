/*
  Warnings:

  - You are about to drop the `Analisis_Defectos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Analisis" DROP CONSTRAINT "Analisis_analisisDefectos_id_fkey";

-- DropTable
DROP TABLE "Analisis_Defectos";

-- CreateTable
CREATE TABLE "AnalisisDefectos" (
    "id_analisis_defecto" TEXT NOT NULL,
    "tipo_defecto" TEXT[],
    "cantidad" INTEGER[],
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnalisisDefectos_pkey" PRIMARY KEY ("id_analisis_defecto")
);

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisDefectos_id_fkey" FOREIGN KEY ("analisisDefectos_id") REFERENCES "AnalisisDefectos"("id_analisis_defecto") ON DELETE SET NULL ON UPDATE CASCADE;
