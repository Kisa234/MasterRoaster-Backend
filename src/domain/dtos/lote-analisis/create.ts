export class CreateLoteAnalisisDto {
    private constructor(
        public readonly id_lote: string,
        public readonly id_analisis: string,
    ) {}

    static create(props: { [key: string]: any } ): [string?, CreateLoteAnalisisDto?] {
        let { id_lote, id_analisis } = props;

        if (!id_lote) return ['El id_lote es requerido', undefined];
        if (!id_analisis) return ['El id_analisis es requerido', undefined];

        return [undefined, new CreateLoteAnalisisDto(
            id_lote, id_analisis
        )];
    }
   
}
