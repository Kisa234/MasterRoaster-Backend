export class UpdatePedidoDto {
    private constructor(
        public readonly id_pedido    ?:    string,
        public readonly tipo_pedido  ?:    string,
        public readonly cantidad     ?:    number,
        public readonly estado_pedido?:    string,
        public readonly comentario   ?:    string,
        public readonly id_user      ?:    string,
        public readonly id_lote      ?:    string,
        public readonly id_nuevoLote ?:    string,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.tipo_pedido) returnObj.tipo_pedido = this.tipo_pedido;
        if (this.cantidad) returnObj.cantidad = this.cantidad;
        if (this.estado_pedido) returnObj.estado_pedido = this.estado_pedido;
        if (this.comentario) returnObj.comentario = this.comentario;
        if (this.id_user) returnObj.id_user = this.id_user;
        if (this.id_lote) returnObj.id_lote = this.id_lote;
        if (this.id_nuevoLote) returnObj.id_nuevoLote = this.id_nuevoLote;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdatePedidoDto?] {
        const { 
            id_pedido,
            tipo_pedido,
            cantidad,
            estado_pedido,
            comentario,
            id_user,
            id_lote,
            id_nuevoLote,
         } = props;


        if (!id_pedido) return ['El ID del pedido es requerido', undefined];
        if( tipo_pedido) return ['El tipo de pedido no puede ser modificado', undefined];
        if( id_user) return ['El ID del usuario no puede ser modificado', undefined];
        if( id_lote) return ['El ID del lote no puede ser modificado', undefined];

        
        

        return [undefined, 
            new UpdatePedidoDto(
                id_pedido,
                tipo_pedido,
                cantidad,
                estado_pedido,
                comentario,
                id_user,
                id_lote,
                id_nuevoLote,
            )
        ];
    }
}
