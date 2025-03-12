import { AnalisisEntity } from "./analisis.entity";

export class LoteEntity {

    constructor(
        public id_lote               : string,
        public productor             : string,
        public finca                 : string,
        public region                : string,
        public departamento          : string,
        public fecha_compra          : Date, 
        public peso                  : number,
        public estado                : string,
        public variedades_id_variedad: string,
        public user_id_user          : string,
        public pedido_id_pedido      : string,
        public analisis              : AnalisisEntity,
        public variedades            : string,
    ){}

}