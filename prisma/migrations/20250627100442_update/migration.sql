/*
  Warnings:

  - You are about to drop the column `cantidad` on the `AnalisisDefectos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_defecto` on the `AnalisisDefectos` table. All the data in the column will be lost.
  - You are about to drop the column `grado` on the `AnalisisFisico` table. All the data in the column will be lost.
  - Added the required column `agrio_parcial` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averanado` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `broca_leva` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `broca_severa` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cascara_pulpa_seca` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cereza_seca` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conchas` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flotadores` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grano_agrio` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grano_con_hongos` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grano_negro` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inmaduro` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materia_estrana` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `negro_parcial` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partido_mordido_cortado` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pergamino` to the `AnalisisDefectos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalisisDefectos" DROP COLUMN "cantidad",
DROP COLUMN "tipo_defecto",
ADD COLUMN     "agrio_parcial" INTEGER NOT NULL,
ADD COLUMN     "averanado" INTEGER NOT NULL,
ADD COLUMN     "broca_leva" INTEGER NOT NULL,
ADD COLUMN     "broca_severa" INTEGER NOT NULL,
ADD COLUMN     "cascara_pulpa_seca" INTEGER NOT NULL,
ADD COLUMN     "cereza_seca" INTEGER NOT NULL,
ADD COLUMN     "conchas" INTEGER NOT NULL,
ADD COLUMN     "flotadores" INTEGER NOT NULL,
ADD COLUMN     "grano_agrio" INTEGER NOT NULL,
ADD COLUMN     "grano_con_hongos" INTEGER NOT NULL,
ADD COLUMN     "grano_negro" INTEGER NOT NULL,
ADD COLUMN     "inmaduro" INTEGER NOT NULL,
ADD COLUMN     "materia_estrana" INTEGER NOT NULL,
ADD COLUMN     "negro_parcial" INTEGER NOT NULL,
ADD COLUMN     "partido_mordido_cortado" INTEGER NOT NULL,
ADD COLUMN     "pergamino" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnalisisFisico" DROP COLUMN "grado";
