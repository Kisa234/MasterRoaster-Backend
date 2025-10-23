/*
  Warnings:

  - The values [MOLIDO] on the enum `Molienda` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Molienda_new" AS ENUM ('ENTERO', 'MOLIENDA_FINA', 'MOLIENDA_MEDIA', 'MOLIENDA_GRUESA', 'NINGUNO');
ALTER TABLE "Inventario" ALTER COLUMN "molienda" DROP DEFAULT;
ALTER TABLE "Inventario" ALTER COLUMN "molienda" TYPE "Molienda_new" USING ("molienda"::text::"Molienda_new");
ALTER TYPE "Molienda" RENAME TO "Molienda_old";
ALTER TYPE "Molienda_new" RENAME TO "Molienda";
DROP TYPE "Molienda_old";
ALTER TABLE "Inventario" ALTER COLUMN "molienda" SET DEFAULT 'NINGUNO';
COMMIT;
