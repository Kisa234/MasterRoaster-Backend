/*
  Warnings:

  - Made the column `clasificacion` on table `Envio` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Envio" ALTER COLUMN "clasificacion" SET NOT NULL;
