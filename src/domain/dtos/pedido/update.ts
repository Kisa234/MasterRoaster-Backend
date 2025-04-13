export class UpdatePedidoDto {
    private constructor(
        public readonly id_pedido    :    string,
        public readonly tipo_pedido  :    string,
        public readonly cantidad     :    number,
        public readonly estado_pedido:    string,
        public readonly observaciones:    string,
        public readonly cliente_id   :    string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.tipo_pedido) returnObj.tipo_pedido = this.tipo_pedido;
        if (this.cantidad) returnObj.cantidad = this.cantidad;
        if (this.estado_pedido) returnObj.estado_pedido = this.estado_pedido;
        if (this.observaciones) returnObj.observaciones = this.observaciones;
        if (this.cliente_id) returnObj.cliente_id_cliente = this.cliente_id;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdatePedidoDto?] {
        const { 
            id_pedido,
            tipo_pedido,
            cantidad,
            estado_pedido,
            observaciones,
            cliente_id,
         } = props;


        if (!id_pedido) return ['El ID del pedido es requerido', undefined];

        
        

        return [undefined, 
            new UpdatePedidoDto(
                id_pedido,
                tipo_pedido,
                cantidad,
                estado_pedido,
                observaciones,
                cliente_id
            )
        ];
    }
}
