

export class UpdateAnalisisDto {

    constructor(
        public readonly id_analisis: string,
        public readonly analisis_fisico: string,
        public readonly analisis_sensorial: string,
    ){}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if(this.analisis_fisico) returnObj.analisis_fisico = this.analisis_fisico;
        if(this.analisis_sensorial) returnObj.analisis_sensorial = this.analisis_sensorial;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateAnalisisDto?] {
        const { id_analisis,fecha_registro, analisis_fisico, analisis_sensorial } = props;

       

        return [undefined, new UpdateAnalisisDto(
            id_analisis,analisis_fisico, analisis_sensorial
        )];
    }
    
}