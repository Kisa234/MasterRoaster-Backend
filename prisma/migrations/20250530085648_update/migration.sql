-- DropForeignKey
ALTER TABLE "Lote" DROP CONSTRAINT "Lote_id_analisis_fkey";

-- CreateTable
CREATE TABLE "_AnalisisLotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnalisisLotes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnalisisLotes_B_index" ON "_AnalisisLotes"("B");

-- AddForeignKey
ALTER TABLE "_AnalisisLotes" ADD CONSTRAINT "_AnalisisLotes_A_fkey" FOREIGN KEY ("A") REFERENCES "Analisis"("id_analisis") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalisisLotes" ADD CONSTRAINT "_AnalisisLotes_B_fkey" FOREIGN KEY ("B") REFERENCES "Lote"("id_lote") ON DELETE CASCADE ON UPDATE CASCADE;
