-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "eliminado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_editado" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Muestra" (
    "id_muestra" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Muestra_pkey" PRIMARY KEY ("id_muestra")
);

-- CreateTable
CREATE TABLE "Lote" (
    "id_lote" TEXT NOT NULL,
    "productor" TEXT NOT NULL,
    "finca" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "estado" TEXT NOT NULL,
    "variedades" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pedido_id" TEXT,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id_lote")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id_pedido" TEXT NOT NULL,
    "fecha_pedido" TIMESTAMP(3) NOT NULL,
    "tipo_tueste" TEXT NOT NULL,
    "cantidad_tostado" DOUBLE PRECISION NOT NULL,
    "estado_pedido" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "asignado_a_id" TEXT,
    "fecha_asignacion" TIMESTAMP(3),

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "Tueste" (
    "id_tueste" TEXT NOT NULL,
    "fecha_tueste" TIMESTAMP(3) NOT NULL,
    "tostadora" TEXT NOT NULL,
    "peso_entrada" DOUBLE PRECISION NOT NULL,
    "temperatura_entrada" DOUBLE PRECISION NOT NULL,
    "llama_inicial" DOUBLE PRECISION NOT NULL,
    "aire_inicial" DOUBLE PRECISION NOT NULL,
    "punto_no_retorno" DOUBLE PRECISION NOT NULL,
    "tiempo_despues_crack" DOUBLE PRECISION NOT NULL,
    "temperatura_crack" DOUBLE PRECISION NOT NULL,
    "temperatura_salida" DOUBLE PRECISION NOT NULL,
    "tiempo_total" DOUBLE PRECISION NOT NULL,
    "porcentaje_caramelizacion" DOUBLE PRECISION NOT NULL,
    "desarrollo" DOUBLE PRECISION NOT NULL,
    "grados_desarrollo" DOUBLE PRECISION NOT NULL,
    "peso_salida" DOUBLE PRECISION NOT NULL,
    "merma" DOUBLE PRECISION NOT NULL,
    "agtrom_comercial" DOUBLE PRECISION NOT NULL,
    "agtrom_gourmet" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tueste_pkey" PRIMARY KEY ("id_tueste")
);

-- CreateTable
CREATE TABLE "Analisis" (
    "id_analisis" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "muestra_id" TEXT NOT NULL,
    "lote_id" TEXT NOT NULL,

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
    "analisis_id" TEXT NOT NULL,

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
    "analisis_id" TEXT NOT NULL,

    CONSTRAINT "AnalisisSensorial_pkey" PRIMARY KEY ("id_analisis_sensorial")
);

-- CreateTable
CREATE TABLE "AnalisisRapido" (
    "id_analisis_rapido" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "horneado" BOOLEAN NOT NULL,
    "humo" BOOLEAN NOT NULL,
    "uniforme" BOOLEAN NOT NULL,
    "verde" BOOLEAN NOT NULL,
    "arrebatado" BOOLEAN NOT NULL,
    "oscuro" BOOLEAN NOT NULL,
    "comentario" TEXT,
    "tueste_id" TEXT NOT NULL,

    CONSTRAINT "AnalisisRapido_pkey" PRIMARY KEY ("id_analisis_rapido")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_muestra_id_key" ON "Analisis"("muestra_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analisis_lote_id_key" ON "Analisis"("lote_id");

-- CreateIndex
CREATE UNIQUE INDEX "AnalisisFisico_analisis_id_key" ON "AnalisisFisico"("analisis_id");

-- CreateIndex
CREATE UNIQUE INDEX "AnalisisSensorial_analisis_id_key" ON "AnalisisSensorial"("analisis_id");

-- CreateIndex
CREATE UNIQUE INDEX "AnalisisRapido_tueste_id_key" ON "AnalisisRapido"("tueste_id");

-- AddForeignKey
ALTER TABLE "Muestra" ADD CONSTRAINT "Muestra_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_asignado_a_id_fkey" FOREIGN KEY ("asignado_a_id") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "Lote"("id_lote") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analisis" ADD CONSTRAINT "Analisis_muestra_id_fkey" FOREIGN KEY ("muestra_id") REFERENCES "Muestra"("id_muestra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisFisico" ADD CONSTRAINT "AnalisisFisico_analisis_id_fkey" FOREIGN KEY ("analisis_id") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisSensorial" ADD CONSTRAINT "AnalisisSensorial_analisis_id_fkey" FOREIGN KEY ("analisis_id") REFERENCES "Analisis"("id_analisis") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisRapido" ADD CONSTRAINT "AnalisisRapido_tueste_id_fkey" FOREIGN KEY ("tueste_id") REFERENCES "Tueste"("id_tueste") ON DELETE RESTRICT ON UPDATE CASCADE;
