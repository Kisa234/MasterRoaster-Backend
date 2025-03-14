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
        public id_analisis_rapido       : string,
        public eliminado                : boolean
    ){}

    static fromObject(obj: { [key: string]: any }): TuesteEntity {
        const { id_tueste, fecha_tueste, tostadora, peso_entrada, temperatura_entrada,
                llama_inicial, aire_inicial, punto_no_retorno, tiempo_despues_crack,
                temperatura_crack, temperatura_salida, tiempo_total, porcentaje_caramelizacion,
                desarrollo, grados_desarrollo, peso_salida, merma, agtrom_comercial,
                agtrom_gourmet, id_analisis_rapido, eliminado} = obj;
        if(!id_tueste) throw new Error('El ID del tueste es requerido');
        if(!fecha_tueste) throw new Error('La fecha del tueste es requerida');
        if(!tostadora) throw new Error('La tostadora es requerida');
        if(!peso_entrada) throw new Error('El peso de entrada es requerido');
        if(!temperatura_entrada) throw new Error('La temperatura de entrada es requerida');
        if(!llama_inicial) throw new Error('La llama inicial es requerida');
        if(!aire_inicial) throw new Error('El aire inicial es requerido');
        if(!punto_no_retorno) throw new Error('El punto de no retorno es requerido');
        if(!tiempo_despues_crack) throw new Error('El tiempo después del crack es requerido');
        if(!temperatura_crack) throw new Error('La temperatura del crack es requerida');
        if(!temperatura_salida) throw new Error('La temperatura de salida es requerida');
        if(!tiempo_total) throw new Error('El tiempo total es requerido');
        if(!porcentaje_caramelizacion) throw new Error('El porcentaje de caramelización es requerido');
        if(!desarrollo) throw new Error('El desarrollo es requerido');
        if(!grados_desarrollo) throw new Error('Los grados de desarrollo son requeridos');
        if(!peso_salida) throw new Error('El peso de salida es requerido');
        if(!merma) throw new Error('La merma es requerida');
        if(!agtrom_comercial) throw new Error('El agtron comercial es requerido');
        if(!agtrom_gourmet) throw new Error('El agtron gourmet es requerido');
        if(!id_analisis_rapido) throw new Error('El ID del análisis rápido es requerido');
        if(!eliminado) throw new Error('El estado de eliminado es requerido');

        return new TuesteEntity(
            id_tueste, fecha_tueste, tostadora, peso_entrada, temperatura_entrada,
            llama_inicial, aire_inicial, punto_no_retorno, tiempo_despues_crack,
            temperatura_crack, temperatura_salida, tiempo_total, porcentaje_caramelizacion,
            desarrollo, grados_desarrollo, peso_salida, merma, agtrom_comercial,
            agtrom_gourmet, id_analisis_rapido,eliminado
        );
    };
}