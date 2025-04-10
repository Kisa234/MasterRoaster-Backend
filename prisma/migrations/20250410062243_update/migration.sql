-- DropForeignKey
ALTER TABLE "Muestra" DROP CONSTRAINT "Muestra_analisis_id_fkey";

-- DropForeignKey
ALTER TABLE "Muestra" DROP CONSTRAINT "Muestra_user_id_fkey";

-- AlterTable
ALTER TABLE "Muestra" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "analisis_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_analisis_id_fkey" FOREIGN KEY ("analisis_id") REFERENCES "Analisis"("id_analisis") ON DELETE SET NULL ON UPDATE CASCADE;
