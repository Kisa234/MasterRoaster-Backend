import { AnalisisRapidoEntity } from "../../entities/analisisRapido.entity";

export class UpdateTuesteDto {
    private constructor(
        public readonly id_tueste                :string,
        public readonly fecha_tueste             :Date,
        public readonly tostadora                :string,
        public readonly densidad                 :number,
        public readonly humedad                  :number,
        public readonly peso_entrada             :number,
        public readonly temperatura_entrada      :number,
        public readonly llama_inicial            :number,
        public readonly aire_inicial             :number,
        public readonly punto_no_retorno         :number,
        public readonly tiempo_despues_crack     :number,
        public readonly temperatura_crack        :number,
        public readonly temperatura_salida       :number,
        public readonly tiempo_total             :number,
        public readonly porcentaje_caramelizacion:number,
        public readonly desarrollo               :number,
        public readonly grados_desarrollo        :number,
        public readonly peso_salida              :number,
        public readonly merma                    :number,
        public readonly agtrom_comercial         :number,
        public readonly agtrom_gourmet           :number,
        public readonly id_analisis_rapido       :string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.fecha_tueste) returnObj.fecha_tueste = this.fecha_tueste;
        if (this.tostadora) returnObj.tostadora = this.tostadora;
        if (this.peso_entrada !== undefined) returnObj.peso_entrada = this.peso_entrada;
        if (this.temperatura_entrada !== undefined) returnObj.temperatura_entrada = this.temperatura_entrada;
        if (this.llama_inicial !== undefined) returnObj.llama_inicial = this.llama_inicial;
        if (this.aire_inicial !== undefined) returnObj.aire_inicial = this.aire_inicial;
        if (this.punto_no_retorno !== undefined) returnObj.punto_no_retorno = this.punto_no_retorno;
        if (this.tiempo_despues_crack !== undefined) returnObj.tiempo_despues_crack = this.tiempo_despues_crack;
        if (this.temperatura_crack !== undefined) returnObj.temperatura_crack = this.temperatura_crack;
        if (this.temperatura_salida !== undefined) returnObj.temperatura_salida = this.temperatura_salida;
        if (this.tiempo_total !== undefined) returnObj.tiempo_total = this.tiempo_total;
        if (this.porcentaje_caramelizacion !== undefined) returnObj.porcentaje_caramelizacion = this.porcentaje_caramelizacion;
        if (this.desarrollo !== undefined) returnObj.desarrollo = this.desarrollo;
        if (this.grados_desarrollo !== undefined) returnObj.grados_desarrollo = this.grados_desarrollo;
        if (this.peso_salida !== undefined) returnObj.peso_salida = this.peso_salida;
        if (this.merma !== undefined) returnObj.merma = this.merma;
        if (this.agtrom_comercial !== undefined) returnObj.agtrom_comercial = this.agtrom_comercial;
        if (this.agtrom_gourmet !== undefined) returnObj.agtrom_gourmet = this.agtrom_gourmet;
        if (this.id_analisis_rapido) returnObj.id_analisis_rapido = this.id_analisis_rapido;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdateTuesteDto?] {
        const { 
            id_tueste,
            fecha_tueste,
            tostadora,
            densidad,
            humedad,
            peso_entrada,
            temperatura_entrada,
            llama_inicial,
            aire_inicial,
            punto_no_retorno,
            tiempo_despues_crack,
            temperatura_crack,
            temperatura_salida,
            tiempo_total,
            porcentaje_caramelizacion,
            desarrollo,
            grados_desarrollo,
            peso_salida,
            merma,
            agtrom_comercial,
            agtrom_gourmet,
            id_analisis_rapido
         } = props;

        if (!id_tueste) return ['ID de tueste es requerido', undefined];

        

        return [undefined, new UpdateTuesteDto(
            id_tueste,
            fecha_tueste,
            tostadora,
            densidad,
            humedad,
            peso_entrada,
            temperatura_entrada,
            llama_inicial,
            aire_inicial,
            punto_no_retorno,
            tiempo_despues_crack,
            temperatura_crack,
            temperatura_salida,
            tiempo_total,
            porcentaje_caramelizacion,
            desarrollo,
            grados_desarrollo,
            peso_salida,
            merma,
            agtrom_comercial,
            agtrom_gourmet,
            id_analisis_rapido
        )];
    }
}
