-- AlterTable
ALTER TABLE "LoteTostado" ADD COLUMN     "id_user" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nombre_comercial" TEXT;

-- AddForeignKey
ALTER TABLE "LoteTostado" ADD CONSTRAINT "LoteTostado_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
