/*
  Warnings:

  - Added the required column `modulo` to the `Historial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Historial" ADD COLUMN     "modulo" TEXT NOT NULL;
