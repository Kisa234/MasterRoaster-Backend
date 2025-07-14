/*
  Warnings:

  - You are about to drop the column `arrebatado` on the `AnalisisRapido` table. All the data in the column will be lost.
  - You are about to drop the column `horneado` on the `AnalisisRapido` table. All the data in the column will be lost.
  - You are about to drop the column `humo` on the `AnalisisRapido` table. All the data in the column will be lost.
  - You are about to drop the column `oscuro` on the `AnalisisRapido` table. All the data in the column will be lost.
  - You are about to drop the column `uniforme` on the `AnalisisRapido` table. All the data in the column will be lost.
  - You are about to drop the column `verde` on the `AnalisisRapido` table. All the data in the column will be lost.
  - Added the required column `Aroma` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acido` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acido_fermentado` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `afrutado` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `azucar_morena` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bayas` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citricos` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cocoa` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dulce` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especias` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fermentado` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floral` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fragancia` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frutos_secos` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nueces` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nueces_cacao` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `otros` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `papel` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quimico` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rancio` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tierra` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tostado` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vainilla` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verde_vegetal` to the `AnalisisRapido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalisisRapido" DROP COLUMN "arrebatado",
DROP COLUMN "horneado",
DROP COLUMN "humo",
DROP COLUMN "oscuro",
DROP COLUMN "uniforme",
DROP COLUMN "verde",
ADD COLUMN     "Aroma" TEXT NOT NULL,
ADD COLUMN     "acido" BOOLEAN NOT NULL,
ADD COLUMN     "acido_fermentado" BOOLEAN NOT NULL,
ADD COLUMN     "afrutado" BOOLEAN NOT NULL,
ADD COLUMN     "azucar_morena" BOOLEAN NOT NULL,
ADD COLUMN     "bayas" BOOLEAN NOT NULL,
ADD COLUMN     "citricos" BOOLEAN NOT NULL,
ADD COLUMN     "cocoa" BOOLEAN NOT NULL,
ADD COLUMN     "dulce" BOOLEAN NOT NULL,
ADD COLUMN     "especias" BOOLEAN NOT NULL,
ADD COLUMN     "fermentado" BOOLEAN NOT NULL,
ADD COLUMN     "floral" BOOLEAN NOT NULL,
ADD COLUMN     "fragancia" TEXT NOT NULL,
ADD COLUMN     "frutos_secos" BOOLEAN NOT NULL,
ADD COLUMN     "nueces" BOOLEAN NOT NULL,
ADD COLUMN     "nueces_cacao" BOOLEAN NOT NULL,
ADD COLUMN     "otros" BOOLEAN NOT NULL,
ADD COLUMN     "papel" BOOLEAN NOT NULL,
ADD COLUMN     "quimico" BOOLEAN NOT NULL,
ADD COLUMN     "rancio" BOOLEAN NOT NULL,
ADD COLUMN     "tierra" BOOLEAN NOT NULL,
ADD COLUMN     "tostado" BOOLEAN NOT NULL,
ADD COLUMN     "vainilla" BOOLEAN NOT NULL,
ADD COLUMN     "verde_vegetal" BOOLEAN NOT NULL;
