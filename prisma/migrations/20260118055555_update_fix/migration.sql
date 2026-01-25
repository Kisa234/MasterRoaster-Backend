/*
  Warnings:

  - You are about to drop the column `modulo` on the `Historial` table. All the data in the column will be lost.
  - Added the required column `modulo` to the `Permiso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Historial" DROP COLUMN "modulo";

-- AlterTable
ALTER TABLE "Permiso" ADD COLUMN     "modulo" TEXT NOT NULL;
