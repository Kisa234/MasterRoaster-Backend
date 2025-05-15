

export class CreateLoteDto {
    private constructor(
        public readonly id_lote        : string,
        public readonly productor      : string,
        public readonly finca          : string,
        public readonly region         : string,
        public readonly departamento   : string,
        public readonly peso           : number,
        public readonly variedades     : string[],
        public readonly proceso        : string,
        public readonly id_user?       : string,
        
    ) {}

    static create(props: { [key: string]: any } ): [string?, CreateLoteDto?] {
        let { id_lote, productor, finca, region, departamento, peso, variedades,proceso,id_user,id_analisis } = props;

      
        // if (!id_lote) return ['El id_lote es requerido', undefined];
        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!region) return ['La región es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
        if (!proceso) return ['El proceso es requerido', undefined];

        return [undefined, new CreateLoteDto(
            id_lote,productor, finca, region, departamento,
            peso, variedades, proceso, id_user
        )];
    }
   
}
