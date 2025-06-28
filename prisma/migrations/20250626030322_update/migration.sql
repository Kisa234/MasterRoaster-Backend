/*
  Warnings:

  - You are about to drop the column `defectos_primarios` on the `AnalisisFisico` table. All the data in the column will be lost.
  - You are about to drop the column `defectos_secundarios` on the `AnalisisFisico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnalisisFisico" DROP COLUMN "defectos_primarios",
DROP COLUMN "defectos_secundarios";

-- CreateTable
CREATE TABLE "Analisis_Defectos" (
    "id_analisis_defecto" TEXT NOT NULL,
    "id_analisis" TEXT NOT NULL,
    "tipo_defecto" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "gravedad" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analisis_Defectos_pkey" PRIMARY KEY ("id_analisis_defecto")
);

-- AddForeignKey
ALTER TABLE "Analisis_Defectos" ADD CONSTRAINT "Analisis_Defectos_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;
