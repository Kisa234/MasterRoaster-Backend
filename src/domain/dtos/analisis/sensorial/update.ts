import { create } from 'domain';



export class UpdateAnalisisSensorialDTO {

    private constructor(
        public readonly id_analisis_sensorial :string,
        public readonly fragancia_aroma       :number,
        public readonly sabor                 :number,
        public readonly sabor_residual        :number,
        public readonly acidez                :number,
        public readonly cuerpo                :number,
        public readonly uniformidad           :number,
        public readonly balance               :number,
        public readonly taza_limpia           :number,
        public readonly dulzor                :number,
        public readonly puntaje_catador       :number,
        public readonly taza_defecto_ligero   :number,
        public readonly tazas_defecto_rechazo :number,
        public readonly puntaje_taza          :number,
        public readonly comentario            :string,
        public readonly fecha_registro        :Date,
    ){}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.fragancia_aroma) returnObj.fragancia_aroma = this.fragancia_aroma;
        if (this.sabor) returnObj.sabor = this.sabor;
        if (this.sabor_residual) returnObj.sabor_residual = this.sabor_residual;
        if (this.acidez) returnObj.acidez = this.acidez;
        if (this.cuerpo) returnObj.cuerpo = this.cuerpo;
        if (this.uniformidad) returnObj.uniformidad = this.uniformidad;
        if (this.balance) returnObj.balance = this.balance;
        if (this.taza_limpia) returnObj.taza_limpia = this.taza_limpia;
        if (this.dulzor) returnObj.dulzor = this.dulzor;
        if (this.puntaje_catador) returnObj.puntaje_catador = this.puntaje_catador;
        if (this.taza_defecto_ligero) returnObj.taza_defecto_ligero = this.taza_defecto_ligero;
        if (this.tazas_defecto_rechazo) returnObj.tazas_defecto_rechazo = this.tazas_defecto_rechazo;
        if (this.puntaje_taza) returnObj.puntaje_taza = this.puntaje_taza;
        if (this.comentario) returnObj.comentario = this.comentario;

        return returnObj;
    }


    static update(props: { [key: string]: any }): [string?, UpdateAnalisisSensorialDTO?] {
        const { 
            id_analisis_sensorial, fragancia_aroma, sabor, sabor_residual, acidez, cuerpo,
            uniformidad, balance, taza_limpia, dulzor, puntaje_catador,
            taza_defecto_ligero, tazas_defecto_rechazo, puntaje_taza,
            comentario, fecha_registro 
        } = props;


        return [undefined, new UpdateAnalisisSensorialDTO(
            id_analisis_sensorial,
            fragancia_aroma, sabor, sabor_residual, acidez, cuerpo,
            uniformidad, balance, taza_limpia, dulzor, puntaje_catador,
            taza_defecto_ligero, tazas_defecto_rechazo, puntaje_taza,
            comentario, fecha_registro
        )];

    }

}