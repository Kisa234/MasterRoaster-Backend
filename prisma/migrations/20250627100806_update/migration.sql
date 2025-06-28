/*
  Warnings:

  - Added the required column `grado` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalisisDefectos" ADD COLUMN     "grado" TEXT NOT NULL;
