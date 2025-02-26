-- CreateTable
CREATE TABLE "User" (
    "id_user" CHAR(36) NOT NULL,
    "nombre" CHAR(1) NOT NULL,
    "email" CHAR(1) NOT NULL,
    "numero_telefono" INTEGER NOT NULL,
    "rol" CHAR(1) NOT NULL,
    "tostador" CHAR(1) NOT NULL,
    "password" CHAR(1) NOT NULL,
    "fecha_registro" DATE NOT NULL,
    "fecha_editado" DATE NOT NULL,
    "eliminado" BOOLEAN NOT NULL,

    CONSTRAINT "user_pk" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "analisis" (
    "id_analisis" CHAR(36) NOT NULL,
    "analisis_fisico_id_analisis_fisico" CHAR(36) NOT NULL,
    "analisis_sensorial_id_analisis_sensorial" CHAR(36) NOT NULL,
    "muestra_id_muestra" CHAR(36) NOT NULL,
    "lote_id_lote" CHAR(36) NOT NULL,

    CONSTRAINT "analisis_pk" PRIMARY KEY ("id_analisis")
);

-- CreateTable
CREATE TABLE "analisis_defectos" (
    "id_analisis_defectos" CHAR(36) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "defectos_primarios_id_defectos_primarios" CHAR(36) NOT NULL,
    "defectos_secundarios_id_defectos_secundarios" CHAR(36) NOT NULL,
    "analisis_fisico_id_analisis_fisico" CHAR(36) NOT NULL,

    CONSTRAINT "analisis_defectos_pk" PRIMARY KEY ("id_analisis_defectos")
);

-- CreateTable
CREATE TABLE "analisis_fisico" (
    "id_analisis_fisico" CHAR(36) NOT NULL,
    "fecha_registro" DATE NOT NULL,
    "peso_muestra" INTEGER NOT NULL,
    "peso_pergamino" INTEGER NOT NULL,
    "wa" INTEGER NOT NULL,
    "temperatura_wa" INTEGER NOT NULL,
    "humedad" INTEGER NOT NULL,
    "temperatura_humedad" INTEGER NOT NULL,
    "densidad" INTEGER NOT NULL,
    "color_grano_verde" CHAR(1) NOT NULL,
    "olor" CHAR(1) NOT NULL,
    "superior_malla_18" INTEGER NOT NULL,
    "superior_malla_16" INTEGER NOT NULL,
    "superior_malla_14" INTEGER NOT NULL,
    "menor_malla_16" INTEGER NOT NULL,
    "peso_defectos" INTEGER NOT NULL,
    "quaquers" INTEGER NOT NULL,
    "peso_muestra_tostada" INTEGER NOT NULL,
    "desarrollo" INTEGER NOT NULL,
    "pocentaje_caramelizcacion" INTEGER NOT NULL,
    "c_desarrollo" INTEGER NOT NULL,
    "grado" CHAR(1) NOT NULL,
    "comentario" TEXT NOT NULL,

    CONSTRAINT "analisis_fisico_pk" PRIMARY KEY ("id_analisis_fisico")
);

-- CreateTable
CREATE TABLE "analisis_sensorial" (
    "id_analisis_sensorial" CHAR(36) NOT NULL,
    "fecha_registro" DATE NOT NULL,
    "fragancia_aroma" INTEGER NOT NULL,
    "sabor" INTEGER NOT NULL,
    "sabor_residual" INTEGER NOT NULL,
    "acidez" INTEGER NOT NULL,
    "cuerpo" INTEGER NOT NULL,
    "uniformidad" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "taza_limpia" INTEGER NOT NULL,
    "dulzor" INTEGER NOT NULL,
    "puntaje_catador" INTEGER NOT NULL,
    "taza_defecto_ligero" INTEGER NOT NULL,
    "tazas_defecto_rechazo" INTEGER NOT NULL,

    CONSTRAINT "analisis_sensorial_pk" PRIMARY KEY ("id_analisis_sensorial")
);

-- CreateTable
CREATE TABLE "analisis_sensorial_rapido" (
    "id_analisis_rapido" CHAR(36) NOT NULL,
    "fecha" DATE NOT NULL,
    "horneado" BOOLEAN NOT NULL,
    "humo" BOOLEAN NOT NULL,
    "uniforme" BOOLEAN NOT NULL,
    "verde" BOOLEAN NOT NULL,
    "arrebatado" BOOLEAN NOT NULL,
    "oscuro" BOOLEAN NOT NULL,
    "comentario" TEXT,
    "tueste_id_tueste" CHAR(36) NOT NULL,

    CONSTRAINT "analisis_sensorial_rapido_pk" PRIMARY KEY ("id_analisis_rapido")
);

-- CreateTable
CREATE TABLE "defectos_primarios" (
    "id_defectos_primarios" CHAR(36) NOT NULL,
    "nombre" CHAR(1) NOT NULL,

    CONSTRAINT "defectos_primarios_pk" PRIMARY KEY ("id_defectos_primarios")
);

-- CreateTable
CREATE TABLE "defectos_secundarios" (
    "id_defectos_secundarios" CHAR(36) NOT NULL,
    "nombre" CHAR(1) NOT NULL,

    CONSTRAINT "defectos_secundarios_pk" PRIMARY KEY ("id_defectos_secundarios")
);

-- CreateTable
CREATE TABLE "lote" (
    "id_lote" CHAR(36) NOT NULL,
    "productor" CHAR(1) NOT NULL,
    "finca" CHAR(1) NOT NULL,
    "region" CHAR(1) NOT NULL,
    "departamento" CHAR(1) NOT NULL,
    "fecha_compra" DATE NOT NULL,
    "peso" INTEGER NOT NULL,
    "estado" CHAR(1) NOT NULL,
    "variedades_id_variedad" CHAR(36) NOT NULL,
    "user_id_user" CHAR(36) NOT NULL,
    "pedido_id_pedido" CHAR(36) NOT NULL,

    CONSTRAINT "lote_pk" PRIMARY KEY ("id_lote")
);

-- CreateTable
CREATE TABLE "muestra" (
    "id_muestra" CHAR(36) NOT NULL,
    "nombre" INTEGER NOT NULL,
    "fecha_registro" DATE NOT NULL,
    "peso" INTEGER NOT NULL,
    "variedades_id_variedad" CHAR(36) NOT NULL,
    "user_id_user" CHAR(36) NOT NULL,
    "pedido_id_pedido" CHAR(36) NOT NULL,

    CONSTRAINT "muestra_pk" PRIMARY KEY ("id_muestra")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id_pedido" CHAR(36) NOT NULL,
    "fecha_pedido" DATE NOT NULL,
    "tipo_tueste" CHAR(1) NOT NULL,
    "cantidad_tostado" INTEGER NOT NULL,
    "estado_pedido" CHAR(1) NOT NULL,
    "observaciones" TEXT NOT NULL,
    "user_id_user" CHAR(36) NOT NULL,

    CONSTRAINT "pedido_pk" PRIMARY KEY ("id_pedido")
);

-- CreateTable
CREATE TABLE "tueste" (
    "id_tueste" CHAR(36) NOT NULL,
    "fecha_tueste" DATE NOT NULL,
    "tostadora" CHAR(1) NOT NULL,
    "peso_entrada" INTEGER NOT NULL,
    "temperatura_entrada" INTEGER NOT NULL,
    "llama_inicial" INTEGER NOT NULL,
    "aire_inicial" INTEGER NOT NULL,
    "punto_no_retorno" INTEGER NOT NULL,
    "tiempo_despues_crack" INTEGER NOT NULL,
    "temperatura_crack" INTEGER NOT NULL,
    "temperatura_salida" INTEGER NOT NULL,
    "tiempo_total" INTEGER NOT NULL,
    "porcentaje_caramelizacion" INTEGER NOT NULL,
    "desarrollo" INTEGER NOT NULL,
    "grados_desarrollo" INTEGER NOT NULL,
    "peso_salida" INTEGER NOT NULL,
    "merma" INTEGER NOT NULL,
    "agtrom_comercial" INTEGER NOT NULL,
    "agtrom_gourmet" INTEGER NOT NULL,
    "pedido_id_pedido" CHAR(36) NOT NULL,

    CONSTRAINT "tueste_pk" PRIMARY KEY ("id_tueste")
);

-- CreateTable
CREATE TABLE "variedades" (
    "id_variedad" CHAR(36) NOT NULL,
    "nombre" CHAR(1) NOT NULL,

    CONSTRAINT "variedades_pk" PRIMARY KEY ("id_variedad")
);

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_lote" FOREIGN KEY ("lote_id_lote") REFERENCES "lote"("id_lote") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_muestra_analisis_fisico" FOREIGN KEY ("analisis_fisico_id_analisis_fisico") REFERENCES "analisis_fisico"("id_analisis_fisico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_muestra_analisis_sensorial" FOREIGN KEY ("analisis_sensorial_id_analisis_sensorial") REFERENCES "analisis_sensorial"("id_analisis_sensorial") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_muestra_muestra" FOREIGN KEY ("muestra_id_muestra") REFERENCES "muestra"("id_muestra") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "analisis_defectos" ADD CONSTRAINT "analisis_defectos_analisis_fisico" FOREIGN KEY ("analisis_fisico_id_analisis_fisico") REFERENCES "analisis_fisico"("id_analisis_fisico") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "analisis_defectos" ADD CONSTRAINT "analisis_defectos_defectos_primarios" FOREIGN KEY ("defectos_primarios_id_defectos_primarios") REFERENCES "defectos_primarios"("id_defectos_primarios") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "analisis_defectos" ADD CONSTRAINT "analisis_defectos_defectos_secundarios" FOREIGN KEY ("defectos_secundarios_id_defectos_secundarios") REFERENCES "defectos_secundarios"("id_defectos_secundarios") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "analisis_sensorial_rapido" ADD CONSTRAINT "analisis_sensorial_rapido_tueste" FOREIGN KEY ("tueste_id_tueste") REFERENCES "tueste"("id_tueste") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lote" ADD CONSTRAINT "lote_pedido" FOREIGN KEY ("pedido_id_pedido") REFERENCES "pedido"("id_pedido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lote" ADD CONSTRAINT "lote_user" FOREIGN KEY ("user_id_user") REFERENCES "User"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lote" ADD CONSTRAINT "lote_variedades" FOREIGN KEY ("variedades_id_variedad") REFERENCES "variedades"("id_variedad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "muestra" ADD CONSTRAINT "muestra_pedido" FOREIGN KEY ("pedido_id_pedido") REFERENCES "pedido"("id_pedido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "muestra" ADD CONSTRAINT "muestra_user" FOREIGN KEY ("user_id_user") REFERENCES "User"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "muestra" ADD CONSTRAINT "muestra_variedades" FOREIGN KEY ("variedades_id_variedad") REFERENCES "variedades"("id_variedad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_user" FOREIGN KEY ("user_id_user") REFERENCES "User"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tueste" ADD CONSTRAINT "tueste_pedido" FOREIGN KEY ("pedido_id_pedido") REFERENCES "pedido"("id_pedido") ON DELETE NO ACTION ON UPDATE NO ACTION;
