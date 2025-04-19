export class CreatePedidoDto {
    private constructor(
        public readonly tipo_pedido     :    string,
        public readonly cantidad        :    number,
        public readonly estado_pedido   :    string,
        public readonly observaciones   :    string,
        public readonly id_user         :    string,
        public readonly id_lote         :    string
    ) {}

    static create(props: { [key: string]: any }): [string?, CreatePedidoDto?] {
        const { 
            tipo_pedido,
            cantidad,
            estado_pedido,
            observaciones,
            id_user,
            id_lote
         } = props;

         
        if (!tipo_pedido) return ['El tipo de pedido es requerido', undefined];
        if (!cantidad) return ['La cantidad es requerida', undefined];
        if (!estado_pedido) return ['El estado del pedido es requerido', undefined];
        if (!observaciones) return ['Las observaciones son requeridas', undefined];
        if (!id_user) return ['El ID del cliente es requerido', undefined];
        if (!id_lote) return ['El ID del lote es requerido', undefined];
        
        return [
            undefined,
            new CreatePedidoDto(
                tipo_pedido,
                cantidad,
                estado_pedido,
                observaciones,
                id_user,
                id_lote
            )
            
        ];
    }
}
