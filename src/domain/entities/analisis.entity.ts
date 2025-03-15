import { AnalisisFisicoEntity } from "./analisisFisico.entity";
import { AnalisisSensorialEntity } from "./analisisSensorial.entity";


export class AnalisisEntity {

    constructor(
        public id_analisis: string,
        public fecha_registro: Date,
        public analisisFisico_id: string ,
        public analisisSensorial_id: string,
    ){}

    static fromObject(obj: { [key: string]: any }): AnalisisEntity {
        const { id_analisis, analisis_fisico, analisis_sensorial, fecha_registro } = obj;

        if (!id_analisis) throw new Error('id_analisis es requerido');
        if (!analisis_fisico) throw new Error('analisis_fisico es requerido');
        if (!analisis_sensorial) throw new Error('analisis_sensorial es requerido');
        if (!fecha_registro) throw new Error('fecha_registro es requerida');

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        return new AnalisisEntity(
            id_analisis,
            newFechaRegistro,
            analisis_fisico,
            analisis_sensorial
        );
    }

}