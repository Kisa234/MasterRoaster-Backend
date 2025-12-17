-- DropForeignKey
ALTER TABLE "FichaEnvio" DROP CONSTRAINT "FichaEnvio_id_envio_fkey";

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "altura" INTEGER,
ADD COLUMN     "costo" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "facturado" BOOLEAN;

-- AddForeignKey
ALTER TABLE "FichaEnvio" ADD CONSTRAINT "FichaEnvio_id_envio_fkey" FOREIGN KEY ("id_envio") REFERENCES "Envio"("id_envio") ON DELETE RESTRICT ON UPDATE CASCADE;
