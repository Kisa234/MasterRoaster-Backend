export class CreateMuestraAnalisisDto {
    private constructor(
        public readonly id_muestra: string,
        public readonly id_analisis: string,
    ) {}

    static create(props: { [key: string]: any } ): [string?, CreateMuestraAnalisisDto?] {
        let { id_muestra, id_analisis } = props;

        if (!id_muestra) return ['El id_muestra es requerido', undefined];
        if (!id_analisis) return ['El id_analisis es requerido', undefined];

        return [undefined, new CreateMuestraAnalisisDto(
            id_muestra, id_analisis
        )];
    }
   
}
