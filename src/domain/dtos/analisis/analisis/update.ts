

export class UpdateAnalisisDto {

    constructor(
        public readonly id_analisis: string,
        public readonly fecha_registro: Date,
        public readonly analisisFisico_id: string,
        public readonly analisisSensorial_id: string,
    ){}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if(this.analisisFisico_id) returnObj.analisis_fisico = this.analisisFisico_id;
        if(this.analisisSensorial_id) returnObj.analisis_sensorial = this.analisisSensorial_id;
        return returnObj;
    }

    static create(props: { [key: string]: any }): [string?, UpdateAnalisisDto?] {
        const { id_analisis,fecha_registro, analisisFisico_id, analisisSensorial_id } = props;

       

        return [undefined, new UpdateAnalisisDto(
            id_analisis,fecha_registro,analisisFisico_id, analisisSensorial_id
        )];
    }
    
}