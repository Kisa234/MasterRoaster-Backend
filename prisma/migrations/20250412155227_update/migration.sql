/*
  Warnings:

  - You are about to drop the column `nombre` on the `Muestra` table. All the data in the column will be lost.
  - Added the required column `comentario` to the `Analisis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `Muestra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_compra` to the `Muestra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finca` to the `Muestra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proceso` to the `Muestra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productor` to the `Muestra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Muestra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variedades` to the `Muestra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analisis" ADD COLUMN     "comentario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Muestra" DROP COLUMN "nombre",
ADD COLUMN     "departamento" TEXT NOT NULL,
ADD COLUMN     "fecha_compra" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finca" TEXT NOT NULL,
ADD COLUMN     "proceso" TEXT NOT NULL,
ADD COLUMN     "productor" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "variedades" TEXT NOT NULL;
