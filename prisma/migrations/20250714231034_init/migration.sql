-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "numero_telefono" TEXT NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Muestra" (
    "id_muestra" TEXT NOT NULL,
    "productor" TEXT,
    "finca" TEXT,
    "region" TEXT,
    "departamento" TEXT,
    "peso" DOUBLE PRECISION NOT NULL,
    "variedades" TEXT[],
    "proceso" TEXT NOT NULL,
    "id_user" TEXT,
    "id_analisis" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Muestra_pkey" PRIMARY KEY ("id_muestra")
);

-- CreateTable
CREATE TABLE "Lote" (
    "id_lote" TEXT NOT NULL,
    "productor" TEXT NOT NULL,
    "finca" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "peso_tostado" DOUBLE PRECISION,
    "variedades" TEXT[],
    "proceso" TEXT NOT NULL,
    "tipo_lote" TEXT NOT NULL,
    "id_user" TEXT,
    "id_analisis" TEXT,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id_lote")
);

-- CreateTable
CREATE TABLE "LoteTostado" (
    "id_lote_tostado" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "fecha_tostado" TIMESTAMP(3) NOT NULL,
    "perfil_tostado" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,
    "id_analisis_rapido" TEXT,

    CONSTRAINT "LoteTostado_pkey" PRIMARY KEY ("id_lote_tostado")
);

-- CreateTable
CREATE TABLE "Historial" (
    "id_historial" TEXT NOT NULL,
    "entidad" TEXT NOT NULL,
    "id_entidad" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "accion" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cambios" JSONB NOT NULL,

    CONSTRAINT "Historial_pkey" PRIMARY KEY ("id_historial")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id_pedido" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_pedido" TEXT NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "estado_pedido" TEXT NOT NULL DEFAULT 'Pendiente',
    "id_user" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "id_nuevoLote" TEXT,
    "id_nuevoLote_tostado" TEXT,
    "comentario" TEXT,
    "pesos" DOUBLE PRECISION[],
    "fecha_tueste" TIMESTAMP(3),
    "tostadora" TEXT,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "Tueste" (
    "id_tueste" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "tostadora" TEXT NOT NULL,
    "id_cliente" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "densidad" DOUBLE PRECISION NOT NULL,
    "humedad" DOUBLE PRECISION NOT NULL,
    "peso_entrada" DOUBLE PRECISION NOT NULL,
    "fecha_tueste" TIMESTAMP(3) NOT NULL,
    "temperatura_entrada" DOUBLE PRECISION,
    "llama_inicial" DOUBLE PRECISION,
    "aire_inicial" DOUBLE PRECISION,
    "punto_no_retorno" DOUBLE PRECISION,
    "tiempo_despues_crack" DOUBLE PRECISION,
    "temperatura_crack" DOUBLE PRECISION,
    "temperatura_salida" DOUBLE PRECISION,
    "tiempo_total" DOUBLE PRECISION,
    "porcentaje_caramelizacion" DOUBLE PRECISION,
    "desarrollo" DOUBLE PRECISION,
    "grados_desarrollo" DOUBLE PRECISION,
    "peso_salida" DOUBLE PRECISION,
    "merma" DOUBLE PRECISION,
    "agtrom_comercial" DOUBLE PRECISION,
    "agtrom_gourmet" DOUBLE PRECISION,
    "estado_tueste" TEXT NOT NULL DEFAULT 'Pendiente',
    "id_lote_tostado" TEXT,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tueste_pkey" PRIMARY KEY ("id_tueste")
);

-- CreateTable
CREATE TABLE "Lote_Analisis" (
    "id" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "id_analisis" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lote_Analisis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muestra_Analisis" (
    "id" TEXT NOT NULL,
    "id_muestra" TEXT NOT NULL,
    "id_analisis" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Muestra_Analisis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analisis" (
    "id_analisis" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "analisisFisico_id" TEXT,
    "analisisSensorial_id" TEXT,
    "analisisDefectos_id" TEXT,
    "comentario" TEXT,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Analisis_pkey" PRIMARY KEY ("id_analisis")
);

-- CreateTable
CREATE TABLE "AnalisisFisico" (
    "id_analisis_fisico" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "peso_muestra" DOUBLE PRECISION NOT NULL,
    "peso_pergamino" DOUBLE PRECISION NOT NULL,
    "wa" DOUBLE PRECISION NOT NULL,
    "temperatura_wa" DOUBLE PRECISION NOT NULL,
    "humedad" DOUBLE PRECISION NOT NULL,
    "temperatura_humedad" DOUBLE PRECISION NOT NULL,
    "densidad" DOUBLE PRECISION NOT NULL,
    "color_grano_verde" TEXT NOT NULL,
    "olor" TEXT NOT NULL,
    "superior_malla_18" DOUBLE PRECISION NOT NULL,
    "superior_malla_16" DOUBLE PRECISION NOT NULL,
    "superior_malla_14" DOUBLE PRECISION NOT NULL,
    "menor_malla_16" DOUBLE PRECISION NOT NULL,
    "peso_defectos" DOUBLE PRECISION NOT NULL,
    "quaquers" DOUBLE PRECISION,
    "peso_muestra_tostada" DOUBLE PRECISION,
    "desarrollo" DOUBLE PRECISION,
    "porcentaje_caramelizacion" DOUBLE PRECISION,
    "c_desarrollo" DOUBLE PRECISION,
    "comentario" TEXT NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnalisisFisico_pkey" PRIMARY KEY ("id_analisis_fisico")
);

-- CreateTable
CREATE TABLE "AnalisisDefectos" (
    "id_analisis_defecto" TEXT NOT NULL,
    "grano_negro" INTEGER NOT NULL,
    "grano_agrio" INTEGER NOT NULL,
    "grano_con_hongos" INTEGER NOT NULL,
    "cereza_seca" INTEGER NOT NULL,
    "materia_estrana" INTEGER NOT NULL,
    "broca_severa" INTEGER NOT NULL,
    "negro_parcial" INTEGER NOT NULL,
    "agrio_parcial" INTEGER NOT NULL,
    "pergamino" INTEGER NOT NULL,
    "flotadores" INTEGER NOT NULL,
    "inmaduro" INTEGER NOT NULL,
    "averanado" INTEGER NOT NULL,
    "conchas" INTEGER NOT NULL,
    "cascara_pulpa_seca" INTEGER NOT NULL,
    "partido_mordido_cortado" INTEGER NOT NULL,
    "broca_leva" INTEGER NOT NULL,
    "grado" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnalisisDefectos_pkey" PRIMARY KEY ("id_analisis_defecto")
);

-- CreateTable
CREATE TABLE "AnalisisSensorial" (
    "id_analisis_sensorial" TEXT NOT NULL,
    "fragancia_aroma" DOUBLE PRECISION NOT NULL,
    "sabor" DOUBLE PRECISION NOT NULL,
    "sabor_residual" DOUBLE PRECISION NOT NULL,
    "acidez" DOUBLE PRECISION NOT NULL,
    "cuerpo" DOUBLE PRECISION NOT NULL,
    "uniformidad" DOUBLE PRECISION NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "taza_limpia" DOUBLE PRECISION NOT NULL,
    "dulzor" DOUBLE PRECISION NOT NULL,
    "puntaje_catador" DOUBLE PRECISION NOT NULL,
    "taza_defecto_ligero" DOUBLE PRECISION NOT NULL,
    "tazas_defecto_rechazo" DOUBLE PRECISION NOT NULL,
    "puntaje_taza" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnalisisSensorial_pkey" PRIMARY KEY ("id_analisis_sensorial")
);

-- CreateTable
CREATE TABLE "AnalisisRapido" (
    "id_analisis_rapido" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fragancia" TEXT NOT NULL,
    "aroma" TEXT NOT NULL,
    "floral" BOOLEAN NOT NULL,
    "afrutado" BOOLEAN NOT NULL,
    "bayas" BOOLEAN NOT NULL,
    "frutos_secos" BOOLEAN NOT NULL,
    "citricos" BOOLEAN NOT NULL,
    "acido_fermentado" BOOLEAN NOT NULL,
    "acido" BOOLEAN NOT NULL,
    "fermentado" BOOLEAN NOT NULL,
    "verde_vegetal" BOOLEAN NOT NULL,
    "otros" BOOLEAN NOT NULL,
    "quimico" BOOLEAN NOT NULL,
    "rancio" BOOLEAN NOT NULL,
    "tierra" BOOLEAN NOT NULL,
    "papel" BOOLEAN NOT NULL,
    "tostado" BOOLEAN NOT NULL,
    "nueces_cacao" BOOLEAN NOT NULL,
    "nueces" BOOLEAN NOT NULL,
    "cocoa" BOOLEAN NOT NULL,
    "especias" BOOLEAN NOT NULL,
    "dulce" BOOLEAN NOT NULL,
    "vainilla" BOOLEAN NOT NULL,
    "azucar_morena" BOOLEAN NOT NULL,
    "comentario" TEXT,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnalisisRapido_pkey" PRIMARY KEY ("id_analisis_rapido")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LoteTostado_id_analisis_rapido_key" ON "LoteTostado"("id_analisis_rapido");

-- CreateIndex
CREATE UNIQUE INDEX "Pedido_id_nuevoLote_tostado_key" ON "Pedido"("id_nuevoLote_tostado");

-- CreateIndex
CREATE UNIQUE INDEX "Lote_Analisis_id_lote_id_analisis_key" ON "Lote_Analisis"("id_lote", "id_analisis");

-- CreateIndex
CREATE UNIQUE INDEX "Muestra_Analisis_id_muestra_id_analisis_key" ON "Muestra_Analisis"("id_muestra", "id_analisis");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisFisico_id_key" ON "Analisis"("analisisFisico_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisSensorial_id_key" ON "Analisis"("analisisSensorial_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisDefectos_id_key" ON "Analisis"("analisisDefectos_id");

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteTostado" ADD CONSTRAINT "LoteTostado_id_analisis_rapido_fkey" FOREIGN KEY ("id_analisis_rapido") REFERENCES "AnalisisRapido"("id_analisis_rapido") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteTostado" ADD CONSTRAINT "LoteTostado_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_nuevoLote_fkey" FOREIGN KEY ("id_nuevoLote") REFERENCES "Lote"("id_lote") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_nuevoLote_tostado_fkey" FOREIGN KEY ("id_nuevoLote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote_Analisis" ADD CONSTRAINT "Lote_Analisis_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote_Analisis" ADD CONSTRAINT "Lote_Analisis_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muestra_Analisis" ADD CONSTRAINT "Muestra_Analisis_id_muestra_fkey" FOREIGN KEY ("id_muestra") REFERENCES "Muestra"("id_muestra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muestra_Analisis" ADD CONSTRAINT "Muestra_Analisis_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisFisico_id_fkey" FOREIGN KEY ("analisisFisico_id") REFERENCES "AnalisisFisico"("id_analisis_fisico") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisSensorial_id_fkey" FOREIGN KEY ("analisisSensorial_id") REFERENCES "AnalisisSensorial"("id_analisis_sensorial") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisDefectos_id_fkey" FOREIGN KEY ("analisisDefectos_id") REFERENCES "AnalisisDefectos"("id_analisis_defecto") ON DELETE SET NULL ON UPDATE CASCADE;
