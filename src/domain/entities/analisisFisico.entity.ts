
export enum OLOR{
    Olor_Extrano,
    Olor_a_Humedad,
    limpio,
}

export enum GRADO{
  Especial,
  Grado_1,
  Grado_2,
  Grado_3,
  Convencional,
}

export enum COLOR{
  Azul_verde,
  Azulado_Verde,
  Verde,
  Verdoso,
  Amarillo_verde,
  Amarillo_Pálido,
  Amarillento,
  Marrón
}

export class AnalisisFisicoEntity {
    constructor(
        public id_analisis_fisico        :string,
        public fecha_registro            :Date,
        public peso_muestra              :number,
        public peso_pergamino            :number,
        public wa                        :number,
        public temperatura_wa            :number,
        public humedad                   :number,
        public temperatura_humedad       :number,
        public densidad                  :number,
        public color_grano_verde         :COLOR,
        public olor                      :OLOR,
        public superior_malla_18         :number,
        public superior_malla_16         :number,
        public superior_malla_14         :number,
        public menor_malla_16            :number,
        public peso_defectos             :number,
        public quaquers                  :number,
        public peso_muestra_tostada      :number,
        public desarrollo                :number,
        public pocentaje_caramelizcacion :number,
        public c_desarrollo              :number,
        public grado                     :GRADO,
        public comentario                :string,
        public defectos_primarios        :string[],
        public defectos_secundarios      :string[],
    ){}
}