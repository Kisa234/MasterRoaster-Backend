export class PedidoEntity {
    constructor(
        public id_pedido       : string,
        public fecha_pedido    : Date,
        public tipo_tueste     : string,
        public cantidad_tostado: number,
        public estado_pedido   : string,
        public observaciones   : string,
        public cliente_id      : string,  
        public asignado_a_id?  : string,
        public fecha_asignacion?: Date,  
    ){}
}
