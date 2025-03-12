export class AceptarPedidoDto {
    constructor(
        public readonly id_pedido: string,
        public readonly estado_pedido: string
    ) {}

    static accept(props: { [key: string]: any }): [string?, AceptarPedidoDto?] {
        const { id_pedido, estado_pedido } = props;

        if (!id_pedido) return ['El ID del pedido es requerido', undefined];
        if (!estado_pedido) return ['El estado del pedido es requerido', undefined];

        return [undefined, new AceptarPedidoDto(id_pedido, estado_pedido)];
    }
}
