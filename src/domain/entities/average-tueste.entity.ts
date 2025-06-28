import { AnalisisRapidoEntity } from "./analisisRapido.entity";

export class AvgTuesteEntity {
    constructor(
        public temperatura_entrada       ?:number,
        public llama_inicial             ?:number,
        public aire_inicial              ?:number,
        public punto_no_retorno          ?:number,
        public tiempo_despues_crack      ?:number,
        public temperatura_crack         ?:number,
        public temperatura_salida        ?:number,
        public tiempo_total              ?:number,
        public porcentaje_caramelizacion ?:number,
        public desarrollo                ?:number,
        public grados_desarrollo         ?:number,

        
    ){}

    static fromObject(obj: { [key: string]: any }): AvgTuesteEntity {
        const { 
            temperatura_entrada      ,
            llama_inicial            ,
            aire_inicial             ,
            punto_no_retorno         ,
            tiempo_despues_crack     ,
            temperatura_crack        ,
            temperatura_salida       ,
            tiempo_total             ,
            porcentaje_caramelizacion,
            desarrollo               ,
            grados_desarrollo        ,
        } = obj;

        if(temperatura_entrada===undefined) throw new Error('temperatura_entrada es requerido');
        if(llama_inicial===undefined) throw new Error('llama_inicial es requerido');
        if(aire_inicial===undefined) throw new Error('aire_inicial es requerido');
        if(punto_no_retorno===undefined) throw new Error('punto_no_retorno es requerido');
        if(tiempo_despues_crack===undefined) throw new Error('tiempo_despues_crack es requerido');
        if(temperatura_crack===undefined) throw new Error('temperatura_crack es requerido');
        if(temperatura_salida===undefined) throw new Error('temperatura_salida es requerido');
        if(tiempo_total===undefined) throw new Error('tiempo_total es requerido');
        if(porcentaje_caramelizacion===undefined) throw new Error('porcentaje_caramelizacion es requerido');
        if(desarrollo===undefined) throw new Error('desarrollo es requerido');
        if(grados_desarrollo===undefined) throw new Error('grados_desarrollo es requerido');

        return new AvgTuesteEntity(
            temperatura_entrada      ,
            llama_inicial            ,
            aire_inicial             ,
            punto_no_retorno         ,
            tiempo_despues_crack     ,
            temperatura_crack        ,
            temperatura_salida       ,
            tiempo_total             ,
            porcentaje_caramelizacion,
            desarrollo               ,
            grados_desarrollo        ,
        );
    };
}