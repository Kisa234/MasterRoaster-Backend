-- CreateEnum
CREATE TYPE "OrigenEnvio" AS ENUM ('LOTE_TOSTADO');

-- CreateEnum
CREATE TYPE "ClasificacionEnvio" AS ENUM ('PARCIAL', 'TOTAL');

-- CreateTable
CREATE TABLE "Envio" (
    "id_envio" TEXT NOT NULL,
    "origen" "OrigenEnvio" NOT NULL,
    "clasificacion" "ClasificacionEnvio" NOT NULL,
    "id_lote_tostado" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "comentario" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Envio_pkey" PRIMARY KEY ("id_envio")
);

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envio" ADD CONSTRAINT "Envio_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
