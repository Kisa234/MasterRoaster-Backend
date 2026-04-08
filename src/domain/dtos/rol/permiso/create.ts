export class CreatePermisoDto {

    private constructor(
        public readonly codigo: string,
        public readonly modulo: string,
        public readonly descripcion: string | null,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreatePermisoDto?] {
        const { codigo, modulo, descripcion } = props;

        if (!codigo) return ['codigo property is required', undefined];
        if (!modulo) return ['modulo property is required', undefined];

        return [undefined, new CreatePermisoDto(
            codigo,
            modulo,
            descripcion ?? null
        )];
    }
}
