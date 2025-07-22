

export class UpdateAnalisisFisicoDto {
    private constructor(
        public readonly id_analisis_fisico: string,
        public readonly peso_muestra?: number,
        public readonly peso_pergamino?: number,
        public readonly wa?: number,
        public readonly temperatura_wa?: number,
        public readonly humedad?: number,
        public readonly temperatura_humedad?: number,
        public readonly densidad?: number,
        public readonly color_grano_verde?: string,
        public readonly olor?: string,
        public readonly superior_malla_18?: number,
        public readonly superior_malla_16?: number,
        public readonly superior_malla_14?: number,
        public readonly menor_malla_14?: number,
        public readonly peso_defectos?: number,
        public readonly quaquers?: number,
        public readonly peso_muestra_tostada?: number,
        public readonly desarrollo?: number,
        public readonly pocentaje_caramelizcacion?: number,
        public readonly c_desarrollo?: number,
        public readonly grado?: string,
        public readonly comentario?: string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if(this.peso_muestra) returnObj.peso_muestra = this.peso_muestra;
        if(this.peso_pergamino) returnObj.peso_pergamino = this.peso_pergamino;
        if(this.wa) returnObj.wa = this.wa;
        if(this.temperatura_wa) returnObj.temperatura_wa = this.temperatura_wa;
        if(this.humedad) returnObj.humedad = this.humedad;
        if(this.temperatura_humedad) returnObj.temperatura_humedad = this.temperatura_humedad;
        if(this.densidad) returnObj.densidad = this.densidad;
        if(this.color_grano_verde) returnObj.color_grano_verde = this.color_grano_verde;
        if(this.olor) returnObj.olor = this.olor;
        if(this.superior_malla_18) returnObj.superior_malla_18 = this.superior_malla_18;
        if(this.superior_malla_16) returnObj.superior_malla_16 = this.superior_malla_16;
        if(this.superior_malla_14) returnObj.superior_malla_14 = this.superior_malla_14;
        if(this.menor_malla_14) returnObj.menor_malla_14 = this.menor_malla_14;
        if(this.peso_defectos) returnObj.peso_defectos = this.peso_defectos;
        if(this.quaquers) returnObj.quaquers = this.quaquers;
        if(this.peso_muestra_tostada) returnObj.peso_muestra_tostada = this.peso_muestra_tostada;
        if(this.desarrollo) returnObj.desarrollo = this.desarrollo;
        if(this.pocentaje_caramelizcacion) returnObj.pocentaje_caramelizcacion = this.pocentaje_caramelizcacion;
        if(this.c_desarrollo) returnObj.c_desarrollo = this.c_desarrollo;
        if(this.grado) returnObj.grado = this.grado;
        if(this.comentario) returnObj.comentario = this.comentario;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateAnalisisFisicoDto?] {
        const {
            id_analisis_fisico,peso_muestra, peso_pergamino, wa, temperatura_wa,
            humedad, temperatura_humedad, densidad, color_grano_verde,
            olor, superior_malla_18, superior_malla_16, superior_malla_14,
            menor_malla_14, peso_defectos, quaquers, peso_muestra_tostada,
            desarrollo, pocentaje_caramelizcacion, c_desarrollo, grado,
            comentario, defectos_primarios, defectos_secundarios
         } = props;


        return [undefined, new UpdateAnalisisFisicoDto(
            id_analisis_fisico,peso_muestra, peso_pergamino, wa, temperatura_wa,
            humedad, temperatura_humedad, densidad, color_grano_verde,
            olor, superior_malla_18, superior_malla_16, superior_malla_14,
            menor_malla_14, peso_defectos, quaquers, peso_muestra_tostada,
            desarrollo, pocentaje_caramelizcacion, c_desarrollo, grado,
            comentario
        )];
    }
}
