/*
  Warnings:

  - You are about to drop the column `fecha` on the `AnalisisRapido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnalisisRapido" DROP COLUMN "fecha",
ADD COLUMN     "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
