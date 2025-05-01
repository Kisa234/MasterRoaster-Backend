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
        public readonly pesos        ?:    number[],
        public readonly tostadora    ?:    string,
        public readonly fecha_tueste ?:    Date,
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.cantidad) returnObj.cantidad = this.cantidad;
        if (this.estado_pedido) returnObj.estado_pedido = this.estado_pedido;
        if (this.comentario) returnObj.comentario = this.comentario;
        if (this.id_nuevoLote) returnObj.id_nuevoLote = this.id_nuevoLote;
        if (this.pesos) returnObj.pesos = this.pesos;
        if (this.tostadora) returnObj.tostadora = this.tostadora;
        if (this.fecha_tueste) returnObj.fecha_tueste = this.fecha_tueste;
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
            pesos,
            tostadora,
            fecha_tueste,
         } = props;

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
                pesos,
                tostadora,
                fecha_tueste
            )
        ];
    }
}
