
export class AnalisisRapidoEntity {
    constructor(
        public id_analisis_rapido :string  ,
        public fecha              :Date,
        public horneado           :boolean,
        public humo               :boolean,
        public uniforme           :boolean,
        public verde              :boolean,
        public arrebatado         :boolean,
        public oscuro             :boolean,
        public comentario?        :string,
    ){}

}