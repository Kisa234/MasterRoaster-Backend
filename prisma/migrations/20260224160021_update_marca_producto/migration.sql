/*
  Warnings:

  - You are about to drop the column `marca` on the `Producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "marca",
ADD COLUMN     "id_marca" TEXT;

-- CreateTable
CREATE TABLE "Marca" (
    "id_marca" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id_marca")
);

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nombre_key" ON "Marca"("nombre");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "Marca"("id_marca") ON DELETE SET NULL ON UPDATE CASCADE;
