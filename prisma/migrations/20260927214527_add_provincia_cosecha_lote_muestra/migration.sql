-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "anio_cosecha" INTEGER,
ADD COLUMN     "provincia" TEXT;

-- AlterTable
ALTER TABLE "Muestra" ADD COLUMN     "altura" INTEGER,
ADD COLUMN     "anio_cosecha" INTEGER,
ADD COLUMN     "provincia" TEXT;
