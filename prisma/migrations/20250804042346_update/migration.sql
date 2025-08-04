-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "proveedor" TEXT,
ALTER COLUMN "productor" DROP NOT NULL,
ALTER COLUMN "finca" DROP NOT NULL,
ALTER COLUMN "region" DROP NOT NULL,
ALTER COLUMN "departamento" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Muestra" ADD COLUMN     "nombre_muestra" TEXT;
