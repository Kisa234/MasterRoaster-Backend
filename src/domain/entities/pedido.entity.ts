export class PedidoEntity {
    constructor(
        public id_pedido      : string,
        public fecha_registro : Date,
        public tipo_pedido    : string,
        public cantidad       : number,
        public estado_pedido  : string,
        public comentario     : string,
        public id_user        : string,
        public id_lote        : string,
        public eliminado      : boolean,
        public id_nuevoLote   : string,
    ){}

    static fromObject(obj: { [key: string]: any }): PedidoEntity {
        const {
            id_pedido,
            fecha_registro,
            tipo_pedido,
            cantidad,
            estado_pedido,
            comentario,
            id_user,
            id_lote,
            
        }= obj;

        const newFechaRegistro = new Date(fecha_registro);
        if (isNaN(newFechaRegistro.getTime())) {
            throw new Error('fecha_registro no es válida');
        }

        if(!id_pedido) throw new Error('id_pedido is required');
        if(!tipo_pedido) throw new Error('tipo_pedido is required');
        if(!cantidad) throw new Error('cantidad is required');
        if(!estado_pedido) throw new Error('estado_pedido is required');
        if(!comentario) throw new Error('observaciones is required');
        if(!id_user) throw new Error('id_user is required');
        if(!id_lote) throw new Error('id_lote is required');
        const eliminado = obj.eliminado ?? false; 
        const id_nuevoLote = obj.id_nuevoLote ?? null;
    
        return new PedidoEntity(
            id_pedido,
            newFechaRegistro,
            tipo_pedido,
            cantidad,
            estado_pedido,
            comentario,
            id_user,
            id_lote,
            eliminado,
            id_nuevoLote,
        );

    }
}
