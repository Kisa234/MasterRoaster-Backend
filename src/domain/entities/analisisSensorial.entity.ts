export class AnalisisSensorialEntity {

    constructor(
        public id_analisis_sensorial :string,
        public fragancia_aroma       :number,
        public sabor                 :number,
        public sabor_residual        :number,
        public acidez                :number,
        public cuerpo                :number,
        public uniformidad           :number,
        public balance               :number,
        public taza_limpia           :number,
        public dulzor                :number,
        public puntaje_catador       :number,
        public taza_defecto_ligero   :number,
        public tazas_defecto_rechazo :number,
        public puntaje_taza          :number,
        public comentario            :number,
        public fecha_registro        :Date,
    ){}

}