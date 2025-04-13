export class PedidoEntity {
    constructor(
        public id_pedido       : string,
        public fecha_pedido    : Date,
        public tipo_tueste     : string,
        public cantidad_tostado: number,
        public estado_pedido   : string,
        public observaciones   : string,
        public user_id      : string,  
        public asignado_a_id?  : string,
        public fecha_asignacion?: Date, 
        public eliminado?      : boolean 
    ){}

    static fromObject(obj: { [key: string]: any }): PedidoEntity {
        const { id_pedido, fecha_pedido, tipo_tueste, cantidad_tostado, estado_pedido, observaciones, user_id, asignado_a_id, fecha_asignacion,eliminado } = obj;
        if(!id_pedido) throw new Error('El ID del pedido es requerido');
        if(!fecha_pedido) throw new Error('La fecha del pedido es requerida');
        if(!tipo_tueste) throw new Error('El tipo de tueste es requerido');
        if(!cantidad_tostado) throw new Error('La cantidad tostada es requerida');
        if(!estado_pedido) throw new Error('El estado del pedido es requerido');
        if(!observaciones) throw new Error('Las observaciones son requeridas');
        if(!user_id) throw new Error('El ID del cliente es requerido');
        if(!asignado_a_id) throw new Error('El ID del asignado es requerido');
        if(!fecha_asignacion) throw new Error('La fecha de asignación es requerida');
        if(!eliminado) throw new Error('El estado de eliminado es requerido');
        return new PedidoEntity(id_pedido, fecha_pedido, tipo_tueste, cantidad_tostado, estado_pedido, observaciones, user_id, asignado_a_id, fecha_asignacion, eliminado);
    }
}
