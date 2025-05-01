
import { AnalisisRapidoEntity } from "../../entities/analisisRapido.entity";

export class CreateTuesteDto {
    private constructor(
        public readonly id_lote                  :string,
        public readonly fecha_tueste             :Date,
        public readonly tostadora                :string,
        public readonly id_cliente               :string,
        public readonly densidad                 :number,
        public readonly humedad                  :number,
        public readonly peso_entrada             :number,
        public readonly id_pedido                :string,
    ) {}


    static create(props: { [key: string]: any }): [string?, CreateTuesteDto?] {
        const { 
            id_lote     ,
            fecha_tueste,
            tostadora   ,
            id_cliente  ,
            densidad    ,
            humedad     ,
            peso_entrada,
            id_pedido   ,
        } = props;
        
        if (!id_pedido) return ['ID de pedido es requerido', undefined];
        if (!tostadora) return ['Tostadora es requerida', undefined];
        if (!peso_entrada) return ['Peso de entrada es requerido', undefined];

        const fechaParsed = new Date(fecha_tueste);
        if (fechaParsed.toString() === 'Invalid Date') return ['Fecha de tueste no es válida', undefined];

        return [undefined, 
            new CreateTuesteDto(
                id_lote     ,
                fecha_tueste,
                tostadora   ,
                id_cliente  ,
                densidad    ,
                humedad     ,
                peso_entrada,
                id_pedido   ,
              
        )];
    }
}
