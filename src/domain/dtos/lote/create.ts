

export class CreateLoteDto {
    private constructor(
        public readonly id_lote        : string,
        public readonly productor      : string,
        public readonly finca          : string,
        public readonly region         : string,
        public readonly departamento   : string,
        public readonly fecha_compra   : Date,
        public readonly peso           : number,
        public readonly variedades     : string,
        public readonly proceso        : string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateLoteDto?] {
        const { productor, finca, region, departamento, fecha_compra, peso, variedades,proceso } = props;

        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!region) return ['La región es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
        if (!proceso) return ['El proceso es requerido', undefined];

        let fechaParsed = new Date(fecha_compra);
        if (isNaN(fechaParsed.getTime())) return ['La fecha de compra es inválida', undefined];
        
        // 1 LETRA PRIMER NOMBRE PRODUCTOR
        // 1 LETRA PRIMER APELLIDO PRODUCTOR
        // 2 LETRAS DE LA VARIERDAD
        // SI ES NATURAL "NA" y HONEY "HO" , SI ES LAVADO NADA
        // NUMERO DE LOTE INGRESADO "1,2,3,4,5,6,7,8,9"

        const id_lote : string= `${productor}-${finca}-${region}-${departamento}-${fechaParsed.toISOString().split('T')[0]}`;

        return [undefined, new CreateLoteDto(
            id_lote,productor, finca, region, departamento,fechaParsed,
            peso, variedades, proceso
        )];
    }
}
