export class CreateIngresoCafeDto {

    private constructor(
        public readonly id_lote: string,
        public readonly cantidad_kg: number,
        public readonly costo_unitario: number,
        public readonly proveedor: string | null,
        public readonly id_user: string | null,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateIngresoCafeDto?] {
        const { id_lote, cantidad_kg, costo_unitario, proveedor, id_user } = props;

        if (!id_lote) return ['id_lote property is required', undefined];
        if (cantidad_kg === undefined) return ['cantidad_kg property is required', undefined];
        if (costo_unitario === undefined) return ['costo_unitario property is required', undefined];

        return [undefined, new CreateIngresoCafeDto(
            id_lote,
            Number(cantidad_kg),
            Number(costo_unitario),
            proveedor ?? null,
            id_user ?? null
        )];
    }
}
