-- CreateTable
CREATE TABLE "Notas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentId" TEXT,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Notas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notas" ADD CONSTRAINT "Notas_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Notas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
