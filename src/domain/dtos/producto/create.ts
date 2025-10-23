export class CreateProductoDto {
    private constructor(
        public readonly id_producto: string,
        public readonly nombre: string,
        public readonly id_categoria: string,
        public readonly descripcion?: string,
        public readonly es_combo: boolean = false,
        public readonly activo: boolean = true,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateProductoDto?] {
        const {
            id_producto,
            nombre,
            descripcion,
            id_categoria,
            es_combo = false,
            activo = true,
        } = props;

        if (!id_categoria) return ['La categoria es requerida', undefined];
        if (!nombre) return ['El nombre del producto es requerido', undefined];
        if (typeof es_combo !== 'boolean') return ['es_combo debe ser boolean', undefined];
        if (typeof activo !== 'boolean') return ['activo debe ser boolean', undefined];

        return [
            undefined,
            new CreateProductoDto(id_producto, nombre, id_categoria,descripcion,es_combo, activo)
        ];
    }
}