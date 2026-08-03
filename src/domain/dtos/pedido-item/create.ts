export class CreatePedidoItemDto {
    private constructor(
        public readonly entidad: string,
        public readonly id_entidad: string,
        public readonly cantidad: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePedidoItemDto?] {
        const { entidad, id_entidad, cantidad } = props;

        if (!entidad) return ['entidad es requerida', undefined];
        if (!id_entidad) return ['id_entidad es requerido', undefined];
        if (cantidad === undefined || cantidad === null || cantidad <= 0)
            return ['cantidad debe ser mayor a 0', undefined];

        return [undefined, new CreatePedidoItemDto(entidad, id_entidad, cantidad)];
    }
}
