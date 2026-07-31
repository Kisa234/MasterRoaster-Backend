export class CreatePedidoBolsaDto {
    private constructor(
        public readonly id_pedido: string,
        public readonly gramaje: number,
        public readonly molienda: string,
        public readonly cantidad: number,
    ) { }

    static create(props: { [key: string]: any }): [string?, CreatePedidoBolsaDto?] {
        const { id_pedido, gramaje, molienda, cantidad } = props;

        if (!id_pedido) return ['id_pedido es requerido', undefined];
        if (!gramaje || gramaje <= 0) return ['gramaje debe ser mayor a 0', undefined];
        if (!molienda) return ['molienda es requerida', undefined];
        if (!cantidad || cantidad <= 0) return ['cantidad debe ser mayor a 0', undefined];

        return [undefined, new CreatePedidoBolsaDto(id_pedido, gramaje, molienda, cantidad)];
    }
}
