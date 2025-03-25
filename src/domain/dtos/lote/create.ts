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
        public readonly variedades: string,
        public readonly user_id?: string,
        public readonly analisis_id?: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateLoteDto?] {
        const { productor, finca, region, departamento, fecha_compra, peso, estado, user_id, analisis_id, variedades } = props;

        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!region) return ['La región es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!estado) return ['El estado es requerido', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
 

        let fechaParsed = new Date(fecha_compra);
        if (isNaN(fechaParsed.getTime())) return ['La fecha de compra es inválida', undefined];

        return [undefined, new CreateLoteDto(
            productor, finca, region, departamento,fechaParsed,
            peso, estado, variedades, user_id, analisis_id
        )];
    }
}
