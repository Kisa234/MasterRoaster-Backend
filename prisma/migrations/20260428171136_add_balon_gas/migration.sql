-- CreateEnum
CREATE TYPE "EstadoBalonGas" AS ENUM ('DISPONIBLE', 'EN_USO', 'FINALIZADO');

-- CreateTable
CREATE TABLE "BalonGas" (
    "id_balon_gas" TEXT NOT NULL,
    "codigo" TEXT,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,
    "fecha_inicio_uso" TIMESTAMP(3),
    "fecha_fin_uso" TIMESTAMP(3),
    "id_tueste_inicio" TEXT,
    "id_tueste_fin" TEXT,
    "estado" "EstadoBalonGas" NOT NULL DEFAULT 'DISPONIBLE',
    "peso_kg" DOUBLE PRECISION,
    "comentario" TEXT,
    "id_user_ingreso" TEXT NOT NULL,
    "id_user_inicio_uso" TEXT,
    "id_user_fin_uso" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BalonGas_pkey" PRIMARY KEY ("id_balon_gas")
);

-- CreateIndex
CREATE UNIQUE INDEX "BalonGas_codigo_key" ON "BalonGas"("codigo");

-- AddForeignKey
ALTER TABLE "BalonGas" ADD CONSTRAINT "BalonGas_id_tueste_inicio_fkey" FOREIGN KEY ("id_tueste_inicio") REFERENCES "Tueste"("id_tueste") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalonGas" ADD CONSTRAINT "BalonGas_id_tueste_fin_fkey" FOREIGN KEY ("id_tueste_fin") REFERENCES "Tueste"("id_tueste") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalonGas" ADD CONSTRAINT "BalonGas_id_user_ingreso_fkey" FOREIGN KEY ("id_user_ingreso") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalonGas" ADD CONSTRAINT "BalonGas_id_user_inicio_uso_fkey" FOREIGN KEY ("id_user_inicio_uso") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalonGas" ADD CONSTRAINT "BalonGas_id_user_fin_uso_fkey" FOREIGN KEY ("id_user_fin_uso") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
