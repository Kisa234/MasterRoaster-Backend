
import { AnalisisRapidoEntity } from "../../entities/analisisRapido.entity";

export class CreateTuesteDto {
    private constructor(
        
        public readonly fecha_tueste             :Date,
        public readonly tostadora                :string,
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
        public readonly eliminado                :string

    ) {}

    static create(props: { [key: string]: any }): [string?, CreateTuesteDto?] {
        const { fecha_tueste, tostadora, peso_entrada, temperatura_entrada, llama_inicial, aire_inicial,
            punto_no_retorno, tiempo_despues_crack, temperatura_crack, temperatura_salida, tiempo_total,
            porcentaje_caramelizacion, desarrollo, grados_desarrollo, peso_salida, merma,
            agtrom_comercial, agtrom_gourmet, id_analisis_rapido,eliminado } = props;

        if (!fecha_tueste) return ['Fecha de tueste es requerida', undefined];
        if (!tostadora) return ['Tostadora es requerida', undefined];

        const fechaParsed = new Date(fecha_tueste);
        if (fechaParsed.toString() === 'Invalid Date') return ['Fecha de tueste no es válida', undefined];

        return [undefined, new CreateTuesteDto(
            fechaParsed, tostadora, peso_entrada, temperatura_entrada, llama_inicial, aire_inicial,
            punto_no_retorno, tiempo_despues_crack, temperatura_crack, temperatura_salida, tiempo_total,
            porcentaje_caramelizacion, desarrollo, grados_desarrollo, peso_salida, merma,
            agtrom_comercial, agtrom_gourmet,id_analisis_rapido,eliminado
        )];
    }
}
