/*
  Warnings:

  - You are about to drop the column `descripcion` on the `Analisis_Defectos` table. All the data in the column will be lost.
  - You are about to drop the column `gravedad` on the `Analisis_Defectos` table. All the data in the column will be lost.
  - You are about to drop the column `id_analisis` on the `Analisis_Defectos` table. All the data in the column will be lost.
  - The `tipo_defecto` column on the `Analisis_Defectos` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[analisisDefectos_id]` on the table `Analisis` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Analisis_Defectos" DROP CONSTRAINT "Analisis_Defectos_id_analisis_fkey";

-- AlterTable
ALTER TABLE "Analisis" ADD COLUMN     "analisisDefectos_id" TEXT;

-- AlterTable
ALTER TABLE "Analisis_Defectos" DROP COLUMN "descripcion",
DROP COLUMN "gravedad",
DROP COLUMN "id_analisis",
ADD COLUMN     "cantidad" INTEGER[],
ADD COLUMN     "eliminado" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "tipo_defecto",
ADD COLUMN     "tipo_defecto" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisDefectos_id_key" ON "Analisis"("analisisDefectos_id");

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisDefectos_id_fkey" FOREIGN KEY ("analisisDefectos_id") REFERENCES "Analisis_Defectos"("id_analisis_defecto") ON DELETE SET NULL ON UPDATE CASCADE;
