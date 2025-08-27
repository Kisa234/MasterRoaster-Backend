-- CreateTable
CREATE TABLE "FichaEnvio" (
    "id_ficha" TEXT NOT NULL,
    "id_envio" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "dni" TEXT,
    "referencia" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "FichaEnvio_pkey" PRIMARY KEY ("id_ficha")
);

-- CreateIndex
CREATE UNIQUE INDEX "FichaEnvio_id_envio_key" ON "FichaEnvio"("id_envio");

-- AddForeignKey
ALTER TABLE "FichaEnvio" ADD CONSTRAINT "FichaEnvio_id_envio_fkey" FOREIGN KEY ("id_envio") REFERENCES "Envio"("id_envio") ON DELETE CASCADE ON UPDATE NO ACTION;
