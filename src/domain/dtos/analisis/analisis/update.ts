

export class UpdateAnalisisDto {

    constructor(
        public readonly id_analisis: string,
        public readonly fecha_registro: Date,
        public readonly analisisFisico_id: string,
        public readonly analisisSensorial_id: string,
        public readonly analisisDefectos_id?: string,
        public readonly comentario?: string
    ){}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if(this.analisisFisico_id) returnObj.analisis_fisico = this.analisisFisico_id;
        if(this.analisisSensorial_id) returnObj.analisis_sensorial = this.analisisSensorial_id;
        if(this.analisisDefectos_id) returnObj.id_analisis_defecto = this.analisisDefectos_id;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateAnalisisDto?] {
        const { id_analisis,fecha_registro, analisisFisico_id, analisisSensorial_id, analisisDefectos_id, comentario } = props;

        return [undefined, new UpdateAnalisisDto(
            id_analisis,fecha_registro,analisisFisico_id, analisisSensorial_id, analisisDefectos_id, comentario
        )];
    }
    
}