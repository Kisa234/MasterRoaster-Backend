export class UpdatePedidoDto {
    private constructor(
        public readonly id_pedido: string,
        public readonly fecha_pedido?: Date,
        public readonly tipo_tueste?: string,
        public readonly cantidad_tostado?: number,
        public readonly estado_pedido?: string,
        public readonly observaciones?: string,
        public readonly cliente_id?: string,
        public readonly asignado_a_id?: string,
        public readonly fecha_asignacion?: Date
    ) {}

    get values() {
        const returnObj: { [key: string]: any } = {};
        if (this.fecha_pedido) returnObj.fecha_pedido = this.fecha_pedido;
        if (this.tipo_tueste) returnObj.tipo_tueste = this.tipo_tueste;
        if (this.cantidad_tostado) returnObj.cantidad_tostado = this.cantidad_tostado;
        if (this.estado_pedido) returnObj.estado_pedido = this.estado_pedido;
        if (this.observaciones) returnObj.observaciones = this.observaciones;
        if (this.cliente_id) returnObj.cliente_id = this.cliente_id;
        if (this.asignado_a_id) returnObj.asignado_a_id = this.asignado_a_id;
        if (this.fecha_asignacion) returnObj.fecha_asignacion = this.fecha_asignacion;
        return returnObj;
    }

    static update(props: { [key: string]: any }): [string?, UpdatePedidoDto?] {
        const { id_pedido, fecha_pedido, tipo_tueste, cantidad_tostado, estado_pedido, observaciones, cliente_id, asignado_a_id, fecha_asignacion } = props;

        if (!id_pedido) return ['El ID del pedido es requerido', undefined];

        let fechaParsed: Date | undefined;
        if (fecha_pedido) {
            fechaParsed = new Date(fecha_pedido);
            if (isNaN(fechaParsed.getTime())) return ['La fecha del pedido es inválida', undefined];
        }

        let fechaAsignacionParsed: Date | undefined;
        if (fecha_asignacion) {
            fechaAsignacionParsed = new Date(fecha_asignacion);
            if (isNaN(fechaAsignacionParsed.getTime())) return ['La fecha de asignación es inválida', undefined];
        }

        return [undefined, new UpdatePedidoDto(id_pedido, fechaParsed, tipo_tueste, cantidad_tostado, estado_pedido, observaciones, cliente_id, asignado_a_id, fechaAsignacionParsed)];
    }
}
