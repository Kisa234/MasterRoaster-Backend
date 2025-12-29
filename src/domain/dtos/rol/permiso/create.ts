export class CreatePermisoDto {

    private constructor(
        public readonly codigo: string,
        public readonly descripcion: string | null,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreatePermisoDto?] {
        const { codigo, descripcion } = props;

        if (!codigo) return ['codigo property is required', undefined];

        return [undefined, new CreatePermisoDto(
            codigo,
            descripcion ?? null
        )];
    }
}
