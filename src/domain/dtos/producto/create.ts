export class CreateProductoDto {
    private constructor(
        public readonly nombre: string,
        public readonly descripcion?: string,
        public readonly categoria?: string,
        public readonly es_combo: boolean = false,
        public readonly activo: boolean = true,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateProductoDto?] {
        const {
            nombre,
            descripcion,
            categoria,
            es_combo = false,
            activo = true,
        } = props;

        if (!nombre) return ['El nombre del producto es requerido', undefined];
        if (typeof es_combo !== 'boolean') return ['es_combo debe ser boolean', undefined];
        if (typeof activo !== 'boolean') return ['activo debe ser boolean', undefined];

        return [
            undefined,
            new CreateProductoDto(nombre, descripcion, categoria, es_combo, activo)
        ];
    }
}