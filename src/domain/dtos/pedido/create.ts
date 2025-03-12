export class CreatePedidoDto {
    private constructor(
        public readonly fecha_pedido: Date,
        public readonly tipo_tueste: string,
        public readonly cantidad_tostado: number,
        public readonly estado_pedido: string,
        public readonly observaciones: string,
        public readonly cliente_id: string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreatePedidoDto?] {
        const { fecha_pedido, tipo_tueste, cantidad_tostado, estado_pedido, observaciones, cliente_id } = props;

        if (!fecha_pedido || isNaN(new Date(fecha_pedido).getTime())) {
            return ['La fecha del pedido es inválida', undefined];
        }
        if (!tipo_tueste) return ['El tipo de tueste es requerido', undefined];
        if (!cantidad_tostado || cantidad_tostado <= 0) return ['La cantidad tostada debe ser mayor a 0', undefined];
        if (!estado_pedido) return ['El estado del pedido es requerido', undefined];
        if (!cliente_id) return ['El ID del cliente es requerido', undefined];

        return [
            undefined,
            new CreatePedidoDto(new Date(fecha_pedido), tipo_tueste, cantidad_tostado, estado_pedido, observaciones, cliente_id)
        ];
    }
}
