/*
  Warnings:

  - You are about to drop the column `cliente_id` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_cliente_id_fkey";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "cliente_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
