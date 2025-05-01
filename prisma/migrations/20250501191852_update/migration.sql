/*
  Warnings:

  - Added the required column `densidad` to the `Tueste` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humedad` to the `Tueste` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tueste" ADD COLUMN     "densidad" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "humedad" DOUBLE PRECISION NOT NULL;
