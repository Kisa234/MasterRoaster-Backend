import { AnalisisFisicoEntity } from "./analisisFisico.entity";
import { AnalisisSensorialEntity } from "./analisisSensorial.entity";


export class AnalisisEntity {

    constructor(
        public id_analisis: string,
        public fecha_registro: Date,
        public analisisFisico_id: string ,
        public analisisSensorial_id: string,
        public comentario: string,
    ){}

    static fromObject(obj: { [key: string]: any }): AnalisisEntity {
        const { id_analisis, analisisFisico_id, analisisSensorial_id, fecha_registro, comentario } = obj;
    
        if (!id_analisis) throw new Error('id_analisis es requerido');
        if (!analisisFisico_id) throw new Error('analisisFisico_id es requerido');
        if (!analisisSensorial_id) throw new Error('analisisSensorial_id es requerido');
        if (!fecha_registro) throw new Error('fecha_registro es requerida');
        if (!comentario) throw new Error('comentario es requerido');
    
        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }
    
        return new AnalisisEntity(
            id_analisis,
            newFechaRegistro,
            analisisFisico_id,
            analisisSensorial_id,
            comentario
        );
    }
    

}