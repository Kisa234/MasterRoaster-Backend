/*
  Warnings:

  - A unique constraint covering the columns `[documento_identidad]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Muestra" ADD COLUMN     "completado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departamento" TEXT,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "documento_identidad" TEXT,
ADD COLUMN     "documento_tipo" TEXT,
ADD COLUMN     "fecha_nacimiento" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_documento_identidad_key" ON "User"("documento_identidad");
