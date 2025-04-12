-- AlterTable
ALTER TABLE "Analisis" ADD COLUMN     "eliminado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "AnalisisFisico" ADD COLUMN     "eliminado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "AnalisisRapido" ADD COLUMN     "eliminado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "AnalisisSensorial" ADD COLUMN     "eliminado" BOOLEAN NOT NULL DEFAULT false;
