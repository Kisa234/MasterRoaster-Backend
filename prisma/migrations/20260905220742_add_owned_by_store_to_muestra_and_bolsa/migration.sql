-- AlterTable
ALTER TABLE "Bolsa" ADD COLUMN     "owned_by_store" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Muestra" ADD COLUMN     "owned_by_store" BOOLEAN NOT NULL DEFAULT false;
