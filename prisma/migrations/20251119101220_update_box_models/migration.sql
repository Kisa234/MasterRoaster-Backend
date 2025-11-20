/*
  Warnings:

  - Added the required column `tueste_1` to the `BoxRespuesta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tueste_2` to the `BoxRespuesta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tueste_3` to the `BoxRespuesta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BoxOpcion" ADD COLUMN     "tuestes" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "BoxRespuesta" ADD COLUMN     "tueste_1" TEXT NOT NULL,
ADD COLUMN     "tueste_2" TEXT NOT NULL,
ADD COLUMN     "tueste_3" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BoxTemplate" ADD COLUMN     "tueste_fijo_1" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tueste_fijo_2" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AddForeignKey
ALTER TABLE "BoxTemplate" ADD CONSTRAINT "BoxTemplate_cafe_fijo_1_fkey" FOREIGN KEY ("cafe_fijo_1") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxTemplate" ADD CONSTRAINT "BoxTemplate_cafe_fijo_2_fkey" FOREIGN KEY ("cafe_fijo_2") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxOpcion" ADD CONSTRAINT "BoxOpcion_id_cafe_fkey" FOREIGN KEY ("id_cafe") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxRespuesta" ADD CONSTRAINT "BoxRespuesta_id_cafe_elegido_fkey" FOREIGN KEY ("id_cafe_elegido") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;
