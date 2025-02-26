/*
  Warnings:

  - You are about to drop the column `tostador` on the `User` table. All the data in the column will be lost.
  - Changed the type of `color_grano_verde` on the `analisis_fisico` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `olor` on the `analisis_fisico` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `grado` on the `analisis_fisico` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OLOR" AS ENUM ('Olor_Extrano', 'Olor_a_Humedad', 'limpio');

-- CreateEnum
CREATE TYPE "GRADO" AS ENUM ('Especial', 'Grado_1', 'Grado_2', 'Grado_3', 'Convencional');

-- CreateEnum
CREATE TYPE "COLOR" AS ENUM ('Azul_verde', 'Azulado_Verde', 'Verde', 'Verdoso', 'Amarillo_verde', 'Amarillo_Pálido', 'Amarillento', 'Marrón');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tostador",
ALTER COLUMN "nombre" SET DATA TYPE CHAR(20),
ALTER COLUMN "email" SET DATA TYPE CHAR(20),
ALTER COLUMN "rol" SET DATA TYPE CHAR(20),
ALTER COLUMN "password" SET DATA TYPE CHAR(64);

-- AlterTable
ALTER TABLE "analisis_fisico" DROP COLUMN "color_grano_verde",
ADD COLUMN     "color_grano_verde" "COLOR" NOT NULL,
DROP COLUMN "olor",
ADD COLUMN     "olor" "OLOR" NOT NULL,
DROP COLUMN "grado",
ADD COLUMN     "grado" "GRADO" NOT NULL;

-- AlterTable
ALTER TABLE "defectos_primarios" ALTER COLUMN "nombre" SET DATA TYPE CHAR(20);

-- AlterTable
ALTER TABLE "defectos_secundarios" ALTER COLUMN "nombre" SET DATA TYPE CHAR(20);

-- AlterTable
ALTER TABLE "lote" ALTER COLUMN "productor" SET DATA TYPE CHAR(20),
ALTER COLUMN "finca" SET DATA TYPE CHAR(20),
ALTER COLUMN "region" SET DATA TYPE CHAR(20),
ALTER COLUMN "departamento" SET DATA TYPE CHAR(20),
ALTER COLUMN "estado" SET DATA TYPE CHAR(20);

-- AlterTable
ALTER TABLE "pedido" ALTER COLUMN "tipo_tueste" SET DATA TYPE CHAR(20),
ALTER COLUMN "estado_pedido" SET DATA TYPE CHAR(20);

-- AlterTable
ALTER TABLE "tueste" ALTER COLUMN "tostadora" SET DATA TYPE CHAR(20);

-- AlterTable
ALTER TABLE "variedades" ALTER COLUMN "nombre" SET DATA TYPE CHAR(20);
