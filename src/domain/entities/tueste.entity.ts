import { AnalisisRapidoEntity } from "./analisisRapido.entity";

export class TuesteEntity {
    constructor(
        
        public id_tueste                 :string,
        public id_lote                   :string,
        public tostadora                 :string,
        public id_cliente                :string,
        public id_pedido                 :string,
        public densidad                  :number,
        public humedad                   :number,
        public peso_entrada              :number,
        public fecha_tueste              :Date,
        public estado_tueste             :string,
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
        public peso_salida               ?:number,
        public merma                     ?:number,
        public agtrom_comercial          ?:number,
        public agtrom_gourmet            ?:number,
        public id_analisis_rapido        ?:number,
        public id_lote_tostado           ?:number,
        public eliminado                 ?:number,   
        
    ){}

    static fromObject(obj: { [key: string]: any }): TuesteEntity {
        const { 
            id_tueste                ,
            id_lote                  ,
            tostadora                ,
            id_cliente               ,
            id_pedido                ,
            densidad                 ,
            humedad                  ,
            peso_entrada             ,
            fecha_tueste             ,
            estado_tueste            ,
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
            peso_salida              ,
            merma                    ,
            agtrom_comercial         ,
            agtrom_gourmet           ,
            id_analisis_rapido       ,
            id_lote_tostado          ,
            eliminado                
        } = obj;

        if (!id_tueste) throw new Error('El ID del tueste es requerido');
        if (!fecha_tueste) throw new Error('La fecha del tueste es requerida');
        if (!tostadora) throw new Error('La tostadora es requerida');
        if (!peso_entrada) throw new Error('El peso de entrada es requerido');
        if (!id_pedido) throw new Error('El ID del pedido es requerido');

        return new TuesteEntity(
            id_tueste                ,
            id_lote                  ,
            tostadora                ,
            id_cliente               ,
            id_pedido                ,
            densidad                 ,
            humedad                  ,
            peso_entrada             ,
            fecha_tueste             ,
            estado_tueste            ,
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
            peso_salida              ,
            merma                    ,
            agtrom_comercial         ,
            agtrom_gourmet           ,
            id_analisis_rapido       ,
            id_lote_tostado          ,
            eliminado                
        );
    };
}