export class CreateRolDto {

    private constructor(
        public readonly nombre: string,
        public readonly descripcion: string | null,
        public readonly activo: boolean,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateRolDto?] {
        const { nombre, descripcion, activo } = props;

        if (!nombre) return ['nombre property is required', undefined];

        return [undefined, new CreateRolDto(
            nombre,
            descripcion ?? null,
            activo ?? true
        )];
    }
}
