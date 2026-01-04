/*
  Warnings:

  - You are about to drop the column `cambios` on the `Historial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Historial" DROP COLUMN "cambios",
ADD COLUMN     "objeto_antes" JSONB;
