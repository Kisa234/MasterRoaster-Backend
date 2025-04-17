
export class UpdateLoteTostadoDto{
    constructor(
        public fecha_tostado?: Date,
        public perfil_tostado?: string,
    ){}

    get values(){
        const returnObj: { [key: string]: any } = {};
        if (this.fecha_tostado) returnObj.fecha_tostado = this.fecha_tostado;
        if (this.perfil_tostado) returnObj.perfil_tostado = this.perfil_tostado;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateLoteTostadoDto?] {
        const { fecha_tostado, perfil_tostado } = props;
        return [undefined, 
            new UpdateLoteTostadoDto(
                fecha_tostado,
                perfil_tostado
        )];
    }

}