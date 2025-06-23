
export class UpdateLoteTostadoDto{
    constructor(
        public fecha_tostado?: Date,
        public perfil_tostado?: string,
        public peso?: number,
        public id_analisis_rapido?: string,
    ){}

    get values(){
        const returnObj: { [key: string]: any } = {};
        if (this.fecha_tostado) returnObj.fecha_tostado = this.fecha_tostado;
        if (this.perfil_tostado) returnObj.perfil_tostado = this.perfil_tostado;
        if (this.peso) returnObj.peso = this.peso;
        if (this.id_analisis_rapido) returnObj.id_analisis_rapido = this.id_analisis_rapido;    
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateLoteTostadoDto?] {
        const { fecha_tostado, perfil_tostado, peso, id_analisis_rapido } = props;
        return [undefined, 
            new UpdateLoteTostadoDto(
                fecha_tostado,
                perfil_tostado,
                peso,
                id_analisis_rapido  
        )];
    }

}