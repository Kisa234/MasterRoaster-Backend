import { AnalisisEntity } from "./analisis.entity";

export class MuestraEntity {
    constructor(
        public id_muestra            : string,
        public nombre                : string,
        public peso                  : number,
        public fecha_registro        : Date,
        public analisis              : AnalisisEntity,
    ){}
}