/*
  Warnings:

  - The `molienda` column on the `Pedido` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `categoria` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `id_categoria` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "molienda",
ADD COLUMN     "molienda" "Molienda";

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "categoria",
ADD COLUMN     "id_categoria" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Categoria" (
    "id_categoria" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
