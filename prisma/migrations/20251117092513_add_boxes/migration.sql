-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cant_suscripcion" INTEGER DEFAULT 0,
ADD COLUMN     "suscripcion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tuestes" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "BoxTemplate" (
    "id_box_template" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cafe_fijo_1" TEXT NOT NULL,
    "cafe_fijo_2" TEXT NOT NULL,

    CONSTRAINT "BoxTemplate_pkey" PRIMARY KEY ("id_box_template")
);

-- CreateTable
CREATE TABLE "BoxOpcion" (
    "id_opcion" TEXT NOT NULL,
    "id_box_template" TEXT NOT NULL,
    "id_cafe" TEXT NOT NULL,

    CONSTRAINT "BoxOpcion_pkey" PRIMARY KEY ("id_opcion")
);

-- CreateTable
CREATE TABLE "BoxRespuesta" (
    "id_respuesta" TEXT NOT NULL,
    "id_box_template" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "molienda_1" "Molienda" NOT NULL,
    "molienda_2" "Molienda" NOT NULL,
    "id_cafe_elegido" TEXT NOT NULL,
    "molienda_3" "Molienda" NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoxRespuesta_pkey" PRIMARY KEY ("id_respuesta")
);

-- AddForeignKey
ALTER TABLE "BoxOpcion" ADD CONSTRAINT "BoxOpcion_id_box_template_fkey" FOREIGN KEY ("id_box_template") REFERENCES "BoxTemplate"("id_box_template") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxRespuesta" ADD CONSTRAINT "BoxRespuesta_id_box_template_fkey" FOREIGN KEY ("id_box_template") REFERENCES "BoxTemplate"("id_box_template") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoxRespuesta" ADD CONSTRAINT "BoxRespuesta_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
