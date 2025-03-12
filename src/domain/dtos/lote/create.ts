import { AnalisisEntity } from "../../entities/analisis.entity";


export class CreateLoteDto {
    private constructor(
        public readonly productor: string,
        public readonly finca: string,
        public readonly region: string,
        public readonly departamento: string,
        public readonly fecha_compra: Date,
        public readonly peso: number,
        public readonly estado: string,
        public readonly variedades_id_variedad: string,
        public readonly user_id_user: string,
        public readonly pedido_id_pedido: string,
        public readonly analisis: AnalisisEntity,
        public readonly variedades: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateLoteDto?] {
        const { productor, finca, region, departamento, fecha_compra, peso, estado, 
                variedades_id_variedad, user_id_user, pedido_id_pedido, analisis, variedades } = props;

        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!region) return ['La región es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!estado) return ['El estado es requerido', undefined];
        if (!variedades_id_variedad) return ['El ID de la variedad es requerido', undefined];
        if (!user_id_user) return ['El ID del usuario es requerido', undefined];
        if (!pedido_id_pedido) return ['El ID del pedido es requerido', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];

        let fechaParsed = new Date(fecha_compra);
        if (isNaN(fechaParsed.getTime())) return ['La fecha de compra es inválida', undefined];

        return [undefined, new CreateLoteDto(
            productor, finca, region, departamento, fechaParsed, peso, estado, 
            variedades_id_variedad, user_id_user, pedido_id_pedido, analisis, variedades
        )];
    }
}
