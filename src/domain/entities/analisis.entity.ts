import { AnalisisFisicoEntity } from "./analisisFisico.entity";
import { AnalisisSensorialEntity } from "./analisisSensorial.entity";


export class AnalisisEntity {

    constructor(
        public id_analisis: string,
        public analisis_fisico: AnalisisFisicoEntity,
        public analisis_sensorial: AnalisisSensorialEntity,
        public fecha_registro: Date,
    ){}

}