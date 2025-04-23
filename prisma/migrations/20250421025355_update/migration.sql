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
    "productor" TEXT NOT NULL,
    "finca" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "variedades" TEXT NOT NULL,
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
    "variedades" TEXT NOT NULL,
    "proceso" TEXT NOT NULL,
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
    "comentario" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "id_lote" TEXT NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "Tueste" (
    "id_tueste" TEXT NOT NULL,
    "fecha_tueste" TIMESTAMP(3) NOT NULL,
    "tostadora" TEXT NOT NULL,
    "peso_entrada" DOUBLE PRECISION NOT NULL,
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
    "id_analisis_rapido" TEXT,
    "id_lote_tostado" TEXT,
    "id_pedido" TEXT NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tueste_pkey" PRIMARY KEY ("id_tueste")
);

-- CreateTable
CREATE TABLE "Analisis" (
    "id_analisis" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "analisisFisico_id" TEXT,
    "analisisSensorial_id" TEXT,
    "comentario" TEXT NOT NULL,
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
    "quaquers" DOUBLE PRECISION NOT NULL,
    "peso_muestra_tostada" DOUBLE PRECISION NOT NULL,
    "desarrollo" DOUBLE PRECISION NOT NULL,
    "pocentaje_caramelizcacion" DOUBLE PRECISION NOT NULL,
    "c_desarrollo" DOUBLE PRECISION NOT NULL,
    "grado" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "defectos_primarios" TEXT[],
    "defectos_secundarios" TEXT[],
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnalisisFisico_pkey" PRIMARY KEY ("id_analisis_fisico")
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
    "horneado" BOOLEAN NOT NULL,
    "humo" BOOLEAN NOT NULL,
    "uniforme" BOOLEAN NOT NULL,
    "verde" BOOLEAN NOT NULL,
    "arrebatado" BOOLEAN NOT NULL,
    "oscuro" BOOLEAN NOT NULL,
    "comentario" TEXT,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AnalisisRapido_pkey" PRIMARY KEY ("id_analisis_rapido")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Muestra_id_analisis_key" ON "Muestra"("id_analisis");

-- CreateIndex
CREATE UNIQUE INDEX "Tueste_id_analisis_rapido_key" ON "Tueste"("id_analisis_rapido");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisFisico_id_key" ON "Analisis"("analisisFisico_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_analisisSensorial_id_key" ON "Analisis"("analisisSensorial_id");

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_id_analisis_fkey" FOREIGN KEY ("id_analisis") REFERENCES "Analisis"("id_analisis") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteTostado" ADD CONSTRAINT "LoteTostado_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_lote_fkey" FOREIGN KEY ("id_lote") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_analisis_rapido_fkey" FOREIGN KEY ("id_analisis_rapido") REFERENCES "AnalisisRapido"("id_analisis_rapido") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_lote_tostado_fkey" FOREIGN KEY ("id_lote_tostado") REFERENCES "LoteTostado"("id_lote_tostado") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tueste" ADD CONSTRAINT "Tueste_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido"("id_pedido") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisFisico_id_fkey" FOREIGN KEY ("analisisFisico_id") REFERENCES "AnalisisFisico"("id_analisis_fisico") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_analisisSensorial_id_fkey" FOREIGN KEY ("analisisSensorial_id") REFERENCES "AnalisisSensorial"("id_analisis_sensorial") ON DELETE SET NULL ON UPDATE CASCADE;
