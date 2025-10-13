export class CreateProductoComponenteDto {
    private constructor(
        public readonly id_combo: string,
        public readonly id_producto: string,
        public readonly cantidad: number = 1,
    ) {}

    static create(props: { [key: string]: any }): [string?, CreateProductoComponenteDto?] {
        const { id_combo, id_producto, cantidad = 1 } = props;

        if (!id_combo) return ['El id_combo es requerido', undefined];
        if (!id_producto) return ['El id_producto es requerido', undefined];
        if (cantidad <= 0) return ['La cantidad debe ser mayor a 0', undefined];

        return [undefined, new CreateProductoComponenteDto(id_combo, id_producto, cantidad)];
    }
}
