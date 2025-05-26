

export class CreateMuestraDto {
    private constructor(
        public readonly id_muestra     : string,
        public readonly productor      : string,
        public readonly finca          : string,
        public readonly region         : string,
        public readonly departamento   : string,
        public readonly peso           : number,
        public readonly variedades     : string[],
        public readonly proceso        : string,
        public readonly id_user?       : string,
        public readonly id_analisis?   : string,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateMuestraDto?] {
        let { id_muestra,productor, finca, region, departamento, peso, variedades,proceso,id_user,id_analisis } = props;
       
        // if (!id_muestra) return ['El id_muestra es requerido', undefined];
        if (!productor) return ['El productor es requerido', undefined];
        if (!finca) return ['La finca es requerida', undefined];
        if (!region) return ['La región es requerida', undefined];
        if (!departamento) return ['El departamento es requerido', undefined];
        if (!peso || peso <= 0) return ['El peso debe ser mayor a 0', undefined];
        if (!variedades) return ['Las variedades son requeridas', undefined];
        if (!proceso) return ['El proceso es requerido', undefined];


        return [undefined, new CreateMuestraDto(
            id_muestra,productor, finca, region, departamento,
            peso, variedades, proceso, id_user, id_analisis
        )];
    }
   

    
}
