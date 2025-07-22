/*
  Warnings:

  - You are about to drop the column `menor_malla_16` on the `AnalisisFisico` table. All the data in the column will be lost.
  - Added the required column `menor_malla_14` to the `AnalisisFisico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalisisFisico" DROP COLUMN "menor_malla_16",
ADD COLUMN     "menor_malla_14" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "LoteTostado" ADD COLUMN     "entregado" TIMESTAMP(3);
