import { AnalisisRapidoEntity } from "./analisisRapido.entity";

export class TuesteEntity {
    constructor(
        public id_tueste                : string,
        public fecha_tueste             : Date,
        public tostadora                : string,
        public peso_entrada             : number,
        public temperatura_entrada      : number,
        public llama_inicial            : number,
        public aire_inicial             : number,
        public punto_no_retorno         : number,
        public tiempo_despues_crack     : number,
        public temperatura_crack        : number,
        public temperatura_salida       : number,
        public tiempo_total             : number,
        public porcentaje_caramelizacion: number,
        public desarrollo               : number,
        public grados_desarrollo        : number,
        public peso_salida              : number,
        public merma                    : number,
        public agtrom_comercial         : number,
        public agtrom_gourmet           : number,
        public analisis_sensorial_rapido: AnalisisRapidoEntity,
    ){}
}